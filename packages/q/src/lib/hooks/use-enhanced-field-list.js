import {useState, useEffect, useCallback } from 'react';
import _ from 'lodash'

const useEnhancedFieldList = (qFieldList, qCurrentSelections, neverToggleFieldsList) => {
    const enhanceFieldList = useCallback(()=> {

      const fieldList = qFieldList&&qFieldList.qItems

      const fieldListWithSelections = fieldList&&fieldList.map(field=>{
        const qField = _.find(qCurrentSelections&&qCurrentSelections.qSelectionObject.qSelections, (selection)=>{
          return selection.qField===field.qName
        });
        return {...field, selectedCount:qField&&qField.qSelectedCount}
      })

      const enhancedFieldList = fieldListWithSelections&&fieldListWithSelections.map(field=>{
        const qField = _.find(neverToggleFieldsList&&neverToggleFieldsList, (neverToggleField)=>{
          return neverToggleField.qName===field.qName
        });
        return {...field, neverToggle:qField?true:false}
      })

      return enhancedFieldList&&enhancedFieldList.length?enhancedFieldList:[]
    }
    ,[qFieldList, qCurrentSelections, neverToggleFieldsList])
    return  enhanceFieldList()
  }

//   const useEnhancedFieldList = (qFieldList, qCurrentSelections, neverToggleFieldsList) => {
//
//   const [enhancedFieldList, set] = useState(qFieldList)
//   useEffect(()=>{
//     const fieldList = qFieldList&&qFieldList.qItems
//     //console.log(fieldList)
//     const fieldListWithSelections = fieldList&&fieldList.map(field=>{
//       const qField = _.find(qCurrentSelections&&qCurrentSelections.qSelectionObject.qSelections, (selection)=>{
//         return selection.qField===field.qName
//       });
//       return {...field, selectedCount:qField&&qField.qSelectedCount}
//     })
//
//     set(fieldListWithSelections)
//   },[qFieldList, qCurrentSelections])
//
//   useEffect(()=>{
//     const fieldList = qFieldList&&qFieldList.qItems
//     const fieldListWithNeverToggle = fieldList&&fieldList.map(field=>{
//       console.log(neverToggleFieldsList)
//       const qField = _.find(neverToggleFieldsList&&neverToggleFieldsList, (neverToggleField)=>{
//         return neverToggleField.qName===field.qName
//       });
//       return {...field, neverToggle:qField?true:false}
//     })
//     set(fieldListWithNeverToggle)
//   },[qFieldList, neverToggleFieldsList])
//
//   return enhancedFieldList
// }
//
export default useEnhancedFieldList
