//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'
import {useSpring, animated} from 'react-spring'
import {LuiIcon} from '../index'

const defaultStyle = {
  border:0,
  outline:'none'
}


const NavbarToggle = props =>{

  const animatedProps = useSpring({transform: props.showCollapse ? `rotate(180deg)`: `rotate(0deg)`})

  return (
  <button className="navbar-toggler" type="button" onClick={props.toggleCollapse} style={{...defaultStyle, ...props.style}}>
    {props.children
      ?props.children
      :props.bootstrapDefault
        ?<span class="navbar-toggler-icon"></span>
        :<animated.div style={animatedProps}><LuiIcon iconType={`triangle-bottom`}/></animated.div>
    }
  </button>
  )
}

NavbarToggle.propTypes = {
  className:PropTypes.string,
  style:PropTypes.object,
}

NavbarToggle.defaultProps = {

}

export default NavbarToggle
