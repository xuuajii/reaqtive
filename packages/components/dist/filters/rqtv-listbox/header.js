"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _endSelectionsButtons = _interopRequireDefault(require("../shared/end-selections-buttons"));

var _headerButtonbar = _interopRequireDefault(require("../shared/header-buttonbar"));

var _listboxMenu = _interopRequireDefault(require("./listbox-menu"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-listbox\\header.js";

const Header = props => {
  const titleCursor = props.titleAction ? 'pointer' : 'auto';

  const onClick = () => {
    typeof props.titleAction === 'function' && props.titleAction();
  };

  return _react.default.createElement("div", {
    className: "rqtv-listbox-header",
    style: (0, _objectSpread2.default)({}, props.headerStyle),
    ref: props.headerEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }, _react.default.createElement("h4", {
    className: "rqtv-listbox-title",
    onClick: onClick,
    style: (0, _objectSpread2.default)({
      cursor: titleCursor
    }, props.titleStyle),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: void 0
  }, props.title), _react.default.createElement(HeaderToolbar, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: void 0
  })));
};

var _default = Header;
exports.default = _default;

const HeaderToolbar = props => _react.default.createElement("div", {
  className: "rqtv-listbox-toolbar",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 24
  },
  __self: void 0
}, props.showHeaderButtonbar === true && _react.default.createElement(_headerButtonbar.default, {
  clearSelections: props.clearSelections,
  selectExcluded: props.selectExcluded,
  selectPossible: props.selectPossible,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 26
  },
  __self: void 0
}), _react.default.createElement(_endSelectionsButtons.default, {
  endSelections: props.endSelections,
  isSelecting: props.isSelecting,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 32
  },
  __self: void 0
}), !(props.showHeaderButtonbar === true) && props.showListboxDropdownMenu && _react.default.createElement(_listboxMenu.default, {
  clearSelections: props.clearSelections,
  selectExcluded: props.selectExcluded,
  selectPossible: props.selectPossible,
  setShowSearch: () => props.setShowSearch(true),
  hideCaret: true,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 34
  },
  __self: void 0
}));