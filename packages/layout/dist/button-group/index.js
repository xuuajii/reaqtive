"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonGroup = void 0;

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/button-group/index.js";

const ButtonGroup = props => _react.default.createElement("div", {
  className: "btn-group ".concat(props.className),
  style: props.style,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 4
  },
  __self: void 0
}, props.children);

exports.ButtonGroup = ButtonGroup;