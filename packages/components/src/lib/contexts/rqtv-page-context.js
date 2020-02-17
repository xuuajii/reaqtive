//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useMemo, useRef} from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'
import { useQueryString } from '../hooks/index'
import {useQObjectReducer, useQLayoutReducer, useTriggers} from '@reaqtive/q'

const RqtvPageContext = React.createContext()

const useQPageObjectDef = (qConditionExpr, qTitleExpr) => useMemo(()=>{
  return {
    qInfo: {
      qType: "tableData"
    },
    qCondition: {
      qStringExpression: {
        qExpr: qConditionExpr
      }
    },
    qTitle:{
      qStringExpression:{
        qExpr: qTitleExpr
      }
    }
  }
}, [qConditionExpr, qTitleExpr])

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
  //console.log(location.search,triggers, queryStringTriggers)

  const qConditionExpr = props.conditionExpr;
  const qTitleExpr = props.qTitleExpr;
  const qObjectDef=useQPageObjectDef(qConditionExpr, qTitleExpr)
  const qObjectHandler = useQObjectReducer(qObjectDef)
  const qLayoutHandler = useQLayoutReducer(qObjectHandler)
  const qCondition = qLayoutHandler.qLayout&&qLayoutHandler.qLayout.qCondition
  const [conditionRes, setConditionRes] = useState()
  const qTitle = qLayoutHandler.qLayout&&qLayoutHandler.qLayout.qTitle

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
  conditionExpr:PropTypes.string
}

RqtvPageProvider.defaultProps = {
  triggers:[],
  conditionExpr:""
}

export {RqtvPageProvider, RqtvPageContext}
