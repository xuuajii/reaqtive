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

var _rqtvDropdownButton = _interopRequireDefault(require("../../buttons/rqtv-dropdown-button"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-dropdown\\index.js";

const RqtvDropdown = props => {
  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        show = _useState2[0],
        setShow = _useState2[1];

  const _useState3 = (0, _react.useState)(),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        justHidden = _useState4[0],
        setJustHidden = _useState4[1];

  const dropdownEl = (0, _react.useRef)();

  const toggleShow = () => {
    setShow(!show);
  };

  const handleClick = () => {
    if (!justHidden) {
      toggleShow();
    }
  };

  const hideDropdownMenu = e => {
    setJustHidden(true);
    setShow(false);
    setTimeout(() => setJustHidden(false), 500);
  };

  const qFieldExpr = props.qFieldExpr,
        qSortObject = props.qSortObject,
        qLabelExpr = props.qLabelExpr,
        qId = props.qId;
  const qObjectDef = (0, _index.useMapPropsToDef)({
    qFieldExpr,
    qSortObject,
    qLabelExpr,
    qId
  });
  const qButtonLabelExpr = props.qLabelExpr ? props.qLabelExpr : qObjectDef.label.qStringExpression.qExpr;
  return _react.default.createElement("div", {
    className: "dropdown ".concat(show ? 'show' : '', " rqtv-dropdown"),
    ref: dropdownEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: void 0
  }, _react.default.createElement(_rqtvDropdownButton.default, {
    onClick: handleClick,
    show: show,
    qLabelExpr: qButtonLabelExpr,
    showCaret: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: void 0
  }), show && _react.default.createElement(_q.QComponent, {
    qObjectDef: qObjectDef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: void 0
  }, _react.default.createElement(_rqtvListObject.default, {
    quickSelectMode: props.quickSelectMode,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: void 0
  }, _react.default.createElement(_layout.default, {
    hasCustomLabel: props.qLabelExpr ? true : false,
    dropdownEl: dropdownEl,
    hideDropdownMenu: hideDropdownMenu,
    show: show //rqtvListObject={rqtvListObject}
    ,
    title: props.title //qLayoutHandler={props.qLayoutHandler}
    //setQLayoutPatcher={props.setQLayoutPatcher}
    //qObject={props.qObject}
    ,
    height: 500,
    showSearch: props.showSearch,
    quickSelectMode: props.quickSelectMode,
    dropdownMenuHeight: props.dropdownMenuHeight,
    dropdownMenuItemHeight: props.dropdownMenuItemHeight,
    dropdownMenuStyle: props.dropdownMenuStyle,
    dropdownMenuItemStyle: props.dropdownMenuItemStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: void 0
  }))));
};

RqtvDropdown.propTypes = {
  qFieldExpr: _propTypes.default.string.isRequired,
  qFieldLabelExpr: _propTypes.default.string,
  qSortObject: _propTypes.default.object,
  showSearch: _propTypes.default.bool,
  dropdownMenuHeight: _propTypes.default.number,
  dropdownMenuItemHeight: _propTypes.default.number,
  showCaret: _propTypes.default.bool,
  buttonColor: _propTypes.default.string,
  buttonFontColor: _propTypes.default.string,
  buttonStyle: _propTypes.default.object,
  dropdownMenuStyle: _propTypes.default.object,
  dropdownMenuItemStyle: _propTypes.default.object
};
RqtvDropdown.defaultProps = {
  qSortObject: {
    qSortByState: 1,
    qSortByFrequency: 0,
    qSortByNumeric: 0,
    qSortByAscii: 0,
    qSortByLoadOrder: 0,
    qSortByExpression: 0
  },
  showSearch: true,
  dropdownMenuHeight: 300,
  dropdownMenuItemHeight: 32,
  showCaret: true,
  buttonColor: 'primary',
  buttonFontColor: 'light',
  buttonStyle: {},
  dropdownMenuStyle: {},
  dropdownMenuItemStyle: {}
};
var _default = RqtvDropdown;
exports.default = _default;