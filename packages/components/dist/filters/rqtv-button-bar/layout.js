"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _body = _interopRequireDefault(require("./body"));

var _index = require("../../loading/index");

var _index2 = require("../helpers/index");

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\components\\src\\lib\\filters\\rqtv-button-bar\\layout.js";

const Layout = props => {
  const qLayout = props.qLayoutHandler.qLayout;
  const rendererProps = (0, _index2.useListObjectRendererMap)(props.qLayoutHandler, props.qObjectHandler);
  return _react.default.createElement(_index.RqtvRenderer, Object.assign({}, rendererProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  }), _react.default.createElement("div", {
    className: "btn-group rqtv-button-bar",
    role: "group",
    "aria-label": "Basic example",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }, _react.default.createElement(_body.default, {
    data: qLayout && qLayout.qListObject.qDataPages[0],
    size: qLayout && qLayout.qListObject.qSize,
    qDataPageHeight: props.qDataPageHeight,
    qObject: props.qObject //setQLayoutPatcher={props.setQLayoutPatcher}
    ,
    rqtvListObject: props.rqtvListObject,
    buttonSize: props.buttonSize,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: void 0
  })));
};

var _default = Layout;
exports.default = _default;