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

var _index = require("../helpers/index");

var _layout = _interopRequireDefault(require("./layout"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-search-field\\index.js";

/**
 * RqtvSearchField
 * It provides you an input field to search a listbox.
 * When the user starts typing a dropdown menu appears under the input field.
 *
 * You can tweak its behaviour using props
 *
 * You can customize style using props and css
 */
const RqtvSearchField = props => {
  const qFieldExpr = props.qFieldExpr,
        qSortObject = props.qSortObject;
  const qObjectDef = (0, _index.useMapPropsToDef)({
    qFieldExpr,
    qSortObject
  });

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        show = _useState2[0],
        setShow = _useState2[1];

  return _react.default.createElement("div", {
    className: "dropdown ".concat(true ? 'show' : '', " rqtv-dropdown"),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  }, _react.default.createElement(_q.QGenericObject, {
    qObjectDef: qObjectDef,
    quickSelectionMode: props.quickSelectionMode,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: void 0
  }, _react.default.createElement(_rqtvListObject.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: void 0
  }), _react.default.createElement(_layout.default, Object.assign({}, props, {
    show: show,
    setShow: setShow,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  })))));
};

RqtvSearchField.propTypes = {
  /**
   * The expression which will be used in the listbox. It can be a fieldname or a valid expression
   */
  qFieldExpr: _propTypes.default.string.isRequired,
  qSortObject: _propTypes.default.shape({
    /**
     * Sorts the field values according to their logical state (selected, optional, alternative or excluded).
     */
    qSortByState: _propTypes.default.number,

    /**
     * Sorts the field values by frequency (number of occurrences in the field).
     */
    qSortByFrequency: _propTypes.default.number,

    /**
     * Sorts the field values by numeric value.
     */
    qSortByNumeric: _propTypes.default.number,

    /**
     * Sorts the field by alphabetical order.
     */
    qSortByAscii: _propTypes.default.number,

    /**
     * Sorts the field values by the initial load order.
     */
    qSortByLoadOrder: _propTypes.default.number,

    /**
     * Sorts the field by expression.
     */
    qSortByExpression: _propTypes.default.number,

    /**
     * Sort by expression.
     */
    qExpression: _propTypes.default.shape({
      qv: _propTypes.default.string
    }),
    qSortByGreyness: _propTypes.default.number
  }),

  /**
   * Height of the dropdown when is open
   */
  dropdownMenuHeight: _propTypes.default.number,

  /**
   * Width of the dropdown when is open
   */
  dropdownMenuWidth: _propTypes.default.number,

  /**
   * Show/hide overflowX
   */
  hideHorizontalScrollbar: _propTypes.default.bool,

  /**
   * if true uses Qlik Sense selection behaviour (begin selection and asks confirmation to apply),
   * if false it uses Qlik View selection behaviour (apply selections immediately)
   */
  quickSelectionMode: _propTypes.default.bool,

  /**
    * The text shown in the input field when not searching
  */
  placeholder: _propTypes.default.string,

  /**
   * if true uses toggle select
   */
  toggle: _propTypes.default.bool
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
  hideHorizontalScrollbar: false,
  placeholder: 'Search',
  toggle: true
};
var _default = RqtvSearchField;
exports.default = _default;