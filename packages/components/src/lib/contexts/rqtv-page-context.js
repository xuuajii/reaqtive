import React, {useState, useEffect, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'
import { useQueryString } from '../hooks/index'
import {useQObjectReducer, useQLayoutReducer, useTriggers} from '@reaqtive/q'

/**
 * RqtvPageContext
 * It is a react context. It provides generic info about the page.
 * It is provided by the RqtvPage component
 * It provides the page triggerState, the page title and teh page condition result
 */

const RqtvPageContext = React.createContext()

const mapPageObject = (qTitleExpr,qConditionExpr) =>{
  return {
    qInfo: {
      qType: "page-object",
    },
    qTitle:{
      qStringExpression:{
        qExpr: qTitleExpr
      }
    },
    qCondition:{
      qStringExpression:{
        qExpr: qConditionExpr
      }
    }
  }
}

const RqtvPageConsumer = props => {
  const location = useLocation();

  const queryStringTriggers = useQueryString(location.search)
  const [triggers, setTriggers] = useState(null)
  useEffect(()=>{
    if(location.search!==null && location.search!=='' && Array.isArray(queryStringTriggers) && queryStringTriggers.length>0){
      setTriggers([...props.triggers, ...queryStringTriggers])
    }

    if(location.search===''){
      setTriggers([...props.triggers])
    }
    return () =>  setTriggers(null)
  },[props.triggers, queryStringTriggers, location.search])

  const {qConditionExpr, qTitleExpr} = props;
  const qObjectDef=mapPageObject(qTitleExpr,qConditionExpr)
  const qObjectHandler = useQObjectReducer(qObjectDef)
  const qLayoutHandler = useQLayoutReducer(qObjectHandler)
  useEffect(()=>{
  //if(triggerState.done===true && qObjectHandler.qObject!==null && qConditionExpr!==''){
      qObjectHandler.qObject&&qObjectHandler.qObject.setProperties(
        {
          ...qObjectDef,
          qInfo:{qId:qObjectHandler.qObject.id, ...qObjectDef.qInfo},
          qExtendsId:'',
        }
      )

    //}
  }, [location.pathname, qObjectDef, qObjectHandler])


  const triggerState = useTriggers(triggers)

  const qTitle = qLayoutHandler.qLayout&&qLayoutHandler.qLayout.qTitle
  const qCondition = qLayoutHandler.qLayout&&qLayoutHandler.qLayout.qCondition

  return(
    <RqtvPageContext.Provider
      value={{triggerState, pageData:props.pageData, qTitle, qCondition, qPageObjectHandler:qObjectHandler}}
    >
      {
        props.children
      }
    </RqtvPageContext.Provider>
  )
}

const RqtvPageProvider = props => {
  return(
    <RqtvPageConsumer {...props}>
      {props.children}
    </RqtvPageConsumer>
  )
}

RqtvPageProvider.propTypes = {
  triggers:PropTypes.array.isRequired,
  qConditionExpr:PropTypes.string,
  qTitleExpr:PropTypes.string
}

RqtvPageProvider.defaultProps = {
  triggers:[],
  qConditionExpr:"=''",
  qTitleExpr:"=''",
}

export {RqtvPageProvider, RqtvPageContext}
