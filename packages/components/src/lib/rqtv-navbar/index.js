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

/**
 * RqtvNavbar
 *
 * It is a component that renders the top navbar of the reaqtive app. It is based on bootstrap navbar
 * Styles can be customized via css (or scss)
 */

const RqtvNavbar = props => {
  const { searchFieldsMatch, showSideMenuToggle } = props
  const rqtvApp = useContext(RqtvAppContext)

  const [showCurrentSelections , setShowCurrentSelections] = useState(props.showCurrentSelections)

  const fieldList = searchFieldsMatch?rqtvApp.filterFieldList(rqtvApp.enhancedFieldList, searchFieldsMatch):rqtvApp.searchFieldList

  const hidePrefix = rqtvApp&&rqtvApp.hidePrefix

  const currentSelectionsCustomLoading=()=><div/>

  return(
    <>
      <Navbar className="fixed-top rqtv-navbar">
        <>
          <div className="navbar-brand-container">
          {showSideMenuToggle&&
            <Button onClick={props.onToggleMenu} >
              <HamburgerMenu isOpen={props.sideMenuActive}/>
            </Button>
          }
            <NavbarBrand url={rqtvApp.brandUrl} imgUrl={rqtvApp.brand} imgStyle={rqtvApp.brandStyle}>
              {rqtvApp.title}
            </NavbarBrand>
          </div>
        </>
        <NavbarNav neverCollapse={true}>
          <RqtvCurrentSelections hidden={!showCurrentSelections} hidePrefix={hidePrefix} customLoading={()=><div/>}/>
          {props.showSearch&&
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
          }
        </NavbarNav>
      </Navbar>
    </>
  )
}

RqtvNavbar.propTypes={
  /**
   * function fired when clicking on the HamburgerMenu button
   */
  onToggleMenu:PropTypes.func,
  /**
   * show/hide the current selections toolbar
   */
  showCurrentSelections:PropTypes.bool,
  /**
   * show/hide hamburger menu
   */
  showSideMenuToggle:PropTypes.bool
}

RqtvNavbar.defaultProps={
  showCurrentSelections:true,
  showSideMenuToggle:true
}


export default RqtvNavbar
