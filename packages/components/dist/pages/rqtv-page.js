"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

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
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, props.children));
};

RqtvPage.propTypes = {
  path: _propTypes.default.string.isRequired,
  id: _propTypes.default.number.isRequired,
  title: _propTypes.default.string.isRequired,
  triggers: _propTypes.default.array.isRequired
};
RqtvPage.defaultProps = {
  triggers: []
};
var _default = RqtvPage;
exports.default = _default;