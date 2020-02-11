//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import {RqtvPageContext, RqtvPageProvider} from '../contexts/rqtv-page-context'

const RqtvPage = props => {
  const pageData={path:props.path, title:props.title, id:props.id}
  const {fallbackPage} = props
  return(
    <Route path={props.path} exact={props.exact}>
      <RqtvPageProvider triggers={props.triggers} pageData={pageData} conditionExpr={props.conditionExpr}>
        <RqtvPageConsumer fallbackPage={fallbackPage}>
          {props.children}
        </RqtvPageConsumer>
      </RqtvPageProvider>
    </Route>
  )
}

const RqtvPageConsumer = props => {
  const rqtvPageContext=useContext(RqtvPageContext)
  const {conditionRes, triggerState}=rqtvPageContext&&rqtvPageContext
  const {fallbackPage}=props

  if(conditionRes===false && fallbackPage!=="" && triggerState.done===true){
    return <Redirect to={fallbackPage} />
  }
  return  props.children
}

RqtvPage.propTypes = {
  path:PropTypes.string.isRequired,
  id:PropTypes.number.isRequired,
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
