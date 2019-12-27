//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect, useRef } from 'react';
import _ from 'lodash'

  const useEnhancedFieldList = (qFieldList, qCurrentSelections) => {

  const qFieldListRef = useRef(qFieldList)
  useEffect(()=>{
    const hasChanged = !(_.isEqual(qFieldList, qFieldListRef.current))
    if(hasChanged){
      qFieldListRef.current=qFieldList
    }
  }, [qFieldList])

  const [enhancedFieldList, set] = useState(qFieldListRef.current)
  useEffect(()=>{
    const fieldList = qFieldListRef.current&&qFieldListRef.current.qItems
    //console.log(fieldList)
    const fieldListWithSelections = fieldList&&fieldList.map(field=>{
      const qField = _.find(qCurrentSelections&&qCurrentSelections.qSelectionObject.qSelections, (selection)=>{
        return selection.qField===field.qName
      });
      return {...field, selectedCount:qField&&qField.qSelectedCount}
    })
    set(fieldListWithSelections)
  },[qFieldListRef.current, qCurrentSelections])

  return enhancedFieldList
}

export default useEnhancedFieldList
