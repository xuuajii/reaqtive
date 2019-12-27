//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import {RqtvPageProvider} from '../contexts/rqtv-page-context'

const RqtvPage = props => {
  const pageData={path:props.path, title:props.title, id:props.id}

  return(
    <Route path={props.path} exact={props.exact}>
      <RqtvPageProvider triggers={props.triggers} pageData={pageData}>
        {props.children}
      </RqtvPageProvider>
    </Route>
  )
}

RqtvPage.propTypes = {
  path:PropTypes.string.isRequired,
  id:PropTypes.number.isRequired,
  title:PropTypes.string.isRequired,
  triggers:PropTypes.array.isRequired
}

RqtvPage.defaultProps = {
  triggers:[]
}

export default RqtvPage
