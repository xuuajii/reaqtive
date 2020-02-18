//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'
import { useQueryString } from '../hooks/index'
import {useQObjectReducer, useQLayoutReducer, useTriggers} from '@reaqtive/q'

const RqtvPageContext = React.createContext()

const useQPageObjectDef = (qTitleExpr) => useMemo(()=>{
  return {
    qInfo: {
      qType: "tableData",
    },
    qTitle:{
      qStringExpression:{
        qExpr: qTitleExpr
      }
    }
  }
}, [qTitleExpr])

const RqtvPageConsumer = props => {
  const location = useLocation();

  // const [locationSearch, setLocationSearch] = useState(null)
  // useEffect(()=>{
  //   setLocationSearch(location.search)
  //   return () => setLocationSearch(null)
  // },[location.search])
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
  const triggerState = useTriggers(triggers)

  const {qConditionExpr, qTitleExpr} = props;
  const qObjectDef=useQPageObjectDef(qTitleExpr)
  const qObjectHandler = useQObjectReducer(qObjectDef)
  const qLayoutHandler = useQLayoutReducer(qObjectHandler)
  const qCondition = qLayoutHandler.qLayout&&qLayoutHandler.qLayout.qCondition
  const [conditionRes, setConditionRes] = useState()
  const qTitle = qLayoutHandler.qLayout&&qLayoutHandler.qLayout.qTitle
  useEffect(()=>{
    if(triggerState.done===true && qObjectHandler.qObject!==null && qConditionExpr!==''){
      qObjectHandler.qObject.setProperties(
        {
          ...qObjectDef,
          qInfo:{qId:qObjectHandler.qObject.id, ...qObjectDef.qInfo},
          qExtendsId:'',
          qCondition: {
            qStringExpression: {
              qExpr: qConditionExpr||''
            }
          }
        }
      )
    }
  }, [qObjectHandler, triggerState.done, qConditionExpr, qObjectDef])
  
  useEffect(()=>{
    if(qCondition==='0'){
      setConditionRes(false)
    }
    if(qCondition==='-1'){
      setConditionRes(true)
    }
    return () => setConditionRes(null)
  },[qCondition])


  return(
    <RqtvPageContext.Provider
      value={{triggerState, pageData:props.pageData, conditionRes, qTitle}}
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
  qConditionExpr:PropTypes.string
}

RqtvPageProvider.defaultProps = {
  triggers:[],
  qConditionExpr:''
}

export {RqtvPageProvider, RqtvPageContext}
