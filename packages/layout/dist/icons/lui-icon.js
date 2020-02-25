"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\icons\\lui-icon.js";

const LuiIcon = props => _react.default.createElement("span", {
  className: "lui-icon lui-icon--".concat(props.iconType, " ").concat(props.className),
  style: (0, _objectSpread2.default)({}, props.style),
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7
  },
  __self: void 0
});

var _default = LuiIcon;
exports.default = _default;