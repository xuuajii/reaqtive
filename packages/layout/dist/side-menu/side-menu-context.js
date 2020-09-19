"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideMenuContextProvider = exports.SideMenuContext = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _index = require("../index");

var _useConfig = _interopRequireDefault(require("./use-config"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/side-menu/side-menu-context.js";

const SideMenuContext = _react.default.createContext();

exports.SideMenuContext = SideMenuContext;

const SystemConsumer = props => _react.default.createElement(_index.SystemProvider, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8
  },
  __self: void 0
}, props.children);

const SideMenuContextProvider = props => {
  const system = (0, _react.useContext)(_index.System);

  const _useState = (0, _react.useState)(props.isOpen),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isOpen = _useState2[0],
        setIsOpen = _useState2[1];

  const closeSideMenu = () => {
    setIsOpen(false);
    props.onClose && props.onClose();
  };

  (0, _react.useEffect)(() => {
    props.isOpen === true ? setIsOpen(true) : closeSideMenu();
  }, [props.isOpen, closeSideMenu]);
  const breakPoints = props.breakPoints,
        alwaysStaticMain = props.alwaysStaticMain,
        defaultRatio = props.defaultRatio;
  const config = (0, _useConfig.default)(system.screenType, {
    breakPoints,
    alwaysStaticMain,
    defaultRatio
  });

  const _useState3 = (0, _react.useState)(config.ratio),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        sidemenuWidthRatio = _useState4[0],
        setSideMenuWidthRatio = _useState4[1];

  const containerWidth = system.windowWidth;
  (0, _react.useEffect)(() => {
    setSideMenuWidthRatio(config.ratio);
  }, [config.ratio, config.staticMain]);
  const sidemenuWidth = containerWidth * sidemenuWidthRatio;
  return _react.default.createElement(SystemConsumer, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: void 0
  }, _react.default.createElement(SideMenuContext.Provider, {
    value: {
      config,
      closeSideMenu,
      isOpen,
      sidemenuWidth
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: void 0
  }, props.children));
};

exports.SideMenuContextProvider = SideMenuContextProvider;