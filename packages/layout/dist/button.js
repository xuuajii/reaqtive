"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\layout\\src\\lib\\button.js";

const Button = props => {
  const className = "btn ".concat(props.className ? props.className : 'btn-default', " ").concat(props.ripple ? 'ripple' : ''); //const [className, setClassName] = useState(classNameInitial)

  const events = {
    onClick: props.onClick
  };
  return _react.default.createElement("button", Object.assign({
    className: className,
    style: (0, _objectSpread2.default)({}, props.style)
  }, events, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }), props.children);
}; //{props.animated?<animated.span style={animatedProps}/>:null}


var _default = Button;
exports.default = _default;