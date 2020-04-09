"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

var _rqtvCurrentSelectionsObject = _interopRequireDefault(require("./rqtv-current-selections-object"));

var _layout = _interopRequireDefault(require("./layout"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\current-selections\\index.js";
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
  return _react.default.createElement("div", {
    className: "rqtv-current-selections",
    hidden: props.hidden,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: void 0
  }, _react.default.createElement(_q.QComponent, {
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
    hidePrefix: props.hidePrefix,
    alwayShowToolbar: props.alwayShowToolbar,
    customLoading: props.customLoading,
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
   * it allows to show/hide the modal toggler
   */
  showModalToggler: _propTypes.default.bool,

  /**
   * if true the current selection toolbar is always shown even if no selection history exists (0 current, selection 0 back-count and 0 forward count)
   */
  alwaysShowToolbar: _propTypes.default.bool
};
RqtvCurrentSelections.defaultProps = {
  useCurrentSelectionModal: true,
  isResponsive: true,
  showModalToggler: true,
  alwaysShowToolbar: false
};
var _default = RqtvCurrentSelections;
exports.default = _default;