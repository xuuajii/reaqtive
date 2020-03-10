"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _button = _interopRequireDefault(require("./button"));

var _index = require("../index");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\layout\\src\\lib\\buttons\\dropdown-button.js";

const DropdownButton = props => {
  const onClick = e => {
    typeof props.onClick === 'function' && props.onClick(e);
    typeof props.toggleMenu === 'function' && props.toggleMenu();
  };

  return _react.default.createElement(_button.default, {
    className: "dropdown-toggle hide-caret ".concat(props.className),
    type: "button",
    onClick: onClick,
    style: props.style,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, props.label, !props.hideCaret && _react.default.createElement(_index.LuiIcon, {
    iconType: "triangle-".concat(props.show ? 'top' : 'bottom'),
    className: "caret",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
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