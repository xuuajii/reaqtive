//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom";

const Breadcrumb = (props) =>{
  const location = useLocation()
  return(
    <nav className="rqtv-breadcrumb">
      <ol className="breadcrumb">
        {
          props.children
        }
      </ol>
    </nav>
  )
}

const BreadcrumbItem = (props) =>
<li className={`breadcrumb-item ${props.isActive?'active':''}`} onClick={props.action}>
  {props.label}
</li>

export {Breadcrumb, BreadcrumbItem}
