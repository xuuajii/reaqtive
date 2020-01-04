"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _body = _interopRequireDefault(require("./body"));

var _index = require("../../loading/index");

var _index2 = require("../helpers/index");

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-dropdown\\layout.js";

const Layout = props => {
  const rqtvListObject = props.rqtvListObject;
  const qLayout = props.qLayoutHandler.qLayout;
  const dropdownMenuEl = (0, _react.useRef)();
  const dropdownMenuStyle = !qLayout ? {
    minHeight: props.dropdownMenuHeight
  } : (0, _objectSpread2.default)({}, props.dropdownMenuStyle); // console.log(props.qLayouthandler)

  const rendererProps = (0, _index2.useListObjectRendererMap)(props.qLayoutHandler, props.qObjectHandler); //const noData= qLayout&&qLayout.qListObject.qDataPages[0].qMatrix.length===0;
  //const endSelections = () =>

  const clickAwayCallback = rqtvListObject.isSelecting === false ? () => props.hideDropdownMenu() : () => props.hideDropdownMenu(); //props.rqtvListObject.endSelections(false)

  (0, _layout.useOutsideEventListener)(dropdownMenuEl, clickAwayCallback, props.show);
  return _react.default.createElement("div", {
    className: "dropdown-menu ".concat(props.show ? 'show' : ''),
    ref: dropdownMenuEl,
    style: {
      dropdownMenuStyle
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: void 0
  }, _react.default.createElement(_index.RqtvRenderer, Object.assign({}, rendererProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: void 0
  }), qLayout && _react.default.createElement(_body.default, {
    show: props.show,
    data: qLayout.qListObject.qDataPages[0],
    qUpdating: props.qLayoutHandler && props.qLayoutHandler.qUpdating,
    size: qLayout.qListObject.qSize,
    qObjectHandler: props.qObjectHandler,
    rqtvListObject: props.rqtvListObject,
    dropdownMenuEl: dropdownMenuEl,
    hideDropdownMenu: props.hideDropdownMenu,
    showSearch: props.showSearch,
    quickSelectMode: props.quickSelectMode,
    dropdownMenuHeight: props.dropdownMenuHeight,
    dropdownMenuItemHeight: props.dropdownMenuItemHeight,
    dropdownMenuItemStyle: props.dropdownMenuItemStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  })));
};

var _default = Layout;
exports.default = _default;