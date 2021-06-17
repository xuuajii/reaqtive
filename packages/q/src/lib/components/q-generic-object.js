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
 * QGenericObject must have one and only one child. The child can be a React element (external layout mode) or a function that returns a React element (inline layout mode).
 *
 * See the example below for details
 */
const QGenericObject = props => {
  const {qObjectDef, quickSelectionMode} = props
  const [isFocused, setIsFocused] = useState()
  const qObjectHandler = useQObjectReducer(qObjectDef)
  const qSelectionHandler = useQSelectionHandler(qObjectHandler.qObject)
  const qLayoutHandler = useQLayoutReducer(qObjectHandler, qSelectionHandler, isFocused)
  const moreThanOneChild = Array.isArray(props.children)
  if (moreThanOneChild){
      throw "QGenericObject must have  only one child, wrap the content inside a React element";
  }
  return React.isValidElement(props.children)
  ?React.cloneElement(props.children, {props, qObjectHandler, qLayoutHandler, qSelectionHandler,qObjectDef, quickSelectionMode, setIsFocused})
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
  quickSelectionMode:true
}

export default QGenericObject
