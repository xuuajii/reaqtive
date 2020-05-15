//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React, {useState, useEffect, useMemo, useReducer, useContext} from 'react'
import useRqtvListObject from './use-rqtv-list-object'
import PropTypes from 'prop-types'
import {useQFieldReducer} from '@reaqtive/q'

const RqtvListObject = props => {
  const rqtvListObject = useRqtvListObject(props.qObjectHandler, props.qSelectionHandler, props.qLayoutHandler, props.quickSelectionMode, props.toggle)
  const qLayout=props.qLayoutHandler&&props.qLayoutHandler.qLayout
  //console.log(qLayout, props.qId)
  const qDimensionInfo = qLayout&&qLayout.qListObject.qDimensionInfo
  const qFieldName = qLayout&&qDimensionInfo.qGroupFieldDefs[qLayout&&qDimensionInfo.qGroupPos]
  const activeField = useQFieldReducer(qFieldName, props.alwaysOneSelected, props.defaultValue, props.resetOnUnmount)

  const moreThanOneChild = Array.isArray(props.children)
  if (moreThanOneChild){
      throw "RqtvListObject must have only one child, wrap the content inside a React element";
  }
  return React.cloneElement(props.children, {...props, rqtvListObject})
}

RqtvListObject.propTypes = {
  qObjectHandler:PropTypes.object,
  qSelectionHandler:PropTypes.object,
  qLayoutHandler:PropTypes.object,
  alwaysOneSelected:PropTypes.bool,
  defaultValue:PropTypes.string,
  resetOnUnmount:PropTypes.bool,
  toggle:PropTypes.bool
}

RqtvListObject.defualtProps = {
  alwaysOneSelected:false,
  defaultValue:'',
  resetOnUnmount:true,
  toggle:true
}

export default RqtvListObject
