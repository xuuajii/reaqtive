"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

var _rqtvListObject = _interopRequireDefault(require("../rqtv-list-object"));

var _layout = _interopRequireDefault(require("./layout"));

var _index = require("../helpers/index");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-listbox\\index.js";

const RqtvListbox = props => {
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
  return _react.default.createElement(_q.QGenericObject, {
    qObjectDef: qObjectDef,
    quickSelectionMode: props.quickSelectionMode,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, _react.default.createElement(_rqtvListObject.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: void 0
  }), _react.default.createElement(_layout.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: void 0
  }))));
};

RqtvListbox.propTypes = {
  qFieldExpr: _propTypes.default.string.isRequired,
  qFieldLabelExpr: _propTypes.default.string,
  qSortObject: _propTypes.default.object,
  showHeader: _propTypes.default.bool,
  showHeaderButtonbar: _propTypes.default.bool,
  showListboxDropdownMenu: _propTypes.default.bool,
  alwaysShowSearch: _propTypes.default.bool,
  height: _propTypes.default.number,
  titleAction: _propTypes.default.func,
  headerStyle: _propTypes.default.object,
  titleStyle: _propTypes.default.object,
  listStyle: _propTypes.default.object,
  itemStyle: _propTypes.default.object,
  focus: _propTypes.default.bool,
  quickSelectionMode: _propTypes.default.bool
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
  focus: true,
  titleAction: () => false,
  headerStyle: {},
  titleStyle: {},
  listStyle: {},
  itemStyle: {},
  quickSelectionMode: false
};
var _default = RqtvListbox;
exports.default = _default;