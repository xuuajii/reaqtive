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

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/buttons/rqtv-dropdown-button.js";

const RqtvDropdownButton = props => {
  const qObjectDef = (0, _qButtonObjectDef.default)(props.qLabelExpr, props.qColorExpr);
  return _react.default.createElement(_q.QGenericObject, {
    qObjectDef: qObjectDef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: void 0
  }, qGenericObject => {
    const qLayout = qGenericObject.qLayoutHandler.qLayout;
    const label = qLayout && qLayout.label ? qLayout.label : props.label;
    return _react.default.createElement(_layout.DropdownButton, Object.assign({}, props, {
      label: label,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: void 0
    }));
  });
};

RqtvDropdownButton.propTypes = {
  label: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),
  color: _propTypes.default.string,
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