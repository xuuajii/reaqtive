//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect, useCallback, useContext} from 'react'
import {QDoc} from '../index'

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

const abortModal = (qDoc, isSelecting) => {
  if(QDoc && isSelecting){
    qDoc&&qDoc.abortModal(false)
  }
}

const useQSelectionHandler = (qObject) => {
  const [isSelecting, setIsSelecting] = useState(false)
  const qDocHandler = useContext(QDoc)
  const qDoc = qDocHandler.qDoc
  useEffect(()=>{
    return () => abortModal(qDoc, isSelecting)
  }, [qDoc, isSelecting])

  const beginSelections = useCallback((callback) => {
    const fn = async () => {
      try{
        const result = await qBeginSelections(qObject)
        //console.log('res',result)
      } catch(err){
        console.log(err)
        setIsSelecting(false)
      } finally {
        callback()
      }
    }
    setIsSelecting(true)
    fn(qObject)
  }, [qObject])

  const endSelections = useCallback((qAccept, callback) => {
    const result = qEndSelections(qObject, qAccept)
    if(!(result instanceof Error)){
      //console.log('end')
      setIsSelecting(false);
      (typeof callback==='function')&&callback();
    }
  }, [qObject])

  const handleSelections = useCallback((callback, quickSelectionMode=false)=>{
    if(quickSelectionMode===false && isSelecting===false){
      beginSelections(callback)
    } else {
      //console.log('else')
      callback()
    }
  }, [isSelecting, qObject])

  return { isSelecting, handleSelections, endSelections, beginSelections}
}

export default useQSelectionHandler
