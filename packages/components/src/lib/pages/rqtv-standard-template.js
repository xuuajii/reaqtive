//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import {RqtvPageContext} from '../contexts/rqtv-page-context'
import {
  RqtvNavbar,
  RqtvSideMenu,
  RqtvSideMenuMain,
  RqtvRenderer,
  RqtvPageHeader
} from '../index'

const RqtvStandardTemplate = props => {
  const [showSideMenu, setShowSideMenu] = useState(false)
  const toggleSideMenu = () => setShowSideMenu(!showSideMenu)
  const rqtvPage = useContext(RqtvPageContext)
  const rendererProps = {
    loading:rqtvPage&&rqtvPage.triggerState.qLoading,
    error:(!(rqtvPage&&rqtvPage.triggerState.qLoading)&&(rqtvPage&&rqtvPage.triggerState.qError)),
  }
  return(
    <>
      <RqtvNavbar
        sideMenuActive={showSideMenu}
        onToggleMenu={toggleSideMenu}
        closeSideMenu={()=>setShowSideMenu(false)}
        searchFieldsMatch = {props.searchFieldsMatch}
      />
      <RqtvSideMenu
        isOpen={showSideMenu}
        onClose={()=>setShowSideMenu(false)}
        useFieldList={true}
        usePageList={true}
        sideMenuFieldsMatch = {props.sideMenuFieldsMatch}
      />
      <RqtvSideMenuMain isOpen={showSideMenu}>
        <div
          className={`${props.useContainerFluid?'container-fluid':'container'} ${props.containerClassName?props.containerClassName:''}`}
          style={{...props.containerStyle}}
        >
          <RqtvRenderer {...rendererProps} isFixed={true}>
            {props.usePageHeader&&<RqtvPageHeader/>}
            {props.children}
          </RqtvRenderer>
        </div>
      </RqtvSideMenuMain>
    </>
  )
}

RqtvStandardTemplate.propTypes = {
  useContainerFluid:PropTypes.bool,
  usePageHeader:PropTypes.bool,
  containerStyle:PropTypes.object,
  containerClassName:PropTypes.string
}
RqtvStandardTemplate.defaultProps = {
  useContainerFluid:true,
  usePageHeader:true
}

export default RqtvStandardTemplate
