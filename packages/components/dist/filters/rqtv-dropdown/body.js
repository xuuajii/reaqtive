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

var _useDebounce3 = require("use-debounce");

var _q = require("@reaqtive/q");

var _layout = require("@reaqtive/layout");

var _dropdownToolbar = _interopRequireDefault(require("./dropdown-toolbar"));

var _index = require("../../loading/index");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-dropdown\\body.js";

const Body = props => {
  const data = props.data,
        size = props.size,
        rqtvListObject = props.rqtvListObject;
  const bodyEl = (0, _react.useRef)();

  const handleScroll = () => {
    setScrollPosition({
      top: bodyEl.current.scrollTop,
      left: bodyEl.current.scrollLeft
    });
  };

  const _useState = (0, _react.useState)({
    top: 0,
    left: 0
  }),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        scrollPosition = _useState2[0],
        setScrollPosition = _useState2[1];

  const _useDebounce = (0, _useDebounce3.useDebounce)(scrollPosition, 50),
        _useDebounce2 = (0, _slicedToArray2.default)(_useDebounce, 1),
        debouncedScrollPosition = _useDebounce2[0];

  const visilbleListHeight = bodyEl.current ? bodyEl.current.clientHeight : 0;

  const getScrollData = qDisplayArea => {
    if (props.rqtvListObject) {
      props.rqtvListObject.getNewDataPage(qDisplayArea);
    }
  };

  const handleClick = e => {
    const callback = () => {
      if (props.rqtvListObject.isSelecting === false) {
        bodyEl.current.scrollTop = 0;
        getScrollData((0, _objectSpread2.default)({}, data.qArea, {
          qTop: 0
        }));
      }
    };

    props.rqtvListObject.selectValue(Number(e.target.dataset.qElemNumber), callback);
  }; // const clickAwayCallback = (rqtvListObject.isSelecting===false)?()=>props.hideDropdownMenu():()=>endSelections(false)
  // const clickAway = useOutsideEventListener(props.dropdownMenuEl, clickAwayCallback, props.show)
  //


  const _useState3 = (0, _react.useState)(null),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        isEndingSelections = _useState4[0],
        setIsEndingSelections = _useState4[1];

  (0, _react.useEffect)(() => {
    if (isEndingSelections === false) {
      props.hideDropdownMenu();
    }
  }, [isEndingSelections]);
  (0, _react.useEffect)(() => {
    if (props.qUpdating === false && isEndingSelections === true) {
      setIsEndingSelections(false);
    }
  }, [props.qUpdating]);

  const endSelections = qAccept => {
    setIsEndingSelections(true);
    rqtvListObject.endSelections(qAccept);
  };

  const scrollHandler = (0, _q.useScrollHandler)(debouncedScrollPosition, data.qArea, size, visilbleListHeight, props.dropdownMenuItemHeight, 0.2, getScrollData); //const showSpinner = props.rqtvListObject.isGettingScrollData||(debouncedScrollPosition.top!==0&&Math.abs(1-debouncedScrollPosition.top/scrollPosition.top)>0.2)

  return _react.default.createElement("ul", {
    onScroll: handleScroll,
    ref: bodyEl,
    style: {
      width: props.width,
      height: props.dropdownMenuHeight,
      overflowX: 'hidden',
      overflowY: 'auto'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: void 0
  }, props.showToolbar && _react.default.createElement(_dropdownToolbar.default, {
    searchListObjectFor: rqtvListObject.searchListObjectFor,
    abortListObjectSearch: rqtvListObject.abortListObjectSearch,
    acceptListObjectSearch: rqtvListObject.acceptListObjectSearch,
    endSelections: endSelections,
    isSelecting: rqtvListObject.isSelecting,
    quickSelectMode: props.quickSelectMode,
    showSearch: props.showSearch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: void 0
  }), _react.default.createElement("div", {
    style: {
      position: 'absolute',
      top: 40,
      width: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: void 0
  }, _react.default.createElement("div", {
    hidden: !scrollHandler.fillers.top,
    style: {
      height: scrollHandler.fillers.top
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: void 0
  }), props.data.qMatrix.map(record => _react.default.createElement("li", {
    key: record[0].qElemNumber,
    className: "dropdown-item ".concat(record[0].qState),
    "data-q-elem-number": record[0].qElemNumber,
    onClick: e => handleClick(e),
    style: (0, _objectSpread2.default)({}, props.dropdownMenuItemStyle, {
      height: props.dropdownMenuItemHeight
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: void 0
  }, record[0].qText)), _react.default.createElement("div", {
    hidden: !scrollHandler.fillers.bottom,
    style: {
      height: scrollHandler.fillers.bottom
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: void 0
  })));
};

Body.propTypes = {
  showToolbar: _propTypes.default.bool,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
Body.defaultProps = {
  showToolbar: true,
  width: 300
};
var _default = Body;
exports.default = _default;