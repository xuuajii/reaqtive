//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React, {useState, useEffect, useCallback, useRef} from 'react'
import PropTypes from 'prop-types'
import {useQObjectReducer, useQLayoutReducer, useQSelectionHandler} from '../index'

const QGenericObject = props => {
  const qObjectHandler = useQObjectReducer(props.qObjectDef)
  const qSelectionHandler = useQSelectionHandler(qObjectHandler.qObject, false)
  const qLayoutHandler = useQLayoutReducer(qObjectHandler, qSelectionHandler)
  return React.cloneElement(props.children, {qObjectHandler, qLayoutHandler, qSelectionHandler, qObjectDef:props.qObjectDef})
}

QGenericObject.propTypes = {
  qObjectDef:PropTypes.object.isRequired,
  quickSelectionMode:PropTypes.bool
}

QGenericObject.defaultProps = {
  quickSelectionMode:false
}

export default QGenericObject
