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
  // console.log(props.fieldList)
  return _react.default.createElement(_layout.Accordion, {
    className: "rqtv-multibox",
    style: {
      width: props.width
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: void 0
  }, props.fieldList.map(field => {
    const fieldExpr = typeof field === 'string' ? field : field.qFieldExpr; // console.log(fieldExpr)

    return _react.default.createElement(_layout.Collapse, {
      key: fieldExpr,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: void 0
    }, _react.default.createElement(_layout.CollapseHeader, {
      hideTitleWhenExpanded: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: void 0
    }, field.hasSelections === true && _react.default.createElement("span", {
      className: "selection-indicator",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: void 0
    }), field.label || fieldExpr), _react.default.createElement(_layout.CollapseBody, {
      height: props.fieldHeight,
      hideTitleWhenExpanded: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      },
      __self: void 0
    }, _react.default.createElement(_index.RqtvListbox, {
      height: props.fieldHeight,
      qFieldExpr: fieldExpr,
      qLabelExpr: "'".concat(field.label || fieldExpr, "'"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: void 0
    })));
  }));
};

RqtvMultibox.propTypes = {
  /**
   * An array of fieldnames which will be displayed in the multibox
   */
  fields: _propTypes.default.array.isRequired,

  /**
   * The height of the listbox of the active field
   */
  fieldHeight: _propTypes.default.number
};
RqtvMultibox.defaultProps = {
  fieldHeight: 300
};
var _default = RqtvMultibox;
exports.default = _default;