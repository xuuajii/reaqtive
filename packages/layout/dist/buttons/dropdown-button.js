"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _button = _interopRequireDefault(require("./button"));

var _index = require("../index");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\buttons\\dropdown-button.js";

const DropdownButton = props => {
  return _react.default.createElement(_button.default, {
    className: "dropdown-toggle hide-caret ".concat(props.className),
    type: "button",
    onClick: props.onClick,
    style: props.style,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: void 0
  }, props.label, !props.hideCaret && _react.default.createElement(_index.LuiIcon, {
    iconType: "triangle-".concat(props.show ? 'top' : 'bottom'),
    className: "caret",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: void 0
  })); //{props.icon()}
};

var _default = DropdownButton;
exports.default = _default;
DropdownButton.propTypes = {
  className: _propTypes.default.string,
  hideCaret: _propTypes.default.bool
};
DropdownButton.defaultProps = {
  className: 'btn-primary text-light',
  hideCaret: false
};