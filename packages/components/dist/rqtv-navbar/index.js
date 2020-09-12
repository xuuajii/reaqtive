"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = require("@reaqtive/layout");

var _index = require("../index");

var _rqtvAppContext = require("../contexts/rqtv-app-context");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/rqtv-navbar/index.js";

/**
 * RqtvNavbar
 *
 * It is a component that renders the top navbar of the reaqtive app and add spacing to the top of the page if the navbar is fixed top.
 * It includes the [RqtvCurrentSelections](#rqtvcurrentselections) component and the [RqtvSearchObject](#rqtvsearchobject) component.
 * It is based on bootstrap navbar, its styles can be customized using navbarClassName prop which will be passed to the navbar itself or via sass/css
 */
const RqtvNavbar = props => {
  const searchFieldsMatch = props.searchFieldsMatch,
        showSideMenuToggle = props.showSideMenuToggle,
        fixedTop = props.fixedTop,
        navbarClassName = props.navbarClassName;
  const rqtvApp = (0, _react.useContext)(_rqtvAppContext.RqtvAppContext) || {};
  const title = props.title ? props.title : rqtvApp.title;
  const brandUrl = props.brandUrl ? props.brandUrl : rqtvApp.brandUrl;
  const brandImgUrl = props.brandImgUrl ? props.brandImgUrl : rqtvApp.brand;
  const brandImgStyle = props.brandImgStyle ? props.brandImgStyle : rqtvApp.brandStyle;
  const navbarBrandAction = props.navbarBrandAction ? props.navbarBrandAction : rqtvApp.brandAction;

  const _useState = (0, _react.useState)(props.showCurrentSelections),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        showCurrentSelections = _useState2[0],
        setShowCurrentSelections = _useState2[1];

  const fieldList = searchFieldsMatch ? rqtvApp.filterFieldList(rqtvApp.enhancedFieldList, searchFieldsMatch) : rqtvApp.searchFieldList;
  const hidePrefix = rqtvApp && rqtvApp.hidePrefix;

  const currentSelectionsCustomLoading = () => _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: void 0
  });

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_layout.Navbar, {
    className: "".concat(fixedTop === true ? 'fixed-top' : '', " rqtv-navbar ").concat(navbarClassName),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: void 0
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "navbar-brand-container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: void 0
  }, showSideMenuToggle && _react.default.createElement(_layout.Button, {
    onClick: props.onToggleMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: void 0
  }, _react.default.createElement(_layout.HamburgerMenu, {
    isOpen: props.sideMenuActive,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: void 0
  })), _react.default.createElement(_layout.NavbarBrand, {
    url: brandUrl,
    imgUrl: brandImgUrl,
    imgStyle: brandImgStyle,
    onClick: navbarBrandAction,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: void 0
  }, title))), _react.default.createElement(_layout.NavbarNav, {
    neverCollapse: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: void 0
  }, _react.default.createElement(_index.RqtvCurrentSelections, {
    hidden: !showCurrentSelections,
    hidePrefix: hidePrefix,
    customLoading: () => _react.default.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: void 0
    }),
    breakPoint: props.currentSelectionsBreakPoint,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: void 0
  }), props.showSearch && _react.default.createElement(_index.RqtvSearchObject, {
    fixedTop: props.fixedTop,
    useBackdrop: props.fixedTop,
    onOpen: () => {
      props.closeSideMenu && props.closeSideMenu();
      setShowCurrentSelections(false);
    },
    onClose: () => {
      setShowCurrentSelections(props.showCurrentSelections);
    },
    searchFields: fieldList && fieldList.map(field => field.qName),
    expandFrom: "right",
    resultsHeight: props.fixedTop ? '100%' : props.searchResultsHeight,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: void 0
  }))));
};

RqtvNavbar.propTypes = {
  /**
   * if true the navbar would be fix positioned at the top of the page
   */
  fixedTop: _propTypes.default.bool,

  /**
   * css classes that will be passed to the navbar div
   */
  navbarClassName: _propTypes.default.string,

  /**
   * function fired when clicking on the HamburgerMenu button
   */
  onToggleMenu: _propTypes.default.func,

  /**
   * show/hide the current selections toolbar
   */
  showCurrentSelections: _propTypes.default.bool,

  /**
   * show/hide the global search-object
   */
  showSearch: _propTypes.default.bool,

  /**
   * show/hide hamburger menu
   */
  showSideMenuToggle: _propTypes.default.bool,
  brandUrl: _propTypes.default.string,
  brandImgUrl: _propTypes.default.string,
  brandImgStyle: _propTypes.default.object,
  searchResultsHeight: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  navbarBrandAction: _propTypes.default.func
};
RqtvNavbar.defaultProps = {
  fixedTop: true,
  navbarClassName: '',
  showCurrentSelections: true,
  showSideMenuToggle: true,
  showSearch: true,
  searchResultsHeight: 500
};
var _default = RqtvNavbar;
exports.default = _default;