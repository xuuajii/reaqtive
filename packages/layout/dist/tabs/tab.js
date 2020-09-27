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

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/tabs/tab.js";

const Tab = props => {
  const handleClick = () => {
    props.setActiveTab(props.index);
    props.onClick && props.onClick();
  };

  const tabEl = (0, _react.useRef)();
  const style = props.style;

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        tabWidth = _useState2[0],
        setTabWidth = _useState2[1];

  (0, _react.useEffect)(() => {
    props.fixedWidth && setTabWidth(tabEl.current.offsetWidth);
  }, [tabEl.current]);
  (0, _react.useEffect)(() => {
    if (props.isActive === true) {
      props.activeTabEl.current = tabEl.current;
    }
  }, [props.isActive, tabEl.current]);

  const activeClass = () => props.isActive ? 'active' : '';

  const Icon = () => _react.default.createElement("div", {
    className: "tab-icon ".concat(activeClass()),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: void 0
  }, props.icon || props.label[0]);

  return props.children ? _react.default.createElement("span", {
    onClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  }, props.children) : _react.default.createElement("div", {
    className: "nav-link tab ".concat(props.className, " ").concat(activeClass()),
    style: (0, _objectSpread2.default)({}, style, {
      width: tabWidth
    }),
    onClick: handleClick,
    ref: tabEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }, props.useIcons && _react.default.createElement(Icon, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: void 0
  }), _react.default.createElement("span", {
    className: "tab-label",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: void 0
  }, props.label));
};

Tab.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  isActive: _propTypes.default.bool,
  fixedWidth: _propTypes.default.bool
};
Tab.defaultProps = {
  className: '',
  style: {},
  fixedWidth: false
};
var _default = Tab;
exports.default = _default;