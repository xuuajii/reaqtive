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
      lineNumber: 15
    },
    __self: void 0
  }, props.fieldList.map(field => {
    const fieldExpr = typeof field === 'string' ? field : field.qFieldExpr; // console.log(fieldExpr)

    return _react.default.createElement(_layout.Collapse, {
      key: fieldExpr,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 21
      },
      __self: void 0
    }, _react.default.createElement(_layout.CollapseHeader, {
      hideTitleWhenExpanded: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: void 0
    }, field.hasSelections === true && _react.default.createElement("span", {
      className: "selection-indicator",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25
      },
      __self: void 0
    }), field.label || fieldExpr), _react.default.createElement(_layout.CollapseBody, {
      height: props.fieldHeight,
      hideTitleWhenExpanded: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: void 0
    }, _react.default.createElement(_index.RqtvListbox, {
      height: props.fieldHeight,
      qFieldExpr: fieldExpr,
      qLabelExpr: "'".concat(field.label || fieldExpr, "'"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: void 0
    })));
  }));
};

RqtvMultibox.propsTypes = {
  fields: _propTypes.default.array.isRequired,
  fieldHeight: _propTypes.default.integer
};
RqtvMultibox.defaultProps = {
  fieldHeight: 300
};
var _default = RqtvMultibox;
exports.default = _default;