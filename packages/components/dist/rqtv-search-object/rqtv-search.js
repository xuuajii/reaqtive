"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = _interopRequireDefault(require("@reaqtive/layout"));

var _searchResults = _interopRequireDefault(require("./search-results"));

var _useDebounce3 = require("use-debounce");

var _q = _interopRequireDefault(require("@reaqtive/q"));

var _index = require("../index");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\rqtv-search-object\\rqtv-search.js";

const AnimatedInput = props => {
  const expandFrom = props.expandFrom,
        focus = props.focus,
        width = props.width;
  const wrapperStyles = {
    transformOrigin: expandFrom,
    position: 'absolute',
    top: 0,
    left: 0,
    width: width ? width : '100%',
    transformStyle: 'preserve-3d'
  };
  const animatedProps = (0, _reactSpring.useSpring)({
    from: {
      transform: "scaleX(0)",
      opacity: 0.5,
      transformStyle: 'preserve-3d'
    },
    to: {
      transform: "scaleX(".concat(focus ? 1 : 0, ")"),
      opacity: focus ? 1 : 0.5
    }
  }); //console.log(focus)

  return _react.default.createElement(_reactSpring.animated.div, {
    style: (0, _objectSpread2.default)({}, wrapperStyles, animatedProps),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: void 0
  }, _react.default.createElement(_layout.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: void 0
  })));
};

const RqtvSearch = props => {
  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        searchString = _useState2[0],
        setSearchString = _useState2[1];

  const _useState3 = (0, _react.useState)(false),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        showResults = _useState4[0],
        setShowResults = _useState4[1];

  const _useState5 = (0, _react.useState)(0),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        searchOffset = _useState6[0],
        setSearchOffset = _useState6[1];

  const qSearchResultsHandler = (0, _q.default)(props.searchFields, searchString, searchOffset, 10);
  const qSearchResults = qSearchResultsHandler.qSearchResults; //console.log(qSearchResults)

  const searchResultsEl = (0, _react.useRef)();
  (0, _layout.default)(searchResultsEl, () => clearSearch(), showResults);

  const _useState7 = (0, _react.useState)({
    top: 0,
    left: 0
  }),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        scrollPosition = _useState8[0],
        setScrollPosition = _useState8[1];

  const _useState9 = (0, _react.useState)({
    qcy: 1,
    qcx: 1
  }),
        _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
        size = _useState10[0],
        setSize = _useState10[1];

  const _useDebounce = (0, _useDebounce3.useDebounce)(scrollPosition, 200),
        _useDebounce2 = (0, _slicedToArray2.default)(_useDebounce, 1),
        debouncedScrollPosition = _useDebounce2[0];

  const getScrollData = qDisplayArea => {
    //console.log(1)
    setSearchOffset(qDisplayArea.qTop); //searchResultsEl.current.scrollTop=debouncedScrollPosition.top;
  };

  const scrollHandler = (0, _q.default)(debouncedScrollPosition, {
    qTop: searchOffset,
    qLeft: 0,
    qHeight: 10,
    qWidth: 1
  }, size, searchResultsEl.current && searchResultsEl.current.clientHeight, 78, 0.2, getScrollData);

  const handleScroll = () => {
    //console.log(searchOffset)
    setScrollPosition({
      top: searchResultsEl.current.scrollTop,
      left: searchResultsEl.current.scrollLeft
    });
    setSearchOffset(scrollHandler.qDisplayArea.qTop);
  };

  const handleChangeString = string => {
    setSearchString(string);
    setShowResults(true);
  };

  const clearSearch = () => {
    searchResultsEl.current.scrollTop = 0;
    setShowResults(false);
    setSearchString();
    props.hideSearch();
  };

  const acceptSearchResult = (searchTerm = searchString) => {
    qSearchResultsHandler.selectSearchResults(searchTerm, 0, clearSearch());
  };

  (0, _react.useEffect)(() => {
    setSize({
      qcy: qSearchResults && qSearchResults.qTotalNumberOfGroups || 0,
      qcx: 1
    });
  }, [qSearchResults]); //console.log(scrollHandler)

  const searchResultGroupHeight = 88;
  const singleFieldItemHeight = 48;
  const manySearchResultHeight = qSearchResults && qSearchResults.qTotalNumberOfGroups === 1 && qSearchResults.qSearchGroupArray[0].qItems.length * singleFieldItemHeight + singleFieldItemHeight;
  const singleSearchResultHeight = qSearchResults && qSearchResults.qTotalNumberOfGroups === 1 && qSearchResults.qSearchGroupArray[0].qItems.length * singleFieldItemHeight + singleFieldItemHeight;
  const searchResultHeight = qSearchResults && qSearchResults.qTotalNumberOfGroups ? Math.min(isNaN(props.resultsHeight) ? Infinity : props.resultsHeight, qSearchResults && qSearchResults.qTotalNumberOfGroups > 1 ? qSearchResults.qTotalNumberOfGroups * searchResultGroupHeight : qSearchResults.qSearchGroupArray[0].qItems.length * singleFieldItemHeight + singleFieldItemHeight) : 0;
  const titleEl = (0, _react.useRef)();
  const singleTitleHeight = titleEl.current && titleEl.current.offsetHeight;
  const dropdownMenuStyle = singleSearchResultHeight ? {
    minHeight: singleSearchResultHeight + (singleTitleHeight || 0)
  } : {}; //console.log(searchResultHeight)

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "rqtv-search dropdown ".concat(showResults ? 'show' : ''),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111
    },
    __self: void 0
  }, _react.default.createElement(AnimatedInput, {
    searchAction: handleChangeString,
    clearSearchAction: () => clearSearch(),
    acceptSearchAction: acceptSearchResult,
    hideSearch: props.hideSearch,
    placeholder: props.placeholder,
    focus: props.show,
    expandFrom: props.expandFrom,
    width: props.width,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112
    },
    __self: void 0
  }), _react.default.createElement("div", {
    className: "dropdown-menu ".concat(showResults ? 'show' : '', " search-results-container"),
    onScroll: handleScroll,
    ref: searchResultsEl,
    style: dropdownMenuStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 123
    },
    __self: void 0
  }, searchString && _react.default.createElement(_index.RqtvRenderer, {
    loading: qSearchResultsHandler.qLoading,
    error: qSearchResultsHandler.qError,
    noData: qSearchResults && qSearchResults.qSearchGroupArray.length === 0,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129
    },
    __self: void 0
  }, _react.default.createElement("div", {
    style: {
      width: props.resultsWidth,
      height: searchResultHeight,
      maxHeight: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 134
    },
    __self: void 0
  }, qSearchResults && _react.default.createElement(_searchResults.default, {
    searchResults: qSearchResults,
    scrollHandler: scrollHandler,
    selectSearchResults: acceptSearchResult,
    titleEl: titleEl,
    singleFieldItemHeight: singleFieldItemHeight,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 138
    },
    __self: void 0
  }))))));
};

RqtvSearch.propTypes = {
  resultshHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  resultsWidth: _propTypes.default.number,
  searchFields: _propTypes.default.array,
  useBackdrop: _propTypes.default.bool,
  backdropStyle: _propTypes.default.object,
  placeholder: _propTypes.default.string
};
RqtvSearch.defaultProps = {
  resultsHeight: 500,
  fields: [],
  usebackdrop: false,
  backdropStyle: {},
  searchFields: []
};
var _default = RqtvSearch;
exports.default = _default;