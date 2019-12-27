//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import EndSelectionsButtons from '../shared/end-selections-buttons'
import HeaderButtonbar from '../shared/header-buttonbar'
import ListboxMenu from './listbox-menu'

const Header = props =>{
  const titleCursor = props.titleAction?'pointer':'auto'
  const onClick = () =>{
    (typeof props.titleAction === 'function')&&props.titleAction();
  }
  return(
    <div className="rqtv-listbox-header" style={{...props.headerStyle}} ref={props.headerEl}>
      <h4 className="rqtv-listbox-title" onClick={onClick} style={{cursor:titleCursor,...props.titleStyle}}>{props.title}</h4>
      <HeaderToolbar {...props}/>
    </div>
  )
}
export default Header
const HeaderToolbar = props =>
<div className="rqtv-listbox-toolbar">
  {(props.showHeaderButtonbar===true)&&
    <HeaderButtonbar
      clearSelections={props.clearSelections}
      selectExcluded={props.selectExcluded}
      selectPossible={props.selectPossible}
    />
  }
  <EndSelectionsButtons endSelections={props.endSelections} isSelecting={props.isSelecting}/>
  {(!(props.showHeaderButtonbar===true) && props.showListboxDropdownMenu)&&
    <ListboxMenu
      clearSelections={props.clearSelections}
      selectExcluded={props.selectExcluded}
      selectPossible={props.selectPossible}
      setShowSearch={()=>props.setShowSearch(true)}
      hideCaret={true}
    />
  }
</div>
