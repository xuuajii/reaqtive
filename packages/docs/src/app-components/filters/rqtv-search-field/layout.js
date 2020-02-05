import React, {useState, useRef, useEffect, useCallback} from 'react'
import {useOutsideEventListener} from '@reaqtive/layout'
import DropdownToolbar from '../rqtv-dropdown/dropdown-toolbar'
import DropdownMenuBody from '../rqtv-dropdown/dropdown-menu-body.js'
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
    const {isSearching} = rqtvListObject
    const { isSelecting, beginSelections, endSelections} = props.qSelectionHandler
    const {setOnUpdate, applyQLayoutPatch} = props.qLayoutHandler
    const dropdownMenuEl=useRef();

    useOutsideEventListener(dropdownMenuEl, ()=>endSelectionsAndHide(0), props.show)

    const endSelectionsAndHide = (qAccept) => {
      endSelections(qAccept, ()=>props.setShow(false))
    }

    useEffect(()=>{
      const qDisplayArea = qArea
      setOnUpdate({fn:()=>rqtvListObject.getDataPage(qDisplayArea)})
    },[qArea])

   const [listHeight, setListHeight] = useState('100%')
   const abort = () => {
     props.setShow(false)
     rqtvListObject.abortListObjectSearch()
   }

   const accept = () => {
     props.setShow(false)
     rqtvListObject.acceptListObjectSearch()
   }
   //console.log(props.show, isSearching)

   useEffect(()=>{
     if(props.show!==true && isSearching===true){
       setTimeout(()=>props.setShow(true),200)
     }
   },[isSearching])

   return(
      <div ref={dropdownMenuEl} className="rqtv-search-field">
        <DropdownToolbar
          searchListObjectFor={rqtvListObject.searchListObjectFor}
          abortListObjectSearch={abort}
          acceptListObjectSearch={accept}
          endSelections={endSelectionsAndHide}
          isSelecting={isSelecting}
          quickSelectionMode={props.quickSelectionMode}
          showSearch={true}
        />
        <DropdownMenu show={props.show} style={{height:dropdownMenuHeight, overflowY:'auto', width:dropdownMenuWidth}}>
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
      </div>
    )
}

export default Layout
