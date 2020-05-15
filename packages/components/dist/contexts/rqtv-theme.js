"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RqtvThemeProvider = exports.RqtvTheme = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/contexts/rqtv-theme.js";

const RqtvTheme = _react.default.createContext();

exports.RqtvTheme = RqtvTheme;

const RqtvAppConsumer = props => {
  const theme = {
    useRippleEffect: true,
    useShadowEffect: true,
    useAnimations: true
  };
  return _react.default.createElement(RqtvTheme.Provider, {
    value: rqtvAppHandler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: void 0
  }, props.children);
};

const RqtvThemeProvider = props => {
  return _react.default.createElement(RqtvThemeProvider, {
    qConfig: props.qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  }, _react.default.createElement(RqtvThemeApiConsumer, {
    qConfig: props.qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  }, props.children));
};

exports.RqtvThemeProvider = RqtvThemeProvider;