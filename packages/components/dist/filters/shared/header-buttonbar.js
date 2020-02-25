"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\shared\\header-buttonbar.js";

const HeaderButtonbar = props => _react.default.createElement("div", {
  className: "header-toolbar",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9
  },
  __self: void 0
}, _react.default.createElement("div", {
  className: "btn-group",
  role: "group",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 10
  },
  __self: void 0
}, _react.default.createElement("button", {
  className: "btn",
  onClick: () => props.clearSelections(),
  __source: {
    fileName: _jsxFileName,
    lineNumber: 11
  },
  __self: void 0
}, _react.default.createElement(_layout.Icon, {
  type: _layout.deleteForever,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 12
  },
  __self: void 0
})), _react.default.createElement("button", {
  className: "btn",
  onClick: () => props.selectExcluded(),
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14
  },
  __self: void 0
}, _react.default.createElement(_layout.Icon, {
  type: _layout.swap,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 15
  },
  __self: void 0
}))));

var _default = HeaderButtonbar;
exports.default = _default;