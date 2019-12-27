"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _index = require("./index");

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\q\\src\\lib\\reaqtive.js";

const Reaqtive = props => {
  const qConfig = props.qConfig,
        qCapabilityApiRequired = props.qCapabilityApiRequired,
        children = props.children,
        rqtvAppProps = (0, _objectWithoutProperties2.default)(props, ["qConfig", "qCapabilityApiRequired", "children"]);
  return _react.default.createElement(_layout.SystemProvider, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: void 0
  }, qCapabilityApiRequired === true ? _react.default.createElement(_index.QDocProvider, {
    qConfig: qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, _react.default.createElement(_index.QAppProvider, {
    qConfig: qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }, props.children)) : _react.default.createElement(_index.QDocProvider, {
    qConfig: qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: void 0
  }, props.children));
};

var _default = Reaqtive;
exports.default = _default;