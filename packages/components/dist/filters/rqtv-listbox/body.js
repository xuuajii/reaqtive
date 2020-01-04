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

var _useDebounce3 = require("use-debounce");

var _q = require("@reaqtive/q");

var _index = require("../../loading/index");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-listbox\\body.js";

const Body = props => {
  const bodyEl = props.bodyEl;

  const _useState = (0, _react.useState)({
    top: 0,
    left: 0
  }),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        scrollPosition = _useState2[0],
        setScrollPosition = _useState2[1];

  const _useDebounce = (0, _useDebounce3.useDebounce)(scrollPosition, 100),
        _useDebounce2 = (0, _slicedToArray2.default)(_useDebounce, 1),
        debouncedScrollPosition = _useDebounce2[0];

  const visilbleListHeight = bodyEl.current ? bodyEl.current.clientHeight : 0;

  const handleScroll = () => {
    setScrollPosition({
      top: bodyEl.current.scrollTop,
      left: bodyEl.current.scrollLeft
    });
  };

  const handleClick = e => {
    const callback = () => {
      if (props.rqtvListObject.isSelecting === false) {
        bodyEl.current.scrollTop = 0;
        getScrollData((0, _objectSpread2.default)({}, props.data.qArea, {
          qTop: 0
        }));
      }
    };

    props.rqtvListObject.selectValue(Number(e.target.dataset.qElemNumber), callback);
  };

  const getScrollData = qDisplayArea => {
    if (props.rqtvListObject) {
      // props.setQLayoutPatcher({
      //   path:'qLayout/qListObject/qDataPages',
      //   getQLayoutPatch:(callback)=>
      props.rqtvListObject.getNewDataPage(qDisplayArea); // })
    }
  };

  const scrollHandler = (0, _q.useScrollHandler)(debouncedScrollPosition, props.data.qArea, props.size, visilbleListHeight, props.listItemHeight, 0.2, getScrollData); //const showSpinner = props.rqtvListObject.isGettingScrollData||(debouncedScrollPosition.top!==0&&Math.abs(1-debouncedScrollPosition.top/scrollPosition.top)>0.5)

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "rqtv-listbox-body",
    style: (0, _objectSpread2.default)({}, props.listStyle, {
      height: props.height,
      maxHeight: props.height,
      minHeight: props.height,
      overflow: 'auto'
    }),
    ref: bodyEl,
    onScroll: handleScroll,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: void 0
  }, _react.default.createElement("ul", {
    className: "list-group",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: void 0
  }, _react.default.createElement("li", {
    hidden: !scrollHandler.fillers.top,
    style: {
      height: scrollHandler.fillers.top
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: void 0
  }), props.data.qMatrix.map(row => _react.default.createElement("li", {
    className: "list-group-item ".concat(row[0].qState),
    key: row[0].qElemNumber,
    "data-q-elem-number": row[0].qElemNumber,
    onClick: e => handleClick(e),
    style: (0, _objectSpread2.default)({}, props.itemStyle, {
      height: props.listItemHeight
    }),
    title: row[0].qText,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: void 0
  }, row[0].qText)), _react.default.createElement("li", {
    hidden: !scrollHandler.fillers.bottom,
    style: {
      height: scrollHandler.fillers.bottom
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: void 0
  }))));
};

var _default = Body;
exports.default = _default;