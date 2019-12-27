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
const useIsMounted = () => {
  const _useState = (0, _react.useState)(true),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isMounted = _useState2[0],
        set = _useState2[1];

  (0, _react.useEffect)(() => {
    return () => set(false);
  }, []);
  return isMounted;
};

var _default = useIsMounted;
exports.default = _default;