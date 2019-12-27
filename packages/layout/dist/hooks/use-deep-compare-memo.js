"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash"));

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const useDeepCompareMemo = value => {
  const ref = (0, _react.useRef)();

  if (!_lodash.default.isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

var _default = useDeepCompareMemo;
exports.default = _default;