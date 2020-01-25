"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RqtvPageHeader = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rqtvPageContext = require("../contexts/rqtv-page-context");

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\rqtv-page-header\\index.js";

const RqtvPageHeader = props => {
  const rqtvPage = (0, _react.useContext)(_rqtvPageContext.RqtvPageContext);
  const pageData = rqtvPage.pageData;
  return _react.default.createElement(_layout.Navbar, {
    className: "page-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "navbar-brand",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, _react.default.createElement("h3", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }, pageData.title)), props.children);
};

exports.RqtvPageHeader = RqtvPageHeader;