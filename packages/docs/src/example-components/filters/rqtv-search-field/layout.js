import React, {useEffect, useRef} from 'react'
import {useOutsideEventListener} from '@reaqtive/layout'
import Search from '../shared/search'
import {useListObjectRendererMap} from '../helpers/index'
import DropdownMenuBody from '../rqtv-dropdown/dropdown-menu-body'
import {Dropdown, DropdownMenu} from '@reaqtive/layout'

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

  const onSearch = (e) => {
    rqtvListObject.searchListObjectFor(e)
  }
  return(
    rqtvListObject&&
    <div className={`dropdown ${rqtvListObject.isSearching ? 'show' : ''} rqtv-search-field`}>
      <Search
        searchAction={onSearch}
        clearSearchAction={rqtvListObject.abortListObjectSearch}
        acceptSearchAction={rqtvListObject.acceptListObjectSearch}
        isSearching={rqtvListObject.isSearching}
        focus={false}
      />
      <DropdownMenu show={rqtvListObject.isSearching}>
        {rqtvListObject.isSearching&&qDataPages
          ?<DropdownMenuBody
              qDataPages={qDataPages}
              qSize={qSize}
              selectValue={onSearch}
              getDataPage={rqtvListObject.getDataPage}
              height={dropdownMenuHeight}
              width={dropdownMenuWidth}
              hideHorizontalScrollbar={hideHorizontalScrollbar}
            />
          :<></>
        }
      </DropdownMenu>
    </div>
  )
}

export default Layout
