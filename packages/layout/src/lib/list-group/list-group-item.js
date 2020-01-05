//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'

const ListGroupItem = props => {
  return(
    <li className={`list-group-item ${props.className}`} style={{...props.style}} onClick={(e)=>props.onClick(e)}>
      {props.children}
    </li>
  )
}

export default ListGroupItem
