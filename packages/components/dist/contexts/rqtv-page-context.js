"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RqtvPageContext = exports.RqtvPageProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\contexts\\rqtv-page-context.js";

const RqtvPageContext = _react.default.createContext();

exports.RqtvPageContext = RqtvPageContext;

const RqtvPageConsumer = props => {
  const triggerState = (0, _q.useTriggers)(props.triggers);
  return _react.default.createElement(RqtvPageContext.Provider, {
    value: {
      triggerState,
      pageData: props.pageData
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  }, props.children);
};

const RqtvPageProvider = props => {
  return _react.default.createElement(RqtvPageConsumer, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: void 0
  }), props.children);
};

exports.RqtvPageProvider = RqtvPageProvider;
RqtvPageProvider.propTypes = {
  triggers: _propTypes.default.array.isRequired
};
RqtvPageProvider.defaultProps = {
  triggers: []
};