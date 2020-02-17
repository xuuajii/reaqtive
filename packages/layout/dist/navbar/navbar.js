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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\layout\\src\\lib\\navbar\\navbar.js";
const defaultTogglerStyle = {
  border: 0
};

const Navbar = props => {
  const navbarEl = (0, _react.useRef)();

  const _useState = (0, _react.useState)(window.innerWidth > props.breakpoint ? true : false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        showCollapse = _useState2[0],
        setShowCollapse = _useState2[1];

  const toggleCollapse = () => {
    setShowCollapse(!showCollapse);
  };

  const children = _react.default.Children.toArray(props.children);

  const addPaddingTop = props.className.indexOf("fixed-top") !== -1;
  const addPaddingBottom = props.className.indexOf("fixed-bottom") !== -1;
  (0, _react.useEffect)(() => {
    if (addPaddingTop) {
      const body = document.getElementsByTagName("BODY")[0];
      body.style.top = navbarEl.current.offsetHeight + 'px';
    }
  }, [navbarEl.current]); //const [paddingElHeight, setPaddingElHeight] = useState(0)

  const mapPropToElement = (child, index) => {
    const propsMap = {
      NavbarCollapse: {
        show: showCollapse
      },
      NavbarToggle: {
        toggleCollapse,
        showCollapse
      }
    };
    const mappedProp = propsMap[child.type.name]; //console.log(mappedProp)

    return mappedProp ? _react.default.cloneElement(child, (0, _objectSpread2.default)({}, mappedProp)) : _react.default.cloneElement(child);
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("nav", {
    className: "navbar ".concat(props.className ? props.className : ''),
    style: (0, _objectSpread2.default)({}, props.style),
    ref: navbarEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: void 0
  }, children.map((child, index) => mapPropToElement(child, index))));
};

Navbar.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  breakpoint: _propTypes.default.number
};
Navbar.defaultProps = {
  className: "navbar-expand-lg navbar-light bg-light",
  breakpoint: 992
};
var _default = Navbar;
exports.default = _default;