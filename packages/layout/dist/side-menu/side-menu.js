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

var _index2 = require("../index");

var _backdrop = _interopRequireDefault(require("../backdrop"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/side-menu/side-menu.js";

const SideMenu = props => {
  return _react.default.createElement(_index.SideMenuContextProvider, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  }), _react.default.createElement(SideMenuLayout, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  })));
};

const SideMenuLayout = props => {
  const sidemenuEl = (0, _react.useRef)();
  const system = (0, _react.useContext)(_index2.System);
  const sideMenuContext = (0, _react.useContext)(_index.SideMenuContext);
  const config = sideMenuContext.config;
  const sideMenuStyle = {
    width: Math.trunc(system.windowWidth * config.ratio)
  };
  const transitions = (0, _reactSpring.useTransition)(sideMenuContext.isOpen, null, {
    from: {
      opacity: 0.75,
      transform: "translateX(-100%)",
      overflow: 'hidden'
    },
    enter: {
      opacity: 1,
      transform: "translateX(0)",
      overflow: 'hidden'
    },
    leave: {
      opacity: 0.75,
      transform: "translateX(-100%)",
      overflow: 'hidden'
    },
    reset: true,
    unique: true
  });
  const sidemenuChildren = sideMenuContext.isOpen ? _react.default.Children.toArray(props.children) : null;
  const sideMenuProps = props;
  return _react.default.createElement(_react.default.Fragment, null, transitions.map(({
    item,
    key,
    props
  }) => {
    return item && _react.default.createElement(_reactSpring.animated.div, {
      key: key,
      style: props,
      className: "side-menu ".concat(sideMenuProps.className ? sideMenuProps.className : ''),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: void 0
    }, _react.default.createElement("div", {
      style: (0, _objectSpread2.default)({}, sideMenuStyle),
      ref: sidemenuEl,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      },
      __self: void 0
    }, sidemenuChildren));
  }), _react.default.createElement(_backdrop.default, {
    show: sideMenuContext.isOpen && (sideMenuContext.config.staticMain || props.alwaysShowBackdrop),
    zIndex: 99,
    onClick: sideMenuContext.closeSideMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: void 0
  }));
};

SideMenu.propTypes = {
  alwaysStaticMain: _propTypes.default.bool,
  alwaysShowBackdrop: _propTypes.default.bool,
  breakPoints: _propTypes.default.object,
  defaultRatio: _propTypes.default.number
};
SideMenu.defaultProps = {
  alwaysStaticMain: false,
  alwaysShowBackdrop: false
};
var _default = SideMenu;
exports.default = _default;