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
  const {showCaret, className }=props

  return(
    <Button
      className={className}
      ripple={props.ripple}
      style={{...props.style}}
      onClick={props.onClick}
    >
      {qLayout&&qLayout.label?qLayout.label:props.label}
      {showCaret&&<LuiIcon iconType={`triangle-${props.show?'top':'bottom'}`} className="caret"/>}
    </Button>
  )
}
const RqtvDropdownButton = props =>
<RqtvButtonObjectProvider {...props}>
  <RqtvDropdownButtonLayout show={props.show} {...props}/>
</RqtvButtonObjectProvider>


RqtvDropdownButton.propTypes = {
  label:PropTypes.string,
  onClick:PropTypes.func.isRequired,
  ripple:PropTypes.bool,
  style:PropTypes.object
}

RqtvDropdownButton.defaultProps = {
  label:' ',
  ripple:true,
  style:{}
}


export default RqtvDropdownButton
