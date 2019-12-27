//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useRef } from 'react'
import Body from './body'
import {RqtvRenderer} from '../../loading/index'
import {useListObjectRendererMap} from '../helpers/index'
import {useOutsideEventListener} from '@reaqtive/layout'

const Layout = props =>{
  const {rqtvListObject}=props
  const qLayout = props.qLayoutHandler.qLayout;
  const dropdownMenuEl = useRef();
  const dropdownMenuStyle = !(qLayout)?{minHeight:props.dropdownMenuHeight}:{...props.dropdownMenuStyle}
  // console.log(props.qLayouthandler)
  const rendererProps = useListObjectRendererMap(props.qLayoutHandler, props.qObjectHandler)
  //const noData= qLayout&&qLayout.qListObject.qDataPages[0].qMatrix.length===0;

  //const endSelections = () =>
  const clickAwayCallback = (rqtvListObject.isSelecting===false)?()=>props.hideDropdownMenu():()=>props.hideDropdownMenu()//props.rqtvListObject.endSelections(false)
  useOutsideEventListener(dropdownMenuEl, clickAwayCallback, props.show)

  return(
    <div className={`dropdown-menu ${props.show?'show':''}`} ref={dropdownMenuEl} style={{dropdownMenuStyle}}>
    <RqtvRenderer
      {...rendererProps}
    >
      {qLayout&&<Body
          show={props.show}
          data={qLayout.qListObject.qDataPages[0]}
          qUpdating={props.qLayoutHandler&&props.qLayoutHandler.qUpdating}
          size={qLayout.qListObject.qSize}
          qObjectHandler={props.qObjectHandler}
          rqtvListObject={props.rqtvListObject}
          dropdownMenuEl={dropdownMenuEl}
          hideDropdownMenu={props.hideDropdownMenu}
          showSearch={props.showSearch}
          quickSelectMode={props.quickSelectMode}
          dropdownMenuHeight={props.dropdownMenuHeight}
          dropdownMenuItemHeight={props.dropdownMenuItemHeight}
          dropdownMenuItemStyle={props.dropdownMenuItemStyle}
        />}
      </RqtvRenderer>
    </div>
  )
}

export default Layout
