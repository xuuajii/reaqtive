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

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-button-bar\\body.js";

const Body = props => {
  const rqtvListObject = props.rqtvListObject,
        qSize = props.qSize,
        qDataPages = props.qDataPages,
        goToFirstPageAfterSelection = props.goToFirstPageAfterSelection,
        buttonSize = props.buttonSize,
        buttonsClassName = props.buttonsClassName,
        buttonsStyle = props.buttonsStyle;
  const selectValue = rqtvListObject.selectValue;

  const getScrollData = qDisplayArea => {
    rqtvListObject.getDataPage(qDisplayArea);
  };

  const qArea = qDataPages && qDataPages && qDataPages.length > 0 && (0, _objectSpread2.default)({}, qDataPages[0].qArea, {
    qHeight: props.qDataPageHeight
  });
  const pagination = (0, _q.usePagination)(qArea, qSize, getScrollData);

  const selectionCallback = () => {
    goToFirstPageAfterSelection && pagination.setCurrentPage(1);
  };

  const className = "rqtv-btn ".concat(buttonSize, " ").concat(buttonsClassName);
  return _react.default.createElement(_layout.ButtonGroup, {
    className: "rqtv-button-bar",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  }, pagination.currentPage !== 1 && _react.default.createElement(_layout.Button, {
    type: "button",
    className: className,
    onClick: () => pagination.setCurrentPage(pagination.currentPage - 1),
    style: buttonsStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: void 0
  }, "<"), qDataPages && qDataPages[0].qMatrix.map(item => _react.default.createElement(_layout.Button, {
    key: item[0].qElemNumber,
    type: "button",
    className: "".concat(className, " ").concat(item[0].qState, " "),
    onClick: () => selectValue(item[0].qElemNumber, selectionCallback),
    style: buttonsStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }, item[0].qText)), pagination.currentPage < pagination.lastPage && _react.default.createElement(_layout.Button, {
    type: "button",
    className: className,
    onClick: () => pagination.setCurrentPage(pagination.currentPage + 1),
    style: buttonsStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: void 0
  }, ">"));
};

var _default = Body;
exports.default = _default;