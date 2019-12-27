//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useState, useContext} from 'react'
import PropTypes from 'prop-types'
import {Navbar, NavbarBrand, NavbarNav, HamburgerMenu} from '@reaqtive/layout'
import {Button} from '@reaqtive/layout'
import {RqtvCurrentSelections} from '../index'
import {RqtvSearchObject} from '../index'
import {RqtvAppContext} from '../contexts/rqtv-app-context'

const RqtvNavbar = props => {
  const { searchFieldsMatch } = props
  const rqtvApp = useContext(RqtvAppContext)

  const [showCurrentSelections , setShowCurrentSelections] = useState(props.showCurrentSelections)

  const fieldList = searchFieldsMatch?rqtvApp.filterFieldList(rqtvApp.enhancedFieldList, searchFieldsMatch):rqtvApp.searchFieldList

  const hidePrefix = rqtvApp&&rqtvApp.hidePrefix

  const currentSelectionsCustomLoading=()=><div/>

  return(
    <>
      <Navbar className="fixed-top rqtv-navbar">
        <div className="navbar-brand-container">
        <Button onClick={props.onToggleMenu} >
          <HamburgerMenu isOpen={props.sideMenuActive}/>
        </Button>
          <NavbarBrand url={rqtvApp.brandUrl} imgUrl={rqtvApp.brand} imgStyle={rqtvApp.brandStyle}>
            {rqtvApp.title}
          </NavbarBrand>
        </div>
        <NavbarNav neverCollapse={true}>
          <RqtvCurrentSelections hidden={!showCurrentSelections} hidePrefix={hidePrefix} customLoading={()=><div/>}/>
          <RqtvSearchObject
            onOpen={()=>{
              props.closeSideMenu()
              setShowCurrentSelections(false)
            }}
            onClose={()=>{
              setShowCurrentSelections(props.showCurrentSelections)
            }}
            searchFields={fieldList&&fieldList.map(field=>field.qName)}
            expandFrom="right"
            useBackdrop={true}
            resultsHeight={'100%'}
          />
        </NavbarNav>
      </Navbar>
    </>
  )
}

RqtvNavbar.propTypes={
  fixedTop:PropTypes.bool,
  sticky:PropTypes.bool,
  onToggleMenu:PropTypes.func,
  showCurrentSelections:PropTypes.bool,
}

RqtvNavbar.defaultProps={
  fixedTop:false,
  sticky:true,
  showCurrentSelections:true,
}


export default RqtvNavbar
