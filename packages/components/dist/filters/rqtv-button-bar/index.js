"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

var _layout = _interopRequireDefault(require("./layout"));

var _index = require("../helpers/index");

var _rqtvListObject = _interopRequireDefault(require("../rqtv-list-object"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-button-bar\\index.js";

const RqtvButtonBar = props => {
  const qFieldExpr = props.qFieldExpr,
        qSortObject = props.qSortObject,
        qLabelExpr = props.qLabelExpr,
        qId = props.qId,
        qDataPageHeight = props.qDataPageHeight;
  const qObjectDef = (0, _index.useMapPropsToDef)({
    qFieldExpr,
    qSortObject,
    qLabelExpr,
    qId,
    qDataPageHeight
  });
  return _react.default.createElement(_q.QGenericObject, {
    qObjectDef: qObjectDef,
    quickSelectionMode: true,
    toggle: props.toggle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: void 0
  }, _react.default.createElement(_rqtvListObject.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: void 0
  }), _react.default.createElement(_layout.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  }))));
};

RqtvButtonBar.propTypes = {
  qFieldExpr: _propTypes.default.string.isRequired,
  qFieldLabelExpr: _propTypes.default.string,
  qSortObject: _propTypes.default.object,
  buttonSize: _propTypes.default.string,
  qDataPageHeight: _propTypes.default.number
};
RqtvButtonBar.defaultProps = {
  qSortObject: {
    qSortByState: 1,
    qSortByFrequency: 0,
    qSortByNumeric: 0,
    qSortByAscii: 1,
    qSortByLoadOrder: 0,
    qSortByExpression: 0
  },
  buttonSize: 'btn-sm',
  qDataPageHeight: 5,
  toggle: true
};
var _default = RqtvButtonBar;
exports.default = _default;