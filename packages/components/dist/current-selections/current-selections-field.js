"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _q = require("@reaqtive/q");

var _layout = require("@reaqtive/layout");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\components\\src\\lib\\current-selections\\current-selections-field.js";

const CurrentSelectionsField = props => {
  const isMounted = (0, _layout.useIsMounted)();

  const editFieldSelections = () => {
    //console.log(props.item.qField)
    isMounted === true && props.setActiveField(props.item.qField);
  };

  const qFieldHandler = (0, _q.useQFieldHandler)(props.item.qField);
  const qField = qFieldHandler.qField;

  const clearFieldSlections = () => {
    qField && qField.clear();
  };

  return _react.default.createElement("li", {
    className: "list-group-item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "row no-gutters",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "col-8 selection-item-info",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: void 0
  }, _react.default.createElement("div", {
    className: "badge S",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: void 0
  }, props.item.qField), _react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: void 0
  }, props.item.qSelectedFieldSelectionInfo.map((value, index) => _react.default.createElement("span", {
    key: index,
    className: "value",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: void 0
  }, "".concat(value.qName).concat(props.item.qSelectedFieldSelectionInfo.length - 1 !== index ? ', ' : ' '))))), _react.default.createElement("div", {
    className: "col-4 selection-item-toolbar",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: void 0
  }, _react.default.createElement("button", {
    className: "btn",
    onClick: editFieldSelections,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    },
    __self: void 0
  }, _react.default.createElement(_layout.Icon, {
    type: _layout.pencil,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: void 0
  })), qField && props.item.qOneAndOnlyOne !== true && _react.default.createElement("button", {
    className: "btn",
    onClick: clearFieldSlections,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    },
    __self: void 0
  }, _react.default.createElement(_layout.Icon, {
    type: _layout.deleteForever,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: void 0
  })))));
};

var _default = CurrentSelectionsField;
exports.default = _default;