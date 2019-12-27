"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _layout = require("@reaqtive/layout");

var _header = _interopRequireDefault(require("./header"));

var _body = _interopRequireDefault(require("./body"));

var _search = _interopRequireDefault(require("../shared/search"));

var _index = require("../../loading/index");

var _index2 = require("../helpers/index");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-listbox\\layout.js";
const Layout = (0, _react.forwardRef)((props, ref) => {
  const rqtvListObject = props.rqtvListObject;
  const rendererProps = (0, _index2.useListObjectRendererMap)(props.qLayoutHandler, props.qObjectHandler);
  const qLayout = props.qLayoutHandler.qLayout; //console.log(qLayout)

  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        showSearch = _useState2[0],
        setShowSearch = _useState2[1];

  const listboxEl = (0, _react.useRef)();
  const bodyEl = (0, _react.useRef)();
  const headerEl = (0, _react.useRef)();
  const searchEl = (0, _react.useRef)();
  const headerHeight = headerEl.current && headerEl.current.offsetHeight;

  const _useState3 = (0, _react.useState)(searchEl.current && searchEl.current.offsetHeight),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        searchHeight = _useState4[0],
        seSearchHeight = _useState4[1];

  (0, _react.useEffect)(() => {
    seSearchHeight(searchEl.current && searchEl.current.offsetHeight);
  }, [showSearch, props.alwaysShowSearch]);
  const bodyHeight = props.height - (headerHeight + searchHeight || 0);
  const clickAway = (0, _layout.useOutsideEventListener)(listboxEl, () => endSelections('1'), rqtvListObject.isSelecting);

  const endSelections = qAccept => {
    const callback = qAccept === '1' ? () => bodyEl.current.scrollTop = 0 : () => true;
    rqtvListObject.endSelections(qAccept, callback);
  };

  return _react.default.createElement("div", {
    className: "rqtv-listbox",
    ref: listboxEl,
    style: {
      minHeight: props.height,
      height: props.height,
      maxHeight: props.height
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: void 0
  }, props.showHeader && _react.default.createElement(_header.default, {
    title: qLayout && qLayout.label,
    endSelections: endSelections,
    clearSelections: rqtvListObject.clearSelections,
    selectExcluded: rqtvListObject.selectExcluded,
    selectPossible: rqtvListObject.selectPossible,
    isSelecting: rqtvListObject.isSelecting,
    setShowSearch: setShowSearch,
    showHeaderButtonbar: props.showHeaderButtonbar,
    showListboxDropdownMenu: props.showListboxDropdownMenu,
    titleAction: props.titleAction,
    headerStyle: props.headerStyle,
    titleStyle: props.titleStyle,
    headerEl: headerEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: void 0
  }), _react.default.createElement("div", {
    ref: searchEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: void 0
  }, (showSearch || props.alwaysShowSearch) && _react.default.createElement(_search.default, {
    searchAction: rqtvListObject.searchListObjectFor,
    clearSearchAction: rqtvListObject.abortListObjectSearch,
    acceptSearchAction: rqtvListObject.acceptListObjectSearch,
    hideSearch: () => {
      setShowSearch(false);
    },
    alwaysShowSearch: props.alwaysShowSearch,
    focus: props.focus,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: void 0
  })), _react.default.createElement(_index.RqtvRenderer, Object.assign({}, rendererProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: void 0
  }), _react.default.createElement(_body.default, {
    data: qLayout && qLayout.qListObject.qDataPages[0],
    size: qLayout && qLayout.qListObject.qSize,
    qObject: props.qObject //updateLayout={updateLayout}
    //setQLayoutPatcher={props.setQLayoutPatcher}
    ,
    rqtvListObject: props.rqtvListObject,
    bodyEl: bodyEl,
    height: bodyHeight,
    listItemHeight: props.listItemHeight,
    bodyStyle: props.bodyStyle,
    itemStyle: props.itemStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: void 0
  })));
});
var _default = Layout;
exports.default = _default;