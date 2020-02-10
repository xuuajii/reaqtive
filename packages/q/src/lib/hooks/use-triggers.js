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
    if(!triggers||(triggers&&triggers.length===0)||progress===(triggers&&triggers.length)){
      setDone(true)
      setQLoading(false)
    }
  }, [progress])

  useEffect(()=>{
    if(qDocHandler.qDoc && triggers&&triggers.length>0){
      triggers&&triggers.forEach(trigger => fire(trigger))
    }
    return () => {
      qDocHandler.qDoc&&triggers&&triggers.length>0&&triggers.forEach(trigger=>{
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
        trigger.params&&selectFieldValue(trigger.params)
        trigger.params&&setProgress(progress=>progress+1)
      break;
      case 'fieldSelections':
        trigger.params&&selectFieldValues(trigger.params)
        trigger.params&&setProgress(progress=>progress+1)
      break;
      default:
        console.log('unkown trigger type', trigger.type)
        setQLoading(false)
    }
  }

  ///////////////////////////////////////////////////////////////
  // select field single and multiple values triggers
  ///////////////////////////////////////////////////////////////

  const selectFieldValue = async (params) => {
    if(params!==undefined){
      const field = await getField(qDocHandler.qDoc, params);
      if(field!==undefined){
        const selected = await select(field, params)
        const triggerDone = params.alwaysOneSelected?await setNxProps(field, true):true
      }
    }
  }

  const removeAlwaysOneSelected = async (params) => {
    if(params!==undefined){
      const field = await getField(params);
      if(field!==undefined){
        const removed = await setNxProps(field, false)
      }
    }
    //console.log(field, removed)
  }

  const selectFieldValues = async (params) => {
    if(params!==undefined){
      const field = await getField(qDocHandler.qDoc, params)
      if(field!==undefined){
        const valuesSelected = await selectValues(field, params)
        return (valuesSelected instanceof Error)?false:true
      }
    }
  }

  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
  // return trigger state
  ///////////////////////////////////////////////////////////////
  return { done, qLoading, qError}
}

const getField = async (qDoc, params) => {
  if(params!==undefined && qDoc!==null){
    try{
      const field = await qDoc.getField(params.fieldName)
      return field
    }
    catch(err){
      // if(process.env!=='production'){
      //   const message = `Reaqtive: error getting  field ${params.fieldName}, check fieldName spelling`;
      //   throw new Error(message)
      // }
      console.log('error getting trigger field', err)
    }
  }
}

const select = async (field, params) => {
  try{
    const selected = (field!==undefined)&&field.select(params.value)
    return selected
  }
  catch(err){
    console.log('error selecting trigger value', err)
  }
}

const setNxProps = async (field, nxPropsValue) => {
  try {
    const setNxPropsDone = (field!==undefined)&&field.setNxProperties({ "qOneAndOnlyOne": nxPropsValue })
    return setNxPropsDone
  }
  catch(err) {
    console.log('error setting alwaysOneSelected in trigger', err)
  }
}

const selectValues = async (field, params) => {
  try{
    const selected = (field!==undefined)&&field.selectValues(params.values)
    return selected
  }
  catch(err){
    console.log('error selecting trigger value', err)
  }
}

export default useTriggers
