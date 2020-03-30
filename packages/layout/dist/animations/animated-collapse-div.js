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

var _reactSpring = require("react-spring");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\animations\\animated-collapse-div.js";

const AnimatedCollapseDiv = props => {
  const collapseEl = (0, _react.useRef)();

  const getRefHeight = ref => {
    return ref.current ? ref.current.getBoundingClientRect().height : 0;
  }; //const height = props.height?props.height:getRefHeight(collapseEl)


  const _useState = (0, _react.useState)(props.height),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        height = _useState2[0],
        setHeight = _useState2[1];

  const _useState3 = (0, _react.useState)(props.height > 0 ? false : true),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        show = _useState4[0],
        setShow = _useState4[1];

  (0, _react.useEffect)(() => {
    setShow(props.show);
  }, [props.show]);
  (0, _react.useEffect)(() => {
    if (show === true) {
      const rectHeight = collapseEl.current && collapseEl.current.getBoundingClientRect().height;
      const newHeight = props.height ? props.height : rectHeight;
      setHeight(newHeight);
    }
  }, [show, props.height]);
  const transitions = (0, _reactSpring.useTransition)(show, null, {
    enter: () => async next => {
      if (height) {
        await next({
          height: height,
          overflow: 'hidden',
          marginTop: props.hideTitleWhenExpanded ? -33 : 0,
          opacity: 1
        });
        await next({
          height: props.height ? height : 'auto',
          overflow: 'visible',
          marginTop: props.hideTitleWhenExpanded ? -33 : 0,
          opacity: 1
        });
      }
    },
    leave: () => async next => {
      // console.log(height)
      if (height) {
        await next({
          height: props.height ? height : 'auto',
          overflow: 'hidden',
          marginTop: props.hideTitleWhenExpanded ? -33 : 0,
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
    reverse: !show
  });
  return transitions.map(({
    item,
    props: animatedProps,
    key
  }) => {
    return item && _react.default.createElement(_reactSpring.animated.div, {
      className: "collapse ".concat(props.className, " show "),
      key: key,
      style: (0, _objectSpread2.default)({}, animatedProps),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: void 0
    }, _react.default.createElement("div", {
      ref: collapseEl,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      },
      __self: void 0
    }, props.children));
  });
};

var _default = AnimatedCollapseDiv;
exports.default = _default;