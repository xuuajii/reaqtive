"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = require("@reaqtive/layout");

var _body = _interopRequireDefault(require("../rqtv-dropdown/body"));

var _search = _interopRequireDefault(require("../shared/search"));

var _endSelectionsButtons = _interopRequireDefault(require("../shared/end-selections-buttons"));

var _index = require("../../loading/index");

var _index2 = require("../helpers/index");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-search-field\\layout.js";

const Layout = props => {
  const rqtvListObject = props.rqtvListObject;
  const qLayout = props.qLayoutHandler.qLayout;
  const searchFieldEl = (0, _react.useRef)();
  const bodyEl = (0, _react.useRef)();
  const clickAway = (0, _layout.useOutsideEventListener)(searchFieldEl, () => endSelections('0'), rqtvListObject.isSelecting);
  const clickAwayAbort = (0, _layout.useOutsideEventListener)(searchFieldEl, rqtvListObject.abortListObjectSearch, rqtvListObject.isSearching);

  const onSearch = e => {
    rqtvListObject.searchListObjectFor(e);
  };

  const endSelections = qAccept => {
    rqtvListObject.endSelections(qAccept);
    rqtvListObject.setIsSearching(false);
  };

  const rendererProps = (0, _index2.useListObjectRendererMap)(props.qLayoutHandler, props.qObjectHandler);
  return _react.default.createElement("div", {
    className: "dropdown rqtv-search-field",
    ref: searchFieldEl,
    style: {
      width: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: void 0
  }, _react.default.createElement(_index.RqtvRenderer, {
    loading: props.qLayoutHandler.qLoading,
    error: props.qLayoutHandler.qError,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "rqtv-search-field-header",
    style: {
      width: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: void 0
  }, _react.default.createElement(_search.default, {
    searchAction: onSearch,
    clearSearchAction: rqtvListObject.abortListObjectSearch,
    acceptSearchAction: rqtvListObject.acceptListObjectSearch,
    hideSearch: rqtvListObject.abortListObjectSearch,
    alwaysShowSearch: props.alwaysShowSearch,
    focus: false,
    isSearching: rqtvListObject.isSearching,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: void 0
  }), rqtvListObject.isSelecting && _react.default.createElement(_endSelectionsButtons.default, {
    endSelections: endSelections,
    isSelecting: rqtvListObject.isSelecting,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: void 0
  })), rqtvListObject.isSearching && _react.default.createElement("div", {
    className: "dropdown-menu show",
    style: {
      width: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: void 0
  }, _react.default.createElement(_index.RqtvRenderer, Object.assign({}, rendererProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: void 0
  }), _react.default.createElement(_body.default, {
    data: qLayout.qListObject.qDataPages[0],
    size: qLayout.qListObject.qSize,
    qObject: props.qObject,
    width: '100%' //updateLayout={updateLayout}
    //setQLayoutPatcher={props.setQLayoutPatcher}
    ,
    rqtvListObject: props.rqtvListObject,
    bodyEl: bodyEl,
    dropdownMenuHeight: props.height,
    showToolbar: false,
    dropdownMenuItemHeight: props.listItemHeight,
    bodyStyle: props.bodyStyle,
    itemStyle: props.itemStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: void 0
  })))));
};

var _default = Layout;
exports.default = _default;