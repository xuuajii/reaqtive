"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = _interopRequireDefault(require("./layout"));

var _q = require("@reaqtive/q");

var _rqtvListObject = _interopRequireDefault(require("../rqtv-list-object"));

var _index = require("../helpers/index");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-listbox\\index.js";

const RqtvListboxFwdRef = (props, ref) => {
  const qFieldExpr = props.qFieldExpr,
        qSortObject = props.qSortObject,
        qId = props.qId,
        qLabelExpr = props.qLabelExpr;
  const qObjectDef = (0, _index.useMapPropsToDef)({
    qFieldExpr,
    qSortObject,
    qId,
    qLabelExpr
  });
  return _react.default.createElement(_q.QComponent, {
    qObjectDef: qObjectDef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: void 0
  }, _react.default.createElement(_rqtvListObject.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: void 0
  }, _react.default.createElement(_layout.default //rqtvListObject={rqtvListObject}
  //qLayoutHandler={props.qLayoutHandler}
  , {
    showHeader: props.showHeader //setQLayoutPatcher={props.setQLayoutPatcher}
    //qObject={props.qObject}
    ,
    height: props.height,
    listItemHeight: props.listItemHeight,
    showHeaderButtonbar: props.showHeaderButtonbar,
    showListboxDropdownMenu: props.showListboxDropdownMenu,
    alwaysShowSearch: props.alwaysShowSearch,
    titleAction: props.titleAction,
    headerStyle: props.headerStyle,
    titleStyle: props.titleStyle,
    listStyle: props.listStyle,
    itemStyle: props.itemStyle,
    focus: props.focus,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: void 0
  })));
};

const RqtvListbox = (0, _react.forwardRef)(RqtvListboxFwdRef);
RqtvListbox.propTypes = {
  qFieldExpr: _propTypes.default.string.isRequired,
  qFieldLabelExpr: _propTypes.default.string,
  qSortObject: _propTypes.default.object,
  showHeader: _propTypes.default.bool,
  showHeaderButtonbar: _propTypes.default.bool,
  showListboxDropdownMenu: _propTypes.default.bool,
  alwaysShowSearch: _propTypes.default.bool,
  height: _propTypes.default.number,
  listItemHeight: _propTypes.default.number,
  titleAction: _propTypes.default.func,
  headerStyle: _propTypes.default.object,
  titleStyle: _propTypes.default.object,
  listStyle: _propTypes.default.object,
  itemStyle: _propTypes.default.object,
  focus: _propTypes.default.bool
};
RqtvListbox.defaultProps = {
  showHeader: true,
  showHeaderButtonbar: false,
  showListboxDropdownMenu: true,
  alwaysShowSearch: false,
  qSortObject: {
    qSortByState: 1,
    qSortByFrequency: 0,
    qSortByNumeric: 0,
    qSortByAscii: 0,
    qSortByLoadOrder: 0,
    qSortByExpression: 0
  },
  height: 500,
  listItemHeight: 46,
  focus: true,
  titleAction: () => false,
  headerStyle: {},
  titleStyle: {},
  listStyle: {},
  itemStyle: {}
};
var _default = RqtvListbox;
exports.default = _default;