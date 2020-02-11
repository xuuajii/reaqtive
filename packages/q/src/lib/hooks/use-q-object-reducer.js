//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect, useContext, useReducer} from 'react'
import {useDeepCompareMemo} from '@reaqtive/layout'
import {QDoc} from '../index'


const getQObject = async(qDoc, qObjectDef) => {
  try{
    const qObject = await qDoc.createSessionObject(qObjectDef)
    return qObject
  } catch(err){
    return err
  }
}

const initialState = {
  qObject:null,
  qError:false,
  qErrorCounter:0,
  maxErrorCounter:10,
  rqtvMessage:null,
  qErrorObject:null,
  qLoading:true
}

const qObjectReducer = (state, action) => {
  switch (action.type) {
    case 'error':
      return state.maxErrorCounter>=state.qErrorCounter ? {...initialState, qErrorCounter: state.qErrorCounter + 1} : {...initialState, qError:true, qErrorObject:action.qErrorObject, rqtvMessage:'error getting object'};
    case 'success':
      return {...initialState, qErrorCounter: 0, qLoading:false, qObject:action.qObject};
    case 'reloadObject':
      return {...initialState}
    default:
      throw new Error();
  }
}

/**
 * @typedef {object} qObjectHandler - the object returned by useQObjectReducer
 * @property {boolean} qLoading - if true the the handler is still waiting for response from the qlik server
 * @property {boolean} qError - if true there was an error retrieving the qObject from the engine
 * @property {object} qObject - the object returned from the server
 * @property {function} reloadObject - a method to ask the qlik engine to recalculate the qObject
 * @property {boolean} shouldUpdate - a boolean variable which is set to true when the object is recalculated and you should ask the engine fro the layou (e.g. after selections)
 * @property {function} setShouldUpdate - a function to clean up the shouldupdate property after the needed effects have run
 */

 /**
  * @typedef {function} hook
  * @type {function}
  */

/**
  *@function useQObjectReducer(qObjectDef) - a hook to create and retrieve a generic object from the qlik engine
  *@kind {hook}
  *@param {object} qObjectDef - The object that tells to the qlik engine what object you want
  *@return {qObjectHandler} Returns the handler of the newly created object
*/

const useQObjectReducer = (qObjectDef) => {
  const maxError = 10;
  const qDocHandler = useContext(QDoc)
  const qDoc = qDocHandler&&qDocHandler.qDoc
  const qObjectDefMemo = useDeepCompareMemo(qObjectDef)
  const [qPromiseHandler, dispatch] = useReducer(qObjectReducer, initialState);
  const {errorCounter, qLoading, qError, qObject} = qPromiseHandler
  const [shouldUpdate, setShouldUpdate] = useState()
  const [isSelecting, setIsSelecting] = useState(false)
  useEffect(()=>{

    let isSubscribed=true
    const runEffect = async () => {
      if(qDoc){
        const result = await getQObject(qDoc, qObjectDefMemo)
        result instanceof Error?dispatch({type:'error', qError:result}):isSubscribed&&dispatch({type:'success', qObject:result})
      }
    }
    if(qLoading){
      isSubscribed&&runEffect()
    }
    return () => isSubscribed=false
  }, [qObjectDefMemo, qDoc, errorCounter, qLoading])

  useEffect(()=>{
    let isSubscribed=true
    if(qLoading===false && qObject!==null){
      qObject.on('changed', ()=>setShouldUpdate(isSubscribed))
    }
    return () => {
      isSubscribed=false
      qObject&&qObject.removeAllListeners()
    }
  },[qLoading, qObject])

  return {
      ...qPromiseHandler,
      reloadObject:()=>dispatch({type:'reloadObject'}),
      shouldUpdate,
      setShouldUpdate
    }
}

export default useQObjectReducer
