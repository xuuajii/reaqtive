"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\layout\\src\\lib\\navbar\\navbar-nav.js";

const NavbarNav = props => {
  const flexDirection = props.neverCollapse ? 'row' : 'column';
  return _react.default.createElement("ul", {
    className: "navbar-nav ".concat(props.className ? props.className : ''),
    style: (0, _objectSpread2.default)({
      flexDirection: flexDirection
    }, props.style),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: void 0
  }, props.children);
};

NavbarNav.propTypes = {
  neverCollapse: _propTypes.default.bool
};
NavbarNav.defaultProps = {
  neverCollapse: false
};
var _default = NavbarNav;
exports.default = _default;