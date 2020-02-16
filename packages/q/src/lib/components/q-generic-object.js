//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React, {useState, useEffect, useCallback, useRef} from 'react'
import {useQObjectReducer, useQLayoutReducer, useQSelectionHandler} from '../index'
import PropTypes from 'prop-types'

/**
 * QGenericObject
 * Creates a generic object and provides qObject and qLayout to its clid.
 * It expects only 1 child
 * It attaches an onChange event-listener to the qObject and automatically updates the layout when the event fires.
 * For example it can provide a listobject or a hypercube to its children.
 *
 */
const QGenericObject = props => {
  const {qObjectDef, quickSelectionMode} = props
  const qObjectHandler = useQObjectReducer(qObjectDef)
  const qSelectionHandler = useQSelectionHandler(qObjectHandler.qObject)
  const qLayoutHandler = useQLayoutReducer(qObjectHandler, qSelectionHandler)
  const moreThanOneChild = Array.isArray(props.children)
  if (moreThanOneChild){
      throw "QGenericObject must have  only one child, wrap the content inside a React element";
  }
  return React.isValidElement(props.children)
  ?React.cloneElement(props.children, {props, qObjectHandler, qLayoutHandler, qSelectionHandler,qObjectDef, quickSelectionMode})
  :props.children({qObjectHandler, qLayoutHandler, qSelectionHandler,qObjectDef, quickSelectionMode})
}

QGenericObject.propTypes = {
  /**
   * The definition of the qObject.
   * Check the following links for details
   * https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/genericobject.html
   */
  qObjectDef:PropTypes.object.isRequired,
  /**
   * If true the object will handle selections using Qlik Sense mode (user will have to accept selections)
   * If set to false the object will handle selections using QlikView mode (selection immediately applied)
   */
  quickSelectionMode:PropTypes.bool
}

QGenericObject.defaultProps = {
  quickSelectionMode:false
}

export default QGenericObject
