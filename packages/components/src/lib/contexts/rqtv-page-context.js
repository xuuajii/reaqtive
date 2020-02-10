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
}, [qConditionExpr])

const RqtvPageConsumer = props => {
  const location = useLocation();
  //console.log(currentLocation)
  const queryStringTriggers = useQueryString(location.search)
  const triggers = queryStringTriggers?[...props.triggers, ...queryStringTriggers]:[...props.triggers]
  const triggersDone = useTriggers([...triggers])
  const initialTriggerState=useRef(triggersDone)
  const triggerState = Array.isArray(queryStringTriggers)?triggersDone:initialTriggerState.current;

  const qConditionExpr = props.conditionExpr;
  const qObjectDef=useQPageObjectDef(qConditionExpr)
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
  },[qCondition])


  return(
    <RqtvPageContext.Provider
      value={{triggerState, pageData:props.pageData, conditionRes, qTitle}}
    >
      {props.children}
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
