"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = require("@reaqtive/layout");

var _rqtvButtonObjectProvider = _interopRequireDefault(require("./rqtv-button-object-provider"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\buttons\\rqtv-button.js";

const RqtvButtonLayout = props => {
  const qLayout = props.qLayoutHandler && props.qLayoutHandler.qLayout;
  return _react.default.createElement(_layout.Button, {
    className: props.className,
    ripple: props.ripple,
    style: props.style,
    onClick: props.onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: void 0
  }, qLayout && qLayout.label ? qLayout.label : props.label);
};

const RqtvButton = props => _react.default.createElement(_rqtvButtonObjectProvider.default, Object.assign({}, props, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 24
  },
  __self: void 0
}), _react.default.createElement(RqtvButtonLayout, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 25
  },
  __self: void 0
}));

const fontSizePropCheck = (props, propName, componentName) => {
  if (!(typeof props[propName] === 'string' && (props[propName].indexOf('px') !== -1 || props[propName].indexOf('rem') !== -1) || typeof props[propName] === 'number')) {
    return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed. Expected a number or a string containing rem or px');
  }
};

RqtvButton.propTypes = {
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  color: _propTypes.default.string,
  onClick: _propTypes.default.func.isRequired,
  fontColor: _propTypes.default.string,
  fontSize: fontSizePropCheck,
  ripple: _propTypes.default.bool,
  style: _propTypes.default.object
};
RqtvButton.defaultProps = {
  label: '',
  color: 'primary',
  fontColor: 'light',
  fontSize: '1rem',
  ripple: true,
  style: {}
};
var _default = RqtvButton;
exports.default = _default;