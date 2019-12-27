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

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\layout\\src\\lib\\navbar\\navbar-collapse.js";

const NavbarCollapse = props => {
  const collapseEl = (0, _react.useRef)();

  const getRefHeight = ref => {
    return ref.current ? ref.current.getBoundingClientRect().height : 0;
  }; //((console.log( collapseEl.current&&collapseEl.current.offsetHeight )


  const transitions = (0, _reactSpring.useTransition)(props.show, null, {
    enter: () => async next => {
      const height = getRefHeight(collapseEl); //console.log(height)

      if (height) {
        await next({
          height: height,
          overflow: 'hidden'
        });
        await next({
          height: "auto",
          overflow: 'visible'
        });
      }
    },
    leave: () => async next => {
      const height = getRefHeight(collapseEl); //console.log(height)

      if (height) {
        await next({
          height: height,
          overflow: 'hidden'
        });
        await next({
          height: 0,
          overflow: 'hidden'
        });
      }
    },
    from: {
      height: 0,
      overflow: 'hidden'
    },
    unique: true
  });
  return transitions.map(({
    item,
    props: animatedProps,
    key
  }) => item && _react.default.createElement(_reactSpring.animated.div, {
    className: "collapse navbar-collapse show",
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
  }, props.children)));
};

var _default = NavbarCollapse;
exports.default = _default;