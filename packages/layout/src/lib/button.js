//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'

const Button = props => {
  const className = `btn ${props.className?props.className:'btn-default'} ${props.ripple?'ripple':''}`
  //const [className, setClassName] = useState(classNameInitial)

  const events = {
    onClick:props.onClick
  }

  return(
    <button className={className} style={{...props.style}} {...events}>
      {props.children}
    </button>
  )
}
//{props.animated?<animated.span style={animatedProps}/>:null}

export default Button
