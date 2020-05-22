"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash"));

const useEnhancedFieldList = (qFieldList, qCurrentSelections, neverToggleFieldsList) => {
  const enhanceFieldList = (0, _react.useCallback)(() => {
    const fieldList = qFieldList && qFieldList.qItems;
    const fieldListWithSelections = fieldList && fieldList.map(field => {
      const qField = _lodash.default.find(qCurrentSelections && qCurrentSelections.qSelectionObject.qSelections, selection => {
        return selection.qField === field.qName;
      });

      return (0, _objectSpread2.default)({}, field, {
        selectedCount: qField && qField.qSelectedCount
      });
    });
    const enhancedFieldList = fieldListWithSelections && fieldListWithSelections.map(field => {
      const qField = _lodash.default.find(neverToggleFieldsList && neverToggleFieldsList, neverToggleField => {
        return neverToggleField.qName === field.qName;
      });

      return (0, _objectSpread2.default)({}, field, {
        neverToggle: qField ? true : false
      });
    });
    return enhancedFieldList && enhancedFieldList.length ? enhancedFieldList : [];
  }, [qFieldList, qCurrentSelections, neverToggleFieldsList]);
  return enhanceFieldList();
}; //   const useEnhancedFieldList = (qFieldList, qCurrentSelections, neverToggleFieldsList) => {
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


var _default = useEnhancedFieldList;
exports.default = _default;