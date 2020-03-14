//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'
import {DropdownButton} from '@reaqtive/layout'
import {QGenericObject} from '@reaqtive/q'
import qButtonObjectDef from './q-button-object-def'
const RqtvDropdownButton = props => {
  const qObjectDef = qButtonObjectDef(props.qLabelExpr, props.qColorExpr)
  return(
    <QGenericObject qObjectDef={qObjectDef}>
    {(qGenericObject)=>{
      const qLayout = qGenericObject.qLayoutHandler.qLayout
      const label = qLayout&&qLayout.label?qLayout.label:props.label;
      return(
        <DropdownButton
          {...props}
          label={label}
        />
      )}
    }
    </QGenericObject>
  )
}



RqtvDropdownButton.propTypes = {
  label:PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
  color:PropTypes.string,
  onClick:PropTypes.func.isRequired,
  ripple:PropTypes.bool,
  style:PropTypes.object
}

RqtvDropdownButton.defaultProps = {
  label:' ',
  ripple:true,
  style:{}
}


export  default RqtvDropdownButton
