"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const useButtonLabel = (qLayout, includeFieldName) => {
  const label = qLayout && qLayout.label;
  const fieldName = includeFieldName && qLayout ? qLayout.qListObject.qDimensionInfo.qFallbackTitle : '';

  const _useState = (0, _react.useState)(fieldName),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        buttonLabel = _useState2[0],
        set = _useState2[1];

  (0, _react.useEffect)(() => {
    const buttonLabel = "".concat(fieldName, " ").concat(label && label[0] === '0' ? '' : label);
    set(buttonLabel);
  }, [fieldName, label]);
  return buttonLabel;
};

var _default = useButtonLabel;
exports.default = _default;