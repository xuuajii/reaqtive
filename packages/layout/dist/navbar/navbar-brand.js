"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/navbar/navbar-brand.js";
//console.log(1)
const defaultImgStyle = {
  width: "40px",
  height: "30px",
  alt: "",
  display: "inline-block",
  verticalAlign: 'top'
};

const NavbarBrand = props => {
  const navigate = () => {
    //window.location=props.url
    if (typeof props.onClick === 'function') {
      props.onClick();
    } else {
      const isExternalUrl = props.url.match(/^(?:http|https):\/\//) ? true : false;
      isExternalUrl ? window.location = props.url : history.pushState(props.url, '', props.url);
    }
  };

  return _react.default.createElement("a", {
    href: "#",
    className: "navbar-brand ".concat(props.className ? props.className : ''),
    style: (0, _objectSpread2.default)({}, props.style),
    onClick: navigate,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: void 0
  }, props.imgUrl && _react.default.createElement("img", {
    src: props.imgUrl,
    style: (0, _objectSpread2.default)({}, defaultImgStyle, props.imgStyle),
    alt: "Logo",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: void 0
  }), props.children);
};

var _default = NavbarBrand;
exports.default = _default;
NavbarBrand.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  url: _propTypes.default.string,
  imgUrl: _propTypes.default.string,
  imgStyle: _propTypes.default.object,
  hideImg: _propTypes.default.bool
};
NavbarBrand.defaultProps = {
  url: '/'
};