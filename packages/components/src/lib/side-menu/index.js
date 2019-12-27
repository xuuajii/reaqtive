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

const RqtvSideMenu = props =>{
  const { sideMenuFieldsMatch } = props
  const rqtvApp = useContext(RqtvAppContext)

  const fieldList = sideMenuFieldsMatch?rqtvApp.filterFieldList(rqtvApp.enhancedFieldList, sideMenuFieldsMatch):rqtvApp.sideMenuFieldList

  const pages = rqtvApp&&rqtvApp.pages

  return(
    <SideMenu className="rqtv-side-menu" isOpen={props.isOpen} onClose={props.onClose}>
      <Tabs animatedTabs={true} style={{height:'100%'}} >
        <TabList useIcons={true}>
          {props.usePageList&&<Tab label="pages" icon={<LuiIcon iconType="sheet"/>}/>}
          {props.useFieldList&&<Tab label="fields" icon={<LuiIcon iconType="field"/>}/>}
          </TabList>
        <TabPanels >
          {props.usePageList&&<TabPanel><PageList pages={pages}/></TabPanel>}
          {props.useFieldList&&fieldList?<FieldList fieldList={fieldList.map(field=>{return{qFieldExpr:field.qName, label:field.qName, hasSelections:field.selectedCount>0}})}/>:<></>}
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
  isOpen:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired
}


export { RqtvSideMenu,  SideMenuMain as RqtvSideMenuMain}
