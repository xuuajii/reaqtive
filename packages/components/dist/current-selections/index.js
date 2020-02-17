"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

var _rqtvCurrentSelectionsObject = _interopRequireDefault(require("./rqtv-current-selections-object"));

var _layout = _interopRequireDefault(require("./layout"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\current-selections\\index.js";
const qCurrentSelectionsObjectDef = {
  "qInfo": {
    "qId": "",
    "qType": "SessionLists"
  },
  "qSelectionObjectDef": {},
  qSelections: null,
  qFields: null
};

const RqtvCurrentSelections = props => {
  return _react.default.createElement("div", {
    className: "rqtv-current-selections",
    hidden: props.hidden,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: void 0
  }, _react.default.createElement(_q.QComponent, {
    qObjectDef: qCurrentSelectionsObjectDef,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: void 0
  }, _react.default.createElement(_rqtvCurrentSelectionsObject.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: void 0
  }, _react.default.createElement(_layout.default, {
    isResponsive: props.isResponsive,
    showModalToggler: props.showModalToggler,
    useCurrentSelectionModal: props.useCurrentSelectionModal,
    hidePrefix: props.hidePrefix,
    alwayShowToolbar: props.alwayShowToolbar,
    customLoading: props.customLoading,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: void 0
  }))));
};

RqtvCurrentSelections.propTypes = {
  useCurrentSelectionModal: _propTypes.default.bool,
  isResponsive: _propTypes.default.bool,
  showModalToggler: _propTypes.default.bool,
  alwayShowToolbar: _propTypes.default.bool
};
RqtvCurrentSelections.defaultProps = {
  useCurrentSelectionModal: true,
  isResponsive: true,
  showModalToggler: true,
  alwayShowToolbar: false
};
var _default = RqtvCurrentSelections;
exports.default = _default;