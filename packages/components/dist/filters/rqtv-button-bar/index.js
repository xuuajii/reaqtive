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

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-button-bar\\index.js";

const RqtvButtonBar = props => {
  const qFieldExpr = props.qFieldExpr,
        qDataPageHeight = props.qDataPageHeight,
        qId = props.qId;
  const qSortObject = props.qSortObject; //{qSortByNumeric: 1, qSortByAscii: 1 }

  const qObjectDef = (0, _index.useMapPropsToDef)({
    qFieldExpr,
    qSortObject,
    qDataPageHeight,
    qId
  });
  return _react.default.createElement(_q.QComponent, {
    qObjectDef: qObjectDef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: void 0
  }, _react.default.createElement(_rqtvListObject.default, {
    quickSelectMode: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: void 0
  }, _react.default.createElement(_layout.default //rqtvListObject={rqtvListObject}
  , {
    title: props.title //qLayoutHandler={props.qLayoutHandler}
    //setQLayoutPatcher={props.setQLayoutPatcher}
    //qObject={props.qObject}
    ,
    qObjectDef: props.qObjectDef //height={500}
    ,
    buttonSize: props.buttonSize,
    qDataPageHeight: qDataPageHeight,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: void 0
  })));
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
    qSortByState: 0,
    qSortByFrequency: 0,
    qSortByNumeric: 0,
    qSortByAscii: 1,
    qSortByLoadOrder: 0,
    qSortByExpression: 0
  },
  buttonSize: 'btn-sm',
  qDataPageHeight: 5
};
var _default = RqtvButtonBar;
exports.default = _default;