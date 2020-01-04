"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = require("../index");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const QGenericObject = props => {
  const qObjectHandler = (0, _index.useQObjectReducer)(props.qObjectDef);
  const qSelectionHandler = (0, _index.useQSelectionHandler)(qObjectHandler.qObject, false);
  const qLayoutHandler = (0, _index.useQLayoutReducer)(qObjectHandler, qSelectionHandler);
  return _react.default.cloneElement(props.children, {
    qObjectHandler,
    qLayoutHandler,
    qSelectionHandler,
    qObjectDef: props.qObjectDef
  });
};

QGenericObject.propTypes = {
  qObjectDef: _propTypes.default.object.isRequired,
  quickSelectionMode: _propTypes.default.bool
};
QGenericObject.defaultProps = {
  quickSelectionMode: false
};
var _default = QGenericObject;
exports.default = _default;