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

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/filters/rqtv-button-bar/index.js";

/**
 * RqtvButtonBar
 * it is a paginated listbox shaped as a buttonbar
 * It does not ask for selection confirmation, but just toggle the selection when a button is clicked
 *
 * You can twek its behavuiour using props.
 *
 * You can customize its styles using css or using props.
 */
const RqtvButtonBar = props => {
  const qFieldExpr = props.qFieldExpr,
        qSortObject = props.qSortObject,
        qLabelExpr = props.qLabelExpr,
        qDataPageHeight = props.qDataPageHeight,
        buttonsClassName = props.buttonsClassName,
        buttonsStyle = props.buttonsStyle;
  const qObjectDef = (0, _index.useMapPropsToDef)({
    qFieldExpr,
    qSortObject,
    qLabelExpr,
    qDataPageHeight
  });
  return _react.default.createElement(_q.QGenericObject, {
    qObjectDef: qObjectDef,
    quickSelectionMode: true,
    toggle: props.toggle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  }, _react.default.createElement(_rqtvListObject.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: void 0
  }), _react.default.createElement(_layout.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: void 0
  }))));
};

RqtvButtonBar.propTypes = {
  /**
   * The expression which will be used in the listbox. It can be a fieldname or a valid expression
   */
  qFieldExpr: _propTypes.default.string.isRequired,

  /**
   * An array that tells the engine how to sort listbox data. You can set only the relevant properties of the object to 1.
   */
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
   * The bootstrap class to apply large (btn-lg), standard (btn) or small (btn-sm) size to a button.
   */
  buttonSize: _propTypes.default.string,

  /**
   * The number of records asked to the engine for each page
   */
  qDataPageHeight: _propTypes.default.number,

  /**
   * If true it resets pagination (back to first page) after a selection is made
   */
  goToFirstPageAfterSelection: _propTypes.default.bool,

  /**
   * css classes applied to the buttons (it can be overwritten by selections color coding)
   */
  buttonsClassName: _propTypes.default.string,

  /**
   * style object to customize buttons style (it can be overwritten by selections color coding)
   */
  buttonsStyle: _propTypes.default.object,

  /**
   * if true uses toggle select
   */
  toggle: _propTypes.default.bool
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
  toggle: true,
  goToFirstPageAfterSelection: true,
  buttonsClassName: '',
  buttonsStyle: {}
};
var _default = RqtvButtonBar;
exports.default = _default;