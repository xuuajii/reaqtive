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
  const qArea = props.data && (0, _objectSpread2.default)({}, props.data.qArea, {
    qHeight: props.qDataPageHeight
  });

  const getScrollData = qDisplayArea => {
    if (props.rqtvListObject) {
      props.rqtvListObject.getNewDataPage(qDisplayArea);
    }
  };

  const handleSelection = value => {
    const callback = res => {
      if (res === false) {
        getScrollData(qArea);
      }
    };

    props.rqtvListObject.selectValue(Number(value), callback);
  };

  const pagination = (0, _q.usePagination)(qArea, props.size, getScrollData);
  return _react.default.createElement(_react.default.Fragment, null, pagination.currentPage !== 1 && _react.default.createElement(_layout.Button, {
    type: "button",
    className: "rqtv-btn",
    onClick: () => pagination.setCurrentPage(pagination.currentPage - 1),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: void 0
  }, "<"), props.data && props.data.qMatrix.map(record => _react.default.createElement(_layout.Button, {
    key: record[0].qElemNumber,
    type: "button",
    className: "rqtv-btn ".concat(props.buttonSize, " ").concat(record[0].qState, " "),
    onClick: () => handleSelection(record[0].qElemNumber),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: void 0
  }, record[0].qText)), pagination.currentPage < pagination.lastPage && _react.default.createElement(_layout.Button, {
    type: "button",
    className: "rqtv-btn",
    onClick: () => pagination.setCurrentPage(pagination.currentPage + 1),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: void 0
  }, ">"));
};

var _default = Body;
exports.default = _default;