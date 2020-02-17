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

var _dropdownToolbar = _interopRequireDefault(require("./dropdown-toolbar"));

var _dropdownMenuHeader = _interopRequireDefault(require("./dropdown-menu-header.js"));

var _dropdownMenuBody = _interopRequireDefault(require("./dropdown-menu-body.js"));

var _search = _interopRequireDefault(require("../shared/search"));

var _index = require("../../loading/index");

var _index2 = require("../helpers/index");

var _useRqtvListObject = _interopRequireDefault(require("../use-rqtv-list-object"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-dropdown\\layout.js";

const Layout = props => {
  const dropdownMenuHeight = props.dropdownMenuHeight,
        dropdownMenuWidth = props.dropdownMenuWidth,
        hideHorizontalScrollbar = props.hideHorizontalScrollbar;
  const qLayout = props.qLayoutHandler && props.qLayoutHandler.qLayout;
  const qDataPages = qLayout && qLayout.qListObject.qDataPages;
  const qSize = qLayout && qLayout.qListObject.qSize;
  const qArea = qLayout && qLayout.qListObject.qDataPages[0].qArea;
  const rqtvListObject = props.rqtvListObject;
  const _props$qSelectionHand = props.qSelectionHandler,
        isSelecting = _props$qSelectionHand.isSelecting,
        beginSelections = _props$qSelectionHand.beginSelections,
        endSelections = _props$qSelectionHand.endSelections;
  const _props$qLayoutHandler = props.qLayoutHandler,
        setLayoutUpdater = _props$qLayoutHandler.setLayoutUpdater,
        applyQLayoutPatch = _props$qLayoutHandler.applyQLayoutPatch;
  const dropdownMenuEl = (0, _react.useRef)();
  (0, _layout.useOutsideEventListener)(dropdownMenuEl, () => endSelectionsAndHide(0), props.show);

  const endSelectionsAndHide = qAccept => {
    endSelections(qAccept, props.hideDropdownMenu);
  };

  const layoutUpdater = (0, _react.useCallback)(() => {
    qArea && rqtvListObject.getDataPage(qArea);
  }, [qArea]);
  (0, _react.useEffect)(() => {
    setLayoutUpdater(() => layoutUpdater);
  }, [layoutUpdater]);
  const showToolbar = props.quickSelectionMode === false || props.showSearch;
  const toolbarRef = (0, _react.useCallback)(toolbarEl => {
    if (toolbarEl !== null) {
      const toolbarHeight = toolbarEl.getBoundingClientRect().height;
      const restHeight = (1 - toolbarHeight / dropdownMenuHeight) * dropdownMenuHeight; //console.log(restHeight)

      setListHeight(restHeight - 16);
    }
  }, [isSelecting]);
  const rendererProps = (0, _index2.useListObjectRendererMap)(props.qLayoutHandler, props.qObjectHandler);

  const _useState = (0, _react.useState)('100%'),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        listHeight = _useState2[0],
        setListHeight = _useState2[1];

  return _react.default.createElement(_layout.DropdownMenu, {
    show: props.show,
    ref: dropdownMenuEl,
    style: {
      minHeight: 120,
      maxHeight: dropdownMenuHeight,
      overflowY: 'hidden',
      width: dropdownMenuWidth
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: void 0
  }, showToolbar && _react.default.createElement(_dropdownToolbar.default, {
    searchListObjectFor: rqtvListObject.searchListObjectFor,
    abortListObjectSearch: rqtvListObject.abortListObjectSearch,
    acceptListObjectSearch: rqtvListObject.acceptListObjectSearch,
    endSelections: endSelectionsAndHide,
    isSelecting: isSelecting,
    quickSelectionMode: props.quickSelectionMode,
    showSearch: props.showSearch,
    toolbarRef: toolbarRef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: void 0
  }), _react.default.createElement(_index.RqtvRenderer, Object.assign({}, rendererProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: void 0
  }), qLayout && _react.default.createElement(_dropdownMenuBody.default, {
    qDataPages: qDataPages,
    qSize: qSize,
    selectValue: rqtvListObject.selectValue,
    getDataPage: rqtvListObject.getDataPage,
    height: listHeight,
    width: dropdownMenuWidth,
    hideHorizontalScrollbar: hideHorizontalScrollbar,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: void 0
  })));
};

var _default = Layout;
exports.default = _default;