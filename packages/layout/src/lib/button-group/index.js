import React from 'react'

const ButtonGroup = props =>
<div className={`btn-group ${props.className}`} style={props.style}>
  {props.children}
</div>

export { ButtonGroup }
