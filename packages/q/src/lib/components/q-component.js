//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext, useState, useEffect} from 'react'
import {QDoc} from '../contexts/q-doc'
import {useQObjectHandler} from '../hooks/index'
import {useQLayoutHandler} from '../hooks/index'

const QComponent = props => {
  const qDoc = useContext(QDoc)
  const [isMounted, set] = useState(true)
  useEffect(()=>{
    return () => set(false)
  },[])
  const qObjectHandler = useQObjectHandler(qDoc.qDoc, props.qObjectDef)
  const qLayoutHandler = useQLayoutHandler(qObjectHandler.qObject, !isMounted)//, qLayoutPatch)
  // console.log(qLayoutHandler)
  useEffect(()=>{
    //qObjectHandler.qObject&&qObjectHandler.qObject.removeAllListeners()
    return qDoc.qDoc?() => qDoc.qDoc.abortModal(false):()=>true
  },[qDoc.qDoc])

  // const [children, setChildren] = useState()
  // useEffect(()=>{
  //   const childrenArray = React.Children.toArray(props.children)
  //   const enhancedChildren = childrenArray.map(child=>React.cloneElement(child, {qObjectHandler, qLayoutHandler, qObjectDef:props.qObjectDef}))
  //   setChildren(enhancedChildren)
  //   return ()=>setChildren(null)
  // },[qLayoutHandler, qObjectHandler, props.qObjectDef])
  const childrenArray = React.Children.toArray(props.children)
  const enhancedChildren = childrenArray.map(child=>React.cloneElement(child, {qObjectHandler, qLayoutHandler, qObjectDef:props.qObjectDef}))
  return enhancedChildren?enhancedChildren:null
}

export default QComponent
