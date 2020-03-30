"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RqtvNavbarNav", {
  enumerable: true,
  get: function () {
    return _layout.NavbarNav;
  }
});
Object.defineProperty(exports, "RqtvNavbarCollapse", {
  enumerable: true,
  get: function () {
    return _layout.NavbarCollapse;
  }
});
Object.defineProperty(exports, "RqtvNavbarToggle", {
  enumerable: true,
  get: function () {
    return _layout.NavbarToggle;
  }
});
exports.RqtvPageHeader = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rqtvPageContext = require("../contexts/rqtv-page-context");

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\rqtv-page-header\\index.js";

const RqtvPageHeader = props => {
  const rqtvPage = (0, _react.useContext)(_rqtvPageContext.RqtvPageContext);
  const qTitle = rqtvPage.qTitle;
  const title = props.title || qTitle !== '' && qTitle && qTitle;
  return _react.default.createElement(_layout.Navbar, {
    className: "rqtv-page-header page-header navbar-expand-md ".concat(props.className),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }, _react.default.createElement(_layout.NavbarBrand, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: void 0
  }, _react.default.createElement("h3", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: void 0
  }, title)), props.children);
};

exports.RqtvPageHeader = RqtvPageHeader;
RqtvPageHeader.propTypes = {
  className: _propTypes.default.string,
  title: _propTypes.default.string
};
RqtvPageHeader.defaultProps = {
  className: ''
};