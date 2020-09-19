"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/list-group/list-group-item.js";

const ListGroupItem = props => {
  return _react.default.createElement("li", {
    className: "list-group-item ".concat(props.className),
    style: (0, _objectSpread2.default)({}, props.style),
    onClick: e => props.onClick(e),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: void 0
  }, props.children);
};

var _default = ListGroupItem;
exports.default = _default;