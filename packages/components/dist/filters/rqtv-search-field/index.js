"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = _interopRequireDefault(require("./layout"));

var _q = require("@reaqtive/q");

var _rqtvListObject = _interopRequireDefault(require("../rqtv-list-object"));

var _index = require("../helpers/index");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-search-field\\index.js";

const RqtvSearchField = props => {
  const qFieldExpr = props.qFieldExpr,
        qSortObject = props.qSortObject,
        qId = props.qId;
  const qObjectDef = (0, _index.useMapPropsToDef)({
    qFieldExpr,
    qSortObject,
    qId
  }); // console.log(props)

  return _react.default.createElement(_q.QComponent, {
    qObjectDef: qObjectDef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: void 0
  }, _react.default.createElement(_rqtvListObject.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: void 0
  }, _react.default.createElement(_layout.default //rqtvListObject={rqtvListObject}
  , {
    title: props.title || props.qFieldExpr //qLayoutHandler={props.qLayoutHandler}
    ,
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
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  })));
};

RqtvSearchField.propTypes = {
  qFieldExpr: _propTypes.default.string.isRequired,
  qFieldLabelExpr: _propTypes.default.string,
  qSortObject: _propTypes.default.object,
  height: _propTypes.default.number,
  listItemHeight: _propTypes.default.number,
  listStyle: _propTypes.default.object,
  itemStyle: _propTypes.default.object
};
RqtvSearchField.defaultProps = {
  qSortObject: {
    qSortByState: 1,
    qSortByFrequency: 0,
    qSortByNumeric: 0,
    qSortByAscii: 0,
    qSortByLoadOrder: 0,
    qSortByExpression: 0
  },
  height: 150,
  listItemHeight: 46,
  listStyle: {},
  itemStyle: {}
};
var _default = RqtvSearchField;
exports.default = _default;