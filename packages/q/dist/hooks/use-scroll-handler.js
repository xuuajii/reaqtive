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
  return Math.max(1, currentTop * itemHeight);
};

const getFillersBottom = (topHeight, visibleListHeight, listHeight) => {
  return Math.max(0, listHeight - (topHeight + visibleListHeight));
};

const getTop = (scrollPosition, listItemHeight, lastPossibleTop) => {
  return scrollPosition === 0 ? 0 : scrollPosition / listItemHeight >= lastPossibleTop ? lastPossibleTop : Math.max(0, Math.round(scrollPosition / listItemHeight));
};

const useScrollHandler = (scrollPosition, currentDisplayArea, size, visibleListHeight, listItemHeight, buffer, getScrollData) => {
  const displayAreaHeight = currentDisplayArea.qHeight * listItemHeight;
  const listHeight = size.qcy * listItemHeight;
  const bufferSize = buffer * currentDisplayArea.qHeight;

  const _useState = (0, _react.useState)({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        fillers = _useState2[0],
        setFillers = _useState2[1];

  (0, _react.useEffect)(() => {
    const topHeight = getFillersTop(qDisplayArea.qTop, listItemHeight);
    const bottomHeight = getFillersBottom(topHeight, displayAreaHeight, listHeight);
    setFillers((0, _objectSpread2.default)({}, fillers, {
      top: topHeight,
      bottom: bottomHeight
    }));
  }, [displayAreaHeight, listHeight, listItemHeight]);

  const _useState3 = (0, _react.useState)(currentDisplayArea),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        qDisplayArea = _useState4[0],
        setQDisplaArea = _useState4[1];

  (0, _react.useEffect)(() => {
    const lastPossibleTop = Math.round(size.qcy - qDisplayArea.qHeight);
    const topRecord = Math.max(0, getTop(scrollPosition.top, listItemHeight, lastPossibleTop));
    const listHeight = Math.floor(visibleListHeight / listItemHeight);
    const fetchLessLimit = qDisplayArea.qTop + listHeight - bufferSize;
    const fetchMoreLimit = qDisplayArea.qTop + listHeight + bufferSize;

    if ((topRecord > fetchMoreLimit || topRecord < fetchLessLimit && qDisplayArea.qTop !== 0 || topRecord >= lastPossibleTop) && topRecord !== qDisplayArea.qTop) {
      setQDisplaArea((0, _objectSpread2.default)({}, qDisplayArea, {
        qTop: topRecord
      }));
    }
  }, [scrollPosition.top, qDisplayArea.qTop, qDisplayArea.qHeight, listItemHeight, bufferSize, size, visibleListHeight]);
  (0, _react.useEffect)(() => {
    const topHeight = getFillersTop(qDisplayArea.qTop, listItemHeight);
    const bottomHeight = getFillersBottom(topHeight, displayAreaHeight, listHeight);
    getScrollData(qDisplayArea);
    setFillers((0, _objectSpread2.default)({}, fillers, {
      top: topHeight,
      bottom: bottomHeight
    }));
  }, [qDisplayArea, listItemHeight, listHeight, displayAreaHeight]);
  return {
    qDisplayArea,
    fillers
  };
};

var _default = useScrollHandler;
exports.default = _default;