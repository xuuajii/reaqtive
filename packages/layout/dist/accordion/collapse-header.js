"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSpring = require("react-spring");

var _index = require("../index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/accordion/collapse-header.js";

const CollapseHeader = props => {
  const animationWrapperEl = (0, _react.useRef)();
  const transitions = (0, _reactSpring.useTransition)(props.isExpanded, null, {
    initial: {
      position: 'absolute',
      opacity: 1,
      transform: 'rotate(0deg)'
    },
    from: {
      position: 'absolute',
      opacity: 0,
      transform: 'rotate(180deg)'
    },
    enter: {
      position: 'absolute',
      opacity: 1,
      transform: 'rotate(0deg)'
    },
    leave: {
      position: 'absolute',
      opacity: 0,
      transform: 'rotate(180deg)'
    }
  });
  const titleAnimatedStyles = (0, _reactSpring.useSpring)({
    opacity: props.isExpanded ? 0 : 1
  });
  return _react.default.createElement("div", {
    className: "collapse-header",
    style: {
      overflow: 'hidden'
    },
    ref: props.collapseHeaderEl,
    onClick: e => props.handleChange(e),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  }, _react.default.createElement(_reactSpring.animated.div, {
    style: titleAnimatedStyles,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: void 0
  }, props.children), _react.default.createElement("div", {
    className: "icon-animation-container",
    ref: animationWrapperEl,
    style: {
      position: 'relative',
      flexGrow: 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: void 0
  }, transitions.map(({
    item,
    key,
    props
  }) => item ? _react.default.createElement(_reactSpring.animated.span, {
    key: key,
    className: "icon-animation",
    style: (0, _objectSpread2.default)({}, props),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: void 0
  }, _react.default.createElement(_index.LuiIcon, {
    className: "collapse-icon",
    iconType: 'close',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: void 0
  })) : _react.default.createElement(_reactSpring.animated.span, {
    key: key,
    className: "icon-animation",
    style: (0, _objectSpread2.default)({}, props),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  }, _react.default.createElement(_index.LuiIcon, {
    className: "collapse-icon",
    iconType: 'arrow-down',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  })))));
}; //<LuiIcon className="collapse-icon" iconType={props.isExpanded?'close':'arrow-down'}/>


CollapseHeader.propTypes = {
  hideTitleWhenExpanded: _propTypes.default.bool
};
CollapseHeader.defaultProps = {
  hideTitleWhenExpanded: false
};
var _default = CollapseHeader;
exports.default = _default;