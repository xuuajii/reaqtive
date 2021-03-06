"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("../index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/accordion/collapse-body.js";

const CollapseBody = props => {
  const childType = props.children.type;
  const headerHeight = props.collapseHeaderEl.current && props.collapseHeaderEl.current.offsetHeight;

  if (childType.render && childType.render.name.indexOf('RqtvListbox') !== -1) {
    const height = props.height - (headerHeight || 0);
    return _react.default.createElement(_index.AnimatedCollapseDiv, {
      hideTitleWhenExpanded: props.hideTitleWhenExpanded,
      height: height,
      className: "collapse-body",
      show: props.isExpanded,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      },
      __self: void 0
    }, _react.default.cloneElement(props.children, {
      titleAction: props.handleChange,
      height: height
    }));
  }

  return _react.default.createElement(_index.AnimatedCollapseDiv, {
    hideTitleWhenExpanded: props.hideTitleWhenExpanded,
    height: props.height,
    className: "collapse-body",
    show: props.isExpanded,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: void 0
  }, props.children);
};

var _default = CollapseBody;
exports.default = _default;