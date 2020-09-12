"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = require("@reaqtive/layout");

var _currentSelectionsButtons = require("./current-selections-buttons");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/current-selections/rqtv-current-selections-toolbar.js";

const RqtvCurrentSelectionsToolbar = props => {
  //console.log(props)()
  const system = (0, _react.useContext)(_layout.System);
  const isMinimized = props.isResponsive && system.windowWidth <= system.breakPoints[props.breakPoint]; //console.log(system.windowWidth, system.breakPoints['md'])

  const showBack = props.qBackCount > 0 && !isMinimized || props.inModal;
  const showForward = props.qForwardCount > 0 && !isMinimized || props.inModal;
  const showClearAll = props.qSelectionsCount > 0 && !isMinimized || props.inModal;
  const show = props.qBackCount > 0 || props.qForwardCount > 0 || props.qSelectionsCount > 0 || props.alwaysShowToolbar;
  return show ? _react.default.createElement("div", {
    className: "rqtv-current-selections-toolbar ".concat(props.inModal ? 'in-modal' : ''),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: void 0
  }, _react.default.createElement(_currentSelectionsButtons.SelectionsBack, {
    disabled: !(props.qBackCount > 0),
    show: showBack,
    onClick: props.back,
    showLabel: !props.showModalToggler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: void 0
  }), _react.default.createElement("div", {
    className: "btn-group btn-group-toggle ".concat(isMinimized ? 'minimized' : ''),
    "data-toggle": "buttons",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  }, props.showModalToggler && _react.default.createElement("button", {
    className: "btn",
    onClick: props.openCurrentSelectionsModal,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: void 0
  }, _react.default.createElement(_layout.Icon, {
    type: _layout.currentSelections,
    size: isMinimized ? 35 : 24,
    style: {
      marginBottom: '3px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: void 0
  }), !isMinimized && _react.default.createElement("span", {
    style: {
      marginLeft: '5px'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: void 0
  }, "Current Selections"), _react.default.createElement("span", {
    className: "badge",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: void 0
  }, props.qSelectionsCount)), _react.default.createElement(_currentSelectionsButtons.SelectionsClarAll, {
    disabled: !(props.qSelectionsCount > 0),
    show: showClearAll,
    onClick: props.clearAll,
    showLabel: !props.showModalToggler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  })), _react.default.createElement(_currentSelectionsButtons.SelectionsForward, {
    disabled: !(props.qForwardCount > 0),
    show: showForward,
    onClick: props.forward,
    showLabel: !props.showModalToggler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: void 0
  })) : _react.default.createElement(_react.default.Fragment, null);
};

RqtvCurrentSelectionsToolbar.propTypes = {
  isResponsive: _propTypes.default.bool,
  showModalToggler: _propTypes.default.bool,
  inModal: _propTypes.default.bool
};
RqtvCurrentSelectionsToolbar.defaultProps = {
  isResponsive: true,
  showModalToggler: true,
  inModal: false
};
var _default = RqtvCurrentSelectionsToolbar;
exports.default = _default;