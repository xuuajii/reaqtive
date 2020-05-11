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
  const { sideMenuFieldsMatch } = props
  const rqtvApp = useContext(RqtvAppContext)

  const fieldList = sideMenuFieldsMatch?rqtvApp.filterFieldList(rqtvApp.enhancedFieldList, sideMenuFieldsMatch):rqtvApp.sideMenuFieldList

  const pages = rqtvApp&&rqtvApp.pages

  return(
    <SideMenu className={`rqtv-side-menu`} isOpen={props.isOpen} onClose={props.onClose}>
      <Tabs animatedTabs={true} style={{height:'100%'}} >
        <TabList useIcons={true}>
          {props.usePageList&&<Tab label="pages" icon={<LuiIcon iconType="sheet"/>}/>}
          {props.useFieldList&&<Tab label="fields" icon={<LuiIcon iconType="field"/>}/>}
          {props.additionalTabs&&props.additionalTabs.map(additionalTab=><Tab label={additionalTab.label} icon={additionalTab.icon}/>)}
          </TabList>
        <TabPanels >
          {props.usePageList&&<TabPanel><PageList pages={pages}/></TabPanel>}
          {props.useFieldList&&fieldList?<FieldList fieldList={fieldList.map(field=>{return{qFieldExpr:field.qName, label:field.qName, hasSelections:field.selectedCount>0}})}/>:<></>}
          {props.additionalTabs&&props.additionalTabs.map(additionalTab=><TabPanel>{additionalTab.tab}</TabPanel>)}
        </TabPanels>
      </Tabs>
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
  additionalTabs:PropTypes.arrayOf(PropTypes.shape({
    label:PropTypes.strig,
    icon:PropTypes.element,
    tab:PropTypes.element
  }))
}

RqtvSideMenu.defaultProps = {
  usePageList:false,
  useFieldList:true,
}


export { RqtvSideMenu,  SideMenuMain as RqtvSideMenuMain}
