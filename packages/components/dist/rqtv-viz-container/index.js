"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rqtvAppContext = require("../contexts/rqtv-app-context");

var _toolbar = _interopRequireDefault(require("./toolbar"));

var _header = _interopRequireDefault(require("./header"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/rqtv-viz-container/index.js";

// import { useDebounce } from 'use-debounce';

/**
 * RqtvVizContainer
 *
 * It provides a container to a visualization. It accepts multiple children. In case i detects more tha one child,
 * it shows one child at a time and a dropdown menu to toggle the desired child.
 * If its children provide exports methods it automatically shows export buttons
 *
 */
const RqtvVizContainer = props => {
  const rqtvAppContext = (0, _react.useContext)(_rqtvAppContext.RqtvAppContext);
  const vizRef = (0, _react.useRef)();
  const headerEl = (0, _react.useRef)();
  const vizContainerEl = (0, _react.useRef)();
  const hasOnlyOneChild = !Array.isArray(props.children);

  const getItemFromChild = child => {
    return {
      id: child.id || child.props.id,
      type: child.type,
      title: child.props.title || child.props.id
    };
  }; //console.log(vizRef.current)


  const items = !hasOnlyOneChild ? props.children.map(item => getItemFromChild(item)) : [getItemFromChild(props.children)];

  const _useState = (0, _react.useState)(items[0]),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        activeItem = _useState2[0],
        setActiveItem = _useState2[1];

  const _useState3 = (0, _react.useState)(props.children[0] || props.children),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        activeViz = _useState4[0],
        setActiveViz = _useState4[1];

  (0, _react.useEffect)(() => {
    const filterViz = viz => {
      if (viz.props.id === activeItem.id) {
        return viz;
      }
    };

    const viz = hasOnlyOneChild ? props.children : props.children.filter(filterViz)[0];

    if (viz.id === null && Array.isArray(props.children)) {
      //console.log(viz)
      console.error('if you want to show more than one viz inside a container each viz must have a non-null unique id prop');
    }

    setActiveViz(viz);
  }, [activeItem]);

  const _useState5 = (0, _react.useState)(false),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        showToolbar = _useState6[0],
        setShowToolbar = _useState6[1];

  (0, _react.useEffect)(() => {
    vizRef.current && setShowToolbar(true);
  }, [vizRef.current]);

  const getVizHeight = () => 0.95 * ((vizContainerEl.current && vizContainerEl.current.offsetHeight) - (headerEl.current && headerEl.current.offsetHeight));

  const _useState7 = (0, _react.useState)(getVizHeight()),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        vizHeight = _useState8[0],
        setVizHeight = _useState8[1];

  const _useState9 = (0, _react.useState)(false),
        _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
        maximized = _useState10[0],
        setMaximized = _useState10[1];

  (0, _react.useEffect)(() => {
    if (props.maximizeElRef && props.maximizeElRef.current) {
      props.maximizeElRef.current.style.display = maximized ? "block" // position:absolute; top:0; left:0; height:100%; width:100%; z-index:300; max-height:100%;`
      : 'none';
      const updatedVizHeight = maximized ? props.maximizeElRef.current.offsetHeight - headerEl.current.offsetHeight : props.vizHeight;
      setVizHeight(updatedVizHeight);
      props.hideScrollWhenMaximized && rqtvAppContext && rqtvAppContext.setIsMaximized(maximized);
    }
  }, [maximized]);

  const toggleMaximize = () => {
    if (typeof props.onMaximize === 'function') {
      props.onMaximize();
    }

    setMaximized(maximized => !maximized);
  };

  const vizContainer = _react.default.createElement("div", {
    className: "viz-container ".concat(props.className),
    ref: vizContainerEl,
    style: {
      height: maximized ? '100%' : props.height,
      border: maximized ? 0 : ''
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: void 0
  }, _react.default.createElement(_header.default, {
    title: activeItem && activeItem.title,
    items: items,
    setActiveItem: setActiveItem,
    ref: headerEl,
    className: "".concat(props.containerClassName),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: void 0
  }, showToolbar && _react.default.createElement(_toolbar.default, {
    exportExcel: vizRef.current && vizRef.current.exportExcel,
    exportImg: vizRef.current && vizRef.current.exportImg,
    exportPdf: vizRef.current && vizRef.current.exportPdf,
    showExportExcel: props.showExportExcel,
    showExportPdf: props.showExportPdf,
    showExportImg: props.showExportImg,
    showMaximize: props.maximizeElRef ? true : false,
    toggleMaximize: toggleMaximize,
    maximized: maximized,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93
    },
    __self: void 0
  })), _react.default.createElement("div", {
    className: "viz-container-body",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 105
    },
    __self: void 0
  }, _react.default.cloneElement(activeViz, {
    ref: vizRef,
    height: isNaN(getVizHeight()) ? 0 : getVizHeight()
  })));

  return maximized ? _reactDom.default.createPortal(vizContainer, props.maximizeElRef.current) : vizContainer;
};

RqtvVizContainer.propTypes = {
  /**
   * The height of the container pixels or % can be used
   */
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Show/hide export to excel button
   */
  showExportExcel: _propTypes.default.bool,

  /**
   * Show/hide export to pdf button
   */
  showExportPdf: _propTypes.default.bool,

  /**
   * Show/hide export to img button
   */
  showExportImg: _propTypes.default.bool,

  /**
   * If true window scrollbar will be hidden when the container is maximized
   */
  hideScrollWhenMaximized: _propTypes.default.bool,

  /**
   * Container css classes
   */
  className: _propTypes.default.string,

  /**
   * Container header css classes
   */
  containerClassName: _propTypes.default.string
};
RqtvVizContainer.defaultProps = {
  height: 300,
  showExportExcel: true,
  showExportPdf: true,
  showExportImg: true,
  hideScrollWhenMaximized: true,
  className: '',
  containerClassName: ''
};
var _default = RqtvVizContainer;
exports.default = _default;