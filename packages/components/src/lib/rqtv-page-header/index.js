//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext} from 'react'
import {RqtvPageContext} from '../contexts/rqtv-page-context'
import { Navbar, NavbarNav } from '@reaqtive/layout'


const RqtvPageHeader = props => {
  const rqtvPage=useContext(RqtvPageContext)
  const {pageData, qTitle} = rqtvPage
  const title = props.title||(qTitle!==''&&qTitle)&&qTitle||pageData.title
  return(
    <Navbar className={`page-header`}>
      <div className={`navbar-brand`}>
        <h3>{title}</h3>
      </div>
      {props.children}
    </Navbar>
  )
}

export {RqtvPageHeader}
