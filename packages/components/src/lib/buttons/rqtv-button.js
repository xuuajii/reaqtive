//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'
import {Button} from '@reaqtive/layout'
import RqtvButtonObjectProvider from './rqtv-button-object-provider'
const RqtvButtonLayout = props => {
  const qLayout=props.qLayoutHandler&&props.qLayoutHandler.qLayout

  return(
    <Button
      className={props.className}
      ripple={props.ripple}
      style={props.style}
      onClick={props.onClick}
    >
      {qLayout&&qLayout.label?qLayout.label:props.label}
    </Button>
  )
}
const RqtvButton = props =>
<RqtvButtonObjectProvider {...props}>
  <RqtvButtonLayout/>
</RqtvButtonObjectProvider>


RqtvButton.propTypes = {
  label:PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
  color:PropTypes.string,
  onClick:PropTypes.func.isRequired,
  fontColor:PropTypes.string,
  ripple:PropTypes.bool,
  style:PropTypes.object
}

RqtvButton.defaultProps = {
  label:'',
  fontColor:'light',
  ripple:true,
  style:{}
}


export  default RqtvButton
