"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSpring = require("react-spring");

var _index = require("./index");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\layout\\src\\lib\\side-menu\\side-menu-main.js";

const SideMenuMain = props => {
  return _react.default.createElement(_index.SideMenuContextProvider, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: void 0
  }), _react.default.createElement(SideMenuMainLayout, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: void 0
  })));
};

const SideMenuMainLayout = props => {
  const sideMenuContext = (0, _react.useContext)(_index.SideMenuContext);
  const config = sideMenuContext.config;
  const left = sideMenuContext.isOpen && !config.staticMain ? "".concat(config.ratio * 100, "%") : '0%';
  const width = sideMenuContext.isOpen && !config.staticMain ? "".concat((1 - config.ratio) * 100, "%") : '100%';
  const animatedProps = (0, _reactSpring.useSpring)({
    left: left,
    width: width
  }); //console.log(left)
  //width props is added to force update

  const children = _react.default.Children.toArray(props.children);

  return _react.default.createElement(_reactSpring.animated.div, {
    style: (0, _objectSpread2.default)({
      position: 'relative',
      display: 'flex',
      width: '100%'
    }, animatedProps),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: void 0
  }, children.map(child => {
    return typeof child.type === 'string' ? _react.default.cloneElement(child) : _react.default.cloneElement(child, {
      mainWidth: width
    });
  }));
};

SideMenuMain.propTypes = {
  alwaysStaticMain: _propTypes.default.bool,
  breakPoints: _propTypes.default.object,
  defaultRatio: _propTypes.default.number
};
SideMenuMain.defaultProps = {
  alwaysStaticMain: false
};
var _default = SideMenuMain;
exports.default = _default;