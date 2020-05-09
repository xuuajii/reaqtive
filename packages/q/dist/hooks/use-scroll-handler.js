"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const getFillersTop = (currentTop, itemHeight) => {
  return Math.max(0, currentTop * itemHeight);
};

const getFillersBottom = (topHeight, visibleListHeight, listHeight) => {
  return Math.max(0, listHeight - (topHeight + visibleListHeight));
};

const getTop = (scrollPosition, listItemHeight, lastPossibleTop) => {
  return scrollPosition === 0 ? 0 : scrollPosition / listItemHeight >= lastPossibleTop ? lastPossibleTop : Math.max(0, Math.round(scrollPosition / listItemHeight));
};

const useScrollHandler = (scrollPosition, currentDisplayArea, size, visibleListHeight, listItemHeight, buffer, getScrollData) => {
  const qDisplayArea = (0, _react.useRef)(currentDisplayArea);

  const _useState = (0, _react.useState)({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        fillers = _useState2[0],
        setFillers = _useState2[1];

  const listHeight = size.qcy * listItemHeight;
  const displayAreaHeight = currentDisplayArea.qHeight * listItemHeight;
  (0, _react.useEffect)(() => {
    const topHeight = getFillersTop(currentDisplayArea.qTop, listItemHeight);
    const bottomHeight = getFillersBottom(topHeight, displayAreaHeight, listHeight);
    setFillers((0, _objectSpread2.default)({}, fillers, {
      top: topHeight,
      bottom: bottomHeight
    }));
  }, [displayAreaHeight, listHeight, listItemHeight, currentDisplayArea]);
  const prevScroll = (0, _react.useRef)({
    top: 0,
    left: 0
  });
  (0, _react.useEffect)(() => {
    const bufferSize = buffer * currentDisplayArea.qHeight;
    const lastPossibleTop = Math.ceil(size.qcy - currentDisplayArea.qHeight);
    const visibleStart = Math.max(0, getTop(scrollPosition.top, listItemHeight, lastPossibleTop));
    const visibleListItems = visibleListHeight / listItemHeight;
    const visibleEnd = visibleStart + visibleListItems;
    const displayStart = currentDisplayArea.qTop;
    const displayEnd = currentDisplayArea.qTop + currentDisplayArea.qHeight;
    const shouldFetchLess = Math.max(0, visibleStart - bufferSize) < displayStart || scrollPosition.top === 0 && currentDisplayArea.qTop === 0;
    const shouldFecthMore = Math.min(visibleEnd + bufferSize) > displayEnd || visibleStart >= lastPossibleTop && currentDisplayArea.qTop !== lastPossibleTop;
    const topHeight = getFillersTop(visibleStart, listItemHeight);
    const bottomHeight = displayStart < lastPossibleTop ? getFillersBottom(topHeight, displayAreaHeight, listHeight) : 0;

    if (shouldFecthMore && scrollPosition.top > prevScroll.current.top) {
      qDisplayArea.current = (0, _objectSpread2.default)({}, qDisplayArea.current, {
        qTop: visibleStart
      });
      prevScroll.current = {
        top: Math.max(0, visibleStart)
      };
    }

    if (shouldFetchLess && scrollPosition.top < prevScroll.current.top) {
      qDisplayArea.current = (0, _objectSpread2.default)({}, qDisplayArea.current, {
        qTop: Math.max(0, visibleStart - bufferSize)
      });
    }

    prevScroll.current = (0, _objectSpread2.default)({}, prevScroll.current, {
      top: scrollPosition.top
    });
  }, [scrollPosition.top, currentDisplayArea, listItemHeight, visibleListHeight, buffer, displayAreaHeight, listHeight]);
  (0, _react.useEffect)(() => {
    getScrollData(qDisplayArea.current);
  }, [qDisplayArea.current]);
  return {
    qDisplayArea: qDisplayArea.current,
    fillers
  };
};

var _default = useScrollHandler;
exports.default = _default;