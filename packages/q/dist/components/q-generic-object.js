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
  const qObjectDef = props.qObjectDef,
        quickSelectionMode = props.quickSelectionMode;
  const qObjectHandler = (0, _index.useQObjectReducer)(qObjectDef);
  const qSelectionHandler = (0, _index.useQSelectionHandler)(qObjectHandler.qObject);
  const qLayoutHandler = (0, _index.useQLayoutReducer)(qObjectHandler, qSelectionHandler);
  const moreThanOneChild = Array.isArray(props.children);

  if (moreThanOneChild) {
    throw "QGenericObject must have  only one child, wrap the content inside a React element";
  }

  return _react.default.cloneElement(props.children, {
    qObjectHandler,
    qLayoutHandler,
    qSelectionHandler,
    qObjectDef,
    quickSelectionMode
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