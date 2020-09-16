"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _index = require("../index");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\tabs\\tab-panels.js";
const animationWrapperStyle = {
  position: 'relative',
  width: '100%',
  height: '100%'
};

const TabPanels = props => {
  const _useState = (0, _react.useState)(props.activeTab),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        activeTab = _useState2[0],
        setActiveTab = _useState2[1];

  const _useState3 = (0, _react.useState)('up'),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        transitionDirection = _useState4[0],
        setTransitionDirection = _useState4[1];

  (0, _react.useEffect)(() => {
    setTransitionDirection(props.activeTab > activeTab ? 'up' : 'down');
    setActiveTab(props.activeTab);
  }, [props.activeTab]);

  const children = _react.default.Children.toArray(props.children);

  const tabsEl = props.tabsEl,
        tabListEl = props.tabListEl;
  return _react.default.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      display: 'flex'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: void 0
  }, props.animatedTabs ? _react.default.createElement(_index.Carousel, {
    index: activeTab,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: void 0
  }, children.map((child, index) => {
    return _react.default.cloneElement(child, {
      tabsEl,
      tabListEl
    });
  })) : children.map((child, index) => index === activeTab && _react.default.createElement("div", {
    key: index === activeTab && index,
    style: {
      width: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }, _react.default.cloneElement(child, {
    tabsEl,
    tabListEl
  }))));
};

var _default = TabPanels;
exports.default = _default;