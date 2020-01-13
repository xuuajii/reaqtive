import React, {useState, useRef, useEffect, useCallback} from 'react'
import {useOutsideEventListener} from '@reaqtive/layout'
import DropdownToolbar from './dropdown-toolbar'
import DropdownMenuHeader from './dropdown-menu-header.js'
import DropdownMenuBody from './dropdown-menu-body.js'
import Search from '../shared/search'
import {useListObjectRendererMap} from '../helpers/index'
import useRqtvListObject from '../use-rqtv-list-object'
import {DropdownMenu} from '@reaqtive/layout'

const Layout = props => {
  const{dropdownMenuHeight, dropdownMenuWidth, hideHorizontalScrollbar}=props
  const qLayout = props.qLayoutHandler&&props.qLayoutHandler.qLayout
  const qDataPages = qLayout&&qLayout.qListObject.qDataPages
  const qSize = qLayout&&qLayout.qListObject.qSize
  const qArea = qLayout&&qLayout.qListObject.qDataPages[0].qArea
  const rendererProps = useListObjectRendererMap(props.qLayoutHandler, props.qObjectHandler)

  const {rqtvListObject} = props
  const { isSelecting, beginSelections, endSelections} = props.qSelectionHandler
  const {setOnUpdate, applyQLayoutPatch} = props.qLayoutHandler
  const dropdownMenuEl=useRef();

  useOutsideEventListener(dropdownMenuEl, ()=>endSelectionsAndHide(0), props.show)

  const endSelectionsAndHide = (qAccept) => {
    endSelections(qAccept, props.hideDropdownMenu)
  }

  useEffect(()=>{
    const qDisplayArea = qArea
    setOnUpdate({fn:()=>rqtvListObject.getDataPage(qDisplayArea)})
  },[qArea])

  const showToolbar = props.quickSelectionMode===false||props.showSearch

  const toolbarRef = useCallback(toolbarEl => {
   if (toolbarEl !== null) {
     const toolbarHeight=toolbarEl.getBoundingClientRect().height;
     const restHeight=(1-((toolbarHeight)/dropdownMenuHeight))*dropdownMenuHeight
     //console.log(restHeight)
     setListHeight(restHeight-16)
   }
 }, [isSelecting]);

 const [listHeight, setListHeight] = useState('100%')

  return(
    <DropdownMenu show={props.show} ref={dropdownMenuEl} style={{height:dropdownMenuHeight, overflowY:'hidden', width:dropdownMenuWidth}}>
    {showToolbar&&
      <DropdownToolbar
        searchListObjectFor={rqtvListObject.searchListObjectFor}
        abortListObjectSearch={rqtvListObject.abortListObjectSearch}
        acceptListObjectSearch={rqtvListObject.acceptListObjectSearch}
        endSelections={endSelectionsAndHide}
        isSelecting={isSelecting}
        quickSelectionMode={props.quickSelectionMode}
        showSearch={props.showSearch}
        toolbarRef={toolbarRef}
      />
    }
      {props.qLayoutHandler.qLoading===false&&props.qLayoutHandler.qError===false&&qSize.qcy>0&&
        <DropdownMenuBody
            qDataPages={qDataPages}
            qSize={qSize}
            selectValue={rqtvListObject.selectValue}
            getDataPage={rqtvListObject.getDataPage}
            height={listHeight}
            width={dropdownMenuWidth}
            hideHorizontalScrollbar={hideHorizontalScrollbar}
        />
      }
    </DropdownMenu>
  )
}

export default Layout
