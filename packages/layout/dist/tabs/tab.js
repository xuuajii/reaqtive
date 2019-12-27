"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\layout\\src\\lib\\tabs\\tab.js";

const Tab = props => {
  const handleClick = () => {
    props.setActiveTab(props.index);
    props.onClick && props.onClick();
  };

  const activeTabEl = props.isActive ? props.activeTabEl : null;
  const style = (0, _objectSpread2.default)({}, props.style);

  const activeClass = () => props.isActive ? 'active' : '';

  const Icon = () => _react.default.createElement("div", {
    className: "tab-icon ".concat(activeClass()),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: void 0
  }, props.icon || props.label[0]);

  return props.children ? _react.default.createElement("span", {
    onClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  }, props.children) : _react.default.createElement("div", {
    className: "nav-link tab ".concat(props.className, " ").concat(activeClass()),
    style: (0, _objectSpread2.default)({}, style),
    onClick: handleClick,
    ref: activeTabEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  }, props.useIcons && _react.default.createElement(Icon, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  }), props.label);
};

Tab.propTypes = {
  className: _propTypes.default.string
};
Tab.defaultProps = {
  className: ''
};
var _default = Tab;
exports.default = _default;