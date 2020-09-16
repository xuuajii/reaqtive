"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\icons\\icon.js";

const Icon = props => {
  const size = props.size,
        type = props.type,
        unit = props.unit,
        viewBoxSize = props.viewBoxSize;

  if (type.endsWith('svg')) {
    return _react.default.createElement("img", {
      className: "svg-icon",
      style: (0, _objectSpread2.default)({}, props.style),
      width: "".concat(size).concat(unit),
      height: "".concat(size).concat(unit),
      src: type,
      alt: "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      },
      __self: void 0
    });
  } else {
    const path = props.type;
    return _react.default.createElement("svg", {
      className: "svg-icon",
      style: (0, _objectSpread2.default)({}, props.style),
      width: "".concat(size).concat(unit),
      height: "".concat(size).concat(unit),
      viewBox: "0 0 ".concat(viewBoxSize, " ").concat(viewBoxSize),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: void 0
    }, _react.default.createElement("path", {
      fill: "currentColor",
      d: path,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: void 0
    }));
  }
};

Icon.propTypes = {
  size: _propTypes.default.number,
  type: _propTypes.default.string.isRequired,
  unit: _propTypes.default.string,
  viewBoxSize: _propTypes.default.number
};
Icon.defaultProps = {
  size: 24,
  type: 'account',
  unit: 'px',
  viewBoxSize: 24
};
var _default = Icon;
exports.default = _default;