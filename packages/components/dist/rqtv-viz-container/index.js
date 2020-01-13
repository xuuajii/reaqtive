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

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\rqtv-viz-container\\index.js";

// import { useDebounce } from 'use-debounce';
const RqtvVizContainer = props => {
  const rqtvAppContext = (0, _react.useContext)(_rqtvAppContext.RqtvAppContext);
  const activeChartRef = (0, _react.useRef)();
  const headerEl = (0, _react.useRef)();
  const vizContainerEl = (0, _react.useRef)();
  const hasOnlyOneChild = !Array.isArray(props.children);

  const getItemFromChild = child => {
    return {
      id: child.id || child.props.id,
      type: child.type,
      title: child.props.title || child.props.id
    };
  }; //console.log(activeChartRef.current)


  const items = !hasOnlyOneChild ? props.children.map(item => getItemFromChild(item)) : [getItemFromChild(props.children)];

  const _useState = (0, _react.useState)(items[0]),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        activeItem = _useState2[0],
        setActiveItem = _useState2[1];

  const _useState3 = (0, _react.useState)(props.children[0] || props.children),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        activeChart = _useState4[0],
        setActiveChart = _useState4[1];

  (0, _react.useEffect)(() => {
    const filterChart = chart => {
      if (chart.props.id === activeItem.id) {
        return chart;
      }
    };

    const chart = hasOnlyOneChild ? props.children : props.children.filter(filterChart)[0];

    if (chart.id === null && Array.isArray(props.children)) {
      //console.log(chart)
      console.error('if you want to show more than one viz inside a container each viz must have a non-null unique id prop');
    }

    setActiveChart(chart);
  }, [activeItem]);

  const _useState5 = (0, _react.useState)(false),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        showToolbar = _useState6[0],
        setShowToolbar = _useState6[1];

  (0, _react.useEffect)(() => {
    activeChartRef.current && setShowToolbar(true);
  }, [activeChartRef]);

  const _useState7 = (0, _react.useState)(false),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        maximized = _useState8[0],
        setMaximized = _useState8[1];

  const getChartHeight = () => 0.95 * ((vizContainerEl.current && vizContainerEl.current.offsetHeight) - (headerEl.current && headerEl.current.offsetHeight));

  const _useState9 = (0, _react.useState)(getChartHeight()),
        _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
        chartHeight = _useState10[0],
        setChartHeight = _useState10[1];

  (0, _react.useEffect)(() => {
    setChartHeight(getChartHeight());
  }, [vizContainerEl.current, headerEl.current]);
  (0, _react.useEffect)(() => {
    if (props.maximizeElRef && props.maximizeElRef.current) {
      props.maximizeElRef.current.style.display = maximized ? "block" // position:absolute; top:0; left:0; height:100%; width:100%; z-index:300; max-height:100%;`
      : 'none';
      const updatedChartHeight = maximized ? props.maximizeElRef.current.offsetHeight - headerEl.current.offsetHeight : props.chartHeight;
      setChartHeight(updatedChartHeight);
      props.hideScrollWhenMaximized && rqtvAppContext && rqtvAppContext.setIsMaximized(maximized);
    }
  }, [maximized]);

  const toggleMaximize = () => {
    setMaximized(maximized => !maximized);
  };

  const vizContainer = _react.default.createElement("div", {
    className: "viz-container",
    ref: vizContainerEl,
    style: {
      height: maximized ? '100%' : props.height,
      border: maximized ? 0 : ''
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: void 0
  }, _react.default.createElement(_header.default, {
    title: activeItem && activeItem.title,
    items: items,
    setActiveItem: setActiveItem,
    ref: headerEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: void 0
  }, showToolbar && _react.default.createElement(_toolbar.default, {
    exportExcel: activeChartRef.current && activeChartRef.current.exportExcel,
    exportImg: activeChartRef.current && activeChartRef.current.exportImg,
    exportPdf: activeChartRef.current && activeChartRef.current.exportPdf,
    showExportExcel: props.showExportExcel,
    showExportPdf: props.showExportPdf,
    showExportImg: props.showExportImg,
    showMaximize: props.maximizeElRef ? true : false,
    toggleMaximize: toggleMaximize,
    maximized: maximized,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: void 0
  })), _react.default.createElement("div", {
    className: "viz-container-body",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    },
    __self: void 0
  }, _react.default.cloneElement(activeChart, {
    ref: activeChartRef,
    height: isNaN(chartHeight) ? 0 : chartHeight
  })));

  return maximized ? _reactDom.default.createPortal(vizContainer, props.maximizeElRef.current) : vizContainer;
};

RqtvVizContainer.propTypes = {
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  showExportExcel: _propTypes.default.bool,
  showExportPdf: _propTypes.default.bool,
  showExportImg: _propTypes.default.bool,
  hideScrollWhenMaximized: _propTypes.default.bool
};
RqtvVizContainer.defaultProps = {
  height: 300,
  showExportExcel: true,
  showExportPdf: true,
  showExportImg: true,
  hideScrollWhenMaximized: true
};
var _default = RqtvVizContainer;
exports.default = _default;