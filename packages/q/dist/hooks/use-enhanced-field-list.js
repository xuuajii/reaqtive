"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash"));

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const useEnhancedFieldList = (qFieldList, qCurrentSelections) => {
  const _useState = (0, _react.useState)(qFieldList),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        enhancedFieldList = _useState2[0],
        set = _useState2[1];

  (0, _react.useEffect)(() => {
    const fieldList = qFieldList && qFieldList.qItems; //console.log(fieldList)

    const fieldListWithSelections = fieldList && fieldList.map(field => {
      const qField = _lodash.default.find(qCurrentSelections && qCurrentSelections.qSelectionObject.qSelections, selection => {
        return selection.qField === field.qName;
      });

      return (0, _objectSpread2.default)({}, field, {
        selectedCount: qField && qField.qSelectedCount
      });
    });
    set(fieldListWithSelections);
  }, [qFieldList, qCurrentSelections]);
  return enhancedFieldList;
};

var _default = useEnhancedFieldList;
exports.default = _default;