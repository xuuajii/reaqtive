"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\shared\\end-selections-buttons.js";

const EndSelectionButtons = props => _react.default.createElement("div", {
  className: "end-selections-buttons",
  hidden: !props.isSelecting,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 4
  },
  __self: void 0
}, _react.default.createElement("button", {
  className: "icon-wrapper text-danger",
  onClick: e => props.endSelections(e.target.dataset.qAccept),
  "data-q-accept": 0,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 5
  },
  __self: void 0
}, _react.default.createElement("span", {
  className: "lui-icon  lui-icon--close",
  "data-q-accept": 0,
  "aria-hidden": "true",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6
  },
  __self: void 0
})), _react.default.createElement("button", {
  className: "icon-wrapper text-success",
  onClick: e => props.endSelections(e.target.dataset.qAccept),
  "data-q-accept": 1,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8
  },
  __self: void 0
}, _react.default.createElement("span", {
  className: "lui-icon  lui-icon--tick",
  "aria-hidden": "true",
  "data-q-accept": 1,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9
  },
  __self: void 0
})));

var _default = EndSelectionButtons;
exports.default = _default;