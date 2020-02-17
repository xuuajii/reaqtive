"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSpring = require("react-spring");

var _index = require("../index");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\layout\\src\\lib\\navbar\\navbar-toggle.js";
const defaultStyle = {
  border: 0,
  outline: 'none'
};

const NavbarToggle = props => {
  const animatedProps = (0, _reactSpring.useSpring)({
    transform: props.showCollapse ? "rotate(180deg)" : "rotate(0deg)"
  });
  return _react.default.createElement("button", {
    className: "navbar-toggler",
    type: "button",
    onClick: props.toggleCollapse,
    style: (0, _objectSpread2.default)({}, defaultStyle, props.style),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  }, props.children ? props.children : props.bootstrapDefault ? _react.default.createElement("span", {
    class: "navbar-toggler-icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: void 0
  }) : _react.default.createElement(_reactSpring.animated.div, {
    style: animatedProps,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: void 0
  }, _react.default.createElement(_index.LuiIcon, {
    iconType: "triangle-bottom",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: void 0
  })));
};

NavbarToggle.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
NavbarToggle.defaultProps = {};
var _default = NavbarToggle;
exports.default = _default;