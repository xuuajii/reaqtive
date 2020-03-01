"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _layout = require("@reaqtive/layout");

var _qScrollHandler = _interopRequireDefault(require("../shared/q-scroll-handler"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-listbox\\body.js";

const Body = props => {
  const selectValue = props.selectValue,
        qDataPages = props.qDataPages,
        qSize = props.qSize,
        getDataPage = props.getDataPage,
        height = props.height,
        bodyEl = props.bodyEl,
        listStyle = props.listStyle,
        itemStyle = props.itemStyle;
  return qDataPages && _react.default.createElement("div", {
    className: "rqtv-listbox-body",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: void 0
  }, _react.default.createElement(_qScrollHandler.default, {
    className: "rqtv-listbox-body",
    qDataPages: qDataPages,
    qSize: qSize,
    visibleHeight: height,
    getDataPage: getDataPage,
    bodyEl: bodyEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  }, _react.default.createElement(_layout.ListGroup, {
    style: listStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, qDataPages && qDataPages[0].qMatrix.map(item => _react.default.createElement(_layout.ListGroupItem, {
    className: item[0].qState,
    key: item[0].qElemNumber,
    onClick: () => selectValue(item[0].qElemNumber),
    style: itemStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: void 0
  }, item[0].qText)))));
};

var _default = Body;
exports.default = _default;