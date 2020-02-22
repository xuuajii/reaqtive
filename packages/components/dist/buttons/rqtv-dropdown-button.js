"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = require("@reaqtive/layout");

var _rqtvButtonObjectProvider = _interopRequireDefault(require("./rqtv-button-object-provider"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\buttons\\rqtv-dropdown-button.js";

const RqtvDropdownButtonLayout = props => {
  //console.log(props)
  const qLayout = props.qLayoutHandler && props.qLayoutHandler.qLayout;
  const showCaret = props.showCaret,
        className = props.className;
  return _react.default.createElement(_layout.Button, {
    className: className,
    ripple: props.ripple,
    style: (0, _objectSpread2.default)({}, props.style),
    onClick: props.onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: void 0
  }, qLayout && qLayout.label ? qLayout.label : props.label, showCaret && _react.default.createElement(_layout.LuiIcon, {
    iconType: "triangle-".concat(props.show ? 'top' : 'bottom'),
    className: "caret",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: void 0
  }));
};

const RqtvDropdownButton = props => _react.default.createElement(_rqtvButtonObjectProvider.default, Object.assign({}, props, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 29
  },
  __self: void 0
}), _react.default.createElement(RqtvDropdownButtonLayout, Object.assign({
  show: props.show
}, props, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 30
  },
  __self: void 0
})));

RqtvDropdownButton.propTypes = {
  label: _propTypes.default.string,
  onClick: _propTypes.default.func.isRequired,
  ripple: _propTypes.default.bool,
  style: _propTypes.default.object
};
RqtvDropdownButton.defaultProps = {
  label: ' ',
  ripple: true,
  style: {}
};
var _default = RqtvDropdownButton;
exports.default = _default;