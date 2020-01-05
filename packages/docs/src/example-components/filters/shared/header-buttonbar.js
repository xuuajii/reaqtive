//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import {Icon, swap, deleteForever } from '@reaqtive/layout'

const HeaderButtonbar = props =>
<div className={"header-toolbar"}>
  <div className="btn-group" role="group">
    <button className="btn" onClick={()=>props.clearSelections()} >
      <Icon type={deleteForever}/>
    </button>
    <button className="btn" onClick={()=>props.selectExcluded()} >
      <Icon type={swap}/>
    </button>
  </div>
</div>

export default HeaderButtonbar
