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

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\tabs\\tabs.js";

const Tabs = props => {
  const tabListEl = (0, _react.useRef)();
  const tabsEl = (0, _react.useRef)();

  const _useState = (0, _react.useState)(props.defaultActiveTab),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        activeTab = _useState2[0],
        setActiveTab = _useState2[1];

  (0, _react.useEffect)(() => {
    props.onActiveTabChange && props.onActiveTabChange(activeTab, []);
  }, [activeTab, props]);

  const children = _react.default.Children.toArray(props.children);

  return _react.default.createElement("div", {
    className: "tabs ".concat(props.className),
    style: (0, _objectSpread2.default)({
      position: 'relative'
    }, props.style),
    ref: tabsEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: void 0
  }, children.map(child => _react.default.cloneElement(child, {
    animatedTabs: props.animatedTabs,
    setActiveTab: setActiveTab,
    activeTab: activeTab,
    tabListEl: tabListEl,
    tabsEl: tabsEl
  })));
};

Tabs.propTypes = {
  defaultActiveTab: _propTypes.default.number,
  onActiveTabChange: _propTypes.default.func,
  animatedTabs: _propTypes.default.bool
};
Tabs.defaultProps = {
  defaultActiveTab: 0,
  onActiveTabChange: () => true,
  animatedTabs: false
};
var _default = Tabs;
exports.default = _default;