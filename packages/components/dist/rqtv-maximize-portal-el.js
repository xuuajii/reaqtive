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

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\rqtv-maximize-portal-el.js";

const RqtvMaximizePortalEl = props => {
  const _useState = (0, _react.useState)(0),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        maximizedHeight = _useState2[0],
        set = _useState2[1];

  (0, _react.useEffect)(() => {
    if (props.maximizeFullPage) {
      const body = document.getElementsByTagName('body')[0];
      const windowHeight = window.innerHeight;
      const bodyTop = body.getBoundingClientRect().top;
      set(windowHeight - bodyTop);
    } else {
      set(props.style.height);
    }
  }, [props.style.height, props.maximizeFullPage]);
  return _react.default.createElement("div", {
    ref: props.maximizeElRef,
    style: (0, _objectSpread2.default)({}, props.style, {
      height: maximizedHeight,
      minHeight: maximizedHeight,
      zIndex: 10
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  });
};

RqtvMaximizePortalEl.propTypes = {
  maximizeElRef: _propTypes.default.object.isRequired,
  style: _propTypes.default.object,
  maximizeFullPage: _propTypes.default.bool
};
RqtvMaximizePortalEl.defaultProps = {
  style: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 300,
    maxHeight: '100%'
  },
  maximizeFullPage: true
};
var _default = RqtvMaximizePortalEl;
exports.default = _default;