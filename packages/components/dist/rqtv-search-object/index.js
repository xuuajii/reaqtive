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

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/rqtv-search-object/index.js";

/**
 * RqtvSearchObject
 *
 * It dispays a search object to search a single string in multiple fields.
 *
 * If rendered inside the rqtv-navbar it will have fixed position and search results will colver the underlying page
 *
 */
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
      lineNumber: 44
    },
    __self: void 0
  }, props.alwaysExpanded === true ? _react.default.createElement(_rqtvSearch.default, Object.assign({}, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: void 0
  })) : _react.default.createElement(_react.default.Fragment, null, !show && _react.default.createElement(_layout.Button, Object.assign({
    className: "rqtv-search-toggler",
    onClick: showSearch
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: void 0
  }), _react.default.createElement(_layout.LuiIcon, {
    iconType: 'search',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: void 0
  })), show && _react.default.createElement("div", {
    className: "rqtv-search-animated-container ".concat(show && 'show'),
    ref: searchContainerEl,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "backdrop-search",
    onClick: hideSearch,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: void 0
  }), _react.default.createElement(_rqtvSearch.default, Object.assign({}, props, {
    hideSearch: hideSearch,
    show: show,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: void 0
  })))));
};

RqtvSearchObject.propTypes = {
  /**
   * If true the search input will always be displayed
   *
   */
  alwaysExpanded: _propTypes.default.bool,

  /**
   * The direction from which the input will expand if not always expanded
   *
   */
  expandFrom: _propTypes.default.oneOf(['right', 'left']),

  /**
   * width of the component. It accept px or %
   *
   */
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),

  /**
   * function fired after showing the search input. (not called if alwaysExpanded is true)
   *
   */
  onOpen: _propTypes.default.func,

  /**
   * function fired after hiding the search input. (not called if alwaysExpanded is true)
   *
   */
  onClose: _propTypes.default.func,

  /**
   * the fields of the data model to search against
   *
   */
  searchFields: _propTypes.default.array
};
RqtvSearchObject.defaultProps = {
  alwaysExpanded: false,
  expandFrom: 'left',
  width: '100%'
};
var _default = RqtvSearchObject;
exports.default = _default;