"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _button = _interopRequireDefault(require("./button"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\layout\\src\\lib\\buttons\\dropdown-button.js";

const DropdownButton = props => {
  return _react.default.createElement(_button.default, {
    className: "dropdown-toggle hide-caret ".concat(props.className),
    type: "button",
    onClick: props.onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: void 0
  }, props.label, !props.hideCaret && _react.default.createElement(LuiIcon, {
    iconType: "triangle-".concat(props.show ? 'top' : 'bottom'),
    className: "caret",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: void 0
  })); //{props.icon()}
};

DropdownButton.propTypes = {
  className: PropTypes.string,
  hideCaret: PropTypes.bool
};
DropdownButton.defaultProps = {
  className: 'btn-primary text-light',
  hideCaret: false
};