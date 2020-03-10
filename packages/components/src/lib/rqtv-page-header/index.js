//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {RqtvPageContext} from '../contexts/rqtv-page-context'
import { Navbar, NavbarNav as RqtvNavbarNav, NavbarCollapse as RqtvNavbarCollapse, NavbarToggle as RqtvNavbarToggle } from '@reaqtive/layout'


const RqtvPageHeader = props => {
  const rqtvPage=useContext(RqtvPageContext)
  const {qTitle} = rqtvPage
  const title = props.title||(qTitle!==''&&qTitle)&&qTitle
  return(
    <Navbar className={`rqtv-page-header page-header ${props.className}`}>
      <div className={`navbar-brand`}>
        <h3>{title}</h3>
      </div>
      {props.children}
    </Navbar>
  )
}

RqtvPageHeader.propTypes={
  className:PropTypes.string,
  title:PropTypes.string
}

RqtvPageHeader.defaultProps={
  className:'',
}

export {RqtvPageHeader, RqtvNavbarNav, RqtvNavbarCollapse, RqtvNavbarToggle}
