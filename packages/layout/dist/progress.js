"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/progress.js";

const Progress = props => _react.default.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6
  },
  __self: void 0
}, _react.default.createElement("div", {
  className: "progress ".concat(props.className || ''),
  style: (0, _objectSpread2.default)({
    width: props.width + '%',
    height: props.height
  }, props.style),
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7
  },
  __self: void 0
}, _react.default.createElement("div", {
  className: "progress-bar",
  role: "progressbar",
  style: {
    width: props.value + '%'
  },
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8
  },
  __self: void 0
})));

Progress.propTypes = {
  height: _propTypes.default.number,
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  width: _propTypes.default.number
};
Progress.defaultProps = {
  height: 1,
  value: 0,
  width: 50
};
var _default = Progress;
exports.default = _default;