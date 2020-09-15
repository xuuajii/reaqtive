"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

var _index = require("../index");

var _rqtvCurrentSelectionsObject = _interopRequireDefault(require("./rqtv-current-selections-object"));

var _layout = _interopRequireDefault(require("./layout"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/current-selections/index.js";
const qCurrentSelectionsObjectDef = {
  "qInfo": {
    "qId": "",
    "qType": "SessionLists"
  },
  "qSelectionObjectDef": {},
  qSelections: null,
  qFields: null
};
/**
 * RqtvCurrentSelections
 *
 * it is a toolbar that displays the current selection status and the buttons to go back, forward and clear current selections.
 * Clicking on the button displayin the number of current selections, a modal will appear showing the current selection box (fields and selected values)
 * It currently does not support alternate states. It always display the default state.
 * Styles can be customized via css (or scss)
 *
 */

const RqtvCurrentSelections = props => {
  const appData = (0, _react.useContext)(_index.RqtvAppContext);
  const hidePrefix = props.hidePrefix ? props.hidePrefix : appData.hidePrefix;
  const excludeHidden = props.excludeHidden ? props.excludeHidden : appData.excludeHidden;
  return _react.default.createElement("div", {
    className: "rqtv-current-selections",
    hidden: props.hidden,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: void 0
  }, _react.default.createElement(_q.QGenericObject, {
    qObjectDef: qCurrentSelectionsObjectDef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: void 0
  }, _react.default.createElement(_rqtvCurrentSelectionsObject.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: void 0
  }, _react.default.createElement(_layout.default, {
    isResponsive: props.isResponsive,
    showModalToggler: props.showModalToggler,
    useCurrentSelectionModal: props.useCurrentSelectionModal,
    excludeHidden: excludeHidden,
    hidePrefix: hidePrefix,
    alwayShowToolbar: props.alwayShowToolbar,
    customLoading: props.customLoading,
    breakPoint: props.breakPoint,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: void 0
  }))));
};

RqtvCurrentSelections.propTypes = {
  /**
   * it allows to turnoff the current selections box modal
   */
  useCurrentSelectionModal: _propTypes.default.bool,

  /**
   * when true it transform the toolbar into a fixed positioned floating button
   */
  isResponsive: _propTypes.default.bool,

  /**
   * screentype from which current selections are responsive
   */
  breakPoint: _propTypes.default.oneOf(['xl', 'lg', 'md', 'sm']),

  /**
   * it allows to show/hide the modal toggler
   */
  showModalToggler: _propTypes.default.bool,

  /**
   * if true the current selection toolbar is always shown even if no selection history exists (0 current, selection 0 back-count and 0 forward count)
   */
  alwaysShowToolbar: _propTypes.default.bool,

  /**
   * prefix of the fields to be hidden from current selections modal
   */
  hidePrefix: _propTypes.default.string,

  /**
   * if true field hidden from current selections are not considered in selection count
   */
  excludeHidden: _propTypes.default.bool
};
RqtvCurrentSelections.defaultProps = {
  useCurrentSelectionModal: true,
  isResponsive: true,
  showModalToggler: true,
  alwaysShowToolbar: false,
  breakPoint: 'lg'
};
var _default = RqtvCurrentSelections;
exports.default = _default;