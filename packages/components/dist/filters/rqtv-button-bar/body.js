"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _q = require("@reaqtive/q");

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-button-bar\\body.js";

const Body = props => {
  const rqtvListObject = props.rqtvListObject,
        qSize = props.qSize,
        qDataPages = props.qDataPages;
  const selectValue = rqtvListObject.selectValue;

  const getScrollData = qDisplayArea => {
    rqtvListObject.getDataPage(qDisplayArea);
  };

  const qArea = qDataPages && (0, _objectSpread2.default)({}, qDataPages[0].qArea, {
    qHeight: props.qDataPageHeight
  });
  const pagination = (0, _q.usePagination)(qArea, qSize, getScrollData);
  return _react.default.createElement(_layout.ButtonGroup, {
    className: "rqtv-button-bar",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: void 0
  }, pagination.currentPage !== 1 && _react.default.createElement(_layout.Button, {
    type: "button",
    className: "rqtv-btn",
    onClick: () => pagination.setCurrentPage(pagination.currentPage - 1),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  }, "<"), qDataPages && qDataPages[0].qMatrix.map(item => _react.default.createElement(_layout.Button, {
    key: item[0].qElemNumber,
    type: "button",
    className: "rqtv-btn ".concat(props.buttonSize, " ").concat(item[0].qState, " "),
    onClick: () => selectValue(item[0].qElemNumber),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: void 0
  }, item[0].qText)), pagination.currentPage < pagination.lastPage && _react.default.createElement(_layout.Button, {
    type: "button",
    className: "rqtv-btn",
    onClick: () => pagination.setCurrentPage(pagination.currentPage + 1),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: void 0
  }, ">"));
};

var _default = Body;
exports.default = _default;