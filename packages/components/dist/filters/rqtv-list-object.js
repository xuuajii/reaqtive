"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _useRqtvListObject = _interopRequireDefault(require("./use-rqtv-list-object"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _q = require("@reaqtive/q");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const RqtvListObject = props => {
  const rqtvListObject = (0, _useRqtvListObject.default)(props.qObjectHandler, props.qSelectionHandler, props.qLayoutHandler, props.quickSelectionMode, props.toggle);
  const qLayout = props.qLayoutHandler && props.qLayoutHandler.qLayout; //console.log(qLayout, props.qId)

  const qDimensionInfo = qLayout && qLayout.qListObject.qDimensionInfo;
  const qFieldName = qLayout && qDimensionInfo.qGroupFieldDefs[qLayout && qDimensionInfo.qGroupPos];
  const activeField = (0, _q.useQFieldReducer)(qFieldName, props.alwaysOneSelected, props.defaultValue, props.resetOnUnmount);
  const moreThanOneChild = Array.isArray(props.children);

  if (moreThanOneChild) {
    throw "RqtvListObject must have only one child, wrap the content inside a React element";
  }

  return _react.default.cloneElement(props.children, (0, _objectSpread2.default)({}, props, {
    rqtvListObject
  }));
};

RqtvListObject.propTypes = {
  qObjectHandler: _propTypes.default.object,
  qSelectionHandler: _propTypes.default.object,
  qLayoutHandler: _propTypes.default.object,
  alwaysOneSelected: _propTypes.default.bool,
  defaultValue: _propTypes.default.string,
  resetOnUnmount: _propTypes.default.bool,
  toggle: _propTypes.default.bool
};
RqtvListObject.defualtProps = {
  alwaysOneSelected: false,
  defaultValue: '',
  resetOnUnmount: true,
  toggle: true
};
var _default = RqtvListObject;
exports.default = _default;