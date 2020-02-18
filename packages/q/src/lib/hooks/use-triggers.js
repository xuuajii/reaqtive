//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useContext } from 'react'
import {QDoc} from '../contexts/q-doc'
import {useDeepCompareMemo} from '@reaqtive/layout'

/**
 * @typedef {object} triggerState - the object returned by useQLayoutReducer
 * @property {boolean} qLoading - if true the the handler is still waiting for response from the qlik server
 * @property {boolean} qError - if true there was an error retrieving the qLayout from the engine
 * @property {boolean} done - all triggers have been fired with no errors
 */

 /**
  * @typedef {function} hook
  * @type {function}
  */

/**
 *@typedef {object} trigger
 *@type{object}
 *@property {string} type - the type of the trigger
 *@property {object} params - the params accepted by the specific trigger type
 */

 /**
  *@typedef {object} selectFieldValue
  *@property {string} fieldName - the name of the field to select
  *@property {string} value - the exact value to be selected
  *@property {boolean} alwaysOneSelected - if true the field will be set to alwaysOneSelected after the value has been selected
  */

  /**
   *@typedef {object} selectFieldValues
   *@property {string} fieldName - the name of the field to select
   *@property {object[]} value - the exact value to be selected
   */

   /**
    *@typedef {object} value
    *@property {string} qText - the name of the field to select
    *@property {boolean} qIsNumeric - true if the value to be selected is a number
    *@property {number} qNumber - the number to be selected
    */


/**
  *@function useTrigger
  *@description a hook to handle triggers and send specific command to the engine. Currently only field selections are supported
  *@kind hook
  *@param {trigger[]} triggers - the qApp object provided by the qApp context
  *@return {triggerState} qVizHandler - return the handler to interact with the visualization retrieved from the qApp
*/

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
    if((triggersMemo&&triggersMemo.length===0)||progress===(triggersMemo&&triggersMemo.length)){
      setDone(true)
      setQLoading(false)
    }
  }, [progress, triggersMemo])

  useEffect(()=>{
    if(qDocHandler.qDoc && triggersMemo&&triggersMemo.length>0){
      triggersMemo&&triggersMemo.forEach(trigger => fire(trigger))
    }
    return () => {
      qDocHandler.qDoc&&triggersMemo&&triggersMemo.length>0&&triggersMemo.forEach(trigger=>{
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
      case 'clearField':
        trigger.params&&clearField(trigger.params)
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

  const clearField = async (params) => {
    if(params!==undefined){
      const field = await getField(qDocHandler.qDoc, params)
      if(field!==undefined){
        const clearedField = field.clear()
        return (clearedField instanceof Error)?false:true
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
    return err
  }
}

const clearField = async (field) => {
  try{
    const cleared = await field&&field.clear()
    return cleared
  }
  catch(err){
    console.log('error clearing field in trigger', err)
    return err
  }
}

export default useTriggers
