//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import { useState, useEffect, useRef } from 'react';
import _ from 'lodash'
const useQObjectHandler = (qDoc, qObjectDef) =>{
  const qObjectDefRef = useRef(qObjectDef)
  const [qObject, setQObject] = useState(null);
  const [waitingQDoc , setWaitingQDoc] = useState(true);
  const [qLoading, setQLoading] = useState(true);
  const [qRetryCount, setQRetryCount] = useState(0);
  const [qEngineError, setQEngineError] = useState({isError:false, errorMessage:null});

  function handleQEngineError(errorMessage) {
    //console.log(qRetryCount)
    if(qRetryCount>10){
      setQEngineError({isError:true, rqtvMessage:'error retrieving qObject'});
    } else {
      setQRetryCount(prevRetryCount =>prevRetryCount + 1)
    }
  }

  function getQObject(){
    if(qDoc){
      qDoc.createSessionObject(qObjectDef)
      .then(qObject => {
        console.log('gotObject')
        setQObject(qObject);
      })
      .catch(err => handleQEngineError(err))
    }
  }

  /************************************/
  // trigger object creation
  /************************************/
  useEffect(()=>{
    if(qDoc!==null){
      setWaitingQDoc(false)
    }
  },[qDoc])

  useEffect(()=>{
    if(qLoading===true && waitingQDoc===false){
      getQObject()
    }
  }, [qLoading, waitingQDoc])
  /************************************/

  /************************************/
  // update after receiving object (or error)
  /************************************/
  useEffect(()=>{
    if(qObject!==null || qEngineError.qError){
      setQLoading(false)
    }
  },[qObject, qEngineError.qError])
  /************************************/

  /************************************/
  // trigger object update after error or object def change
  // trigger object reload from user input
  /************************************/

  useEffect(() => {
    setQLoading(true)
  },[qObjectDefRef.current, qRetryCount]);

  useEffect(()=>{
    if(!(_.isEqual(qObjectDef,qObjectDefRef))&&!(qObjectDefRef===null)){
      qObjectDefRef.current=qObjectDef
    }
  },[qObjectDef])

  return {qEngineError, qObject, qLoading, reloadObject:()=>setQLoading(true)};
}
export default useQObjectHandler
