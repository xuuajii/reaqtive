"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _q = require("@reaqtive/q");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\shared\\q-scroll-handler.js";

const QScrollHandler = props => {
  const _useState = (0, _react.useState)({
    top: 0,
    left: 0
  }),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        scrollPosition = _useState2[0],
        setScrollPosition = _useState2[1];

  const updateScrollPosition = e => {
    setScrollPosition({
      top: e.target.scrollTop,
      left: 0
    });
  };

  const loadedEl = (0, _react.useRef)();
  const loadedElHeight = loadedEl.current && loadedEl.current.getBoundingClientRect().height;
  const qDataPages = props.qDataPages,
        visibleHeight = props.visibleHeight,
        qSize = props.qSize,
        getDataPage = props.getDataPage;
  const itemQty = qDataPages.reduce((total, item) => total + item['qArea']['qHeight'], 0);
  const listItemHeight = loadedElHeight / itemQty;
  const scrollHandler = (0, _q.useScrollHandler)(scrollPosition, qDataPages[0].qArea, qSize, visibleHeight, listItemHeight, 0.2, getDataPage);
  return _react.default.createElement("div", {
    style: (0, _objectSpread2.default)({
      maxHeight: visibleHeight,
      overflowY: 'auto'
    }, props.style),
    onScroll: e => updateScrollPosition(e),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: void 0
  }, _react.default.createElement("div", {
    style: {
      height: scrollHandler.fillers.top || 0
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: void 0
  }), _react.default.createElement("div", {
    ref: loadedEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: void 0
  }, props.children), _react.default.createElement("div", {
    style: {
      height: scrollHandler.fillers.bottom || 0
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  }));
};

var _default = QScrollHandler;
exports.default = _default;