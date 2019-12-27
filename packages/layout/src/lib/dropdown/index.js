//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {useOutsideEventListener} from '../index'
import Button from '../button'
import {LuiIcon} from '../index'


const Dropdown = props => {
  const [show, setShow] = useState(false)

  const dropdownEl = useRef()
  useOutsideEventListener(dropdownEl, ()=>setShow(false), show)

  const toggleMenu = () =>{
    setShow(!show)
  }

  return(
    <div className={`dropdown ${show ? 'show' : ''} ${props.className?props.className:''}`} ref={dropdownEl}>
      {props.children.map((child, index) =>
        React.cloneElement(child, {key:index, show:show, toggleMenu:toggleMenu, itemToggleMenu:props.clickOnItemClose?toggleMenu:()=>true})
      )}
    </div>
  )
}
Dropdown.propTypes = {
  clickOnItemClose:PropTypes.bool
}

Dropdown.defaultProps = {
  clickOnItemClose:true
}

const DropdownButton = props => {
  return(
    <Button className={`dropdown-toggle hide-caret ${props.className}`} type="button" onClick={props.toggleMenu}>
      {props.label}
      {!props.hideCaret&&<LuiIcon iconType={`triangle-${props.show?'top':'bottom'}`} className="caret"/>}
    </Button>
  )
  //{props.icon()}
}

DropdownButton.propTypes = {
  className:PropTypes.string,
  hideCaret:PropTypes.bool
}

DropdownButton.defaultProps = {
  className:'btn-primary',
  hideCaret:false
}

const DropdownMenu = props => {
  return(
    <div className={`dropdown-menu ${props.show?'show':''} dropdown-menu-${props.align}`} >
      <ul>
        {props.children.map(child => React.cloneElement(child, {toggleMenu:props.itemToggleMenu}))}
      </ul>
    </div>
  )
}
DropdownMenu.propTypes = {
  align:PropTypes.string
}

DropdownMenu.defaultProps = {
  align:'left',
  showCaret:true
}

const DropdonMenuItem = props => {

  const handleClick = () => {
    props.action()
    props.toggleMenu()
  }

  return <li className="dropdown-item" key={props.label} onClick={handleClick}>{props.label}</li>
}

export {Dropdown, DropdownButton, DropdownMenu, DropdonMenuItem}
