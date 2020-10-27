"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/modal/modal-body.js";

const ModalBody = props => _react.default.createElement("div", {
  className: "modal-body ".concat(props.className),
  style: props.style,
  ref: props.modalBodyEl,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 5
  },
  __self: void 0
}, props.children);

var _default = ModalBody;
exports.default = _default;
ModalBody.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
ModalBody.defaultProps = {
  className: '',
  style: {}
};