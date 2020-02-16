"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\layout\\src\\lib\\search-input.js";

const SearchInput = props => {
  const searchInputEl = (0, _react.useRef)();

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        searchString = _useState2[0],
        setSearchString = _useState2[1];

  (0, _react.useEffect)(() => {
    if (props.focus === true) {
      searchInputEl.current.focus();
    }
  }, [props.focus]);
  (0, _react.useEffect)(() => {
    if (props.focus === true) {
      searchInputEl.current.focus();
    }
  }, [searchInputEl, props.focus]);

  const handleKeyUp = e => {
    const keyCode = e.keyCode;

    switch (keyCode) {
      case 27:
        props.clearSearchAction();
        resetSearchInput();
        break;

      case 13:
        props.acceptSearchAction();
        resetSearchInput();
        break;

      default:
        if (searchInputEl.current.value.length > 0) {
          setSearchString(searchInputEl.current.value);
        } else {
          props.clearSearchAction();
          resetSearchInput();
        }

    }
  };

  function resetSearchInput() {
    setSearchString(null);
    searchInputEl.current.value = null;
  }

  function handleBlur() {
    setSearchString(null);
    searchInputEl.current.value = null;
  }

  function hideSearch() {
    props.clearSearchAction && props.clearSearchAction();
    props.hideSearch && props.hideSearch();
  }

  (0, _react.useEffect)(() => {
    //console.log(searchString)
    searchString && props.searchAction(searchString);
  }, [searchString]);
  return _react.default.createElement("div", {
    className: "rqtv-search-input-group",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: void 0
  }, _react.default.createElement("input", {
    className: "form-control",
    ref: searchInputEl,
    placeholder: props.placeholder,
    onKeyUp: e => handleKeyUp(e),
    onBlur: () => handleBlur(),
    onFocus: () => props.onFocus && props.onFocus(),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: void 0
  }), props.hideSearch && (!props.alwaysShowSearch || props.isSearching) && _react.default.createElement("button", {
    className: "hide-search",
    onClick: hideSearch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: void 0
  }, _react.default.createElement("span", {
    className: "lui-icon lui-icon--small lui-icon--close",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: void 0
  })));
};

var _default = SearchInput;
exports.default = _default;
SearchInput.propTypes = {
  clearSearchAction: _propTypes.default.func.isRequired,
  searchAction: _propTypes.default.func.isRequired,
  acceptSearchAction: _propTypes.default.func.isRequired,
  placeholder: _propTypes.default.string,
  focus: _propTypes.default.bool
};
SearchInput.defaultProps = {
  placeholder: "Search",
  focus: true
};