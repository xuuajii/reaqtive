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

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\rqtv-navbar\\index.js";

const RqtvNavbar = props => {
  const searchFieldsMatch = props.searchFieldsMatch,
        showSideMenuToggle = props.showSideMenuToggle;
  const rqtvApp = (0, _react.useContext)(_rqtvAppContext.RqtvAppContext);

  const _useState = (0, _react.useState)(props.showCurrentSelections),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        showCurrentSelections = _useState2[0],
        setShowCurrentSelections = _useState2[1];

  const fieldList = searchFieldsMatch ? rqtvApp.filterFieldList(rqtvApp.enhancedFieldList, searchFieldsMatch) : rqtvApp.searchFieldList;
  const hidePrefix = rqtvApp && rqtvApp.hidePrefix;

  const currentSelectionsCustomLoading = () => _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: void 0
  });

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_layout.Navbar, {
    className: "fixed-top rqtv-navbar",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: void 0
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "navbar-brand-container",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: void 0
  }, showSideMenuToggle && _react.default.createElement(_layout.Button, {
    onClick: props.onToggleMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: void 0
  }, _react.default.createElement(_layout.HamburgerMenu, {
    isOpen: props.sideMenuActive,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: void 0
  })), _react.default.createElement(_layout.NavbarBrand, {
    url: rqtvApp.brandUrl,
    imgUrl: rqtvApp.brand,
    imgStyle: rqtvApp.brandStyle,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: void 0
  }, rqtvApp.title))), _react.default.createElement(_layout.NavbarNav, {
    neverCollapse: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: void 0
  }, _react.default.createElement(_index.RqtvCurrentSelections, {
    hidden: !showCurrentSelections,
    hidePrefix: hidePrefix,
    customLoading: () => _react.default.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      },
      __self: void 0
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: void 0
  }), props.showSearch && _react.default.createElement(_index.RqtvSearchObject, {
    onOpen: () => {
      props.closeSideMenu();
      setShowCurrentSelections(false);
    },
    onClose: () => {
      setShowCurrentSelections(props.showCurrentSelections);
    },
    searchFields: fieldList && fieldList.map(field => field.qName),
    expandFrom: "right",
    useBackdrop: true,
    resultsHeight: '100%',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: void 0
  }))));
};

RqtvNavbar.propTypes = {
  fixedTop: _propTypes.default.bool,
  sticky: _propTypes.default.bool,

  /**
   * function fired when clicking on the HamburgerMenu button
   */
  onToggleMenu: _propTypes.default.func,

  /**
   * show/hide the current selections toolbar
   */
  showCurrentSelections: _propTypes.default.bool,

  /**
   * show/hide hamburger menu
   */
  showSideMenuToggle: _propTypes.default.bool
};
RqtvNavbar.defaultProps = {
  fixedTop: false,
  sticky: true,
  showCurrentSelections: true,
  showSideMenuToggle: true
};
var _default = RqtvNavbar;
exports.default = _default;