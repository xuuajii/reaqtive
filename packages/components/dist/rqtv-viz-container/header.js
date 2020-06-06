"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\rqtv-viz-container\\header.js";

const RqtvVizContainerHeader = _react.default.forwardRef((props, ref) => {
  //console.log(props.items)
  return _react.default.createElement("div", {
    className: "viz-container-header",
    ref: ref,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: void 0
  }, props.items.length === 1 ? _react.default.createElement("h3", {
    className: 'viz-container-title',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: void 0
  }, props.title) : _react.default.createElement(_layout.Dropdown, {
    className: "chart-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: void 0
  }, _react.default.createElement(_layout.DropdownButton, {
    label: props.title,
    className: "viz-container-dropdown-button",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: void 0
  }), _react.default.createElement(_layout.DropdownMenu, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: void 0
  }, props.items.map(item => _react.default.createElement(_layout.DropdownMenuItem, {
    key: item.id,
    action: () => props.setActiveItem(item),
    label: item.title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: void 0
  })))), _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: void 0
  }, props.children));
});

var _default = RqtvVizContainerHeader;
exports.default = _default;