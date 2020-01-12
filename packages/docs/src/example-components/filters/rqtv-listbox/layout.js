//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React, {useState, useEffect, useRef} from 'react'
import {useOutsideEventListener} from '@reaqtive/layout'
import Header from './header'
import Body from './body'
import Search from '../shared/search'
import {useListObjectRendererMap} from '../helpers/index'
import useRqtvListObject from '../use-rqtv-list-object'

const Layout = props => {
  const qLayout = props.qLayoutHandler&&props.qLayoutHandler.qLayout
  const qDataPages = qLayout&&qLayout.qListObject.qDataPages
  const qSize = qLayout&&qLayout.qListObject.qSize
  const qArea = qLayout&&qLayout.qListObject.qDataPages[0].qArea
  const rendererProps = useListObjectRendererMap(props.qLayoutHandler, props.qObjectHandler)
  const {rqtvListObject} = props//useRqtvListObject(props.qObjectHandler, props.qSelectionHandler, props.qLayoutHandler, props.quickSelectionMode)

  const { isSelecting, beginSelections, endSelections} = props.qSelectionHandler
  const {setOnUpdate, applyQLayoutPatch} = props.qLayoutHandler
  const [showSearch, setShowSearch] = useState();
  const listboxEl=useRef();
  const headerEl=useRef();
  const headerHeight = headerEl.current&&headerEl.current.getBoundingClientRect().height
  const searchEl=useRef();
  const [searchHeight, seSearchHeight] = useState(searchEl.current&&searchEl.current.offsetHeight)
  useEffect(()=>{
    seSearchHeight(searchEl.current&&searchEl.current.getBoundingClientRect().height)
  },[showSearch,props.alwaysShowSearch])
  const bodyHeight= props.height-((headerHeight+searchHeight)||0)

  useOutsideEventListener(listboxEl, ()=>endSelections(0), isSelecting)

  useEffect(()=>{
    const qDisplayArea = qArea
    setOnUpdate({fn:()=>rqtvListObject.getDataPage(qDisplayArea)})
  },[qArea])

  return(
    <>
      <div ref={listboxEl} className="rqtv-listbox" style={{maxHeight:props.height, height:props.height, minHeight:props.height, overflowY:'auto'}}>
        <Header
          title = {'Customer'}
          endSelections={endSelections}
          clearSelections={rqtvListObject.clearSelections}
          selectExcluded={rqtvListObject.selectExcluded}
          selectPossible={rqtvListObject.selectPossible}
          isSelecting={isSelecting}
          setShowSearch={setShowSearch}
          showHeaderButtonbar={props.showHeaderButtonbar}
          showListboxDropdownMenu={props.showListboxDropdownMenu}
          titleAction={props.titleAction}
          headerStyle={props.headerStyle}
          titleStyle={props.titleStyle}
          headerEl={headerEl}
        />
        <div>
        <div ref={searchEl} style={{overflowY:'auto'}}>
          {(showSearch||props.alwaysShowSearch)&&
            <Search
              searchAction={rqtvListObject.searchListObjectFor}
              clearSearchAction={rqtvListObject.abortListObjectSearch}
              acceptSearchAction={rqtvListObject.acceptListObjectSearch}
              hideSearch={()=>{setShowSearch(false)}}
              alwaysShowSearch={props.alwaysShowSearch}
              focus={props.alwaysShowSearch?false:props.focus}
            />
          }
        </div>
        {props.qLayoutHandler.qLoading===false&&props.qLayoutHandler.qError===false&&qSize.qcy>0&&
          <Body
            qDataPages={qDataPages}
            qSize={qSize}
            selectValue={rqtvListObject.selectValue}
            getDataPage={rqtvListObject.getDataPage}
            height={bodyHeight}
          />
        }
        </div>
      </div>
    </>
  )
}

export default Layout
