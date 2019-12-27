//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'
import {LuiIcon} from '@reaqtive/layout'
import RqtvButtonObjectProvider from './rqtv-button-object-provider'
import {Button} from '@reaqtive/layout'

const RqtvDropdownButtonLayout = props => {
  //console.log(props)
  const qLayout=props.qLayoutHandler&&props.qLayoutHandler.qLayout

  return(
    <Button
      className={props.className}
      ripple={props.ripple}
      style={props.style}
      onClick={props.onClick}
    >
      {qLayout&&qLayout.label?qLayout.label:props.label}
      {<LuiIcon iconType={`triangle-${props.show?'top':'bottom'}`} className="caret"/>}
    </Button>
  )
}
const RqtvDropdownButton = props =>
<RqtvButtonObjectProvider {...props}>
  <RqtvDropdownButtonLayout show={props.show}/>
</RqtvButtonObjectProvider>


const fontSizePropCheck = (props, propName, componentName) =>{
  if (
      !(
        (
          typeof props[propName]==='string' &&
          (props[propName].indexOf('px')!==-1||props[propName].indexOf('rem')!==-1)
        )
        ||
        (typeof props[propName]==='number')
      )
    ){
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed. Expected a number or a string containing rem or px'
      );
  }
}
RqtvDropdownButton.propTypes = {
  label:PropTypes.string,
  color:PropTypes.string,
  onClick:PropTypes.func.isRequired,
  fontColor:PropTypes.string,
  fontSize:fontSizePropCheck,
  ripple:PropTypes.bool,
  style:PropTypes.object
}

RqtvDropdownButton.defaultProps = {
  label:'',
  color:'primary',
  fontColor:'light',
  fontSize:'1rem',
  ripple:true,
  style:{}
}


export default RqtvDropdownButton
