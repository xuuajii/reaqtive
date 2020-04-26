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

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/components/src/lib/filters/rqtv-button-bar/layout.js";

const Layout = props => {
  const rqtvListObject = props.rqtvListObject,
        qLayoutHandler = props.qLayoutHandler,
        qDataPageHeight = props.qDataPageHeight,
        goToFirstPageAfterSelection = props.goToFirstPageAfterSelection,
        buttonsStyle = props.buttonsStyle,
        buttonsClassName = props.buttonsClassName;
  const qLayout = qLayoutHandler && qLayoutHandler.qLayout;
  const qSize = qLayout && qLayout.qListObject.qSize;
  const qDataPages = qLayout && qLayout.qListObject.qDataPages;
  const rendererProps = (0, _index2.useListObjectRendererMap)(props.qLayoutHandler, props.qObjectHandler);
  return _react.default.createElement(_index.RqtvRenderer, Object.assign({}, rendererProps, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: void 0
  }), _react.default.createElement(_body.default, {
    rqtvListObject: rqtvListObject,
    qSize: qSize,
    qDataPages: qDataPages,
    qDataPageHeight: qDataPageHeight,
    goToFirstPageAfterSelection: goToFirstPageAfterSelection,
    buttonsStyle: buttonsStyle,
    buttonsClassName: buttonsClassName,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: void 0
  }));
};

var _default = Layout;
exports.default = _default;