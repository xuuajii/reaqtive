//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import {RqtvAppContext, RqtvPageContext} from '../contexts/index'
import {
  RqtvNavbar,
  RqtvSideMenu,
  RqtvSideMenuMain,
  RqtvRenderer,
  RqtvPageHeader
} from '../index'

/**
 * RqtvStandardTemplate
 *
 * It is a component that allows you to use Reaqtive main components without having to declare them one by one.
 * Of course does not allow the same flexibility as recreating a template manually.
 * It includes the RqtvSideMenu, the RqtvNavbar and the RqtvPageHeader
 *
 */

const RqtvStandardTemplate = props => {
  const rqtvApp = useContext(RqtvAppContext)
  const rqtvPage = useContext(RqtvPageContext)
  const [innerShowSideMenu, setInnerShowSideMenu] = useState()
  const {showSideMenu, setShowSideMenu} = rqtvApp||{showSideMenu:innerShowSideMenu, setShowSideMenu:setInnerShowSideMenu}
  const toggleSideMenu = () => setShowSideMenu(!showSideMenu)

  const {triggerState, qCondition } = rqtvPage||{}
  const rendererProps = rqtvPage&&{
    loading:triggerState.qLoading,//||qCondition===null||qCondition===undefined,
    error:(!(rqtvPage&&rqtvPage.triggerState.qLoading)&&(rqtvPage&&rqtvPage.triggerState.qError)),
  }||{
    loading:false,
    error:false
  }
  return(
    <>
      <RqtvNavbar
        sideMenuActive={showSideMenu}
        onToggleMenu={toggleSideMenu}
        closeSideMenu={()=>setShowSideMenu(false)}
        searchFieldsMatch = {props.searchFieldsMatch}
        showSearch={props.showSearch}
        showSideMenuToggle = {props.useSideMenu}
      />
      <RqtvSideMenu
        isOpen={showSideMenu&&props.useSideMenu}
        onClose={()=>setShowSideMenu(false)}
        useFieldList={true}
        usePageList={true}
        useTabs={true}
        sideMenuFieldsMatch = {props.sideMenuFieldsMatch}
        additionalTabs={props.sideMenuAdditionalTabs}
      />
      <RqtvSideMenuMain isOpen={showSideMenu}>
      <div
          className={`${props.useContainerFluid?'container-fluid':'container'} ${props.containerClassName?props.containerClassName:''}`}
          style={{...props.containerStyle}}
        >
          <RqtvRenderer {...rendererProps} isFixed={true}>
            {props.usePageHeader&&rqtvPage&&<RqtvPageHeader/>}
            {props.children}
          </RqtvRenderer>
        </div>
      </RqtvSideMenuMain>
    </>
  )
}

RqtvStandardTemplate.propTypes = {
  /**
   * it lets you choose between a bootstrap container or container-fluid to wrap the page
   *
   */
  useContainerFluid:PropTypes.bool,
  /**
   * show/hide the page header that would contain only the title of the page and can't be customized
   *
   */
  usePageHeader:PropTypes.bool,
  /**
   * it allows to set the styles of the div conatining the page (the components you will develop)
   *
   */
  containerStyle:PropTypes.object,
  /**
   * the css classes of the container wrapping the page
   *
   */
  containerClassName:PropTypes.string,
  /**
   * show/hide the search object in the navbar
   *
   */
  showSearch:PropTypes.bool,
  /**
   * show/hide the side menu
   *
   */
  useSideMenu:PropTypes.bool
}
RqtvStandardTemplate.defaultProps = {
  useContainerFluid:true,
  usePageHeader:true,
  showSearch:true,
  useSideMenu:true
}

export default RqtvStandardTemplate
