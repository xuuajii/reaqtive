//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'

const NavbarNav = props => {
  const flexDirection = props.neverCollapse?'row':'column'
  return (
    <ul className={`navbar-nav ${props.className?props.className:''}`} style={{flexDirection:flexDirection, ...props.style}}>
      {props.children}
    </ul>
  )
}

NavbarNav.propTypes={
  neverCollapse:PropTypes.bool,
  className:PropTypes.string,
}
NavbarNav.defaultProps={
  neverCollapse:false,
  className:''
}

export default NavbarNav
