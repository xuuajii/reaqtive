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

var _index = require("../helpers/index");

var _index2 = require("../../loading/index");

var _useRqtvListObject = _interopRequireDefault(require("../use-rqtv-list-object"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-listbox\\layout.js";

const Layout = props => {
  const qLayout = props.qLayoutHandler && props.qLayoutHandler.qLayout;
  const qDataPages = qLayout && qLayout.qListObject.qDataPages;
  const qSize = qLayout && qLayout.qListObject.qSize;
  const qArea = qLayout && qLayout.qListObject.qDataPages[0].qArea;
  const rqtvListObject = props.rqtvListObject; //useRqtvListObject(props.qObjectHandler, props.qSelectionHandler, props.qLayoutHandler, props.quickSelectionMode)

  const _props$qSelectionHand = props.qSelectionHandler,
        isSelecting = _props$qSelectionHand.isSelecting,
        beginSelections = _props$qSelectionHand.beginSelections,
        endSelections = _props$qSelectionHand.endSelections;

  const endSelectionsCallback = () => {
    bodyEl.current.scrollTop = 0;
  };

  const endSelectionsWithCallBack = qAccept => {
    endSelections(qAccept, endSelectionsCallback);
  };

  const _props$qLayoutHandler = props.qLayoutHandler,
        setLayoutUpdater = _props$qLayoutHandler.setLayoutUpdater,
        applyQLayoutPatch = _props$qLayoutHandler.applyQLayoutPatch;

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        showSearch = _useState2[0],
        setShowSearch = _useState2[1];

  const listboxEl = (0, _react.useRef)();
  const headerEl = (0, _react.useRef)();
  const bodyEl = (0, _react.useRef)();
  const headerHeight = headerEl.current && headerEl.current.getBoundingClientRect().height;
  const searchEl = (0, _react.useRef)();

  const _useState3 = (0, _react.useState)(searchEl.current && searchEl.current.offsetHeight),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        searchHeight = _useState4[0],
        seSearchHeight = _useState4[1];

  (0, _react.useEffect)(() => {
    seSearchHeight(searchEl.current && searchEl.current.getBoundingClientRect().height);
  }, [showSearch, props.alwaysShowSearch]);
  const bodyHeight = props.height - (headerHeight + searchHeight || 0);
  (0, _layout.useOutsideEventListener)(listboxEl, () => endSelections(0), isSelecting);
  const layoutUpdater = (0, _react.useCallback)(() => {
    qArea && rqtvListObject.getDataPage(qArea);
  }, [qArea]);
  (0, _react.useEffect)(() => {
    setLayoutUpdater(() => layoutUpdater);
  }, [layoutUpdater]); //const title = qLayout?!(isSelecting)?qLayout.label:qLayout.qListObject.qDimensionInfo.qFallbackTitle:'';

  const setTitle = () => {
    if (qLayout) {
      return qLayout.label ? qLayout.label : qLayout.qListObject.qDimensionInfo.qFallbackTitle;
    } else {
      return props.title || '';
    }
  };

  const title = setTitle();
  const rendererProps = (0, _index.useListObjectRendererMap)(props.qLayoutHandler, props.qObjectHandler);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    ref: listboxEl,
    className: "rqtv-listbox",
    style: {
      maxHeight: props.height,
      height: props.height,
      minHeight: props.height,
      overflowY: 'auto'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: void 0
  }, props.showHeader && _react.default.createElement(_header.default, {
    title: title,
    endSelections: endSelectionsWithCallBack,
    clearSelections: rqtvListObject.clearSelections,
    selectExcluded: rqtvListObject.selectExcluded,
    selectPossible: rqtvListObject.selectPossible,
    isSelecting: isSelecting,
    setShowSearch: setShowSearch,
    showHeaderButtonbar: props.showHeaderButtonbar,
    showListboxDropdownMenu: props.showListboxDropdownMenu,
    titleAction: props.titleAction,
    headerStyle: props.headerStyle,
    titleStyle: props.titleStyle,
    headerEl: headerEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67
    },
    __self: void 0
  }), _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: void 0
  }, _react.default.createElement("div", {
    ref: searchEl,
    style: {
      overflowY: 'auto'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
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
    focus: props.alwaysShowSearch ? false : props.focus,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: void 0
  })), _react.default.createElement(_index2.RqtvRenderer, Object.assign({}, rendererProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96
    },
    __self: void 0
  }), _react.default.createElement(_body.default, {
    qDataPages: qDataPages,
    qSize: qSize,
    selectValue: rqtvListObject.selectValue,
    getDataPage: rqtvListObject.getDataPage,
    height: bodyHeight,
    bodyEl: bodyEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: void 0
  })))));
};

var _default = Layout;
exports.default = _default;