"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\animations\\animated-collapse-div.js";

const AnimatedCollapseDiv = props => {
  const collapseEl = (0, _react.useRef)();

  const getRefHeight = ref => {
    return ref.current ? ref.current.getBoundingClientRect().height : 0;
  };

  const height = props.height ? props.height : getRefHeight(collapseEl); //((console.log( collapseEl.current&&collapseEl.current.offsetHeight )

  const transitions = (0, _reactSpring.useTransition)(props.show, null, {
    enter: () => async next => {
      if (height) {
        await next({
          height: height,
          overflow: 'hidden',
          marginTop: -33,
          opacity: 1
        });
        await next({
          height: height,
          overflow: 'visible',
          marginTop: -33,
          opacity: 1
        });
      }
    },
    leave: () => async next => {
      // console.log(height)
      if (height) {
        await next({
          height: height,
          overflow: 'hidden',
          marginTop: -33,
          opacity: 1
        });
        await next({
          height: 0,
          overflow: 'hidden',
          marginTop: 0,
          opacity: 0
        });
      }
    },
    from: {
      height: 0,
      overflow: 'hidden',
      marginTop: 0,
      opacity: 0
    },
    unique: true,
    reverse: !props.show
  });
  return transitions.map(({
    item,
    props: animatedProps,
    key
  }) => {
    return item && _react.default.createElement(_reactSpring.animated.div, {
      className: "collapse show ".concat(props.className),
      key: key,
      style: (0, _objectSpread2.default)({}, animatedProps),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: void 0
    }, _react.default.createElement("div", {
      ref: collapseEl,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: void 0
    }, props.children));
  });
};

var _default = AnimatedCollapseDiv;
exports.default = _default;