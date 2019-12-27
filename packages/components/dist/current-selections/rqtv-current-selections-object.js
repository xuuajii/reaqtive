"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _q = require("@reaqtive/q");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const RqtvCurrentSelectionsObject = props => {
  const qDocHandler = (0, _react.useContext)(_q.QDoc);
  const qDoc = qDocHandler.qDoc; //qSelectionsCount={qSelectionObject&&qSelectionObject.qSelections.length}

  const qLayout = props.qLayoutHandler.qLayout;
  const qSelectionObject = qLayout && qLayout.qSelectionObject;
  const rqtvCurrentSelectionsObject = {
    qSelectionsCount: qSelectionObject && Array.isArray(qSelectionObject.qSelections) ? qSelectionObject.qSelections.length : 0,
    qBackCount: qSelectionObject && qSelectionObject.qBackCount,
    qForwardCount: qSelectionObject && qSelectionObject.qForwardCount,
    clearAll: () => {
      qDoc.clearAll().then(qResult => props.onClear).catch(qErr => console.log('error clearing selections', qErr));
    },
    back: () => {
      qDoc.back().then(qResult => props.onBack).catch(qErr => console.log('error clearing selections', qErr));
    },
    forward: () => {
      qDoc.forward().then(qResult => props.onForward).catch(qErr => console.log('error clearing selections', qErr));
    }
  };
  return (//props.layout(props, rqtvCurrentSelectionsObject)
    _react.default.cloneElement(props.children, (0, _objectSpread2.default)({}, props, {
      rqtvCurrentSelectionsObject
    }))
  );
}; //const RqtvCurrentSelectionsObjectWithQ = withQComponent(RqtvCurrentSelectionsObject)


var _default = RqtvCurrentSelectionsObject;
exports.default = _default;