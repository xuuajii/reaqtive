"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/modal/modal-dialog.js";

const ModalDialog = props => {
  const children = _react.default.Children.toArray(props.children);

  return _react.default.createElement("div", {
    className: "modal-dialog",
    role: "document",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "modal-content",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: void 0
  }, children.map(child => _react.default.cloneElement(child, {
    closeModal: props.closeModal
  }))));
};

var _default = ModalDialog;
exports.default = _default;