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
  /**
   * the definition of the qObject.
   * Check the following links for details
   * https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/genericobject.html
   */
  qObjectDef: _propTypes.default.object.isRequired,

  /**
   * If true the object will handle selections using Qlik Sense mode (user will have to accept selections)
   * If set to false the object will handle selections using QlikView mode (selection immediately applied)
   */
  quickSelectionMode: _propTypes.default.bool
};
QGenericObject.defaultProps = {
  quickSelectionMode: false
};
var _default = QGenericObject;
exports.default = _default;