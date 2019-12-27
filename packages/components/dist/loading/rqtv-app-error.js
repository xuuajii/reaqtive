"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _layout = require("@reaqtive/layout");

var _rqtvAppRendererStyle = require("./rqtv-app-renderer-style");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\loading\\rqtv-app-error.js";

const RqtvAppError = props => _react.default.createElement("div", {
  style: _rqtvAppRendererStyle.containerStyle,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9
  },
  __self: void 0
}, _react.default.createElement("div", {
  className: "alert alert-light",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 10
  },
  __self: void 0
}, _react.default.createElement("div", {
  className: "d-flex flex-column align-items-center",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 11
  },
  __self: void 0
}, _react.default.createElement("div", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 12
  },
  __self: void 0
}, _react.default.createElement(_layout.LuiIcon, {
  iconType: "warning-triangle",
  className: "lui-icon--large",
  style: {
    color: 'red',
    fontSize: '6rem'
  },
  __source: {
    fileName: _jsxFileName,
    lineNumber: 12
  },
  __self: void 0
})), _react.default.createElement("div", {
  style: {
    fontSize: '3rem',
    textAlign: 'center'
  },
  __source: {
    fileName: _jsxFileName,
    lineNumber: 13
  },
  __self: void 0
}, "Ooops something went wrong connecting to the qlik engine"), _react.default.createElement("div", {
  style: {
    margin: 10
  },
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14
  },
  __self: void 0
}, "(", props.errorMessage, ")"))));

var _default = RqtvAppError;
exports.default = _default;