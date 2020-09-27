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

var _index = require("./index");

var _index2 = require("../index");

var _index3 = require("../contexts/index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/layout/src/lib/tabs/tab-list.js";

const TabList = props => {
  const useTabIndicator = props.useTabIndicator,
        tabListEl = props.tabListEl,
        animated = props.animated,
        scrollable = props.scrollable,
        activeTab = props.activeTab,
        setActiveTab = props.setActiveTab,
        useIcons = props.useIcons,
        shadow = props.shadow,
        justifiyContent = props.justifiyContent,
        fixedTabWidth = props.fixedTabWidth,
        className = props.className,
        style = props.style;
  const system = (0, _react.useContext)(_index3.System);
  const activeTabEl = (0, _react.useRef)();
  const scrollableRef = (0, _react.useRef)();
  const scrollContainerRef = (0, _react.useRef)();

  const children = _react.default.Children.toArray(props.children);

  const rect = (0, _index2.useResize)(tabListEl.current);
  const tabsWidth = rect && rect.width;
  const updateIndicator = (0, _react.useCallback)(() => {
    if (activeTabEl.current) {
      setIndicatorPlacement({
        left: activeTabEl.current.offsetLeft,
        width: activeTabEl.current.offsetWidth //top:activeTabEl.current.offsetHeight-2,

      });
    }
  });

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        indicatorPlacement = _useState2[0],
        setIndicatorPlacement = _useState2[1];

  (0, _react.useEffect)(() => {
    useTabIndicator && updateIndicator();
  }, [activeTab, system.windowWidth, tabsWidth, useTabIndicator]);
  (0, _react.useEffect)(() => {
    if (activeTabEl.current && scrollContainerRef.current && scrollable === true) {
      scrollContainerRef.current.scrollTo(activeTabEl.current.offsetLeft);
    }

    if (activeTabEl.current && tabListEl.current && scrollable === false) {
      tabListEl.current.scrollLeft = activeTabEl.current.offsetLeft;
    }
  }, [activeTab]);
  return _react.default.createElement(Scroller, {
    ref: scrollContainerRef,
    shadow: shadow,
    scrollableRef: scrollableRef,
    tabListEl: tabListEl,
    animate: animated,
    scrollable: scrollable,
    displayContent: justifiyContent === 'start' || justifiyContent === 'end' ? justifiyContent : 'center',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: void 0
  }, _react.default.createElement("nav", {
    className: "tab-list ".concat(scrollable ? '' : 'overflow-hidden', " flex-grow-1 ").concat(className),
    style: style,
    ref: tabListEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: void 0
  }, _react.default.createElement("ul", {
    className: "nav nav-tabs flex-grow-1 ".concat('justify-content-' + justifiyContent),
    ref: scrollableRef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: void 0
  }, children.map((child, index) => {
    const additionalProps = {
      setActiveTab: setActiveTab,
      isActive: activeTab === index,
      index: index,
      useIcons: useIcons,
      fixedWidth: fixedTabWidth
    };
    return typeof child.type === "function" ? _react.default.cloneElement(child, additionalProps.isActive ? (0, _objectSpread2.default)({}, additionalProps, {
      activeTabEl: activeTabEl
    }) : additionalProps) : _react.default.createElement(_index.Tab, Object.assign({
      key: child.key
    }, child.props, additionalProps, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 66
      },
      __self: void 0
    }), child);
  }), useTabIndicator && _react.default.createElement(_index.TabIndicator, Object.assign({}, indicatorPlacement, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: void 0
  })))));
};

function Scroller(props, ref) {
  const scrollable = props.scrollable,
        scrollableRef = props.scrollableRef,
        tabListEl = props.tabListEl,
        animate = props.animate,
        shadow = props.shadow,
        displayContent = props.displayContent;
  return scrollable ? _react.default.createElement(_index2.ScrollableContainer, {
    ref: ref,
    className: "tab-list-wrapper ".concat('justify-content-' + displayContent, " ").concat(shadow ? 'rqtv-shadow' : ''),
    scrollableEl: scrollableRef,
    containerEl: tabListEl,
    animate: animate,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  }, props.children) : _react.default.createElement("div", {
    className: "tab-list-wrapper ".concat('justify-content-' + displayContent, " ").concat(shadow ? 'rqtv-shadow' : ''),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  }, props.children);
}

Scroller = (0, _react.forwardRef)(Scroller);
TabList.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  useIcons: _propTypes.default.bool,
  scrollable: _propTypes.default.bool,
  useTabIndicator: _propTypes.default.bool,
  animated: _propTypes.default.bool,
  justifiyContent: _propTypes.default.string,
  tabListEl: _propTypes.default.oneOfType([// Either a function
  _propTypes.default.func, // Or the instance of a DOM native element (see the note about SSR)
  _propTypes.default.shape({
    current: _propTypes.default.instanceOf(Element)
  })]),
  activeTab: _propTypes.default.number,
  setActiveTab: _propTypes.default.func,
  shadow: _propTypes.default.bool,
  fixedTabWidth: _propTypes.default.bool
};
TabList.defaultProps = {
  className: '',
  style: {},
  useIcons: false,
  useTabIndicator: true,
  scrollable: true,
  animated: false,
  justifiyContent: 'center',
  fixedTabWidth: false
};
var _default = TabList;
exports.default = _default;