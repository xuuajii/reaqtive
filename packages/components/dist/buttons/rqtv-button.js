"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = require("@reaqtive/layout");

var _q = require("@reaqtive/q");

var _qButtonObjectDef = _interopRequireDefault(require("./q-button-object-def"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\buttons\\rqtv-button.js";

const RqtvButton = props => {
  const qObjectDef = (0, _qButtonObjectDef.default)(props.qLabelExpr, props.qColorExpr);
  return _react.default.createElement(_q.QGenericObject, {
    qObjectDef: qObjectDef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: void 0
  }, qGenericObject => {
    const qLayout = qGenericObject.qLayoutHandler.qLayout;
    const label = qLayout && qLayout.label ? qLayout.label : props.label;
    return _react.default.createElement(_layout.Button, {
      className: props.className,
      ripple: props.ripple,
      style: props.style,
      onClick: props.onClick,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      },
      __self: void 0
    }, label);
  });
};

RqtvButton.propTypes = {
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  color: _propTypes.default.string,
  onClick: _propTypes.default.func.isRequired,
  ripple: _propTypes.default.bool,
  style: _propTypes.default.object
};
RqtvButton.defaultProps = {
  label: ' ',
  ripple: true,
  style: {}
};
var _default = RqtvButton;
exports.default = _default;