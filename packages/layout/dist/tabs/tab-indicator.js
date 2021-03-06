"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _reactSpring = require("react-spring");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/tabs/tab-indicator.js";

const TabIndicator = props => {
  const animatedProps = (0, _reactSpring.useSpring)((0, _objectSpread2.default)({}, props)); //console.log(props)

  return _react.default.createElement(_reactSpring.animated.div, {
    className: "tab-indicator",
    style: (0, _objectSpread2.default)({
      position: 'absolute',
      height: 3,
      borderRadius: '2rem',
      bottom: -1
    }, props, animatedProps),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: void 0
  });
};

var _default = TabIndicator;
exports.default = _default;