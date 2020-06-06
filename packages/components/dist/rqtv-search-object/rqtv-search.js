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

var _layout = require("@reaqtive/layout");

var _searchResults = _interopRequireDefault(require("./search-results"));

var _useDebounce = require("use-debounce");

var _q = require("@reaqtive/q");

var _index = require("../index");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\rqtv-search-object\\rqtv-search.js";

const AnimatedInput = props => {
  const expandFrom = props.expandFrom,
        focus = props.focus,
        width = props.width;
  const wrapperStyles = {
    transformOrigin: expandFrom,
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
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
      lineNumber: 30
    },
    __self: void 0
  }, _react.default.createElement(_layout.SearchInput, Object.assign({}, props, {
    hideWhenDeleteString: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
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

  const _useState5 = (0, _react.useState)({
    qTop: 0,
    qLeft: 0,
    qHeight: 10,
    qWidth: 1
  }),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        qArea = _useState6[0],
        setQArea = _useState6[1];

  const qSearchResultsHandler = (0, _q.useQGlobalSearch)(props.searchFields, searchString, qArea.qTop, 10);
  const qSearchResults = qSearchResultsHandler.qSearchResults;
  const searchResultsEl = (0, _react.useRef)();
  const containerEl = (0, _react.useRef)();
  (0, _layout.useOutsideEventListener)(containerEl, () => clearSearch(), showResults);

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

  const getScrollData = qDisplayArea => {
    //setSearchOffset(qDisplayArea.qTop)
    setQArea({
      qTop: qDisplayArea.qTop,
      qLeft: 0,
      qHeight: 10,
      qWidth: 1
    }); //searchResultsEl.current.scrollTop=scrollPosition.top;
  };

  const scrollHandler = (0, _q.useScrollHandler)(scrollPosition, qArea, size, searchResultsEl.current && searchResultsEl.current.clientHeight, 78, 0.2, getScrollData);

  const _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)( // function
  target => {
    setScrollPosition({
      top: searchResultsEl.current.scrollTop,
      left: searchResultsEl.current.scrollLeft
    });
  }, // delay in ms
  //props.debounceDelay
  200),
        _useDebouncedCallback2 = (0, _slicedToArray2.default)(_useDebouncedCallback, 1),
        handleScroll = _useDebouncedCallback2[0];

  const handleChangeString = string => {
    //console.log(1111, qSearchResultsHandler.qEngineError.qError)
    setSearchString(string);
    setShowResults(true);
  };

  const clearSearch = () => {
    searchResultsEl.current.scrollTop = 0;
    setShowResults(false);
    setSearchString();
    props.hideSearch();
  };

  const retry = () => {
    qSearchResultsHandler.search();
  };

  const acceptSearchResult = (searchTerm = searchString) => {
    qSearchResultsHandler.selectSearchResults(searchTerm, 0, clearSearch());
  };

  (0, _react.useEffect)(() => {
    setSize({
      qcy: qSearchResults && qSearchResults.qTotalNumberOfGroups || 0,
      qcx: 1
    });
  }, [qSearchResults]);
  const searchResultGroupHeight = 88;
  const singleFieldItemHeight = 48;
  const manySearchResultHeight = qSearchResults && qSearchResults.qTotalNumberOfGroups === 1 && qSearchResults.qSearchGroupArray[0].qItems.length * singleFieldItemHeight + singleFieldItemHeight;
  const singleSearchResultHeight = qSearchResults && qSearchResults.qTotalNumberOfGroups === 1 && qSearchResults.qSearchGroupArray[0].qItems.length * singleFieldItemHeight + singleFieldItemHeight;
  const searchResultHeight = qSearchResults && qSearchResults.qTotalNumberOfGroups ? Math.min(isNaN(props.resultsHeight) ? Infinity : props.resultsHeight, qSearchResults && qSearchResults.qTotalNumberOfGroups > 1 ? qSearchResults.qTotalNumberOfGroups * searchResultGroupHeight : qSearchResults.qSearchGroupArray[0].qItems.length * singleFieldItemHeight + singleFieldItemHeight) : 0;
  const titleEl = (0, _react.useRef)();
  const singleTitleHeight = titleEl.current && titleEl.current.offsetHeight;
  const dropdownMenuStyle = singleSearchResultHeight ? {
    minHeight: singleSearchResultHeight + (singleTitleHeight || 0)
  } : {};
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "rqtv-search dropdown ".concat(showResults ? 'show' : ''),
    ref: containerEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 117
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
      lineNumber: 118
    },
    __self: void 0
  }), _react.default.createElement("div", {
    className: "dropdown-menu ".concat(showResults ? 'show' : '', " search-results-container"),
    onScroll: e => handleScroll(e.target),
    ref: searchResultsEl,
    style: dropdownMenuStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 129
    },
    __self: void 0
  }, searchString && _react.default.createElement(_index.RqtvRenderer, {
    loading: qSearchResultsHandler.qLoading,
    error: qSearchResultsHandler.qEngineError,
    noData: qSearchResults && qSearchResults.qSearchGroupArray.length === 0 || qSearchResultsHandler.qLoading === false && !qSearchResults,
    reload: retry,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 135
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
      lineNumber: 141
    },
    __self: void 0
  }, showResults && _react.default.createElement(_searchResults.default, {
    searchResults: qSearchResults,
    scrollHandler: scrollHandler,
    selectSearchResults: acceptSearchResult,
    titleEl: titleEl,
    singleFieldItemHeight: singleFieldItemHeight,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 145
    },
    __self: void 0
  }))))));
};

RqtvSearch.propTypes = {
  resultshHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  resultsWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
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