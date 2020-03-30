"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\navbar\\nav-item.js";

const NavItem = props => {
  return _react.default.createElement("li", {
    className: "nav-item ".concat(props.className),
    style: props.style,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: void 0
  }, props.children);
};

NavItem.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
NavItem.defaultProps = {
  className: '',
  style: {}
};
var _default = NavItem;
exports.default = _default;