"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _layout = require("@reaqtive/layout");

var _qScrollHandler = _interopRequireDefault(require("../shared/q-scroll-handler"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-dropdown\\dropdown-menu-body.js";

const Body = props => {
  const selectValue = props.selectValue,
        qDataPages = props.qDataPages,
        qSize = props.qSize,
        getDataPage = props.getDataPage,
        height = props.height,
        width = props.width,
        hideHorizontalScrollbar = props.hideHorizontalScrollbar,
        dropdownMenuItemStyle = props.dropdownMenuItemStyle;
  const overflowX = hideHorizontalScrollbar ? 'hidden' : 'auto';
  return qDataPages && _react.default.createElement(_qScrollHandler.default, {
    qDataPages: qDataPages,
    qSize: qSize,
    visibleHeight: height,
    getDataPage: getDataPage,
    style: {
      overflowX: overflowX
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: void 0
  }, qDataPages[0].qMatrix.map(item => _react.default.createElement(_layout.DropdownMenuItem, {
    className: item[0].qState,
    key: item[0].qElemNumber,
    onClick: () => selectValue(item[0].qElemNumber),
    toggleMenu: () => false,
    style: dropdownMenuItemStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  }, item[0].qText)));
};

var _default = Body;
exports.default = _default;