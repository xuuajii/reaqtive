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

const getQObject = async (qDoc, qObjectDef) => {
  try {
    const qObject = await qDoc.createSessionObject(qObjectDef);
    return qObject;
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
      return state.maxErrorCounter >= state.qErrorCounter ? (0, _objectSpread2.default)({}, initialState, {
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
/**
 * @typedef {object} qObjectHandler - the object returned by useQObjectReducer
 * @property {boolean} qLoading - if true the the handler is still waiting for response from the qlik server
 * @property {boolean} qError - if true there was an error retrieving the qObject from the engine
 * @property {object} qObject - the object returned from the server
 * @property {function} reloadObject - a method to ask the qlik engine to recalculate the qObject
 * @property {boolean} shouldUpdate - a boolean variable which is set to true when the object is recalculated and you should ask the engine fro the layou (e.g. after selections)
 * @property {function} setShouldUpdate - a function to clean up the shouldupdate property after the needed effects have run
 */

/**
 * @typedef {function} hook
 * @type {function}
 */

/**
 * @typedef {object} qObjectDef - the shape of the object you want the qlik engine to crearte for you
 */

/**
  *@function useQObjectReducer
  *@description a hook to create and retrieve a generic object from the qlik engine
  *@kind hook
  *@param {qObjectDef} qObjectDef - The object that tells to the qlik engine what object you want
  *@return {qObjectHandler} the handler of the newly created object
*/


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
    let isSubscribed = true;

    const runEffect = async () => {
      if (qDoc) {
        const result = await getQObject(qDoc, qObjectDefMemo);
        result instanceof Error ? dispatch({
          type: 'error',
          qError: result
        }) : isSubscribed && dispatch({
          type: 'success',
          qObject: result
        });
      }
    };

    if (qLoading) {
      isSubscribed && runEffect();
    }

    return () => isSubscribed = false;
  }, [qObjectDefMemo, qDoc, errorCounter, qLoading]);
  (0, _react.useEffect)(() => {
    let isSubscribed = true;

    if (qLoading === false && qObject !== null) {
      qObject.on('changed', () => setShouldUpdate(isSubscribed));
    }

    return () => {
      isSubscribed = false;

      if (qObject !== null) {
        qObject && qObject.removeAllListeners();
        qDoc.destroySessionObject(qObject.id);
      }
    };
  }, [qLoading, qObject, qDoc]);
  return (0, _objectSpread2.default)({}, qPromiseHandler, {
    reloadObject: () => dispatch({
      type: 'reloadObject'
    }),
    shouldUpdate,
    setShouldUpdate
  });
};

var _default = useQObjectReducer;
exports.default = _default;