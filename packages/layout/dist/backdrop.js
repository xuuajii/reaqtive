"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSpring = require("react-spring");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/backdrop.js";

const Backdrop = props => {
  //  const animatedProps = useSpring({
  //   opacity:props.show?0.5:0,
  //   display:props.show===true?'block':'none'
  // })
  const transitions = (0, _reactSpring.useTransition)(props.show, null, {
    from: {
      display: 'none',
      opacity: 0
    },
    enter: {
      display: 'block',
      opacity: 0.5
    },
    leave: {
      opacity: 0
    }
  });

  const onClick = () => {
    console.log(1);
    props.onClick && props.onClick();
  };

  const zIndex = props.zIndex;
  return transitions.map(({
    item,
    key,
    props
  }) => item && _react.default.createElement(_reactSpring.animated.div, {
    key: key,
    className: "modal-backdrop show",
    style: (0, _objectSpread2.default)({
      zIndex: zIndex
    }, props),
    onClick: onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: void 0
  }));
};

Backdrop.propTypes = {
  zIndex: _propTypes.default.number
};
Backdrop.defaultProps = {
  zIndex: 1040
};
var _default = Backdrop;
exports.default = _default;