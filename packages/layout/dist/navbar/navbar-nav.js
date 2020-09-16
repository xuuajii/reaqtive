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

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\navbar\\navbar-nav.js";

const NavbarNav = props => {
  //const flexDirection = props.neverCollapse?'row':'column'
  const verticalNavbar = props.verticalNavbar;
  const neverCollapseHandler = props.neverCollapse ? 'd-flex flex-row ' : '';
  return _react.default.createElement("ul", {
    className: "navbar-nav ".concat(neverCollapseHandler, " ").concat(props.className),
    style: (0, _objectSpread2.default)({
      flexGrow: 1
    }, props.style),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: void 0
  }, props.children);
};

NavbarNav.propTypes = {
  className: _propTypes.default.string,
  neverCollapse: _propTypes.default.bool
};
NavbarNav.defaultProps = {
  className: "justify-content-end",
  neverCollapse: false
};
var _default = NavbarNav;
exports.default = _default;