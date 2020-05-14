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

var _rqtvPageContext = require("../contexts/rqtv-page-context");

var _index = require("../index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/pages/rqtv-standard-template.js";

/**
 * RqtvStandardTemplate
 *
 * It is a component that allows you to use Reaqtive main components without having to declare them one by one.
 * Of course does not allow the same flexibility as recreating a template manually.
 * It includes the RqtvSideMenu, the RqtvNavbar and the RqtvPageHeader
 *
 */
const RqtvStandardTemplate = props => {
  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        showSideMenu = _useState2[0],
        setShowSideMenu = _useState2[1];

  const toggleSideMenu = () => setShowSideMenu(!showSideMenu);

  const rqtvPage = (0, _react.useContext)(_rqtvPageContext.RqtvPageContext);

  const _ref = rqtvPage || {},
        triggerState = _ref.triggerState,
        qCondition = _ref.qCondition;

  const rendererProps = {
    loading: triggerState.qLoading,
    //||qCondition===null||qCondition===undefined,
    error: !(rqtvPage && rqtvPage.triggerState.qLoading) && rqtvPage && rqtvPage.triggerState.qError
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_index.RqtvNavbar, {
    sideMenuActive: showSideMenu,
    onToggleMenu: toggleSideMenu,
    closeSideMenu: () => setShowSideMenu(false),
    searchFieldsMatch: props.searchFieldsMatch,
    showSearch: props.showSearch,
    showSideMenuToggle: props.useSideMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: void 0
  }), _react.default.createElement(_index.RqtvSideMenu, {
    isOpen: showSideMenu && props.useSideMenu,
    onClose: () => setShowSideMenu(false),
    useFieldList: true,
    usePageList: true,
    useTabs: true,
    sideMenuFieldsMatch: props.sideMenuFieldsMatch,
    additionalTabs: props.sideMenuAdditionalTabs,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: void 0
  }), _react.default.createElement(_index.RqtvSideMenuMain, {
    isOpen: showSideMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "".concat(props.useContainerFluid ? 'container-fluid' : 'container', " ").concat(props.containerClassName ? props.containerClassName : ''),
    style: (0, _objectSpread2.default)({}, props.containerStyle),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: void 0
  }, _react.default.createElement(_index.RqtvRenderer, Object.assign({}, rendererProps, {
    isFixed: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: void 0
  }), props.usePageHeader && _react.default.createElement(_index.RqtvPageHeader, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: void 0
  }), props.children))));
};

RqtvStandardTemplate.propTypes = {
  /**
   * it lets you choose between a bootstrap container or container-fluid to wrap the page
   *
   */
  useContainerFluid: _propTypes.default.bool,

  /**
   * show/hide the page header that would contain only the title of the page and can't be customized
   *
   */
  usePageHeader: _propTypes.default.bool,

  /**
   * it allows to set the styles of the div conatining the page (the components you will develop)
   *
   */
  containerStyle: _propTypes.default.object,

  /**
   * the css classes of the container wrapping the page
   *
   */
  containerClassName: _propTypes.default.string,

  /**
   * show/hide the search object in the navbar
   *
   */
  showSearch: _propTypes.default.bool,

  /**
   * show/hide the side menu
   *
   */
  useSideMenu: _propTypes.default.bool
};
RqtvStandardTemplate.defaultProps = {
  useContainerFluid: true,
  usePageHeader: true,
  showSearch: true,
  useSideMenu: true
};
var _default = RqtvStandardTemplate;
exports.default = _default;