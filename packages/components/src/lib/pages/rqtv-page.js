//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router-dom'
import {RqtvPageContext, RqtvPageProvider} from '../contexts/rqtv-page-context'

const RqtvPage = props => {
  const pageData={title:props.title}
  const {fallbackPage} = props
  const location = useLocation()
  const [hasChangedLocation, setHasChangedLocation] = useState(false)
  useEffect(()=>{
    const delay = location.search!==""?500:0
    setTimeout(()=>setHasChangedLocation(true),delay)
    //console.log(delay)
    return () => setHasChangedLocation(false)
  },[location])
  return(
    <RqtvPageProvider
        triggers={props.triggers}
        pageData={pageData}
        qConditionExpr={props.qConditionExpr}
        qTitleExpr={props.qTitleExpr}
        hasQueryString={location.search!==""?true:false}
      >
        <RqtvPageConsumer fallbackPage={fallbackPage} hasChangedLocation={hasChangedLocation}>
          {props.children}
        </RqtvPageConsumer>
    </RqtvPageProvider>
  )
}

const RqtvPageConsumer = props => {
  const rqtvPageContext=useContext(RqtvPageContext)
  const {conditionRes, triggerState}=rqtvPageContext&&rqtvPageContext
  const {fallbackPage}=props

  if(props.hasChangedLocation===true && conditionRes===false && fallbackPage!=="" && triggerState.done===true){
    return <Redirect to={fallbackPage} />
  }
  return  props.children
}

RqtvPage.propTypes = {
  title:PropTypes.string.isRequired,
  triggers:PropTypes.array.isRequired,
  conditionExpr:PropTypes.string,
  fallbackPage:PropTypes.string
}

RqtvPage.defaultProps = {
  triggers:[],
  conditionExpr:"",
  fallbackPage:""
}

export default RqtvPage
