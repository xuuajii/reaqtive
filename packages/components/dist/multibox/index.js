"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = require("@reaqtive/layout");

var _index = require("../index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/multibox/index.js";

/**
 * RqtvMultibox
 *
 * It returns an accordion that shows a list of fields.
 * A listbox is displayed for the active field. One field at a time can be active.
 */
const RqtvMultibox = props => {
  return _react.default.createElement(_layout.Accordion, {
    className: "rqtv-multibox",
    style: {
      width: props.width
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, props.fieldList && props.fieldList.map(field => {
    const fieldExpr = typeof field === 'string' ? field : field.qFieldExpr;
    const toggle = typeof field === 'object' && 'toggle' in field ? field.toggle : true;
    const quickSelectionMode = typeof field === 'object' && 'quickSelectionMode' in field ? field.quickSelectionMode : false;
    return _react.default.createElement(_layout.Collapse, {
      key: fieldExpr,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: void 0
    }, _react.default.createElement(_layout.CollapseHeader, {
      hideTitleWhenExpanded: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: void 0
    }, field.hasSelections === true && _react.default.createElement("span", {
      className: "selection-indicator",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: void 0
    }), field.label || fieldExpr), _react.default.createElement(_layout.CollapseBody, {
      height: props.fieldHeight,
      hideTitleWhenExpanded: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: void 0
    }, _react.default.createElement(_index.RqtvListbox, {
      qState: props.qState,
      height: props.fieldHeight,
      qFieldExpr: fieldExpr,
      qLabelExpr: "'".concat(field.label || fieldExpr, "'"),
      toggle: toggle,
      quickSelectionMode: quickSelectionMode,
      clickAwayAccept: props.clickAwayAccept,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: void 0
    })));
  }));
};

RqtvMultibox.propTypes = {
  /**
   * An array of fieldnames which will be displayed in the multibox
   */
  fieldList: _propTypes.default.array.isRequired,

  /**
   * The height of the listbox of the active field
   */
  fieldHeight: _propTypes.default.number,

  /**
   * The state of the multibox which will be passed to its listboxes
   */
  qState: _propTypes.default.string,

  /**
   * if true selections are accepted when clicking away from an active listbox in selection mode
   */
  clickAwayAccept: _propTypes.default.bool
};
RqtvMultibox.defaultProps = {
  fieldHeight: 300,
  clickAwayAccept: false
};
var _default = RqtvMultibox;
exports.default = _default;