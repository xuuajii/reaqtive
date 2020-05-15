import React from 'react'
import {Dropdown, DropdownButton, DropdownMenu, DropdownMenuItem} from '@reaqtive/layout'

const RqtvVizContainerHeader = React.forwardRef((props, ref) => {
  //console.log(props.items)
  return (
    <div className="viz-container-header" ref={ref} >
      { props.items.length===1
        ?<h3 className={'viz-container-title'}>{props.title}</h3>
        :<Dropdown className="chart-list">
          <DropdownButton label={props.title} className="viz-container-dropdown-button"/>
          <DropdownMenu>
            {props.items.map(item=><DropdownMenuItem key={item.id} action={()=>props.setActiveItem(item)} label={item.title}/>)}
          </DropdownMenu>
        </Dropdown>
      }
      <div>{props.children}</div>
    </div>
  )
})

export default RqtvVizContainerHeader
