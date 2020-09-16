"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\modal\\modal-header.js";

const ModalHeader = props => {
  return _react.default.createElement("div", {
    className: "modal-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: void 0
  }, _react.default.createElement("h5", {
    className: "modal-title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: void 0
  }, props.title), props.showDismiss && _react.default.createElement("button", {
    type: "button",
    className: "close",
    onClick: props.closeModal,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: void 0
  }, _react.default.createElement("span", {
    "aria-hidden": "true",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: void 0
  }, "\xD7")));
};

ModalHeader.propTypes = {
  showDismiss: _propTypes.default.bool
};
ModalHeader.defaultProps = {
  showDismiss: true
};
var _default = ModalHeader;
exports.default = _default;