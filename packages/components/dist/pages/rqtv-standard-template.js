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

var _index = require("../contexts/index");

var _index2 = require("../index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/pages/rqtv-standard-template.js";

/**
 * RqtvStandardTemplate
 *
 * It is a component that allows you to use Reaqtive main components without having to declare them one by one.
 * Of course does not allow the same flexibility as recreating a template manually.
 * It includes the RqtvSideMenu, the RqtvNavbar and the RqtvPageHeader.
 * It is suggested to use this component inside the RqtvApp
 */
const RqtvStandardTemplate = props => {
  const rqtvApp = (0, _react.useContext)(_index.RqtvAppContext);
  const rqtvPage = (0, _react.useContext)(_index.RqtvPageContext);

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        innerShowSideMenu = _useState2[0],
        setInnerShowSideMenu = _useState2[1];

  const _ref = rqtvApp || {
    showSideMenu: innerShowSideMenu,
    setShowSideMenu: setInnerShowSideMenu
  },
        showSideMenu = _ref.showSideMenu,
        setShowSideMenu = _ref.setShowSideMenu;

  const toggleSideMenu = () => setShowSideMenu(!showSideMenu);

  const _ref2 = rqtvPage || {},
        triggerState = _ref2.triggerState,
        qCondition = _ref2.qCondition;

  const rendererProps = rqtvPage && {
    loading: triggerState.qLoading,
    //||qCondition===null||qCondition===undefined,
    error: !(rqtvPage && rqtvPage.triggerState.qLoading) && rqtvPage && rqtvPage.triggerState.qError
  } || {
    loading: false,
    error: false
  };
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_index2.RqtvNavbar, {
    sideMenuActive: showSideMenu,
    onToggleMenu: toggleSideMenu,
    closeSideMenu: () => setShowSideMenu(false),
    searchFieldsMatch: props.searchFieldsMatch,
    showSearch: props.showSearch,
    showSideMenuToggle: props.useSideMenu,
    currentSelectionsBreakPoint: props.currentSelectionsBreakPoint,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: void 0
  }), _react.default.createElement(_index2.RqtvSideMenu, {
    isOpen: showSideMenu && props.useSideMenu,
    onClose: () => setShowSideMenu(false),
    useFieldList: true,
    usePageList: true,
    useTabs: true,
    sideMenuFieldsMatch: props.sideMenuFieldsMatch,
    additionalTabs: props.sideMenuAdditionalTabs,
    clickAwayAccept: props.sideMenuClickAwayAccept,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: void 0
  }), _react.default.createElement(_index2.RqtvSideMenuMain, {
    isOpen: showSideMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "".concat(props.useContainerFluid ? 'container-fluid' : 'container', " ").concat(props.containerClassName ? props.containerClassName : ''),
    style: (0, _objectSpread2.default)({}, props.containerStyle),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: void 0
  }, _react.default.createElement(_index2.RqtvRenderer, Object.assign({}, rendererProps, {
    isFixed: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: void 0
  }), props.usePageHeader && rqtvPage && _react.default.createElement(_index2.RqtvPageHeader, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
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
  useSideMenu: _propTypes.default.bool,

  /**
   * fields to be displayed in the side menu. '*' can be used as a wildcard (e.g. 'Q*' will include consider all fields starting with 'Q')
   *
   */
  sideMenuFieldsMatch: _propTypes.default.shape({
    method: _propTypes.default.oneOf(['include', 'exclude']),
    mask: _propTypes.default.arrayOf(_propTypes.default.string)
  }),

  /**
   * fields to be used in the search object in the navbar. '*' can be used as a wildcard (e.g. 'Q*' will include consider all fields starting with 'Q')
   *
   */
  searchFieldsMatch: _propTypes.default.shape({
    method: _propTypes.default.oneOf(['include', 'exclude']),
    mask: _propTypes.default.arrayOf(_propTypes.default.string)
  }),

  /**
   * screentype from which current selections are responsive
   */
  currentSelectionsBreakPoint: _propTypes.default.oneOf(['xl', 'lg', 'md', 'sm']),

  /**
   * if true selections are accepted when clicking away from an active listbox in selection mode in the side menu multibox
   */
  sideMenuClickAwayAccept: _propTypes.default.bool
};
RqtvStandardTemplate.defaultProps = {
  useContainerFluid: true,
  usePageHeader: true,
  showSearch: true,
  useSideMenu: true,
  sideMenuClickAwayAccept: false
};
var _default = RqtvStandardTemplate;
exports.default = _default;