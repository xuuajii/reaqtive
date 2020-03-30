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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = require("@reaqtive/layout");

var _index = require("../index");

var _rqtvAppContext = require("../contexts/rqtv-app-context");

var _pageList = _interopRequireDefault(require("./page-list"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\side-menu\\index.js";

const RqtvSideMenu = props => {
  const sideMenuFieldsMatch = props.sideMenuFieldsMatch;
  const rqtvApp = (0, _react.useContext)(_rqtvAppContext.RqtvAppContext);
  const fieldList = sideMenuFieldsMatch ? rqtvApp.filterFieldList(rqtvApp.enhancedFieldList, sideMenuFieldsMatch) : rqtvApp.sideMenuFieldList;
  const pages = rqtvApp && rqtvApp.pages;
  return _react.default.createElement(_layout.SideMenu, {
    className: "rqtv-side-menu",
    isOpen: props.isOpen,
    onClose: props.onClose,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: void 0
  }, _react.default.createElement(_layout.Tabs, {
    animatedTabs: true,
    style: {
      height: '100%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: void 0
  }, _react.default.createElement(_layout.TabList, {
    useIcons: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: void 0
  }, props.usePageList && _react.default.createElement(_layout.Tab, {
    label: "pages",
    icon: _react.default.createElement(_layout.LuiIcon, {
      iconType: "sheet",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: void 0
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: void 0
  }), props.useFieldList && _react.default.createElement(_layout.Tab, {
    label: "fields",
    icon: _react.default.createElement(_layout.LuiIcon, {
      iconType: "field",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: void 0
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: void 0
  })), _react.default.createElement(_layout.TabPanels, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }, props.usePageList && _react.default.createElement(TabPanel, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: void 0
  }, _react.default.createElement(_pageList.default, {
    pages: pages,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: void 0
  })), props.useFieldList && fieldList ? _react.default.createElement(FieldList, {
    fieldList: fieldList.map(field => {
      return {
        qFieldExpr: field.qName,
        label: field.qName,
        hasSelections: field.selectedCount > 0
      };
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: void 0
  }) : _react.default.createElement(_react.default.Fragment, null))));
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
      lineNumber: 45
    },
    __self: void 0
  }, _react.default.createElement(_index.RqtvMultibox, {
    fieldList: props.fieldList,
    fieldHeight: 400,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: void 0
  }));
};

RqtvSideMenu.propTypes = {
  isOpen: _propTypes.default.bool.isRequired,
  onClose: _propTypes.default.func.isRequired
};