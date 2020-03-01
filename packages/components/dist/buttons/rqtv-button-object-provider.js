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

var _layout = require("@reaqtive/layout");

var _rqtvAppContext = require("../contexts/rqtv-app-context");

var _q = require("@reaqtive/q");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\buttons\\rqtv-button-object-provider.js";

const RqtvButtonObjectProvider = props => {
  const appContext = (0, _react.useContext)(_rqtvAppContext.RqtvAppContext);
  const ripple = appContext && appContext.theme && appContext.theme.ripple ? 'ripple' : props.ripple;
  const qButtonDef = (0, _react.useMemo)(() => {
    return {
      "qInfo": {
        "qType": "LayoutExpressions"
      },
      "label": {
        qStringExpression: {
          qExpr: props.qLabelExpr
        }
      },
      "color": {
        qStringExpression: {
          qExpr: props.qColorExpr
        }
      }
    };
  }, [props.qLabelExpr, props.qColorExpr]);
  const layoutProps = {
    className: props.className ? props.className : '',
    onClick: props.onClick,
    label: props.label,
    ripple: ripple,
    style: (0, _objectSpread2.default)({}, props.style),
    showCaret: props.showCaret
  };

  const children = _react.default.Children.toArray(props.children);

  return props.qLabelExpr || props.qColorExpr ? _react.default.createElement(_q.QComponent, {
    qObjectDef: qButtonDef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: void 0
  }, children.map(child => _react.default.cloneElement(child, (0, _objectSpread2.default)({}, layoutProps)))) : children.map(child => _react.default.cloneElement(child, (0, _objectSpread2.default)({}, layoutProps)));
};

var _default = RqtvButtonObjectProvider;
exports.default = _default;