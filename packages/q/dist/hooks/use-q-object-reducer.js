"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = require("react");

var _layout = require("@reaqtive/layout");

var _index = require("../index");
//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const getQObject = async (qDoc, qObjectDef) => {
  try {
    const qObject = await qDoc.createSessionObject(qObjectDef);
    return qObject;
  } catch (err) {
    return err;
  }
};

const qBeginSelections = async qObject => {
  try {
    const result = qObject.beginSelections(['/qListObjectDef']);
    return result;
  } catch (err) {
    return err;
  }
};

const qEndSelections = async (qObject, qAccept) => {
  try {
    const isQAccepting = qAccept === '1' || qAccept === 1 || qAccept === true ? true : false;
    const result = qObject.endSelections(isQAccepting);
    return result;
  } catch (err) {
    return err;
  }
};

const initialState = {
  qObject: null,
  qError: false,
  qErrorCounter: 0,
  maxErrorCounter: 10,
  rqtvMessage: null,
  qErrorObject: null,
  qLoading: true
};

const qObjectReducer = (state, action) => {
  switch (action.type) {
    case 'error':
      return state.maxErrorCounter < state.qErrorCounter ? (0, _objectSpread2.default)({}, initialState, {
        qErrorCounter: state.qErrorCounter + 1
      }) : (0, _objectSpread2.default)({}, initialState, {
        qError: true,
        qErrorObject: action.qErrorObject,
        rqtvMessage: 'error getting object'
      });

    case 'success':
      return (0, _objectSpread2.default)({}, initialState, {
        qErrorCounter: 0,
        qLoading: false,
        qObject: action.qObject
      });

    case 'reloadObject':
      return (0, _objectSpread2.default)({}, initialState);

    default:
      throw new Error();
  }
};

const useQObjectReducer = qObjectDef => {
  const maxError = 10;
  const qDocHandler = (0, _react.useContext)(_index.QDoc);
  const qDoc = qDocHandler && qDocHandler.qDoc;
  const qObjectDefMemo = (0, _layout.useDeepCompareMemo)(qObjectDef);

  const _useReducer = (0, _react.useReducer)(qObjectReducer, initialState),
        _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
        qPromiseHandler = _useReducer2[0],
        dispatch = _useReducer2[1];

  const errorCounter = qPromiseHandler.errorCounter,
        qLoading = qPromiseHandler.qLoading,
        qError = qPromiseHandler.qError,
        qObject = qPromiseHandler.qObject;

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        shouldUpdate = _useState2[0],
        setShouldUpdate = _useState2[1];

  const _useState3 = (0, _react.useState)(false),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        isSelecting = _useState4[0],
        setIsSelecting = _useState4[1];

  (0, _react.useEffect)(() => {
    const runEffect = async () => {
      if (qDoc) {
        const result = await getQObject(qDoc, qObjectDefMemo);
        result instanceof Error ? dispatch({
          type: 'error',
          qError: result
        }) : dispatch({
          type: 'success',
          qObject: result
        });
      }
    };

    if (qLoading) {
      runEffect();
    }
  }, [qObjectDefMemo, qDoc, errorCounter, qLoading]);
  (0, _react.useEffect)(() => {
    if (qLoading === false && qObject !== null) {
      qObject.on('changed', () => setShouldUpdate(true));
    }

    return () => qObject && qObject.removeAllListeners();
  }, [qLoading, qObject]);

  const beginSelections = callback => {
    setIsSelecting(true);
    const result = qBeginSelections(qObject);
    result instanceof Error ? setIsSelecting(false) : callback();
  };

  const endSelections = (qAccept, callback) => {
    const result = qEndSelections(qObject, qAccept);

    if (!(result instanceof Error)) {
      setIsSelecting(false);
      typeof callback === 'function' && callback();
    }
  };

  return (0, _objectSpread2.default)({}, qPromiseHandler, {
    reloadObject: () => dispatch({
      type: 'reloadObject'
    }),
    shouldUpdate,
    setShouldUpdate,
    isSelecting,
    beginSelections,
    endSelections
  });
};

var _default = useQObjectReducer;
exports.default = _default;
