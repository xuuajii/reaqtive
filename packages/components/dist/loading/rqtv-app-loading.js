"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _reactSpring = require("react-spring");

var _rqtvAppRendererStyle = require("./rqtv-app-renderer-style");

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\loading\\rqtv-app-loading.js";

const AnimatedNumber = props => {
  const animatedProps = (0, _reactSpring.useSpring)({
    number: props.number,
    from: {
      number: 0
    }
  });
  const style = (0, _objectSpread2.default)({
    backgroundColor: props.backgroundColor,
    fontSize: props.fontSize,
    padding: '1rem'
  }, props.style);
  return _react.default.createElement(_reactSpring.animated.span, {
    className: "rqtv-app-loading",
    style: style,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }, animatedProps.number.interpolate(x => "".concat(x.toFixed(0), "%")));
};

const RqtvAppLoading = props => {
  return _react.default.createElement("div", {
    style: (0, _objectSpread2.default)({}, _rqtvAppRendererStyle.containerStyle),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: void 0
  }, _react.default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: void 0
  }, _react.default.createElement(AnimatedNumber, {
    number: props.value,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  })), _react.default.createElement(_layout.Progress, {
    value: props.value,
    height: props.height,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: void 0
  }));
};

var _default = RqtvAppLoading;
exports.default = _default;