"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _rqtvPageContext = require("../contexts/rqtv-page-context");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\pages\\rqtv-page.js";

const RqtvPage = props => {
  const pageData = {
    path: props.path,
    title: props.title,
    id: props.id
  };
  const fallbackPage = props.fallbackPage;
  return _react.default.createElement(_reactRouterDom.Route, {
    path: props.path,
    exact: props.exact,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  }, _react.default.createElement(_rqtvPageContext.RqtvPageProvider, {
    triggers: props.triggers,
    pageData: pageData,
    conditionExpr: props.conditionExpr,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, _react.default.createElement(RqtvPageConsumer, {
    fallbackPage: fallbackPage,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }, props.children)));
};

const RqtvPageConsumer = props => {
  const rqtvPageContext = (0, _react.useContext)(_rqtvPageContext.RqtvPageContext);

  const _ref = rqtvPageContext && rqtvPageContext,
        conditionRes = _ref.conditionRes,
        triggerState = _ref.triggerState;

  const fallbackPage = props.fallbackPage;

  if (conditionRes === false && fallbackPage !== "" && triggerState.done === true) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: fallbackPage,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: void 0
    });
  }

  return props.children;
};

RqtvPage.propTypes = {
  path: _propTypes.default.string.isRequired,
  id: _propTypes.default.number.isRequired,
  title: _propTypes.default.string.isRequired,
  triggers: _propTypes.default.array.isRequired,
  conditionExpr: _propTypes.default.string,
  fallbackPage: _propTypes.default.string
};
RqtvPage.defaultProps = {
  triggers: [],
  conditionExpr: "",
  fallbackPage: ""
};
var _default = RqtvPage;
exports.default = _default;