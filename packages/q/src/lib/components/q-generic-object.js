//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React, {useState, useEffect, useCallback, useRef} from 'react'
import PropTypes from 'prop-types'
import {useQObjectReducer, useQLayoutReducer, useQSelectionHandler} from '../index'

const QGenericObject = props => {
  const {qObjectDef, quickSelectionMode} = props
  const qObjectHandler = useQObjectReducer(qObjectDef)
  const qSelectionHandler = useQSelectionHandler(qObjectHandler.qObject)
  const qLayoutHandler = useQLayoutReducer(qObjectHandler, qSelectionHandler)
  const moreThanOneChild = Array.isArray(props.children)
  if (moreThanOneChild){
      throw "QGenericObject must have  only one child, wrap the content inside a React element";
  }
  return React.cloneElement(props.children, {qObjectHandler, qLayoutHandler, qSelectionHandler,qObjectDef, quickSelectionMode})
}

QGenericObject.propTypes = {
  qObjectDef:PropTypes.object.isRequired,
  quickSelectionMode:PropTypes.bool
}

QGenericObject.defaultProps = {
  quickSelectionMode:false
}

export default QGenericObject
