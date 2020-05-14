//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { SideMenu, SideMenuMain} from '@reaqtive/layout'
import {Tabs, TabList, Tab, TabPanels} from '@reaqtive/layout'
import {LuiIcon} from '@reaqtive/layout'
import {RqtvMultibox} from '../index'
import {RqtvAppContext} from '../contexts/rqtv-app-context'
import PageList from './page-list'

/**
 * RqtvSideMenu
 *
 * It returns toggleable fixed-positioned side menu displayed on the left of the page.
 * Default tabs are the list of pages of the app and a multibox with filters.
 * The open/close state has to be managed in parent component
 *
 */
const RqtvSideMenu = props =>{
  const { sideMenuFieldsMatch, useFieldList, usePageList, useTabs, alwaysShowBackdrop } = props
  const rqtvApp = useContext(RqtvAppContext)

  const fieldList = sideMenuFieldsMatch?rqtvApp&&rqtvApp.filterFieldList(rqtvApp.enhancedFieldList, sideMenuFieldsMatch):rqtvApp&&rqtvApp.sideMenuFieldList

  const pages = rqtvApp&&rqtvApp.pages

  const showFieldList = fieldList&&useFieldList
  const showPageList = usePageList&&pages
  return(
    <SideMenu className={`rqtv-side-menu`} isOpen={props.isOpen} onClose={props.onClose} alwaysShowBackdrop={alwaysShowBackdrop}>
    {useTabs
      ?<Tabs animatedTabs={true} style={{height:'100%'}} >
          <TabList useIcons={true}>
            {showPageList&&<Tab label="pages" icon={<LuiIcon iconType="sheet"/>}/>}
            {showFieldList&&<Tab label="fields" icon={<LuiIcon iconType="field"/>}/>}
            {props.additionalTabs&&props.additionalTabs.map(additionalTab=><Tab label={additionalTab.label} icon={additionalTab.icon}/>)}
            </TabList>
          <TabPanels >
            {showPageList&&<TabPanel><PageList pages={pages}/></TabPanel>}
            {showFieldList&&fieldList?<FieldList fieldList={fieldList.map(field=>{return{qFieldExpr:field.qName, label:field.qName, hasSelections:field.selectedCount>0}})}/>:<></>}
            {props.additionalTabs&&props.additionalTabs.map(additionalTab=><TabPanel>{additionalTab.tab}</TabPanel>)}
          </TabPanels>
        </Tabs>
       :props.children
    }
    </SideMenu>
  )
}

const TabPanel = props => props.children


const FieldList = props => {
  const height = props.tabsEl.current.offsetHeight-props.tabListEl.current.offsetHeight;
  const width = props.tabsEl.current.offsetHeight-props.tabListEl.current.offsetWidth;
  return (
    <div className="hide-scrollbar" style={{height:height}}>
      <RqtvMultibox fieldList={props.fieldList} fieldHeight={400}/>
    </div>
  )
}

RqtvSideMenu.propTypes = {
  /**
   * open/close the menu
   */
  isOpen:PropTypes.bool.isRequired,
  /**
   * function to set isOpen to false
   */
  onClose:PropTypes.func.isRequired,
  /**
   * show/hide the page list tab
   */
  usePageList:PropTypes.bool,
  /**
   * show hide the multibox
   */
  useFieldList:PropTypes.bool,
  /**
   * if true it uses the the tabs to display different views in the side menu, if false it just shows its children
   */
  useTabs:PropTypes.bool,
  /**
   *
   * if tru backdrop is always shown when RqtvSideMenu is open
   */
  alwaysShowBackdrop:PropTypes.bool,
  /**
   *
   * additional tabs to display after pages and filters
   */
  additionalTabs:PropTypes.arrayOf(PropTypes.shape({
    label:PropTypes.string,
    icon:PropTypes.element,
    tab:PropTypes.element
  })),
}

RqtvSideMenu.defaultProps = {
  usePageList:false,
  useFieldList:false,
  useTabs:false,
  alwaysShowBackdrop:false
}


export { RqtvSideMenu,  SideMenuMain as RqtvSideMenuMain}
