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

var _layout = _interopRequireDefault(require("./layout"));

var _index = require("../helpers/index");

var _rqtvDropdownButton = _interopRequireDefault(require("../../buttons/rqtv-dropdown-button"));

var _rqtvListObject = _interopRequireDefault(require("../rqtv-list-object"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-dropdown\\index.js";

/**
 * RqtvDropdownFilter
 * It is a listbox shaped as a dropdown.
 * It has the same responsive behaviour as bootstrap dropdown when wrapped in a collapse
 *
 * You can twek its behavuiour using props.
 *
 * You can customize its styles using css or using props.
 */
const RqtvDropdownFilter = props => {
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
        showCaret = props.showCaret,
        buttonStyle = props.buttonStyle,
        buttonClassName = props.buttonClassName;
  const qObjectDef = (0, _index.useMapPropsToDef)({
    qFieldExpr,
    qSortObject,
    qLabelExpr
  });
  const qButtonLabelExpr = props.qLabelExpr ? props.qLabelExpr : qObjectDef.label.qStringExpression.qExpr;
  return _react.default.createElement("div", {
    className: "dropdown ".concat(show ? 'show' : '', " rqtv-dropdown"),
    ref: dropdownEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: void 0
  }, _react.default.createElement(_rqtvDropdownButton.default, {
    onClick: handleClick,
    show: show,
    qLabelExpr: qButtonLabelExpr,
    showCaret: showCaret,
    style: buttonStyle,
    className: buttonClassName,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: void 0
  }), show && _react.default.createElement(_q.QGenericObject, {
    qObjectDef: qObjectDef,
    quickSelectionMode: props.quickSelectionMode,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: void 0
  }, _react.default.createElement(_rqtvListObject.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: void 0
  }), _react.default.createElement(_layout.default, Object.assign({}, props, {
    show: show,
    hideDropdownMenu: hideDropdownMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: void 0
  })))));
};

RqtvDropdownFilter.propTypes = {
  /**
   * The expression which will be used in the listbox. It can be a fieldname or a valid expression
   */
  qFieldExpr: _propTypes.default.string.isRequired,

  /**
   * The expression of the title used in the dropdown button (by default it shows the name of the field and the count distinct of that
   * field or the selected value if there is only one selected value)
   */
  qFieldLabelExpr: _propTypes.default.string,
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
   * Show/hide the search input when the dropdown is open
   */
  showSearch: _propTypes.default.bool,

  /**
   * Height of the dropdown when is open
   */
  dropdownMenuHeight: _propTypes.default.number,

  /**
   * Width of the dropdown when is open
   */
  dropdownMenuWidth: _propTypes.default.number,

  /**
   * Show/hide the caret in the dropdown button
   */
  showCaret: _propTypes.default.bool,

  /**
   * style object to customize the dropdown button
   */
  buttonStyle: _propTypes.default.object,

  /**
   * className for the dropdown button
   */
  buttonClassName: _propTypes.default.string,

  /**
   * style object to customize the dropdown menu
   */
  dropdownMenuStyle: _propTypes.default.object,

  /**
   * style object to customize the style of the dropdown menu items (it can be overwritten by selections color coding)
   */
  dropdownMenuItemStyle: _propTypes.default.object,

  /**
   * Show/hide overflowX
   */
  hideHorizontalScrollbar: _propTypes.default.bool,

  /**
   * if true uses Qlik Sense selection behaviour (begin selection and asks confirmation to apply),
   * if false it uses Qlik View selection behaviour (apply selections immediately)
   */
  quickSelectionMode: _propTypes.default.bool
};
RqtvDropdownFilter.defaultProps = {
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
  dropdownMenuWidth: 265,
  showCaret: true,
  buttonStyle: {},
  buttonClassName: 'primary text-light',
  dropdownMenuStyle: {},
  dropdownMenuItemStyle: {},
  hideHorizontalScrollbar: false,
  quickSelectionMode: false
};
var _default = RqtvDropdownFilter;
exports.default = _default;