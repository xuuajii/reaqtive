import React from 'react'
import PropTypes from 'prop-types'
//console.log(1)
const defaultImgStyle = {
  width:"40px",
  height:"30px",
  alt:"",
  display:"inline-block",
  verticalAlign:'top',
}

const NavbarBrand = props => {
  const navigate = () => {
    //window.location=props.url
    if(typeof props.onClick==='function'){
      props.onClick()
    } else {
      const isExternalUrl = props.url.match(/^(?:http|https):\/\//)?true:false
      isExternalUrl?window.location=props.url:history.pushState(props.url, '', props.url)
    }
  }
  return (
    <a href="#" className={`navbar-brand ${props.className?props.className:''}`} style={{...props.style}} onClick={navigate}>
    {(props.imgUrl)&&
      <img
        src={props.imgUrl}
        style={{...defaultImgStyle, ...props.imgStyle}}
        alt="Logo"
      />
    }
      {props.children}
    </a>
  )
}

export default NavbarBrand

NavbarBrand.propTypes = {
  className:PropTypes.string,
  style:PropTypes.object,
  url:PropTypes.string,
  imgUrl:PropTypes.string,
  imgStyle:PropTypes.object,
  hideImg:PropTypes.bool
}

NavbarBrand.defaultProps = {
  url:'/',
}
