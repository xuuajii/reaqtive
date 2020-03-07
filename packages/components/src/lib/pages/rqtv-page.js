//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useContext, useMemo} from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, useLocation } from 'react-router-dom'
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
    <Route path={props.path} exact={props.exact}>
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
    </Route>
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

  if( qCondition==='0' && fallbackPage && triggersDone===true){
    return <Redirect to={fallbackPage?fallbackPage:""} />
  }
  return  props.children
}

RqtvPage.propTypes = {
  path:PropTypes.string.isRequired,
  linkName:PropTypes.string,
  triggers:PropTypes.array.isRequired,
  qTitleExpr:PropTypes.string,
  qConditionExpr:PropTypes.string,
  fallbackPage:PropTypes.string,
  exact:PropTypes.bool,
}

RqtvPage.defaultProps = {
  exact:false,
  triggers:[],
  qConditionExpr:"",
  qTitleExpr:"'My Reaqtive Page'"
}

export default RqtvPage
