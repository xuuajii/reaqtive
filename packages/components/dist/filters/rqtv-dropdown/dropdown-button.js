"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rqtvAppContext = require("../../../../contexts/rqtv-app-context");

var _layout = require("@reaqtive/layout");

var _index = require("../../index");

var _index2 = require("../../../icons/index");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-dropdown\\dropdown-button.js";

const DropdownButton = props => {
  const appContext = (0, _react.useContext)(_rqtvAppContext.RqtvAppContext);
  return _react.default.createElement(_index.RqtvButton, {
    className: "".concat(props.color, " ").concat('text-' + props.fontColor, " "),
    ripple: props.ripple ? props.ripple : appContext && appContext.theme.useRippleEffect,
    onClick: props.handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, props.label, props.showCaret && _react.default.createElement(_index2.LuiIcon, {
    iconType: "triangle-".concat(props.show ? 'top' : 'bottom'),
    className: "caret",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  }));
};

const fontSizePropCheck = (props, propName, componentName) => {
  if (!(typeof props[propName] === 'string' && (props[propName].indexOf('px') !== -1 || props[propName].indexOf('rem') !== -1) || typeof props[propName] === 'number')) {
    return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed. Expected a number or a string containing rem or px');
  }
};

DropdownButton.propTypes = {
  color: _propTypes.default.string,
  fontColor: _propTypes.default.string,
  fontSize: fontSizePropCheck,
  ripple: _propTypes.default.bool,
  showCaret: _propTypes.default.bool,
  style: _propTypes.default.object
};
DropdownButton.defaultProps = {
  color: 'primary',
  fontColor: 'light',
  fontSize: '1rem',
  ripple: true,
  showCaret: true,
  style: {}
};
var _default = DropdownButton;
exports.default = _default;