"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropdownMenuItem = exports.DropdownMenu = exports.Dropdown = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = require("../index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/dropdown/index.js";

const Dropdown = props => {
  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        show = _useState2[0],
        setShow = _useState2[1];

  const dropdownEl = (0, _react.useRef)();
  (0, _index.useOutsideEventListener)(dropdownEl, () => setShow(false), show);

  const toggleMenu = () => {
    setShow(!show);
  };

  return _react.default.createElement("div", {
    className: "dropdown ".concat(props.isNavItem === true ? 'nav-item' : '', " ").concat(show ? 'show' : '', " ").concat(props.className ? props.className : ''),
    ref: dropdownEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: void 0
  }, props.children.map((child, index) => _react.default.cloneElement(child, {
    key: index,
    show: show,
    toggleMenu: toggleMenu,
    itemToggleMenu: props.clickOnItemClose ? toggleMenu : () => true
  })));
};

exports.Dropdown = Dropdown;
Dropdown.propTypes = {
  clickOnItemClose: _propTypes.default.bool
};
Dropdown.defaultProps = {
  clickOnItemClose: true
};

const DropdownMenu = _react.default.forwardRef((props, ref) => {
  return _react.default.createElement("div", {
    className: "dropdown-menu ".concat(props.show ? 'show' : '', " dropdown-menu-").concat(props.align),
    style: (0, _objectSpread2.default)({}, props.style, {
      width: props.verticalNavbar ? '100%' : ''
    }),
    ref: ref,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: void 0
  }, _react.default.createElement("ul", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: void 0
  }, _react.default.Children.toArray(props.children).map(child => _react.default.cloneElement(child, {
    toggleMenu: props.itemToggleMenu
  }))));
});

exports.DropdownMenu = DropdownMenu;
DropdownMenu.propTypes = {
  align: _propTypes.default.string
};
DropdownMenu.defaultProps = {
  align: 'left',
  showCaret: true
};

const DropdownMenuItem = props => {
  const handleClick = () => {
    typeof props.action === 'function' && props.action();
    typeof props.onClick === 'function' && props.onClick();
    props.toggleMenu();
  };

  return _react.default.createElement("li", {
    className: "dropdown-item ".concat(props.className),
    key: props.label,
    onClick: handleClick,
    style: props.style,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: void 0
  }, props.label ? props.label : props.children);
};

exports.DropdownMenuItem = DropdownMenuItem;