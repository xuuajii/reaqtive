import React from 'react'

const ListGroup = props => {
  return(
    <ul className={`list-group ${props.className}`} style={{...props.style}}>
      {props.children}
    </ul>
  )
}

export default ListGroup
