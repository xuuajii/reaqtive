"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/switch/index.js";

const Switch = props => {
  const _useState = (0, _react.useState)(props.isOn),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isOn = _useState2[0],
        setIsOn = _useState2[1];

  const labelAnimation = (0, _reactSpring.useSpring)({
    config: {
      duration: 10
    },
    backgroundColor: isOn ? "".concat(props.activatedColor) : "".concat(props.disactivatedColor),
    transform: "scale(".concat(props.scaleValue, ")")
  });
  const buttonAnimation = (0, _reactSpring.useSpring)({
    config: {
      duration: 10
    },
    left: !isOn ? 0 + '%' : 50 + '%'
  });

  const toggle = e => {
    typeof props.onChange === 'function' && props.onChange(e);
    setIsOn(!isOn);
  };

  const flexDirection = props.labelPosition === 'top' || props.labelPosition === 'bottom' ? 'flex-column' : 'flex-row';
  return _react.default.createElement("div", {
    className: "switch-container ".concat(flexDirection),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: void 0
  }, _react.default.createElement("span", {
    className: "switch-label ".concat(props.labelPosition),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  }, props.label), _react.default.createElement(_reactSpring.animated.label, {
    style: labelAnimation,
    className: "switch-slider",
    htmlFor: props.id,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }, _react.default.createElement("input", {
    checked: isOn,
    onChange: toggle,
    className: "switch-checkbox",
    type: "checkbox",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: void 0
  }), _react.default.createElement(_reactSpring.animated.span, {
    className: "switch-button",
    style: buttonAnimation,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: void 0
  })));
};

var _default = Switch;
exports.default = _default;
Switch.defaultProps = {
  labelPosition: 'left',
  label: 'My Switch Label',
  activatedColor: "#5C88DA",
  disactivatedColor: "grey",
  defaultSwitchStatus: true,
  scaleValue: 1,
  isOn: false,
  onChange: function (e) {
    return null;
  }
};