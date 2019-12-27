//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import {Dropdown, DropdownButton, DropdownMenu, DropdonMenuItem} from '@reaqtive/layout'

const RqtvVizContainerHeader = React.forwardRef((props, ref) => {
  //console.log(props.items)
  return (
    <div className="viz-container-header" ref={ref} >
      { props.items.length===1
        ?<h3 className={'viz-container-title'}>{props.title}</h3>
        :<Dropdown className="chart-list">
          <DropdownButton label={props.title} className="viz-container-dropdown-button"/>
          <DropdownMenu>
            {props.items.map(item=><DropdonMenuItem key={item.id} action={()=>props.setActiveItem(item)} label={item.title}/>)}
          </DropdownMenu>
        </Dropdown>
      }
      <div>{props.children}</div>
    </div>
  )
})

export default RqtvVizContainerHeader
