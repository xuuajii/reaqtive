//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useEffect, useState} from 'react'
const useButtonLabel = (qLayout, includeFieldName) =>{
  const label = qLayout&&qLayout.label;
  const fieldName = includeFieldName&&qLayout?qLayout.qListObject.qDimensionInfo.qFallbackTitle:''
  const [buttonLabel, set] = useState(fieldName)
  useEffect(()=>{
    const buttonLabel = `${fieldName} ${label&&label[0]==='0'?'':label}`
    set(buttonLabel)
  },[fieldName, label])
  return buttonLabel
}

export default useButtonLabel
