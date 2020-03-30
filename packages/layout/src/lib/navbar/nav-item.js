import React from 'react'
import PropTypes from 'prop-types'

const NavItem = (props) => {
  return(
    <li className={`nav-item ${props.className}`} style={props.style}>
      {props.children}
    </li>
  )
}

NavItem.propTypes={
  className:PropTypes.string,
  style:PropTypes.object
}

NavItem.defaultProps={
  className:'',
  style:{}
}

export default NavItem
