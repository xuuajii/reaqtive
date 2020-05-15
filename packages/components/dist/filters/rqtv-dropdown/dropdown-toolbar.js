"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _search = _interopRequireDefault(require("../shared/search"));

var _endSelectionsButtons = _interopRequireDefault(require("../shared/end-selections-buttons"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/filters/rqtv-dropdown/dropdown-toolbar.js";

const DropdownToolbar = props => _react.default.createElement("div", {
  className: "btn-group dropdown-toolbar",
  ref: props.toolbarRef,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6
  },
  __self: void 0
}, _react.default.createElement("div", {
  className: "rqtv-search-container",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7
  },
  __self: void 0
}, props.showSearch && _react.default.createElement(_search.default, {
  searchAction: props.searchListObjectFor,
  clearSearchAction: props.abortListObjectSearch,
  acceptSearchAction: props.acceptListObjectSearch,
  focus: false,
  onFocus: props.onFocus,
  placeholder: props.placeholder,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9
  },
  __self: void 0
})), !props.quickSelectMode && _react.default.createElement(_endSelectionsButtons.default, {
  endSelections: props.endSelections,
  isSelecting: props.isSelecting,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 20
  },
  __self: void 0
}));

var _default = DropdownToolbar;
exports.default = _default;