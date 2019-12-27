"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSpring = require("react-spring");

var _rqtvSearch = _interopRequireDefault(require("./rqtv-search"));

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\rqtv-search-object\\index.js";

const RqtvSearchObject = props => {
  const alwaysExpanded = props.alwaysExpanded,
        expandFrom = props.expandFrom,
        width = props.width,
        rest = (0, _objectWithoutProperties2.default)(props, ["alwaysExpanded", "expandFrom", "width"]);

  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        show = _useState2[0],
        setShow = _useState2[1];

  const showSearch = () => {
    setShow(true);

    if (typeof props.onOpen === 'function') {
      props.onOpen();
    }
  };

  const hideSearch = () => {
    setShow(false);
    typeof props.onClose === 'function' && props.onClose();
  };

  const searchContainerEl = (0, _react.useRef)();

  const isFixed = () => searchContainerEl.current && window.getComputedStyle(searchContainerEl.current).position === 'fixed';

  (0, _react.useEffect)(() => {
    isFixed() && show ? document.documentElement.style.overflow = "hidden" : document.documentElement.style.overflow = "auto";
  }, [show]);
  return _react.default.createElement("div", {
    className: "rqtv-search",
    style: {
      flexDirection: expandFrom === 'right' ? 'row-reverse' : 'row'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    },
    __self: void 0
  }, props.alwaysExpanded === true ? _react.default.createElement(_rqtvSearch.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: void 0
  })) : _react.default.createElement(_react.default.Fragment, null, !show && _react.default.createElement(_layout.Button, Object.assign({
    className: "rqtv-search-toggler",
    onClick: showSearch
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: void 0
  }), _react.default.createElement(_layout.LuiIcon, {
    iconType: 'search',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: void 0
  })), show && _react.default.createElement("div", {
    className: "rqtv-search-animated-container ".concat(show && 'show'),
    ref: searchContainerEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "backdrop-search",
    onClick: hideSearch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: void 0
  }), _react.default.createElement(_rqtvSearch.default, Object.assign({}, props, {
    hideSearch: hideSearch,
    show: show,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: void 0
  })))));
};

RqtvSearchObject.propTypes = {
  alwaysExpanded: _propTypes.default.bool,
  expandFrom: _propTypes.default.oneOf(['right', 'left']),
  width: _propTypes.default.number,
  onOpen: _propTypes.default.func,
  onClose: _propTypes.default.func
};
RqtvSearchObject.defaultProps = {
  alwaysExpanded: false,
  expandFrom: 'left'
};
var _default = RqtvSearchObject;
exports.default = _default;