"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\accordion\\accordion.js";

const Accordion = props => {
  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        expandedItem = _useState2[0],
        setExpandedItem = _useState2[1];

  const onChange = itemToExpand => (event, isExpanded) => {
    if (isExpanded) {
      setExpandedItem(itemToExpand);
    } else {
      setExpandedItem(false);
    }
  };

  return _react.default.createElement("div", {
    className: "accordion ".concat(props.className),
    style: (0, _objectSpread2.default)({}, props.style),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, _react.default.createElement("ul", {
    className: "accordion-list list-group",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }, props.children.map((child, index) => {
    const id = "".concat(props.id).concat(index);
    return _react.default.createElement("li", {
      key: id,
      className: "list-group-item",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: void 0
    }, _react.default.cloneElement(child, {
      id,
      onChange: onChange(id),
      isExpanded: expandedItem === id
    }));
  })));
};

var _default = Accordion;
exports.default = _default;