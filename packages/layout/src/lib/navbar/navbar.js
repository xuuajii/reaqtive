//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

const defaultTogglerStyle = {
  border:0
}

const Navbar = props => {
  const navbarEl = useRef()
  const [showCollapse, setShowCollapse] = useState(window.innerWidth>props.breakpoint?true:false)

  const toggleCollapse = () => {
    setShowCollapse(!showCollapse)

  }
  const children = React.Children.toArray(props.children)
  const addPaddingTop = props.className.indexOf("fixed-top")!==-1
  const addPaddingBottom = props.className.indexOf("fixed-bottom")!==-1

  useEffect(()=>{
    if(addPaddingTop){
      const body = document.getElementsByTagName("BODY")[0]
      body.style.top=navbarEl.current.offsetHeight+'px';
    }
  },[navbarEl.current])
  //const [paddingElHeight, setPaddingElHeight] = useState(0)

  const mapPropToElement = (child, index) => {
    const propsMap ={
      NavbarCollapse:{show:showCollapse},
      NavbarToggle:{toggleCollapse,showCollapse}
    }
    const mappedProp = propsMap[child.type.name]
    //console.log(mappedProp)
    return mappedProp ? React.cloneElement(child,{...mappedProp}):React.cloneElement(child)
  }

  return (
    <>
      <nav className={`navbar ${props.className?props.className:''}`} style={{...props.style}} ref={navbarEl}>
        {children.map((child, index)=> mapPropToElement(child,index))}
      </nav>
    </>
  )
}

Navbar.propTypes = {
  className:PropTypes.string,
  style:PropTypes.object,
  breakpoint:PropTypes.number
}

Navbar.defaultProps = {
  className:"navbar-expand-lg navbar-light bg-light",
  breakpoint:992,
}

export default Navbar
