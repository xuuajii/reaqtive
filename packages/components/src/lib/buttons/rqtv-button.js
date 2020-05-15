import React from 'react'
import PropTypes from 'prop-types'
import {Button} from '@reaqtive/layout'
import {QGenericObject} from '@reaqtive/q'
import qButtonObjectDef from './q-button-object-def'
const RqtvButton = props => {
  const qObjectDef = qButtonObjectDef(props.qLabelExpr, props.qColorExpr)
  return(
    <QGenericObject qObjectDef={qObjectDef}>
    {(qGenericObject)=>{
      const qLayout = qGenericObject.qLayoutHandler.qLayout
      const label = qLayout&&qLayout.label?qLayout.label:props.label;
      return(
        <Button
        className={props.className}
        ripple={props.ripple}
        style={props.style}
        onClick={props.onClick}
        >
          {label}
        </Button>
      )}
    }
    </QGenericObject>
  )
}



RqtvButton.propTypes = {
  label:PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
  color:PropTypes.string,
  onClick:PropTypes.func.isRequired,
  ripple:PropTypes.bool,
  style:PropTypes.object
}

RqtvButton.defaultProps = {
  label:' ',
  ripple:true,
  style:{}
}


export  default RqtvButton
