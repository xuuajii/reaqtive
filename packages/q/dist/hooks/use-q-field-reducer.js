"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = require("react");

var _index = require("../index");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const getQField = async (qDoc, qFieldName) => {
  try {
    const qField = await qDoc.getField(qFieldName);
    return qField;
  } catch (err) {
    return err;
  }
};

const setAlwaysOneSelected = async (qField, defaultValue) => {
  // console.log('setting alway 1 selected')
  try {
    const defaultSelected = await qField.select(defaultValue);

    if (!(defaultSelected instanceof Error)) {
      const result = await qField.setNxProperties({
        "qOneAndOnlyOne": true
      });
      return result;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

const removeAlwaysOneSelected = async qField => {
  try {
    const result = await qField.setNxProperties({
      "qOneAndOnlyOne": false
    });
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const initialState = {
  qField: null,
  qError: false,
  qErrorCounter: 0,
  maxErrorCounter: 10,
  rqtvMessage: null,
  qErrorObject: null,
  qLoading: true
};

const qFieldReducer = (state, action) => {
  switch (action.type) {
    case 'error':
      return state.maxErrorCounter >= state.qErrorCounter ? (0, _objectSpread2.default)({}, initialState, {
        qErrorCounter: state.qErrorCounter + 1
      }) : (0, _objectSpread2.default)({}, initialState, {
        qError: true,
        qErrorField: action.qErrorField,
        rqtvMessage: 'error getting field'
      });

    case 'successField':
      return action.isAlwaysOneSelected ? (0, _objectSpread2.default)({}, initialState, {
        qErrorCounter: 0,
        qLoading: true,
        qField: action.qField
      }) : (0, _objectSpread2.default)({}, initialState, {
        qErrorCounter: 0,
        qLoading: false,
        qField: action.qField
      });

    case 'reloadField':
      return (0, _objectSpread2.default)({}, initialState);

    case 'successNxProps':
      return (0, _objectSpread2.default)({}, state, {
        qErrorCounter: 0,
        qLoading: false
      });

    default:
      throw new Error();
  }
};

const useQFieldReducer = (qFieldName, isAlwaysOneSelected, defaultValue, resetOnUnmount = true) => {
  const qDocHandler = (0, _react.useContext)(_index.QDoc);
  const qDoc = qDocHandler.qDoc;

  const _useReducer = (0, _react.useReducer)(qFieldReducer, initialState),
        _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
        qPromiseHandler = _useReducer2[0],
        dispatch = _useReducer2[1];

  const qField = qPromiseHandler.qField,
        qLoading = qPromiseHandler.qLoading,
        qError = qPromiseHandler.qError,
        errorCounter = qPromiseHandler.errorCounter;
  (0, _react.useEffect)(() => {
    let isSubscribed = true;

    const runEffect = async () => {
      const result = await getQField(qDoc, qFieldName);
      return result instanceof Error ? dispatch({
        type: 'error',
        qError: result
      }) : isSubscribed === true && dispatch({
        type: 'successField',
        qField: result,
        isAlwaysOneSelected: isAlwaysOneSelected
      });
    };

    qDoc && qFieldName && runEffect();
    return () => isSubscribed = false;
  }, [qDoc, qFieldName]);
  (0, _react.useEffect)(() => {
    return () => {
      const onUnmount = async () => {
        const result = await removeAlwaysOneSelected(qField);
      };

      qField && qField.removeAllListeners();

      if (resetOnUnmount && qField && isAlwaysOneSelected === true) {
        onUnmount();
      }
    };
  }, [qField, qLoading, qError, errorCounter]);
  (0, _react.useEffect)(() => {
    const runEffect = async () => {
      if (qField !== null && isAlwaysOneSelected === true) {
        const result = await setAlwaysOneSelected(qField, defaultValue);
        return result instanceof Error ? dispatch({
          type: 'error',
          qError: result
        }) : dispatch({
          type: 'successNxProps'
        });
      }
    };

    runEffect();
  }, [qField, isAlwaysOneSelected]);
  return (0, _objectSpread2.default)({}, qPromiseHandler);
};

var _default = useQFieldReducer;
exports.default = _default;