"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

const usePagination = (currentDisplayArea, qSize, getScrollData) => {
  const lastPage = currentDisplayArea ? Math.ceil(qSize.qcy / currentDisplayArea.qHeight) : 0;
  const initialPage = currentDisplayArea ? Math.ceil(currentDisplayArea.qTop / currentDisplayArea.qHeight) + 1 : 0;

  const _useState = (0, _react.useState)(initialPage),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        currentPage = _useState2[0],
        setCurrentPage = _useState2[1];

  const newQTop = currentDisplayArea ? (currentPage - 1) * currentDisplayArea.qHeight : 0;
  const newDisplayArea = (0, _objectSpread2.default)({}, currentDisplayArea, {
    qTop: newQTop
  });
  (0, _react.useEffect)(() => {
    if (newQTop !== currentDisplayArea.qTop) {
      getScrollData(newDisplayArea);
    }
  }, [currentPage]);
  return {
    currentPage,
    lastPage,
    newDisplayArea,
    setCurrentPage
  };
};

var _default = usePagination;
exports.default = _default;