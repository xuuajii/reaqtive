//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {useQObjectReducer, useQLayoutReducer, useTriggers} from '@reaqtive/q'

const RqtvPageContext = React.createContext()

const useQPageObjectDef = (qConditionExpr) => useMemo(()=>{
  return {
    qInfo: {
      qType: "tableData"
    },
    qCondition: {
      qStringExpression: {
        qExpr: qConditionExpr
      }
    }
  }
}, [qConditionExpr])

const RqtvPageConsumer = props => {
  const triggerState = useTriggers(props.triggers)
  const qConditionExpr = props.conditionExpr;
  const qObjectDef=useQPageObjectDef(qConditionExpr)
  const qObjectHandler = useQObjectReducer(qObjectDef)
  const qLayoutHandler = useQLayoutReducer(qObjectHandler)
  const qCondition = qLayoutHandler.qLayout&&qLayoutHandler.qLayout.qCondition
  const [conditionRes, setconditionRes] = useState()

  useEffect(()=>{
    if(qCondition==='0'){
      setconditionRes(false)
    }
    if(qCondition==='-1'){
      setconditionRes(true)
    }
  },[qCondition])

  return(
    <RqtvPageContext.Provider
      value={{triggerState, pageData:props.pageData, conditionRes}}
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
