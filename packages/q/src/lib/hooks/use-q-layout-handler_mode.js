//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useState, useEffect } from 'react';
// import _ from 'lodash';
import {getPatchedObject} from '../helpers/object-patcher'


 const useQLayoutHandler = (qObject) =>{
  const [qLayout, setQLayout] = useState(null);
  const [qErrorCounter, setQErrorCounter] = useState(0);
  const [qError, setQError] = useState(false);
  const [qLoading, setQLoading] = useState(true);
  const [qUpdating, setQUpdating] = useState(false);

  function handleQLayout(qLayout) {
    setQLayout(qLayout);
    setQLoading(false);
  }

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

  // OLD patched layout
  // function handlePatchedLayout(){
  //   if(qLayoutPatch){
  //       //qLayoutPatch.getQLayoutPatch((qNewDataPage)=>{
  //       if(qLayoutPatch.patch){
  //         const qLayoutPatched = getPatchedObject(qLayout, qLayoutPatch.path, qLayoutPatch.patch)
  //         //console.log(qLayoutPatched)
  //         setQLayout(qLayoutPatched)
  //       }
  //     //})
  //     // if(qLayoutPatch.method)qLayoutPatch.method(qLayoutPatch.qDisplayArea).then(res=>console.log(res))
  //   	}else{
  //       //console.log('layout', qLayout&&qLayout.appObjectId)
  //       qObject.getLayout()
  //       .then(qLayout=> handleQLayout(qLayout))
  //       .catch(err=>handleQError(err))
  //     }
  // }

  function getQLayout(){
    qObject.getLayout()
    .then(qLayout=> {
      console.log('gotlayout')
      setQLayout(qLayout)
    })
    .catch(err=>handleQError(err))
  }
  const updateLayout = () => {
    setQUpdating(true)
  }
  useEffect(()=>{
    if(qLayout || qError.qError){
      setQLoading(false)
      setQUpdating(false)
    }
  },[qLayout, qError])

  useEffect(()=>{

    if((qLoading===true || qUpdating===true) && qObject!==null){
      getQLayout()
    }
  },[qLoading, qUpdating])

  useEffect(() => {
    if(qObject){
      getQLayout()
     qObject.on('changed', () => updateLayout())
     return () => qObject.removeAllListeners()
    }
  },
  [qObject]);
  return {qLayout, qError, qLoading, applyQLayoutPatch}
}
export default useQLayoutHandler
