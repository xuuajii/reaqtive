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

var _dropdownToolbar = _interopRequireDefault(require("../rqtv-dropdown/dropdown-toolbar"));

var _dropdownMenuBody = _interopRequireDefault(require("../rqtv-dropdown/dropdown-menu-body.js"));

var _search = _interopRequireDefault(require("../shared/search"));

var _index = require("../../loading/index");

var _index2 = require("../helpers/index");

var _useRqtvListObject = _interopRequireDefault(require("../use-rqtv-list-object"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/filters/rqtv-search-field/layout.js";

const Layout = props => {
  const dropdownMenuHeight = props.dropdownMenuHeight,
        dropdownMenuWidth = props.dropdownMenuWidth,
        hideHorizontalScrollbar = props.hideHorizontalScrollbar,
        dropdownMenuItemStyle = props.dropdownMenuItemStyle,
        placeholder = props.placeholder;
  const qLayout = props.qLayoutHandler && props.qLayoutHandler.qLayout;
  const qDataPages = qLayout && qLayout.qListObject.qDataPages;
  const qSize = qLayout && qLayout.qListObject.qSize;
  const qArea = qDataPages && qDataPages.length > 0 && qDataPages[0].qArea;
  const rendererProps = (0, _index2.useListObjectRendererMap)(props.qLayoutHandler, props.qObjectHandler);
  const rqtvListObject = props.rqtvListObject;
  const isSearching = rqtvListObject.isSearching;
  const _props$qSelectionHand = props.qSelectionHandler,
        isSelecting = _props$qSelectionHand.isSelecting,
        beginSelections = _props$qSelectionHand.beginSelections,
        endSelections = _props$qSelectionHand.endSelections;
  const _props$qLayoutHandler = props.qLayoutHandler,
        setLayoutUpdater = _props$qLayoutHandler.setLayoutUpdater,
        applyQLayoutPatch = _props$qLayoutHandler.applyQLayoutPatch;
  const dropdownMenuEl = (0, _react.useRef)();
  (0, _layout.useOutsideEventListener)(dropdownMenuEl, () => endSelectionsAndHide(0), props.show);
  const layoutUpdater = (0, _react.useCallback)(() => {
    qArea && rqtvListObject.getDataPage(qArea);
  }, [qArea]);
  (0, _react.useEffect)(() => {
    setLayoutUpdater(() => layoutUpdater);
  }, [layoutUpdater]);

  const _useState = (0, _react.useState)('100%'),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        listHeight = _useState2[0],
        setListHeight = _useState2[1];

  const abort = () => {
    props.setShow(false);
    rqtvListObject.abortListObjectSearch();
  };

  const accept = () => {
    props.setShow(false);
    rqtvListObject.acceptListObjectSearch();
  }; //console.log(props.show, isSearching)


  (0, _react.useEffect)(() => {
    if (props.show !== true && isSearching === true) {
      setTimeout(() => props.setShow(true), 200);
    }
  }, [isSearching]);

  const endSelectionsAndHide = qAccept => {
    endSelections(qAccept, () => props.setShow(false));
    abort();
  };

  return _react.default.createElement("div", {
    ref: dropdownMenuEl,
    className: "rqtv-search-field",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "rqtv-search-field-header",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: void 0
  }, _react.default.createElement(_dropdownToolbar.default, {
    searchListObjectFor: rqtvListObject.searchListObjectFor,
    abortListObjectSearch: abort,
    acceptListObjectSearch: accept,
    endSelections: endSelectionsAndHide,
    isSelecting: isSelecting,
    quickSelectionMode: props.quickSelectionMode,
    showSearch: true,
    placeholder: placeholder,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: void 0
  })), _react.default.createElement(_layout.DropdownMenu, {
    show: props.show,
    style: {
      minHeight: 120,
      maxHeight: dropdownMenuHeight,
      overflowY: 'auto',
      width: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: void 0
  }, _react.default.createElement(_index.RqtvRenderer, Object.assign({}, rendererProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: void 0
  }), qDataPages && _react.default.createElement(_dropdownMenuBody.default, {
    qDataPages: qDataPages,
    qSize: qSize,
    selectValue: rqtvListObject.selectValue,
    getDataPage: rqtvListObject.getDataPage,
    height: listHeight,
    width: dropdownMenuWidth,
    hideHorizontalScrollbar: hideHorizontalScrollbar,
    hideHorizontalScrollbar: hideHorizontalScrollbar,
    dropdownMenuItemStyle: dropdownMenuItemStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: void 0
  }))));
};

var _default = Layout;
exports.default = _default;