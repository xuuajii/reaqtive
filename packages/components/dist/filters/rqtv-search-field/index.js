"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

var _rqtvListObject = _interopRequireDefault(require("../rqtv-list-object"));

var _layout = _interopRequireDefault(require("./layout"));

var _index = require("../helpers/index");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-search-field\\index.js";

const RqtvSearchField = props => {
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

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        show = _useState2[0],
        setShow = _useState2[1];

  return _react.default.createElement("div", {
    className: "dropdown ".concat(true ? 'show' : '', " rqtv-dropdown"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }, _react.default.createElement(_q.QGenericObject, {
    qObjectDef: qObjectDef,
    quickSelectionMode: props.quickSelectionMode,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: void 0
  }, _react.default.createElement(_rqtvListObject.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  }), _react.default.createElement(_layout.default, Object.assign({}, props, {
    show: show,
    setShow: setShow,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  })))));
};

RqtvSearchField.propTypes = {
  qFieldExpr: _propTypes.default.string.isRequired,
  qFieldLabelExpr: _propTypes.default.string,
  qSortObject: _propTypes.default.object,
  quickSelectionMode: _propTypes.default.bool,
  dropdownMenuHeight: _propTypes.default.number,
  dropdownMenuWidth: _propTypes.default.number,
  hideHorizontalScrollbar: _propTypes.default.bool
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
  quickSelectionMode: false,
  dropdownMenuHeight: 300,
  dropdownMenuWidth: 265,
  hideHorizontalScrollbar: false
}; // showSearch:PropTypes.bool,
// dropdownMenuHeight:PropTypes.number,
// dropdownMenuWidth:PropTypes.number,
// showCaret:PropTypes.bool,
// buttonColor:PropTypes.string,
// buttonFontColor:PropTypes.string,
// buttonStyle:PropTypes.object,
// dropdownMenuStyle:PropTypes.object,
// dropdownMenuItemStyle:PropTypes.object,
// hideHorizontalScrollbar:PropTypes.bool,
// quickSelectionMode:PropTypes.bool,

var _default = RqtvSearchField;
exports.default = _default;