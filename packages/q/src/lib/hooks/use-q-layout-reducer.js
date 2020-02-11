//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect, useReducer, useCallback} from 'react'
import {getPatchedObject} from '../helpers/helpers'

const getLayout = async(qObject) => {
  try{
    const qLayout = await qObject.getLayout()
    return qLayout
  } catch(err){
    return err
  }
}

const initialState = {
  qLayout:null,
  qError:false,
  qErrorCounter:0,
  maxErrorCounter:10,
  rqtvMessage:null,
  qErrorObject:null,
  qLoading:true
}

const qLayoutReducer = (state, action) => {
  switch (action.type) {
    case 'error':
      const newErrorCounter = state.qErrorCounter + 1;
      return state.maxErrorCounter>=state.qErrorCounter ? {...initialState, qErrorCounter: newErrorCounter} : {...initialState, qLoading:false, qError:true, qErrorObject:action.qErrorObject, rqtvMessage:'error getting layout'};
    case 'success':
      return {...initialState, qLoading:false, qLayout:action.qLayout};
    case 'reloadObject':
      return {...initialState}
    default:
      throw new Error();
  }
}

const useQLayoutReducer = (qObjectHandler, qSelectionHandler) => {

  const [qPromiseHandler, dispatch] = useReducer(qLayoutReducer, initialState);
  const {qLoading, qLayout, qErrorCounter, qError} = qPromiseHandler
  const [layoutUpdater, setLayoutUpdater]=useState(null)

  const {qObject, shouldUpdate, setShouldUpdate, qVariable} = qObjectHandler
  const { isSelecting } = qSelectionHandler || false
  const layoutProvider = qObject||qVariable

  //first call to get layout
  useEffect(()=>{
    let isSubscribed=true
    const runEffect = async (layoutProvider) => {
      const result = await getLayout(layoutProvider)
      return (result instanceof Error)?dispatch({type:'error', qError:result}):dispatch({type:'success', qLayout:result})
    }
    if(qLoading===true && layoutProvider!==null && isSubscribed===true){
      layoutProvider&&runEffect(layoutProvider)
    }
    return ()=> isSubscribed=false
  }, [qLoading, layoutProvider, qErrorCounter])


  //handle the function that updates the layout: the function changes for generic-objects which are not in quickSelectionMode
  //when an object not in quickSelectionMode is in isSelecting state the update function should be passed by the component
  //using the layout
  const updateLayout = useCallback(()=>{
    const standardUpdate = async () => {
      const result = await getLayout(layoutProvider)
      return result instanceof Error?dispatch({type:'error', qError:result}):dispatch({type:'success', qLayout:result})
    }
    if(layoutProvider!==null && isSelecting===true && (typeof layoutUpdater ==='function')){
      layoutUpdater()
    } else {
      (layoutProvider!==null)&&standardUpdate()
    }
  },[layoutUpdater, isSelecting, layoutProvider])

  // call for layout update when the engine recalculates the qObject
  useEffect(()=>{
    let isSubscribed=true
    if(shouldUpdate===true && isSubscribed===true){
      updateLayout()
      setShouldUpdate(false)
    }
    return ()=> isSubscribed=false
  },[shouldUpdate, updateLayout])


  // method used by the components using the layout to update the layout
  const applyQLayoutPatch = useCallback((path, patch) => {
    const qLayoutPatched = getPatchedObject(qLayout, path, patch)
    dispatch({type:'success', qLayout:qLayoutPatched})
  },[qLayout])

  return {...qPromiseHandler, setLayoutUpdater, applyQLayoutPatch}
}

export default useQLayoutReducer
