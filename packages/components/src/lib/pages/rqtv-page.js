//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useContext, useMemo} from 'react'
import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router-dom'
import {RqtvPageContext, RqtvPageProvider} from '../contexts/rqtv-page-context'
import {useQObjectReducer, useQLayoutReducer } from '@reaqtive/q'

const useQConditionDef = (qConditionExpr) => useMemo(()=>{
  return {
    qInfo: {
      qType: "page-condition",
    },
    qCondition: {
      qStringExpression: {
        qExpr: qConditionExpr||''
      }
    }
  }
}, [qConditionExpr])


const RqtvPage = props => {
  const {fallbackPage} = props

  return(
    <RqtvPageProvider
        triggers={props.triggers}
        qConditionExpr={props.qConditionExpr}
        qTitleExpr={props.qTitleExpr}
        hasQueryString={location.search!==""?true:false}
      >
        <RqtvPageConsumer
          fallbackPage={fallbackPage}
        >
          {props.children}
        </RqtvPageConsumer>
    </RqtvPageProvider>
  )
}

const RqtvPageConsumer = props => {
  const location = useLocation()
  const rqtvPageContext=useContext(RqtvPageContext)
  const {fallbackPage}=props
  const {triggerState, qCondition, qPageObjectHandler, qTitle}=rqtvPageContext&&rqtvPageContext
  const [triggersDone, setTriggersDone] = useState()
  useEffect(()=>{
    setTriggersDone(triggerState.done)
    return ()=>setTriggersDone(false)
  },[triggerState.done])


  useEffect(()=>{
    qPageObjectHandler.set
  }, [location.pathname])

  // useEffect(()=>{
  //   if( qCondition==='0' && fallbackPage && triggersDone===true){
  //     console.log('redirect')
  //   }
  //fallbackPage&&console.log(qCondition, qTitle, triggersDone)
  // },[qCondition, fallbackPage, triggersDone])


  if( qCondition==='0' && fallbackPage && triggersDone===true){
    return <Redirect to={fallbackPage?fallbackPage:""} />
  }
  return  props.children
}

RqtvPage.propTypes = {
  triggers:PropTypes.array.isRequired,
  qConditionExpr:PropTypes.string,
  fallbackPage:PropTypes.string
}

RqtvPage.defaultProps = {
  triggers:[],
  qConditionExpr:"",
}

export default RqtvPage
