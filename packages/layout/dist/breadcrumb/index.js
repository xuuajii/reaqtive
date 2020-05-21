"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadcrumbItem = exports.Breadcrumb = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/breadcrumb/index.js";

const Breadcrumb = props => {
  const location = (0, _reactRouterDom.useLocation)();
  return _react.default.createElement("nav", {
    className: "rqtv-breadcrumb",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: void 0
  }, _react.default.createElement("ol", {
    className: "breadcrumb",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: void 0
  }, props.children));
};

exports.Breadcrumb = Breadcrumb;

const BreadcrumbItem = props => _react.default.createElement("li", {
  className: "breadcrumb-item ".concat(props.isActive ? 'active' : ''),
  onClick: props.action,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 19
  },
  __self: void 0
}, props.label);

exports.BreadcrumbItem = BreadcrumbItem;