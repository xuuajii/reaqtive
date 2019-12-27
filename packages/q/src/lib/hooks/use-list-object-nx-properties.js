//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import { useState, useEffect, useContext } from 'react';
import {QDoc} from '../index'
const useListObjectNxProperties = (qObject) =>{
  const qDoc = useContext(QDoc)
  const [qNxProperties, setQNxProperties] = useState(false);
  const [qRetryCount, setQRetryCount] = useState(0);
  const [qEngineError, setQEngineError] = useState({isError:false, errorMessage:null});

  function getNxProperties(qObject){
    qObject.getProperties()
    .then(qProperties=>{
      const qDef = qProperties.qListObjectDef.qDef
      const qActiveField=qDef.qFieldDefs[qDef.qActiveField]
      getField(qActiveField)
    })
    .catch(err=>handleQEngineError(err))
  }

  function getField(fieldName){
    qDoc.getField(fieldName)
    .then(qField=>qField.getNxProperties().then(nxProperties=>setQNxProperties(nxProperties)))
    .catch(err=>handleQEngineError(err))
  }

  function handleQEngineError(errorMessage) {
    setQRetryCount(prevRetryCount =>prevRetryCount + 1)
    if(qRetryCount>10){
      setQEngineError({isError:true, errorMessage:errorMessage});
    }
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if(qObject!==null){
      getNxProperties(qObject)
    }
  },
  [qObject,qEngineError]);
  return {qEngineError, qNxProperties};
}
export default useListObjectNxProperties
