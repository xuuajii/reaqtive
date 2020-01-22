//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import {useEffect, useReducer, useContext} from 'react'
import {QDoc} from '../index'

const getQField = async(qDoc, qFieldName) => {
  try{
    const qField = await qDoc.getField(qFieldName)
    return qField
  } catch(err){
    return err
  }
}

const setAlwaysOneSelected = async (qField, defaultValue) => {
  // console.log('setting alway 1 selected')
  try{
    const defaultSelected = await qField.select(defaultValue)
    if(!(defaultSelected instanceof Error)){
      const result = await qField.setNxProperties({ "qOneAndOnlyOne": true })
      return result
    }
  } catch(err){
    console.log(err)
    return err
  }
}

const removeAlwaysOneSelected = async (qField) => {
  try{
    const result = await qField.setNxProperties({ "qOneAndOnlyOne": false })
    return result
  } catch(err){
    console.log(err)
    return err
  }
}

const initialState = {
  qField:null,
  qError:false,
  qErrorCounter:0,
  maxErrorCounter:10,
  rqtvMessage:null,
  qErrorObject:null,
  qLoading:true
}

const qFieldReducer = (state, action) => {
  switch (action.type) {
    case 'error':
      return state.maxErrorCounter>=state.qErrorCounter ? {...initialState, qErrorCounter: state.qErrorCounter + 1} : {...initialState, qError:true, qErrorField:action.qErrorField, rqtvMessage:'error getting field'};
    case 'successField':
      return action.isAlwaysOneSelected?{...initialState, qErrorCounter: 0, qLoading:true, qField:action.qField}:{...initialState, qErrorCounter: 0, qLoading:false, qField:action.qField};
    case 'reloadField':
      return {...initialState};
    case 'successNxProps':
      return {...state, qErrorCounter: 0, qLoading:false};
    default:
      throw new Error();
  }
}

const useQFieldReducer = (qFieldName, isAlwaysOneSelected, defaultValue, resetOnUnmount=true) => {
  const qDocHandler = useContext(QDoc)
  const qDoc = qDocHandler.qDoc
  const [qPromiseHandler, dispatch] = useReducer(qFieldReducer, initialState);
  const {qField, qLoading, qError, errorCounter} = qPromiseHandler;
  useEffect(()=>{
    const runEffect = async () => {
      const result =await getQField(qDoc, qFieldName)
      return (result instanceof Error)?dispatch({type:'error', qError:result}):dispatch({type:'successField', qField:result, isAlwaysOneSelected:isAlwaysOneSelected})
    }
    qDoc&&qFieldName&&runEffect()
  }, [qDoc, qFieldName])

  useEffect(()=>{
    return () => {
      const onUnmount = async()=>{
        const result = await removeAlwaysOneSelected(qField)
      }
      qField&&qField.removeAllListeners()
      if(resetOnUnmount&&qField&&isAlwaysOneSelected===true){
        onUnmount()
      }
    }
  },[qField, qLoading, qError, errorCounter])

  useEffect(()=>{
    const runEffect = async() => {
      if(qField!==null && isAlwaysOneSelected===true){
        const result = await setAlwaysOneSelected(qField, defaultValue)
        return (result instanceof Error)?dispatch({type:'error', qError:result}):dispatch({type:'successNxProps'})
      }
    }
    runEffect()
  },[qField, isAlwaysOneSelected])
  return {...qPromiseHandler}
}
export default useQFieldReducer
