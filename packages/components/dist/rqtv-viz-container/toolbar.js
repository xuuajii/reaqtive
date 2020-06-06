"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\rqtv-viz-container\\toolbar.js";

const RqtvVizContainerToolbar = props => {
  //console.log(props.exportToExcel)
  return _react.default.createElement("div", {
    className: "rqtv-viz-container-toolbar",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "btn-group",
    role: "group",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: void 0
  }, props.showExportExcel && props.exportExcel && _react.default.createElement("button", {
    type: "button",
    className: "btn",
    onClick: props.exportExcel,
    style: {
      lineHeight: "".concat(props.buttonFontSize + 2, "px")
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: void 0
  }, _react.default.createElement(_layout.Icon, {
    type: _layout.excel,
    size: props.buttonFontSize,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: void 0
  })), props.showExportPdf && props.exportPdf && _react.default.createElement("button", {
    type: "button",
    className: "btn",
    onClick: props.exportPdf,
    style: {
      lineHeight: "".concat(props.buttonFontSize + 2, "px")
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  }, _react.default.createElement(_layout.Icon, {
    type: _layout.pdf,
    size: props.buttonFontSize,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: void 0
  })), props.showExportImg && props.exportImg && _react.default.createElement("button", {
    type: "button",
    className: "btn",
    onClick: props.exportImg,
    style: {
      lineHeight: "".concat(props.buttonFontSize + 2, "px")
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  }, _react.default.createElement(_layout.Icon, {
    type: _layout.image,
    size: props.buttonFontSize,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  })), props.showMaximize && _react.default.createElement("button", {
    type: "button",
    className: "btn",
    onClick: props.toggleMaximize,
    style: {
      lineHeight: "".concat(props.buttonFontSize + 2, "px")
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: void 0
  }, !props.maximized ? _react.default.createElement(_layout.Icon, {
    type: _layout.arrowExpand,
    size: props.buttonFontSize,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  }) : _react.default.createElement(_layout.Icon, {
    type: _layout.arrowCollapse,
    size: props.buttonFontSize,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }))));
};

RqtvVizContainerToolbar.propTypes = {
  showExportExcel: _propTypes.default.bool,
  showExportPdf: _propTypes.default.bool,
  showExportImg: _propTypes.default.bool,
  showMaximize: _propTypes.default.bool,
  buttonFontSize: _propTypes.default.number
};
RqtvVizContainerToolbar.defaultProps = {
  showExportExcel: true,
  showExportPdf: true,
  showExportImg: true,
  showMaximize: true,
  buttonFontSize: 18
};
var _default = RqtvVizContainerToolbar;
exports.default = _default;