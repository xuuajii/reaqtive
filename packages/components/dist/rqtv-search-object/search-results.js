"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/rqtv-search-object/search-results.js";

const SearchResults = props => {
  const searchResults = props.searchResults; //console.log(searchResults)

  if (searchResults.qSearchGroupArray.length > 1) {
    return _react.default.createElement("ul", {
      className: "list-group",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      },
      __self: void 0
    }, _react.default.createElement("div", {
      hidden: !props.scrollHandler.fillers.top,
      style: {
        height: props.scrollHandler.fillers.top
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      },
      __self: void 0
    }), searchResults.qSearchGroupArray.map((qSearchGroup, index) => _react.default.createElement(SearchGroup, {
      key: qSearchGroup.qId + index,
      qFieldName: qSearchGroup.qItems[0].qIdentifier,
      matches: qSearchGroup.qItems[0].qItemMatches,
      selectSearchResults: props.selectSearchResults,
      qId: qSearchGroup.qId,
      clearSearch: props.clearSearch,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      },
      __self: void 0
    })), _react.default.createElement("div", {
      hidden: !props.scrollHandler.fillers.bottom,
      style: {
        height: props.scrollHandler.fillers.bottom
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: void 0
    }));
  }

  if (searchResults.qSearchGroupArray.length === 1) {
    const searchGroupItem = searchResults.qSearchGroupArray[0].qItems[0];
    return _react.default.createElement(SingleSearchGroup, {
      qFieldName: searchGroupItem.qIdentifier,
      matches: searchGroupItem.qItemMatches,
      selectSearchResults: props.selectSearchResults,
      clearSearch: props.clearSearch,
      titleEl: props.titleEl,
      itemHeight: props.singleFieldItemHeight,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: void 0
    });
  }
};

const SearchGroup = props => _react.default.createElement("li", {
  className: "list-group-item search-result-group",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 39
  },
  __self: void 0
}, _react.default.createElement("h6", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 40
  },
  __self: void 0
}, _react.default.createElement("span", {
  className: "badge badge-secondary",
  onClick: props.selectFieldMatches,
  "data-q-id": props.qId,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 41
  },
  __self: void 0
}, props.qFieldName)), _react.default.createElement("div", {
  className: "search-result-matches-container",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 45
  },
  __self: void 0
}, props.matches.map((match, index) => _react.default.createElement(_react.Fragment, {
  key: match.qText + index,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 47
  },
  __self: void 0
}, _react.default.createElement("span", {
  className: "search-result-match",
  onClick: (searchString, qId) => props.selectSearchResults(match.qText),
  __source: {
    fileName: _jsxFileName,
    lineNumber: 48
  },
  __self: void 0
}, match.qText), _react.default.createElement("span", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 54
  },
  __self: void 0
}, index < props.matches.length - 1 ? ', ' : ' ')))));

const SingleSearchGroup = props => {
  return _react.default.createElement("div", {
    className: "single-search-group",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: void 0
  }, _react.default.createElement("h6", {
    className: "h6",
    ref: props.titleEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: void 0
  }, props.qFieldName), _react.default.createElement("ul", {
    className: "list-group",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: void 0
  }, props.matches.map(match => _react.default.createElement("li", {
    key: match.qText,
    className: "list-group-item",
    onClick: searchString => props.selectSearchResults(match.qText),
    style: {
      height: props.itemHeight
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: void 0
  }, match.qText))));
};

var _default = SearchResults;
exports.default = _default;