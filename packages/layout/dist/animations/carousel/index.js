"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarouselPanel = exports.Carousel = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/animations/carousel/index.js";

const CarouselPanel = props => {
  return _react.default.createElement(_reactSpring.animated.div, {
    style: (0, _objectSpread2.default)({}, props.style),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: void 0
  }, props.children);
};

exports.CarouselPanel = CarouselPanel;

const Carousel = props => {
  //const [index, set] = useState(0)
  const _useState = (0, _react.useState)(props.index),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        currentTab = _useState2[0],
        setCurrentTab = _useState2[1];

  const _useState3 = (0, _react.useState)({
    from: '-',
    leave: ''
  }),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        signs = _useState4[0],
        setSigns = _useState4[1];

  (0, _react.useEffect)(() => {
    if (props.index > currentTab) {
      setSigns({
        from: '',
        leave: '-'
      });
    } else {
      setSigns({
        from: '-',
        leave: ''
      });
    }

    setCurrentTab(props.index);
  }, [props.index]);
  const transition = (0, _reactSpring.useTransition)(currentTab, p => p, {
    initial: {
      width: '100%',
      top: 0,
      opacity: 1,
      overflow: 'hidden'
    },
    from: {
      width: '100%',
      transform: "translate3d(".concat(signs.from, "70%,0,0)"),
      top: 0,
      opacity: 0,
      overflow: 'hidden'
    },
    enter: {
      transform: 'translate3d(0%,0,0)',
      top: 0,
      opacity: 1,
      overflow: 'hidden'
    },
    leave: {
      transform: "translate3d(".concat(signs.leave, "70%,0,0)"),
      top: 0,
      position: 'absolute',
      opacity: 0,
      overflow: 'hidden'
    }
  });
  const carouselProps = props;
  return _react.default.createElement("div", {
    className: "carousel",
    style: {
      display: 'flex',
      height: '100%',
      width: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: void 0
  }, transition.map(({
    item,
    props,
    key
  }) => {
    //const Page = carouselProps.children[item]
    const child = carouselProps.children[item];
    return _react.default.createElement(CarouselPanel, {
      key: key,
      style: props,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: void 0
    }, child);
  }));
};

exports.Carousel = Carousel;