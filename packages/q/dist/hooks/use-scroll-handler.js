"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

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
  const listHeight = size.qcy * listItemHeight;
  const qTop = currentDisplayArea.qTop,
        qHeight = currentDisplayArea.qHeight,
        qLeft = currentDisplayArea.qLeft,
        qWidth = currentDisplayArea.qWidth;
  const pageStart = qTop;
  const pageEnd = qTop + qHeight;
  const visibleStart = Math.floor(scrollPosition.top / listItemHeight);
  const visibleEnd = Math.ceil(visibleStart + visibleListHeight / listItemHeight);
  const bufferSize = buffer * qHeight;
  const lastPossibleTop = Math.max(size.qcy - qHeight, 0);
  const displayStart = Math.min(Math.max(0, visibleStart - bufferSize), lastPossibleTop);
  const displayEnd = Math.max(Math.min(visibleEnd + bufferSize, size.qcy), 0);
  const shouldFetchMore = displayEnd >= pageEnd && displayStart < lastPossibleTop || displayStart >= lastPossibleTop && pageStart < lastPossibleTop; // (visibleEnd+bufferSize>currentDisplayEnd && lastPossibleTop>visibleStart && qTop<lastPossibleTop)

  const shouldFetchLess = displayStart < pageStart && pageStart > 0; //(visibleStart-bufferSize<currentDisplayStart && currentDisplayStart>0 && qTop>0)
  //console.log(shouldFetchLess,shouldFetchMore, displayEnd, pageEnd,displayStart,lastPossibleTop )

  const _useState = (0, _react.useState)({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        fillers = _useState2[0],
        setFillers = _useState2[1];

  (0, _react.useEffect)(() => {
    if (shouldFetchMore) {
      // console.log('more')
      getScrollData({
        qTop: displayStart,
        qWidth: 1,
        qHeight: qHeight,
        qLeft: 0
      });
    }

    if (shouldFetchLess) {
      // console.log('less')
      getScrollData({
        qTop: Math.max(0, displayStart - bufferSize),
        qWidth: 1,
        qHeight: qHeight,
        qLeft: 0
      });
    }
  }, [shouldFetchMore, shouldFetchLess, bufferSize, displayStart, qHeight]);
  (0, _react.useEffect)(() => {
    // console.log(qTop, qHeight, qLeft, qWidth)
    setFillers({
      top: qTop * listItemHeight,
      bottom: listHeight - ((qTop || 0) + qHeight) * listItemHeight,
      left: 0,
      right: 0
    }); //getScrollData({qTop:newDisplayStart, qHeight, qLeft, qWidth})
  }, [qTop, qHeight, qLeft, qWidth, listItemHeight, listHeight]); //const shouldFetchLess =  visibleStart+(buffer*pageHeight*listItemHeight)>displayEnd

  return {
    fillers: fillers
  };
};

var _default = useScrollHandler;
exports.default = _default;