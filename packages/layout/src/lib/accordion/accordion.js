//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useState } from 'react'

const Accordion = props =>{

  const [expandedItem, setExpandedItem] = useState();
  const onChange = itemToExpand => (event, isExpanded) => {
    if(isExpanded){
      setExpandedItem(itemToExpand)
    } else{
      setExpandedItem(false)
    }
  }

  return(
    <div className={`accordion ${props.className}`} style={{...props.style}}>
      <ul className="accordion-list list-group">
        {props.children.map((child, index)=>{
          const id =`${props.id}${index}`
          return <li key={id} className="list-group-item">{React.cloneElement(child, {id, onChange:onChange(id), isExpanded:expandedItem===id})}</li>
        })}
      </ul>
    </div>
  )
}

export default Accordion
