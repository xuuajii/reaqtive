"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RqtvError = exports.RqtvSpinner = exports.RqtvNoData = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _layout = require("@reaqtive/layout");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/loading/rqtv-renderer-views.js";

const RqtvRendererContainer = props => {
  const loadingContainer = (0, _react.useRef)();
  const loadingContainerEl = loadingContainer.current;
  const loadingContainerHeight = loadingContainerEl && loadingContainerEl.parentNode.offsetHeight;
  const fixedStyles = props.isFixed ? {
    position: 'fixed',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0
  } : {};
  const stickyStyles = props.isSticky === true ? {
    position: 'sticky',
    top: 0
  } : {};

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        height = _useState2[0],
        setHeight = _useState2[1];

  (0, _react.useEffect)(() => {
    if (height === 0 || height === null || height === undefined) {
      setHeight(props.top ? '100%' : loadingContainerHeight);
    }
  }, [loadingContainerHeight]);
  return _react.default.createElement("div", {
    className: "rqtv-loading-container",
    style: (0, _objectSpread2.default)({
      display: 'flex',
      height: height,
      width: '100%'
    }, stickyStyles, fixedStyles),
    ref: loadingContainer,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  }, _react.default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      flexGrow: 1,
      alignItems: 'center',
      height: '90%'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  }, _react.default.cloneElement(props.children, {
    height: loadingContainerHeight
  })));
};

const RqtvSpinner = props => {
  const color = props.color ? "text-".concat(props.color) : 'rqtv-spinner-color';
  return _react.default.createElement(RqtvRendererContainer, {
    isFixed: props.isFixed,
    isSticky: props.isSticky,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "spinner-border ".concat(color),
    role: "status",
    style: props.style,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    },
    __self: void 0
  }, _react.default.createElement("span", {
    className: "sr-only",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: void 0
  }, "Loading...")));
};

exports.RqtvSpinner = RqtvSpinner;

const RqtvNoData = props => _react.default.createElement(RqtvRendererContainer, {
  isFixed: props.isFixed,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 41
  },
  __self: void 0
}, _react.default.createElement("div", {
  className: "rqtv-no-data",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 42
  },
  __self: void 0
}, _react.default.createElement("span", {
  className: "lui-icon lui-icon--minus",
  style: {
    margin: '0.5rem'
  },
  __source: {
    fileName: _jsxFileName,
    lineNumber: 43
  },
  __self: void 0
}), _react.default.createElement("span", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 44
  },
  __self: void 0
}, "No data available")));

exports.RqtvNoData = RqtvNoData;

const RqtvError = props => _react.default.createElement(RqtvRendererContainer, {
  isFixed: props.isFixed,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 51
  },
  __self: void 0
}, _react.default.createElement("div", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 52
  },
  __self: void 0
}, _react.default.createElement(_layout.Button, {
  className: "rqtv-error-refresh",
  onClick: props.reload ? props.reload : () => false,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 53
  },
  __self: void 0
}, _react.default.createElement(_layout.LuiIcon, {
  iconType: "reload",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 54
  },
  __self: void 0
})), _react.default.createElement("span", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 56
  },
  __self: void 0
}, "Error Loading Content")));

exports.RqtvError = RqtvError;