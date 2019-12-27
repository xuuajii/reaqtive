//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React,{useRef} from 'react'
import PropTypes from 'prop-types'
import {useOutsideEventListener} from '@reaqtive/layout'
import Body from '../rqtv-dropdown/body'
import Search from '../shared/search'
import EndSelectionButtons from '../shared/end-selections-buttons'
import {RqtvRenderer} from '../../loading/index'
import {useListObjectRendererMap} from '../helpers/index'


const Layout = props => {
  const {rqtvListObject}=props
  const qLayout = props.qLayoutHandler.qLayout;
  const searchFieldEl = useRef();
  const bodyEl = useRef();
  const clickAway = useOutsideEventListener(searchFieldEl, ()=>endSelections('0'), rqtvListObject.isSelecting)
  const clickAwayAbort = useOutsideEventListener(searchFieldEl, rqtvListObject.abortListObjectSearch, rqtvListObject.isSearching)

  const onSearch = (e) => {
    rqtvListObject.searchListObjectFor(e)
  }

  const endSelections = (qAccept) => {
    rqtvListObject.endSelections(qAccept)
    rqtvListObject.setIsSearching(false)
  }

  const rendererProps = useListObjectRendererMap(props.qLayoutHandler, props.qObjectHandler)

  return(
    <div className="dropdown rqtv-search-field" ref={searchFieldEl} style={{width:'100%'}}>

        <RqtvRenderer loading={props.qLayoutHandler.qLoading} error={props.qLayoutHandler.qError} >
          <div className="rqtv-search-field-header" style={{width:'100%'}}>
            <Search
              searchAction={onSearch}
              clearSearchAction={rqtvListObject.abortListObjectSearch}
              acceptSearchAction={rqtvListObject.acceptListObjectSearch}
              hideSearch={rqtvListObject.abortListObjectSearch}
              alwaysShowSearch={props.alwaysShowSearch}
              focus={false}
              isSearching={rqtvListObject.isSearching}
            />
            {rqtvListObject.isSelecting&&
              <EndSelectionButtons
                endSelections={endSelections}
                isSelecting={rqtvListObject.isSelecting}
              />
            }
          </div>
          {rqtvListObject.isSearching&&
            <div className="dropdown-menu show" style={{width:'100%'}}>
            <RqtvRenderer {...rendererProps}>
              <Body
                data={qLayout.qListObject.qDataPages[0]}
                size={qLayout.qListObject.qSize}
                qObject={props.qObject}
                width={'100%'}
                //updateLayout={updateLayout}
                //setQLayoutPatcher={props.setQLayoutPatcher}
                rqtvListObject={props.rqtvListObject}
                bodyEl={bodyEl}
                dropdownMenuHeight={props.height}
                showToolbar={false}
                dropdownMenuItemHeight={props.listItemHeight}
                bodyStyle={props.bodyStyle}
                itemStyle={props.itemStyle}
               />
               </RqtvRenderer>
             </div>
           }
         </RqtvRenderer>
    </div>
  )
}

export default Layout
