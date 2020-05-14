"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = require("./index");

var _index2 = require("../contexts/index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/tabs/tab-list.js";

const TabList = props => {
  const system = (0, _react.useContext)(_index2.System);
  const activeTabEl = (0, _react.useRef)();

  const children = _react.default.Children.toArray(props.children);

  const tabsWidth = props.tabListEl.current && props.tabListEl.current.offsetWidth;

  const updateIndicator = () => {
    if (activeTabEl.current) {
      setIndicatorPlacement({
        left: activeTabEl.current.offsetLeft,
        width: activeTabEl.current.offsetWidth,
        top: activeTabEl.current.offsetHeight - 1
      });
    }
  };

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        indicatorPlacement = _useState2[0],
        setIndicatorPlacement = _useState2[1];

  (0, _react.useEffect)(() => {
    updateIndicator();
  }, [props.activeTab, system.windowWidth, tabsWidth]);
  return _react.default.createElement("nav", {
    className: "nav nav-tabs tab-list",
    ref: props.tabListEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: void 0
  }, children.map((child, index) => {
    const additionalProps = {
      setActiveTab: props.setActiveTab,
      isActive: props.activeTab === index,
      index: index,
      useIcons: props.useIcons
    };
    return typeof child.type === "function" ? _react.default.cloneElement(child, additionalProps.isActive ? (0, _objectSpread2.default)({}, additionalProps, {
      activeTabEl: activeTabEl
    }) : additionalProps) : _react.default.createElement(_index.Tab, Object.assign({}, additionalProps, {
      key: child.key
    }, child.props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: void 0
    }), child);
  }), _react.default.createElement(_index.TabIndicator, Object.assign({}, indicatorPlacement, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: void 0
  })));
};

TabList.propTypes = {
  useIcons: _propTypes.default.bool
};
TabList.defaultProps = {
  useIcons: false
};
var _default = TabList;
exports.default = _default;