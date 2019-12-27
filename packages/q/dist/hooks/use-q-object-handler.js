"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash"));

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const useQObjectHandler = (qDoc, qObjectDef) => {
  const qObjectDefRef = (0, _react.useRef)(qObjectDef);

  const _useState = (0, _react.useState)(null),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qObject = _useState2[0],
        setQObject = _useState2[1];

  const _useState3 = (0, _react.useState)(true),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        waitingQDoc = _useState4[0],
        setWaitingQDoc = _useState4[1];

  const _useState5 = (0, _react.useState)(true),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        qLoading = _useState6[0],
        setQLoading = _useState6[1];

  const _useState7 = (0, _react.useState)(0),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        qRetryCount = _useState8[0],
        setQRetryCount = _useState8[1];

  const _useState9 = (0, _react.useState)({
    isError: false,
    errorMessage: null
  }),
        _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
        qEngineError = _useState10[0],
        setQEngineError = _useState10[1];

  function handleQEngineError(errorMessage) {
    //console.log(qRetryCount)
    if (qRetryCount > 10) {
      setQEngineError({
        isError: true,
        rqtvMessage: 'error retrieving qObject'
      });
    } else {
      setQRetryCount(prevRetryCount => prevRetryCount + 1);
    }
  }

  function getQObject() {
    if (qDoc) {
      qDoc.createSessionObject(qObjectDef).then(qObject => {
        console.log('gotObject');
        setQObject(qObject);
      }).catch(err => handleQEngineError(err));
    }
  }
  /************************************/
  // trigger object creation

  /************************************/


  (0, _react.useEffect)(() => {
    if (qDoc !== null) {
      setWaitingQDoc(false);
    }
  }, [qDoc]);
  (0, _react.useEffect)(() => {
    if (qLoading === true && waitingQDoc === false) {
      getQObject();
    }
  }, [qLoading, waitingQDoc]);
  /************************************/

  /************************************/
  // update after receiving object (or error)

  /************************************/

  (0, _react.useEffect)(() => {
    if (qObject !== null || qEngineError.qError) {
      setQLoading(false);
    }
  }, [qObject, qEngineError.qError]);
  /************************************/

  /************************************/
  // trigger object update after error or object def change
  // trigger object reload from user input

  /************************************/

  (0, _react.useEffect)(() => {
    setQLoading(true);
  }, [qObjectDefRef.current, qRetryCount]);
  (0, _react.useEffect)(() => {
    if (!_lodash.default.isEqual(qObjectDef, qObjectDefRef) && !(qObjectDefRef === null)) {
      qObjectDefRef.current = qObjectDef;
    }
  }, [qObjectDef]);
  return {
    qEngineError,
    qObject,
    qLoading,
    reloadObject: () => setQLoading(true)
  };
};

var _default = useQObjectHandler;
exports.default = _default;