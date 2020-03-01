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

var _index = require("../helpers/index");

var _layout = _interopRequireDefault(require("./layout"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-listbox\\index.js";

/**
 * RqtvListbox
 * It looks like a Qlik Sense listbox, but is always expanded (does'not turn into a drop down).
 * It will fill its container width
 *
 * You can twek its behavuiour using props.
 *
 * You can customize its styles using css or using props.
 */
const RqtvListbox = props => {
  const qFieldExpr = props.qFieldExpr,
        qSortObject = props.qSortObject,
        qLabelExpr = props.qLabelExpr;
  const qObjectDef = (0, _index.useMapPropsToDef)({
    qFieldExpr,
    qSortObject,
    qLabelExpr
  });
  return _react.default.createElement(_q.QGenericObject, {
    qObjectDef: qObjectDef,
    quickSelectionMode: props.quickSelectionMode,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: void 0
  }, _react.default.createElement(_rqtvListObject.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  }), _react.default.createElement(_layout.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }))));
};

RqtvListbox.propTypes = {
  /**
   * The expression which will be used in the listbox. It can be a fieldname or a valid expression
   */
  qFieldExpr: _propTypes.default.string.isRequired,

  /**
   * The expression shown in the header of the listbox
   */
  qFieldLabelExpr: _propTypes.default.string,

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
   * Show/hide listboxheader.
   */
  showHeader: _propTypes.default.bool,

  /**
   * Show/hide the buttons in listbox header (showHeader must be set to true to show the buttons)
   */
  showHeaderButtonbar: _propTypes.default.bool,

  /**
   * Show/hide the listbox menu as a dropdown in listbox header
   */
  showListboxDropdownMenu: _propTypes.default.bool,

  /**
   * if true the search input is alway shown
   */
  alwaysShowSearch: _propTypes.default.bool,

  /**
   * the height of the listbox
   */
  height: _propTypes.default.number,

  /**
   * function called when clicking on the listbox title
   */
  titleAction: _propTypes.default.func,

  /**
   * style object to customize listbox header
   */
  headerStyle: _propTypes.default.object,

  /**
   * style object to customize listbox title
   */
  titleStyle: _propTypes.default.object,

  /**
   * style object to customize the list that wraps the records
   */
  listStyle: _propTypes.default.object,

  /**
   * style object to customize the style of the items displayed by the listbox  (it can be overwritten by selections color coding)
   */
  itemStyle: _propTypes.default.object,

  /**
   * if true the search input is automatically focused when mounted
   */
  focus: _propTypes.default.bool,

  /**
   * if true uses Qlik Sense selection behaviour (begin selection and asks confirmation to apply),
   * if false it uses Qlik View selection behaviour (apply selections immediately)
   */
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