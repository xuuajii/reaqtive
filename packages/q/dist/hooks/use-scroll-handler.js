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
const useScrollHandler = (scrollPosition, currentDisplayArea, size, visibleListHeight, listItemHeight, buffer, getScrollData) => {
  const _useState = (0, _react.useState)(size),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        memoizedSize = _useState2[0],
        setMemoizedSize = _useState2[1];

  const listHeight = size.qcy * listItemHeight;
  const displayAreaHeight = currentDisplayArea.qHeight * listItemHeight;
  const numOfViewportItems = visibleListHeight / listItemHeight;
  const lastQTop = size.qcy - currentDisplayArea.qHeight;
  const bufferSize = buffer * currentDisplayArea.qHeight;
  const visibleStart = Math.floor(scrollPosition.top / listItemHeight); //const visibleEnd = Math.min((visibleStart + numOfViewportItems) - 1, size.qcy);
  //const newQTop = Math.floor(Math.max(0, Math.min(visibleStart - bufferSize, listItemsCount - currentDisplayArea.qHeight)));

  const newQTop = Math.min(Math.max(Math.ceil(scrollPosition.top / listItemHeight) - bufferSize, 0), size.qcy - currentDisplayArea.qHeight);
  const topHeight = Math.max(0, newQTop * listItemHeight);
  const bottomHeight = newQTop >= lastQTop ? 0 : Math.max(0, listHeight - (topHeight + displayAreaHeight)); //const fillers={top:topHeight, bottom:bottomHeight}

  const newDisplayArea = (0, _objectSpread2.default)({}, currentDisplayArea, {
    qHeight: currentDisplayArea.qHeight === 0 ? 30 : currentDisplayArea.qHeight,
    qTop: newQTop
  });

  const _useState3 = (0, _react.useState)(currentDisplayArea),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        qDisplayArea = _useState4[0],
        setQDisplaArea = _useState4[1];

  const _useState5 = (0, _react.useState)({
    top: topHeight,
    bottom: bottomHeight,
    right: 0,
    left: 0
  }),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        fillers = _useState6[0],
        setFillers = _useState6[1];

  (0, _react.useEffect)(() => {
    // console.log(newDisplayArea.qTop, currentDisplayArea.qTop)
    const fetchMore = newDisplayArea.qTop + bufferSize > currentDisplayArea.qTop + 2 * bufferSize || newDisplayArea.qTop >= size.qcy - currentDisplayArea.qHeight && newDisplayArea.qTop !== currentDisplayArea.qTop;
    const fetchLess = newDisplayArea.qTop < currentDisplayArea.qTop - bufferSize || newDisplayArea.qTop === 0 && currentDisplayArea.qTop !== 0; // console.log(fetchLess)

    if (fetchMore || fetchLess || size.qcy !== memoizedSize.qcy || size.qcx !== memoizedSize.qcx) {
      //console.log(memoizedSize, size)
      setFillers({
        top: topHeight,
        bottom: bottomHeight,
        right: 0,
        left: 0
      });
      setQDisplaArea(newDisplayArea);
      getScrollData(newDisplayArea);
      setMemoizedSize(size);
    }
  }, [scrollPosition, size]);
  return {
    qDisplayArea,
    fillers
  };
};

var _default = useScrollHandler;
exports.default = _default;