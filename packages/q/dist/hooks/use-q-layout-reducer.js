"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = require("react");

var _helpers = require("../helpers/helpers");

//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
const getLayout = async qObject => {
  try {
    const qLayout = await qObject.getLayout();
    return qLayout;
  } catch (err) {
    return err;
  }
};

const initialState = {
  qLayout: null,
  qError: false,
  qErrorCounter: 0,
  maxErrorCounter: 10,
  rqtvMessage: null,
  qErrorObject: null,
  qLoading: true
};

const qLayoutReducer = (state, action) => {
  switch (action.type) {
    case 'error':
      const newErrorCounter = state.qErrorCounter + 1;
      return state.maxErrorCounter >= state.qErrorCounter ? (0, _objectSpread2.default)({}, initialState, {
        qErrorCounter: newErrorCounter
      }) : (0, _objectSpread2.default)({}, initialState, {
        qLoading: false,
        qError: true,
        qErrorObject: action.qErrorObject,
        rqtvMessage: 'error getting layout'
      });

    case 'success':
      return (0, _objectSpread2.default)({}, initialState, {
        qLoading: false,
        qLayout: action.qLayout
      });

    case 'reloadObject':
      return (0, _objectSpread2.default)({}, initialState);

    default:
      throw new Error();
  }
};

const useQLayoutReducer = (qObjectHandler, qSelectionHandler) => {
  const _useReducer = (0, _react.useReducer)(qLayoutReducer, initialState),
        _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
        qPromiseHandler = _useReducer2[0],
        dispatch = _useReducer2[1];

  const qLoading = qPromiseHandler.qLoading,
        qLayout = qPromiseHandler.qLayout,
        qErrorCounter = qPromiseHandler.qErrorCounter,
        qError = qPromiseHandler.qError;

  const _useState = (0, _react.useState)(null),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        onUpdate = _useState2[0],
        setOnUpdate = _useState2[1];

  const qObject = qObjectHandler.qObject,
        shouldUpdate = qObjectHandler.shouldUpdate,
        setShouldUpdate = qObjectHandler.setShouldUpdate;
  const isSelecting = qSelectionHandler.isSelecting; // console.log({qObject, shouldUpdate, isSelecting})

  (0, _react.useEffect)(() => {
    const runEffect = async qObject => {
      const result = await getLayout(qObject);
      return result instanceof Error ? dispatch({
        type: 'error',
        qError: result
      }) : dispatch({
        type: 'success',
        qLayout: result
      });
    };

    if (qLoading === true && qObject !== null) {
      qObject && runEffect(qObject);
    }
  }, [qLoading, qObject, qErrorCounter]);
  const updateLayout = (0, _react.useCallback)(() => {
    const standardUpdate = async qObject => {
      const result = await getLayout(qObject);
      return result instanceof Error ? dispatch({
        type: 'error',
        qError: result
      }) : dispatch({
        type: 'success',
        qLayout: result
      });
    };

    if (qObject !== null && isSelecting === true && typeof onUpdate.fn === 'function') {
      //console.log('custom update');
      onUpdate.fn();
    } else {
      //console.log('standard update');
      qObject !== null && standardUpdate();
    }
  }, [qObject, onUpdate, isSelecting]);
  (0, _react.useEffect)(() => {
    if (shouldUpdate === true) {
      updateLayout();
      setShouldUpdate(false);
    }
  }, [shouldUpdate, updateLayout]);
  const applyQLayoutPatch = (0, _react.useCallback)((path, patch) => {
    const qLayoutPatched = (0, _helpers.getPatchedObject)(qLayout, path, patch);
    dispatch({
      type: 'success',
      qLayout: qLayoutPatched
    });
  }, [qLayout]);
  return (0, _objectSpread2.default)({}, qPromiseHandler, {
    setOnUpdate,
    applyQLayoutPatch
  });
};

var _default = useQLayoutReducer;
exports.default = _default;