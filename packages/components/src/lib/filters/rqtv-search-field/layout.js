import React, {useState, useRef, useEffect, useCallback} from 'react'
import {useOutsideEventListener} from '@reaqtive/layout'
import DropdownToolbar from '../rqtv-dropdown/dropdown-toolbar'
import DropdownMenuBody from '../rqtv-dropdown/dropdown-menu-body.js'
import Search from '../shared/search'
import {RqtvRenderer} from '../../loading/index'
import {useListObjectRendererMap} from '../helpers/index'
import useRqtvListObject from '../use-rqtv-list-object'
import {DropdownMenu} from '@reaqtive/layout'

const Layout = props => {
    const{dropdownMenuHeight, dropdownMenuWidth, hideHorizontalScrollbar, dropdownMenuItemStyle, placeholder }=props
    const qLayout = props.qLayoutHandler&&props.qLayoutHandler.qLayout
    const qDataPages = qLayout&&qLayout.qListObject.qDataPages
    const qSize = qLayout&&qLayout.qListObject.qSize
    const qArea = qDataPages&&qDataPages.length>0&&qDataPages[0].qArea
    const rendererProps = useListObjectRendererMap(props.qLayoutHandler, props.qObjectHandler)

    const {rqtvListObject} = props
    const {isSearching} = rqtvListObject
    const { isSelecting, beginSelections, endSelections} = props.qSelectionHandler
    const {setLayoutUpdater, applyQLayoutPatch} = props.qLayoutHandler
    const dropdownMenuEl=useRef();

    useOutsideEventListener(dropdownMenuEl, ()=>endSelectionsAndHide(props.clickAwayAccept), props.show)

    const layoutUpdater = useCallback(()=>{
      qArea&&rqtvListObject.getDataPage(qArea)
    },[qArea])

    useEffect(()=>{
      setLayoutUpdater(()=>layoutUpdater)
    },[layoutUpdater])

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

   const endSelectionsAndHide = (qAccept) => {
     endSelections(qAccept, ()=>props.setShow(false))
     abort()
   }
   return(
      <div ref={dropdownMenuEl} className="rqtv-search-field">
        <div className="rqtv-search-field-header">
          <DropdownToolbar
            searchListObjectFor={rqtvListObject.searchListObjectFor}
            abortListObjectSearch={abort}
            acceptListObjectSearch={accept}
            endSelections={endSelectionsAndHide}
            isSelecting={isSelecting}
            quickSelectionMode={props.quickSelectionMode}
            showSearch={true}
            placeholder={placeholder}
          />
          </div>
          <DropdownMenu show={props.show} style={{minHeight:120, maxHeight:dropdownMenuHeight, overflowY:'auto', width:'100%'}}>
            <RqtvRenderer {...rendererProps}>
              {qDataPages&&
                <DropdownMenuBody
                    qDataPages={qDataPages}
                    qSize={qSize}
                    selectValue={rqtvListObject.selectValue}
                    getDataPage={rqtvListObject.getDataPage}
                    height={listHeight}
                    width={dropdownMenuWidth}
                    hideHorizontalScrollbar={hideHorizontalScrollbar}
                    hideHorizontalScrollbar={hideHorizontalScrollbar}
                    dropdownMenuItemStyle={dropdownMenuItemStyle}
                />
              }
            </RqtvRenderer>
          </DropdownMenu>
      </div>
    )
}

export default Layout
