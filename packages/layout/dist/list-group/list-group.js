"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\list-group\\list-group.js";

const ListGroup = props => {
  return _react.default.createElement("ul", {
    className: "list-group ".concat(props.className),
    style: (0, _objectSpread2.default)({}, props.style),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 5
    },
    __self: void 0
  }, props.children);
};

var _default = ListGroup;
exports.default = _default;