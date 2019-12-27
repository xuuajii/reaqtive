//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {RqtvAppContext} from '../../../../contexts/rqtv-app-context'
import {Button} from '@reaqtive/layout'
import {RqtvButton} from '../../index'
import {LuiIcon} from '../../../icons/index'

const DropdownButton = props =>{
  const appContext = useContext(RqtvAppContext)
  return (
    <RqtvButton
      className={`${props.color} ${'text-'+props.fontColor} `}
      ripple={props.ripple?props.ripple:appContext&&appContext.theme.useRippleEffect}
      onClick={props.handleClick}
    >
      {props.label}
      {props.showCaret&&<LuiIcon iconType={`triangle-${props.show?'top':'bottom'}`} className="caret"/>}
    </RqtvButton>
  )
}

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

DropdownButton.propTypes = {
  color:PropTypes.string,
  fontColor:PropTypes.string,
  fontSize:fontSizePropCheck,
  ripple:PropTypes.bool,
  showCaret:PropTypes.bool,
  style:PropTypes.object
}

DropdownButton.defaultProps = {
  color:'primary',
  fontColor:'light',
  fontSize:'1rem',
  ripple:true,
  showCaret:true,
  style:{}
}

export default DropdownButton
