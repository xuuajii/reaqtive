//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext} from 'react'
import PropTypes from 'prop-types'

const NavbarNav = props => {
  //const flexDirection = props.neverCollapse?'row':'column'
  const {verticalNavbar} = props
  const neverCollapseHandler = props.neverCollapse?'d-flex flex-row ':''
  return (
    <ul className={`navbar-nav ${neverCollapseHandler} ${props.className}`} style={{flexGrow:1, ...props.style}} >
      {props.children}
    </ul>
  )
}

NavbarNav.propTypes={
  className:PropTypes.string,
  neverCollapse:PropTypes.bool,
}
NavbarNav.defaultProps={
  className:"justify-content-end",
  neverCollapse:false,
}

export default NavbarNav
