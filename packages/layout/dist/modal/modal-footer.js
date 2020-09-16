"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\modal\\modal-footer.js";

const ModalFooter = props => _react.default.createElement("div", {
  className: "modal-footer",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 4
  },
  __self: void 0
}, props.showDismiss && _react.default.createElement("button", {
  type: "button",
  className: "btn btn-secondary",
  onClick: props.closeModal,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6
  },
  __self: void 0
}, props.dismissLabel), props.children);

var _default = ModalFooter;
exports.default = _default;