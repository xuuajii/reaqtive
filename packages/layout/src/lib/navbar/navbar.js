import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

const defaultTogglerStyle = {
  border:0
}

const Navbar = props => {
  const navbarEl = useRef()
  const [showCollapse, setShowCollapse] = useState(false)

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


  return (
    <>
      <nav className={`navbar ${props.className?props.className:''}`} style={{...props.style}} ref={navbarEl}>
        {React.Children.toArray(props.children).map(child=>React.cloneElement(child, {showCollapse, toggleCollapse}))}
      </nav>
    </>
  )
}
//React.Children.toArray(props.children).map(child=> React.cloneElement(child,{toggleCollapse,showCollapse}))

Navbar.propTypes = {
  className:PropTypes.string,
  style:PropTypes.object,
  breakpoint:PropTypes.number
}

Navbar.defaultProps = {
  className:"navbar-expand-lg",
  breakpoint:992,
}

export default Navbar
