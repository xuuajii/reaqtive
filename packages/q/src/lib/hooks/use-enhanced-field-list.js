//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect } from 'react';
import _ from 'lodash'

  const useEnhancedFieldList = (qFieldList, qCurrentSelections) => {

    const [enhancedFieldList, set] = useState(qFieldList)
  useEffect(()=>{
    const fieldList = qFieldList&&qFieldList.qItems
    //console.log(fieldList)
    const fieldListWithSelections = fieldList&&fieldList.map(field=>{
      const qField = _.find(qCurrentSelections&&qCurrentSelections.qSelectionObject.qSelections, (selection)=>{
        return selection.qField===field.qName
      });
      return {...field, selectedCount:qField&&qField.qSelectedCount}
    })

    set(fieldListWithSelections)
  },[qFieldList, qCurrentSelections])

  return enhancedFieldList
}

export default useEnhancedFieldList
