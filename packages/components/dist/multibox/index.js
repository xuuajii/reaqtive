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

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\multibox\\index.js";

const RqtvMultibox = props => {
  // console.log(props.fieldList)
  return _react.default.createElement(_layout.Accordion, {
    className: "rqtv-multibox",
    style: {
      width: props.width
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }, props.fieldList.map(field => {
    const fieldExpr = typeof field === 'string' ? field : field.qFieldExpr;
    const toggle = typeof field === 'object' && 'toggle' in field ? field.toggle : true;
    const quickSelectionMode = typeof field === 'object' && 'quickSelectionMode' in field ? field.quickSelectionMode : false;
    return _react.default.createElement(_layout.Collapse, {
      key: fieldExpr,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: void 0
    }, _react.default.createElement(_layout.CollapseHeader, {
      hideTitleWhenExpanded: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: void 0
    }, field.hasSelections === true && _react.default.createElement("span", {
      className: "selection-indicator",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: void 0
    }), field.label || fieldExpr), _react.default.createElement(_layout.CollapseBody, {
      height: props.fieldHeight,
      hideTitleWhenExpanded: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: void 0
    }, _react.default.createElement(_index.RqtvListbox, {
      height: props.fieldHeight,
      qFieldExpr: fieldExpr,
      qLabelExpr: "'".concat(field.label || fieldExpr, "'"),
      toggle: toggle,
      quickSelectionMode: quickSelectionMode,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
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
  fieldHeight: _propTypes.default.number
};
RqtvMultibox.defaultProps = {
  fieldHeight: 300
};
var _default = RqtvMultibox;
exports.default = _default;