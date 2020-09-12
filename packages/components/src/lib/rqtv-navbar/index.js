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
 * It is a component that renders the top navbar of the reaqtive app and add spacing to the top of the page if the navbar is fixed top.
 * It includes the [RqtvCurrentSelections](#rqtvcurrentselections) component and the [RqtvSearchObject](#rqtvsearchobject) component.
 * It is based on bootstrap navbar, its styles can be customized using navbarClassName prop which will be passed to the navbar itself or via sass/css
 */

const RqtvNavbar = props => {
  const { searchFieldsMatch, showSideMenuToggle, fixedTop, navbarClassName } = props
  const rqtvApp = useContext(RqtvAppContext)||{}
  const title = props.title?props.title:rqtvApp.title
  const brandUrl=props.brandUrl?props.brandUrl:rqtvApp.brandUrl
  const brandImgUrl=props.brandImgUrl?props.brandImgUrl:rqtvApp.brand
  const brandImgStyle=props.brandImgStyle?props.brandImgStyle:rqtvApp.brandStyle
  const navbarBrandAction=props.navbarBrandAction?props.navbarBrandAction:rqtvApp.brandAction
  const [showCurrentSelections , setShowCurrentSelections] = useState(props.showCurrentSelections)

  const fieldList = searchFieldsMatch?rqtvApp.filterFieldList(rqtvApp.enhancedFieldList, searchFieldsMatch):rqtvApp.searchFieldList

  const hidePrefix = rqtvApp&&rqtvApp.hidePrefix

  const currentSelectionsCustomLoading=()=><div/>

  return(
    <>
      <Navbar className={`${fixedTop===true?'fixed-top':''} rqtv-navbar ${navbarClassName}`}>
        <>
          <div className="navbar-brand-container">
          {showSideMenuToggle&&
            <Button onClick={props.onToggleMenu} >
              <HamburgerMenu isOpen={props.sideMenuActive}/>
            </Button>
          }
            <NavbarBrand url={brandUrl} imgUrl={brandImgUrl} imgStyle={brandImgStyle} onClick={navbarBrandAction}>
              {title}
            </NavbarBrand>
          </div>
        </>
        <NavbarNav neverCollapse={true}>
          <RqtvCurrentSelections
            hidden={!showCurrentSelections}
            hidePrefix={hidePrefix}
            customLoading={()=><div/>}
            breakPoint={props.currentSelectionsBreakPoint}
          />
          {props.showSearch&&
            <RqtvSearchObject
              fixedTop={props.fixedTop}
              useBackdrop={props.fixedTop}
              onOpen={()=>{
                props.closeSideMenu&&props.closeSideMenu()
                setShowCurrentSelections(false)
              }}
              onClose={()=>{
                setShowCurrentSelections(props.showCurrentSelections)
              }}
              searchFields={fieldList&&fieldList.map(field=>field.qName)}
              expandFrom="right"
              resultsHeight={props.fixedTop?'100%':props.searchResultsHeight}
            />
          }
        </NavbarNav>
      </Navbar>
    </>
  )
}

RqtvNavbar.propTypes={
  /**
   * if true the navbar would be fix positioned at the top of the page
   */
  fixedTop:PropTypes.bool,
  /**
   * css classes that will be passed to the navbar div
   */
  navbarClassName:PropTypes.string,
  /**
   * function fired when clicking on the HamburgerMenu button
   */
  onToggleMenu:PropTypes.func,
  /**
   * show/hide the current selections toolbar
   */
  showCurrentSelections:PropTypes.bool,
  /**
   * show/hide the global search-object
   */
  showSearch:PropTypes.bool,
  /**
   * show/hide hamburger menu
   */
  showSideMenuToggle:PropTypes.bool,
  brandUrl:PropTypes.string,
  brandImgUrl:PropTypes.string,
  brandImgStyle:PropTypes.object,
  searchResultsHeight:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  navbarBrandAction:PropTypes.func
}

RqtvNavbar.defaultProps={
  fixedTop:true,
  navbarClassName:'',
  showCurrentSelections:true,
  showSideMenuToggle:true,
  showSearch:true,
  searchResultsHeight:500
}


export default RqtvNavbar
