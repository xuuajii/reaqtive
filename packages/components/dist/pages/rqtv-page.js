"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _rqtvPageContext = require("../contexts/rqtv-page-context");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\pages\\rqtv-page.js";

const RqtvPage = props => {
  const pageData = {
    path: props.path,
    title: props.title,
    id: props.id
  };
  const fallbackPage = props.fallbackPage;
  const location = (0, _reactRouterDom.useLocation)();

  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        hasChangedLocation = _useState2[0],
        setHasChangedLocation = _useState2[1];

  (0, _react.useEffect)(() => {
    const delay = location.search !== "" ? 500 : 0;
    setTimeout(() => setHasChangedLocation(true), delay); //console.log(delay)

    return () => setHasChangedLocation(false);
  }, [location]);
  return _react.default.createElement(_reactRouterDom.Route, {
    path: props.path,
    exact: props.exact,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  }, _react.default.createElement(_rqtvPageContext.RqtvPageProvider, {
    triggers: props.triggers,
    pageData: pageData,
    conditionExpr: props.conditionExpr,
    hasQueryString: location.search !== "" ? true : false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: void 0
  }, _react.default.createElement(RqtvPageConsumer, {
    fallbackPage: fallbackPage,
    hasChangedLocation: hasChangedLocation,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
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

  if (props.hasChangedLocation === true && conditionRes === false && fallbackPage !== "" && triggerState.done === true) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: fallbackPage,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
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