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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

var _useDebounce = require("use-debounce");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\shared\\q-scroll-handler.js";

const QScrollHandler = props => {
  const _useState = (0, _react.useState)({
    top: 0,
    left: 0
  }),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        scrollPosition = _useState2[0],
        setScrollPosition = _useState2[1];

  const _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)( // function
  target => {
    //setValue(e);
    setScrollPosition({
      top: target.scrollTop,
      left: 0
    });
  }, // delay in ms
  props.debounceDelay),
        _useDebouncedCallback2 = (0, _slicedToArray2.default)(_useDebouncedCallback, 1),
        updateScrollPosition = _useDebouncedCallback2[0];

  const bodyEl = (0, _react.useRef)();
  const loadedEl = (0, _react.useRef)();
  const loadedElHeight = loadedEl.current && loadedEl.current.getBoundingClientRect().height;
  const qDataPages = props.qDataPages,
        visibleHeight = props.visibleHeight,
        qSize = props.qSize,
        getDataPage = props.getDataPage;
  const itemQty = qDataPages.reduce((total, item) => total + item['qArea']['qHeight'], 0);
  const listItemHeight = Math.round(loadedElHeight / itemQty);
  const scrollHandler = (0, _q.useScrollHandler)(scrollPosition, qDataPages[0].qArea, qSize, visibleHeight, listItemHeight, 0.5, getDataPage);
  const bodyElementRef = props.bodyEl !== undefined ? props.bodyEl : bodyEl;
  return _react.default.createElement("div", {
    style: (0, _objectSpread2.default)({
      height: visibleHeight,
      minHeight: visibleHeight,
      maxHeight: visibleHeight,
      overflowY: 'auto'
    }, props.style),
    onScroll: e => updateScrollPosition(e.target),
    ref: bodyElementRef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: void 0
  }, _react.default.createElement("div", {
    style: {
      maxHeight: scrollHandler.fillers.top || 0,
      minHeight: scrollHandler.fillers.top || 0,
      height: scrollHandler.fillers.top || 0
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: void 0
  }), _react.default.createElement("div", {
    ref: loadedEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: void 0
  }, props.children), _react.default.createElement("div", {
    style: {
      maxHeight: scrollHandler.fillers.bottom || 0,
      minHeight: scrollHandler.fillers.bottom || 0,
      height: scrollHandler.fillers.bottom || 0
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: void 0
  }));
};

var _default = QScrollHandler;
exports.default = _default;
QScrollHandler.propTypes = {
  debounceDelay: _propTypes.default.number
};
QScrollHandler.defualtProps = {
  debounceDelay: 200
};