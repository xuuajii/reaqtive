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

const qBeginSelections = async (qObject) => {
  try{
    const result = qObject.beginSelections(['/qListObjectDef'])
    return result
  } catch(err){
    return err
  }
}

const qEndSelections = async (qObject, qAccept) => {
  try{
    const isQAccepting=qAccept==='1'||qAccept===1||qAccept===true?true:false
    const result = qObject.endSelections(isQAccepting)
    return result
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
      return state.maxErrorCounter<state.qErrorCounter ? {...initialState, qErrorCounter: state.qErrorCounter + 1} : {...initialState, qError:true, qErrorObject:action.qErrorObject, rqtvMessage:'error getting object'};
    case 'success':
      return {...initialState, qErrorCounter: 0, qLoading:false, qObject:action.qObject};
    case 'reloadObject':
      return {...initialState}
    default:
      throw new Error();
  }
}


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
    const runEffect = async () => {
      if(qDoc){
        const result = await getQObject(qDoc, qObjectDefMemo)
        result instanceof Error?dispatch({type:'error', qError:result}):dispatch({type:'success', qObject:result})
      }
    }
    if(qLoading){
      runEffect()
    }
  }, [qObjectDefMemo, qDoc, errorCounter, qLoading])

  useEffect(()=>{
    if(qLoading===false && qObject!==null){
      qObject.on('changed', ()=>setShouldUpdate(true))
    }
    return () => qObject&&qObject.removeAllListeners()
  },[qLoading, qObject])

  const beginSelections = (callback) => {
    setIsSelecting(true)
    const result = qBeginSelections(qObject)
    result instanceof Error?setIsSelecting(false):callback()
  }

  const endSelections = (qAccept, callback) => {
    const result = qEndSelections(qObject, qAccept)
    if(!(result instanceof Error)){
      setIsSelecting(false);
      (typeof callback==='function')&&callback();
    }
  }

  return {
      ...qPromiseHandler,
      reloadObject:()=>dispatch({type:'reloadObject'}),
      shouldUpdate,
      setShouldUpdate,
      isSelecting,
      beginSelections,
      endSelections
    }
}

export default useQObjectReducer
