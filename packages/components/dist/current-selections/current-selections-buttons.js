"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectionsClarAll = exports.SelectionsForward = exports.SelectionsBack = void 0;

var _react = _interopRequireDefault(require("react"));

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\current-selections\\current-selections-buttons.js";

const SelectionsButton = props => {
  return props.show > 0 && _react.default.createElement("button", {
    className: "btn",
    onClick: props.onClick,
    disabled: props.disabled,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: void 0
  }, _react.default.createElement(_layout.LuiIcon, {
    iconType: props.iconType,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: void 0
  }), props.showLabel && props.label);
};

const SelectionsBack = props => {
  return _react.default.createElement(SelectionsButton, Object.assign({}, props, {
    iconType: 'selections-back',
    label: "back",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: void 0
  }));
};

exports.SelectionsBack = SelectionsBack;

const SelectionsForward = props => {
  return _react.default.createElement(SelectionsButton, Object.assign({}, props, {
    iconType: 'selections-forward',
    label: "forward",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: void 0
  }));
};

exports.SelectionsForward = SelectionsForward;

const SelectionsClarAll = props => {
  return _react.default.createElement(SelectionsButton, Object.assign({}, props, {
    iconType: 'clear-selections',
    label: "clear all",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: void 0
  }));
};

exports.SelectionsClarAll = SelectionsClarAll;