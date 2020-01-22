"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\shared\\search.js";

const Search = props => _react.default.createElement("div", {
  className: "search-container",
  ref: props.searchEl,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8
  },
  __self: void 0
}, _react.default.createElement(_layout.SearchInput, Object.assign({}, props, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8
  },
  __self: void 0
})));

var _default = Search;
exports.default = _default;