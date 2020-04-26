"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactSpring = require("react-spring");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/navbar/hamburger-menu.js";
const openedTransformationConfig = {
  top: 'translate(2, 2) rotate(0)',
  center: 'translate(2, 14) rotate(0)',
  bottom: 'translate(2, 26) rotate(0)',
  opacity: 1
};
const closedTransformationConfig = {
  top: 'translate(10, 0) rotate(45)',
  center: 'translate(-50, 14) rotate(0)',
  bottom: 'translate(7, 28) rotate(-45)',
  opacity: 0
};

const HamburgerMenu = ({
  isOpen
}) => {
  const _useSpring = (0, _reactSpring.useSpring)({
    to: isOpen ? closedTransformationConfig : openedTransformationConfig,
    config: _reactSpring.config.stiff
  }),
        top = _useSpring.top,
        center = _useSpring.center,
        bottom = _useSpring.bottom,
        opacity = _useSpring.opacity;

  return _react.default.createElement("span", {
    className: "hamburger-menu",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  }, _react.default.createElement(_reactSpring.animated.svg, {
    width: "44",
    height: "35",
    viewBox: "0 0 44 35",
    xmlns: "http://www.w3.org/2000/svg",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }, _react.default.createElement(_reactSpring.animated.rect, {
    width: "40",
    height: "3",
    rx: "1",
    transform: top,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: void 0
  }), _react.default.createElement(_reactSpring.animated.rect, {
    width: "40",
    height: "3",
    rx: "1",
    transform: center,
    opacity: opacity,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: void 0
  }), _react.default.createElement(_reactSpring.animated.rect, {
    width: "40",
    height: "3",
    rx: "1",
    transform: bottom,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: void 0
  })));
};

var _default = HamburgerMenu;
exports.default = _default;