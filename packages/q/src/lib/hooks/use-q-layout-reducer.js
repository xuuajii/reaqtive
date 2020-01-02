//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect, useReducer, useCallback} from 'react'
import {useDeepCompareMemo} from '@reaqtive/layout'
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
  const promiseResultName = 'qLayout'
  switch (action.type) {
    case 'error':
      return state.maxErrorCounter<state.qErrorCounter ? {...initialState, qErrorCounter: state.qErrorCounter + 1} : {...initialState, qError:true, qErrorObject:action.qErrorObject, rqtvMessage:'error getting layout'};
    case 'success':
      const newState={...initialState, qLoading:false}
      newState[promiseResultName]=action.qPromiseResult;
      return newState;
    case 'reloadObject':
      return {...initialState}
    default:
      throw new Error();
  }
}

const useQLayoutReducer = (qObjectHandler) => {

  const [qPromiseHandler, dispatch] = useReducer(qLayoutReducer, initialState);
  const {qLoading, qLayout} = qPromiseHandler
  const [onUpdate, setOnUpdate]=useState(null)
  const qObjectHandlerMemo = useDeepCompareMemo(qObjectHandler)
  const {qObject, shouldUpdate, setShouldUpdate, isSelecting} = qObjectHandlerMemo
  //console.log({qObject, shouldUpdate, isSelecting})

  useEffect(()=>{
    const runEffect = async (qObject) => {
      const result = await getLayout(qObject)
      return result instanceof Error?dispatch({type:'error', qError:result}):dispatch({type:'success', qPromiseResult:result})
    }
    if(qLoading===true || qObject!==null){
      qObject&&runEffect(qObject)
    }
  }, [qLoading, qObject])

  const updateLayout = useCallback(()=>{
    const standardUpdate = async (qObject) => {
      const result = await getLayout(qObject)
      return result instanceof Error?dispatch({type:'error', qError:result}):dispatch({type:'success', qPromiseResult:result})
    }

    if(qObject!==null && isSelecting===true && (typeof onUpdate.fn ==='function')){
      console.log('custom update');
      onUpdate.fn()
    } else {
      console.log('standard update');
      (qObject!==null)&&standardUpdate()
    }
  },[qObject, onUpdate, isSelecting])

  useEffect(()=>{
    if(shouldUpdate===true){
      updateLayout()
      setShouldUpdate(false)
    }
  },[shouldUpdate])

  const applyQLayoutPatch = useCallback((path, patch) => {
    const qLayoutPatched = getPatchedObject(qLayout, path, patch)
    dispatch({type:'success', qPromiseResult:qLayoutPatched})
  },[qLayout])

  return {...qPromiseHandler, setOnUpdate, applyQLayoutPatch}
}

export default useQLayoutReducer
