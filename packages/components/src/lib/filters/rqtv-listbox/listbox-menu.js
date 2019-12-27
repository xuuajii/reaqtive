//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import {Dropdown, DropdownButton, DropdownMenu, DropdonMenuItem} from '@reaqtive/layout'
import {LuiIcon} from '@reaqtive/layout'


const ListboxMenu = props => {
  const items = [
      {id:1, label:'search', action:props.setShowSearch},
      {id:2, label:'clear selections', action:props.clearSelections},
      {id:3, label:'select possible', action:props.selectPossible},
      {id:4, label:'select excluded', action:props.selectExcluded}
  ]
  return(
    <Dropdown>
      <DropdownButton hideCaret={true} label={<LuiIcon iconType="more"/>}/>
      <DropdownMenu align="right">
        {items.map(item=><DropdonMenuItem key={item.id} action={()=>item.action()} label={item.label}/>)}
      </DropdownMenu>
    </Dropdown>
  )
}

export default ListboxMenu
