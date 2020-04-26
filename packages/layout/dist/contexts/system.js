"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemProvider = exports.System = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useDebounce3 = require("use-debounce");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/contexts/system.js";

const System = _react.default.createContext();

exports.System = System;

const SystemProvider = props => {
  const calculateScreenType = width => {
    //console.log(width>=props.breakPoints.xl)
    switch (true) {
      case width >= props.breakPoints.xxl:
        return 'xxl';
      //break;

      case width >= props.breakPoints.xl:
        return 'xl';
      //break;

      case width >= props.breakPoints.lg:
        return 'lg';
      //break;

      case width >= props.breakPoints.md:
        return 'md';
      //break;

      case width >= props.breakPoints.sm:
        return 'sm';
      //break;

      default:
        return 'xs';
    }
  };

  const _useState = (0, _react.useState)(window.innerWidth),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        windowWidth = _useState2[0],
        setWindowWidth = _useState2[1];

  const _useDebounce = (0, _useDebounce3.useDebounce)(windowWidth, 100),
        _useDebounce2 = (0, _slicedToArray2.default)(_useDebounce, 1),
        debouncedWindowWidth = _useDebounce2[0];

  (0, _react.useEffect)(() => {
    const handleWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowWidth);
    return () => window.removeEventListener("resize", handleWindowWidth);
  }, []);

  const _useState3 = (0, _react.useState)(calculateScreenType(window.innerWidth)),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        screenType = _useState4[0],
        setScreenType = _useState4[1];

  (0, _react.useEffect)(() => {
    setScreenType(calculateScreenType(window.innerWidth));
  }, [debouncedWindowWidth]); //handle html Overflow

  const html = () => document.getElementsByTagName('html')[0];

  const hideOverflow = () => {
    html().style.overflow = 'hidden';
  };

  const showOverflow = () => {
    html().style.overflow = 'auto';
  };

  return _react.default.createElement(System.Provider, {
    value: {
      windowWidth,
      screenType,
      breakPoints: props.breakPoints,
      hideOverflow,
      showOverflow,
      getAppMainNode: html
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: void 0
  }, props.children);
};

exports.SystemProvider = SystemProvider;
SystemProvider.propTypes = {
  breakPoints: _propTypes.default.object
};
SystemProvider.defaultProps = {
  breakPoints: {
    sm: 350,
    md: 576,
    lg: 768,
    xl: 992,
    xxl: 1200
  }
};