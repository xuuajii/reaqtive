//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React,{useState, useEffect, useRef, forwardRef} from 'react'
import {useOutsideEventListener} from '@reaqtive/layout'
import Header from './header'
import Body from './body'
import Search from '../shared/search'
import {RqtvRenderer} from '../../loading/index'
import {useListObjectRendererMap} from '../helpers/index'

const Layout = forwardRef((props, ref) => {

  const {rqtvListObject}=props
  const rendererProps = useListObjectRendererMap(props.qLayoutHandler, props.qObjectHandler)

  const qLayout = props.qLayoutHandler.qLayout;
  //console.log(qLayout)
  const [showSearch, setShowSearch] = useState(false);
  const listboxEl = useRef();
  const bodyEl = useRef();
  const headerEl = useRef()
  const searchEl = useRef()
  const headerHeight=headerEl.current&&headerEl.current.offsetHeight
  const [searchHeight, seSearchHeight] = useState(searchEl.current&&searchEl.current.offsetHeight)
  useEffect(()=>{
    seSearchHeight(searchEl.current&&searchEl.current.offsetHeight)
  },[showSearch,props.alwaysShowSearch])
  const bodyHeight= props.height-((headerHeight+searchHeight)||0)

  const clickAway = useOutsideEventListener(listboxEl, ()=>endSelections('1'), rqtvListObject.isSelecting)
  const endSelections = (qAccept) => {
    const callback = qAccept==='1'?()=>bodyEl.current.scrollTop=0:()=>true;
    rqtvListObject.endSelections(qAccept, callback)
  }

  const title = qLayout?!(rqtvListObject.isSelecting)?qLayout.label:qLayout.qListObject.qDimensionInfo.qFallbackTitle:'';
  return(
    <div className="rqtv-listbox" ref={listboxEl} style={{minHeight:props.height, height:props.height, maxHeight:props.height}}>
      {props.showHeader&&
        <Header
          title = {title}
          endSelections={endSelections}
          clearSelections={rqtvListObject.clearSelections}
          selectExcluded={rqtvListObject.selectExcluded}
          selectPossible={rqtvListObject.selectPossible}
          isSelecting={rqtvListObject.isSelecting}
          setShowSearch={setShowSearch}
          showHeaderButtonbar={props.showHeaderButtonbar}
          showListboxDropdownMenu={props.showListboxDropdownMenu}
          titleAction={props.titleAction}
          headerStyle={props.headerStyle}
          titleStyle={props.titleStyle}
          headerEl={headerEl}
        />
      }
        <div ref={searchEl}>
        {(showSearch||props.alwaysShowSearch)&&
          <Search
            searchAction={rqtvListObject.searchListObjectFor}
            clearSearchAction={rqtvListObject.abortListObjectSearch}
            acceptSearchAction={rqtvListObject.acceptListObjectSearch}
            hideSearch={()=>{setShowSearch(false)}}
            alwaysShowSearch={props.alwaysShowSearch}
            focus={props.focus}
          />
        }
        </div>
      <RqtvRenderer {...rendererProps}>
      <Body
        data={qLayout&&qLayout.qListObject.qDataPages[0]}
        size={qLayout&&qLayout.qListObject.qSize}
        qObject={props.qObject}
        //updateLayout={updateLayout}
        //setQLayoutPatcher={props.setQLayoutPatcher}
        rqtvListObject={props.rqtvListObject}
        bodyEl={bodyEl}
        height={bodyHeight}
        listItemHeight={props.listItemHeight}
        bodyStyle={props.bodyStyle}
        itemStyle={props.itemStyle}
       />
    </RqtvRenderer>
  </div>
  )
})

export default Layout
