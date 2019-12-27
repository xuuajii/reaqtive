//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useContext } from 'react'
import {QDoc} from '../contexts/q-doc'
import {useDeepCompareMemo} from '@reaqtive/layout'


const useTriggers = (triggers) => {
  ///////////////////////////////////////////////////////////////
  // handle state
  ///////////////////////////////////////////////////////////////

  const [done, setDone] = useState(false)
  const [qLoading, setQLoading] = useState(true)
  const [qError, setQError] = useState(false)
  const [progress, setProgress] = useState(false)
  const qDocHandler = useContext(QDoc)

  const triggersMemo = useDeepCompareMemo(triggers)

  useEffect(()=>{
    return
  },[])
   useEffect(()=>{
    if(!triggers||triggers.length===0||progress===triggers.length){
      setDone(true)
      setQLoading(false)
    }
  }, [progress])

  useEffect(()=>{
    if(qDocHandler.qDoc){
      triggers.forEach(trigger => fire(trigger))
    }
    return () => {
      qDocHandler.qDoc&&triggers.forEach(trigger=>{
        if(trigger.type==='fieldSelection' && trigger.params.alwaysOneSelected===true){
          removeAlwaysOneSelected(trigger.params)
        }
      })
    }
  }, [qDocHandler, triggersMemo])

  ///////////////////////////////////////////////////////////////
  // fire the right trigger
  ///////////////////////////////////////////////////////////////
  const fire = (trigger) => {
    if(qError === false )
    switch (trigger.type){
      case 'fieldSelection':
        selectFieldValue(trigger.params)
        setProgress(progress=>progress+1)
      break;
      default:
        console.log('unkown trigger type', trigger.type)
        setQLoading(false)
    }
  }

  ///////////////////////////////////////////////////////////////
  // select field values trigger
  ///////////////////////////////////////////////////////////////
  const getField = async (params) => {
    try{
      const field = qDocHandler.qDoc.getField(params.fieldName)
      return field
    }
    catch(err){
      console.log('error getting trigger field', err)
      setQError(true)
    }
  }

  const select = async (field, params) => {
    try{
      const selected = field.select(params.value)
      return selected
    }
    catch(err){
      console.log('error selecting trigger value', err)
    }
  }

  const setNxProps = async (field, nxPropsValue) => {
    try {
      const setNxPropsDone = field.setNxProperties({ "qOneAndOnlyOne": nxPropsValue })
      return setNxPropsDone
    }
    catch(err) {
      console.log('error setting alwaysOneSelected in trigger', err)
    }
  }

  const selectFieldValue = async (params) => {
    const field = await getField(params);
    const selected = await select(field, params)
    const triggerDone = params.alwaysOneSelected?await setNxProps(field, true):true
  }

  const removeAlwaysOneSelected = async (params) => {
    const field = await getField(params);
    const removed = await setNxProps(field, false)
    //console.log(field, removed)
  }

  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // return trigger state
  ///////////////////////////////////////////////////////////////
  return { done, qLoading, qError}
}


export default useTriggers
