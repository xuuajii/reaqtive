import { useState, useEffect, useRef, useCallback } from 'react';
import _ from 'lodash';
import {getPatchedObject} from '../helpers/helpers'


 const useQLayoutHandler = (qObject, preventUpdate=false) =>{
  const [qLayout, setQLayout] = useState(null);
  const [qErrorCounter, setQErrorCounter] = useState(0);
  const [qError, setQError] = useState(false);
  const [qLoading, setQLoading] = useState(true);
  const [qUpdating, setQUpdating] = useState(false);
  const [onUpdate, setOnUpdate] = useState()
  const [isSelecting, setIsSelecting] = useState(false)
  const qLayoutRef = useRef()
  function handleQError(err) {
    qErrorCounter<=10
    ?setQErrorCounter(prevCounter=>prevCounter+1)
    :setQError({qError:true, rqtvMessage:'error retrieving qLayout', qErrorObject:err});
  }

  function applyQLayoutPatch(path, patch){
    const qLayoutPatched = getPatchedObject(qLayout, path, patch)
    //console.log(qLayoutPatched)
    setQLayout(qLayoutPatched)
  }

  function getQLayout(){
    qObject.getLayout()
    .then(qLayout=> {
      setQLayout(qLayout)
    })
    .catch(err=>{
      handleQError(err)
    })
  }
  const triggerUpdate = useCallback(() => {
    //console.log(preventUpdate)
    if(preventUpdate===false){
      setQUpdating(!preventUpdate)
    }
  },[preventUpdate])

  useEffect(()=>{
    const hasUpdated = !(_.isEqual(qLayoutRef.current,qLayout))&&qLayout!==null
    if(hasUpdated && qLoading===true){
      qLayoutRef.current=qLayout
      setQLoading(false)
    }
    if(hasUpdated && qUpdating===true){
      //console.log('setToFalse',qUpdating)
      qLayoutRef.current=qLayout
      setQUpdating(false)
    }
  },[qLayout])


  useEffect(()=>{
    if(qLoading===true && qObject!==null){
      getQLayout()
    }
  },[qLoading])

  const layoutUpdater = useCallback((updating)=>{
    if(isSelecting && onUpdate&&(typeof onUpdate.fn==='function')){
      qObject&&onUpdate.fn(()=>setQUpdating(false))
    }else{
      qObject&&getQLayout()
      setQUpdating(false)
    }
  },[isSelecting, onUpdate, qObject])

  useEffect(()=>{
    if(qUpdating===true && qObject!==null){
      layoutUpdater(qUpdating)
    }
  },[qUpdating])

  useEffect(() => {
    if(qObject){
     getQLayout()
     qObject.on('changed', () => triggerUpdate())
     return () => qObject.removeAllListeners()
    }
  },
  [qObject]);

  return {qLayout, qError, qLoading, applyQLayoutPatch, qUpdating, setOnUpdate, isSelecting, setIsSelecting}
}
export default useQLayoutHandler
