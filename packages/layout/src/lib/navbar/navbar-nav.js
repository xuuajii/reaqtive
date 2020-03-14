//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext} from 'react'
import PropTypes from 'prop-types'

const NavbarNav = props => {
  //const flexDirection = props.neverCollapse?'row':'column'
  const {verticalNavbar} = props
  return (
    <ul className={`nav navbar-nav ${props.className}`} style={{flexGrow:1, ...props.style}} >
      {React.Children.toArray(props.children).map(child=>React.cloneElement(child, {isNavItem:true, verticalNavbar}))}
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
