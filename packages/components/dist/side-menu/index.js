"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RqtvSideMenuMain", {
  enumerable: true,
  get: function () {
    return _layout.SideMenuMain;
  }
});
exports.RqtvSideMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uuid = require("uuid");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = require("@reaqtive/layout");

var _index = require("../index");

var _rqtvAppContext = require("../contexts/rqtv-app-context");

var _pageList = _interopRequireDefault(require("./page-list"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/side-menu/index.js";

/**
 * RqtvSideMenu
 *
 * It returns toggleable fixed-positioned side menu displayed on the left of the page.
 * Default tabs are the list of pages of the app and a multibox with filters.
 * The open/close state has to be managed in parent component
 *
 */
const RqtvSideMenu = props => {
  const sideMenuFieldsMatch = props.sideMenuFieldsMatch,
        useFieldList = props.useFieldList,
        usePageList = props.usePageList,
        useTabs = props.useTabs,
        alwaysShowBackdrop = props.alwaysShowBackdrop;
  const rqtvApp = (0, _react.useContext)(_rqtvAppContext.RqtvAppContext);
  const fieldList = sideMenuFieldsMatch ? rqtvApp && rqtvApp.filterFieldList(rqtvApp.enhancedFieldList, sideMenuFieldsMatch) : rqtvApp && rqtvApp.sideMenuFieldList;
  const pages = rqtvApp && rqtvApp.pages;
  const showFieldList = fieldList && useFieldList;
  const showPageList = usePageList && pages;
  return _react.default.createElement(_layout.SideMenu, {
    className: "rqtv-side-menu",
    isOpen: props.isOpen,
    onClose: props.onClose,
    alwaysShowBackdrop: alwaysShowBackdrop,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: void 0
  }, useTabs ? _react.default.createElement(_layout.Tabs, {
    animatedTabs: true,
    style: {
      height: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: void 0
  }, _react.default.createElement(_layout.TabList, {
    useIcons: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: void 0
  }, showPageList && _react.default.createElement(_layout.Tab, {
    label: "pages",
    icon: _react.default.createElement(_layout.LuiIcon, {
      iconType: "sheet",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: void 0
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: void 0
  }), showFieldList && _react.default.createElement(_layout.Tab, {
    label: "fields",
    icon: _react.default.createElement(_layout.LuiIcon, {
      iconType: "field",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: void 0
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: void 0
  }), props.additionalTabs && props.additionalTabs.map(additionalTab => _react.default.createElement(_layout.Tab, {
    key: (0, _uuid.v4)(),
    label: additionalTab.label,
    icon: additionalTab.icon,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: void 0
  }))), _react.default.createElement(_layout.TabPanels, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: void 0
  }, showPageList && _react.default.createElement(TabPanel, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: void 0
  }, _react.default.createElement(_pageList.default, {
    pages: pages,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: void 0
  })), showFieldList && fieldList ? _react.default.createElement(FieldList, {
    fieldList: fieldList.map(field => {
      return {
        qFieldExpr: field.qName,
        label: field.qName,
        hasSelections: field.selectedCount > 0
      };
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    },
    __self: void 0
  }) : _react.default.createElement(_react.default.Fragment, null), props.additionalTabs && props.additionalTabs.map(additionalTab => _react.default.createElement(TabPanel, {
    key: (0, _uuid.v4)(),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: void 0
  }, additionalTab.tab)))) : props.children);
};

exports.RqtvSideMenu = RqtvSideMenu;

const TabPanel = props => props.children;

const FieldList = props => {
  const height = props.tabsEl.current.offsetHeight - props.tabListEl.current.offsetHeight;
  const width = props.tabsEl.current.offsetHeight - props.tabListEl.current.offsetWidth;
  return _react.default.createElement("div", {
    className: "hide-scrollbar",
    style: {
      height: height
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: void 0
  }, _react.default.createElement(_index.RqtvMultibox, {
    fieldList: props.fieldList,
    fieldHeight: 400,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: void 0
  }));
};

RqtvSideMenu.propTypes = {
  /**
   * open/close the menu
   */
  isOpen: _propTypes.default.bool.isRequired,

  /**
   * function to set isOpen to false
   */
  onClose: _propTypes.default.func.isRequired,

  /**
   * show/hide the page list tab
   */
  usePageList: _propTypes.default.bool,

  /**
   * show hide the multibox
   */
  useFieldList: _propTypes.default.bool,

  /**
   * if true it uses the the tabs to display different views in the side menu, if false it just shows its children
   */
  useTabs: _propTypes.default.bool,

  /**
   *
   * if tru backdrop is always shown when RqtvSideMenu is open
   */
  alwaysShowBackdrop: _propTypes.default.bool,

  /**
   *
   * additional tabs to display after pages and filters
   */
  additionalTabs: _propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.string,
    icon: _propTypes.default.element,
    tab: _propTypes.default.element
  }))
};
RqtvSideMenu.defaultProps = {
  usePageList: false,
  useFieldList: false,
  useTabs: false,
  alwaysShowBackdrop: false
};