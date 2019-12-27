"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\side-menu\\page-list.js";

const PageList = props => {
  return _react.default.createElement("ul", {
    className: "list-group page-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: void 0
  }, props.pages.map(page => _react.default.createElement(PageLink, {
    key: page.id,
    page: page,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  })));
};

const PageLink = props => {
  const sideMenuContext = (0, _react.useContext)(_layout.SideMenuContext);
  const page = props.page;

  const handleClick = () => {
    if (sideMenuContext.config.staticMain === true) {
      sideMenuContext.closeSideMenu();
    }
  };

  return _react.default.createElement(_reactRouterDom.NavLink, {
    to: page.path,
    activeClassName: "active",
    exact: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }, _react.default.createElement("li", {
    className: "list-group-item",
    onClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: void 0
  }, page.path === '/' ? _react.default.createElement(_layout.LuiIcon, {
    iconType: "home",
    style: {
      marginRight: '0.5rem'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: void 0
  }) : _react.default.createElement(_layout.LuiIcon, {
    iconType: "sheet",
    style: {
      marginRight: '0.5rem'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: void 0
  }), page.title));
};

var _default = PageList;
exports.default = _default;