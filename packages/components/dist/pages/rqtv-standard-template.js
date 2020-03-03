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

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\pages\\rqtv-standard-template.js";

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
      lineNumber: 28
    },
    __self: void 0
  }), _react.default.createElement(_index.RqtvSideMenu, {
    isOpen: showSideMenu,
    onClose: () => setShowSideMenu(false),
    useFieldList: true,
    usePageList: true,
    sideMenuFieldsMatch: props.sideMenuFieldsMatch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: void 0
  }), _react.default.createElement(_index.RqtvSideMenuMain, {
    isOpen: showSideMenu,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "".concat(props.useContainerFluid ? 'container-fluid' : 'container', " ").concat(props.containerClassName ? props.containerClassName : ''),
    style: (0, _objectSpread2.default)({}, props.containerStyle),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: void 0
  }, _react.default.createElement(_index.RqtvRenderer, Object.assign({}, rendererProps, {
    isFixed: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: void 0
  }), props.usePageHeader && _react.default.createElement(_index.RqtvPageHeader, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: void 0
  }), props.children))));
};

RqtvStandardTemplate.propTypes = {
  useContainerFluid: _propTypes.default.bool,
  usePageHeader: _propTypes.default.bool,
  containerStyle: _propTypes.default.object,
  containerClassName: _propTypes.default.string,
  showSearch: _propTypes.default.bool,
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