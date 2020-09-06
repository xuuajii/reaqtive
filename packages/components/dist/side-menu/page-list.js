"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _layout = require("@reaqtive/layout");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/side-menu/page-list.js";

const PageList = props => {
  return _react.default.createElement("ul", {
    className: "list-group page-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: void 0
  }, props.pages.map(page => _react.default.createElement(PageLink, {
    key: page.key,
    page: page,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
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

  const exactActiveMatch = page.exactActiveMatch !== undefined && page.exactActiveMatch !== null ? page.exactActiveMatch : true;
  return _react.default.createElement(_reactRouterDom.NavLink, {
    to: page.path || '/',
    activeClassName: "active",
    exact: page.path === '/' ? true : exactActiveMatch,
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
  }), page.linkName));
};

var _default = PageList;
exports.default = _default;