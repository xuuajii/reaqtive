"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _rqtvRendererViews = require("./rqtv-renderer-views");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\loading\\rqtv-renderer.js";

const RqtvRenderer = props => {
  const loadingComponent = props.customLoading ? props.customLoading : _react.default.createElement(_rqtvRendererViews.RqtvSpinner, {
    isFixed: props.isFixed,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  });
  const errorComponent = props.customError ? props.customError : _react.default.createElement(_rqtvRendererViews.RqtvError, {
    reload: props.reload,
    isFixed: props.isFixed,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: void 0
  });
  const noDataComponent = props.customNoData ? props.customNoData : _react.default.createElement(_rqtvRendererViews.RqtvNoData, {
    isFixed: props.isFixed,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  }); //console.log(props)

  return props.loading === true ? loadingComponent : props.error === true ? errorComponent : props.noData === true ? noDataComponent : props.children;
};

RqtvRenderer.propTypes = {
  loading: _propTypes.default.bool.isRequired,
  error: _propTypes.default.bool.isRequired,
  noData: _propTypes.default.bool,
  customLoading: _propTypes.default.element,
  customError: _propTypes.default.element,
  customNoData: _propTypes.default.element,
  isFixed: _propTypes.default.bool
};
RqtvRenderer.defaultProps = {
  isFixed: false
};
var _default = RqtvRenderer;
exports.default = _default;