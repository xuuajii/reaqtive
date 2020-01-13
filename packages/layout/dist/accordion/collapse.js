"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\accordion\\collapse.js";

const AccordionItem = (props, accordionHandler) => {
  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        isExpandedState = _useState2[0],
        setIsExpandedState = _useState2[1];

  const collapseHeaderEl = (0, _react.useRef)(); //console.log(props.onChange)

  const isExpanded = props.isExpanded !== undefined ? props.isExpanded : isExpandedState;

  const handleChange = event => {
    if (props.onChange) {
      props.onChange(event, !isExpanded);
    } else {
      setIsExpandedState(!isExpanded);
    }
  };

  const children = _react.default.Children.toArray(props.children);

  const hideTitleWhenExpanded = children && children[0].props.hideTitleWhenExpanded;
  return _react.default.createElement("div", {
    className: "collapse show ".concat(isExpanded ? 'expanded' : '  '),
    style: {
      overflow: 'hidden'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  }, children.map(child => _react.default.cloneElement(child, {
    handleChange,
    isExpanded,
    collapseHeaderEl,
    hideTitleWhenExpanded
  })));
};

var _default = AccordionItem;
exports.default = _default;