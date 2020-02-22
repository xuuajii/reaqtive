"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarouselPanel = exports.Carousel = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _reactSpring = require("react-spring");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\layout\\src\\lib\\animations\\carousel\\index.js";

const CarouselPanel = props => {
  return _react.default.createElement(_reactSpring.animated.div, {
    style: (0, _objectSpread2.default)({}, props.style),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: void 0
  }, props.children);
};

exports.CarouselPanel = CarouselPanel;

const Carousel = props => {
  //const [index, set] = useState(0)
  const transition = (0, _reactSpring.useTransition)(props.index, p => p, {
    initial: {
      width: '100%',
      top: 0,
      opacity: 1,
      overflow: 'hidden'
    },
    from: {
      width: '100%',
      transform: "translate3d(".concat(props.index === 1 ? '' : '-', "70%,0,0)"),
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
      transform: "translate3d(".concat(props.index === 1 ? '-' : '', "70%,0,0)"),
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
      lineNumber: 24
    },
    __self: void 0
  }, transition.map(({
    item,
    props,
    key
  }) => {
    //const Page = carouselProps.children[item]
    const child = carouselProps.children[item];
    return _react.default.cloneElement(child, {
      style: props
    });
  }));
};

exports.Carousel = Carousel;