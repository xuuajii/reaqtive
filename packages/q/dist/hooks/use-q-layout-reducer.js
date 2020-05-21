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

const getLayout = async (qObject, promiseId) => {
  try {
    const qLayout = await qObject.getLayout();
    return (0, _objectSpread2.default)({}, qLayout, {
      promiseId
    });
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
/**
 * @typedef {object} qLayoutHandler - the object returned by useQLayoutReducer
 * @property {boolean} qLoading - if true the the handler is still waiting for response from the qlik server
 * @property {boolean} qError - if true there was an error retrieving the qLayout from the engine
 * @property {object} qLayout - the object returned from the server which contains the layout returned from the qlik server
 * @property {function} setLayoutUpdater - a method that accept a function that can be defined inside the view using the layout. by default the layout updater is qObject.getLayout(). it could be useful to change the layout updater when the generic object is in selecting mode
 * @property {function} applyQLayoutPatch - a function that allow to change the shape of the layout from the view. it is inteneded to be used when the qDisplayArea changes: the view asks the server for a new data page and the apply the patch to the already existing layout
 */

/**
 * @typedef {function} hook
 * @type {function}
 */

/**
  *@function useQLayoutReducer
  *@description a hook to create and retrieve a the layout of a qObject (tested with generic objects and variables)
  *@kind hook
  *@param {qObjectHandler} qObjectHandler - the handler retrieved by useQObjectReducer
  *@param {qSelectionHandler} [qSelectionHandler]  - the handler that manages the selection state of the generic object, it is not needed if the qObject does not have a selection state to handle
  *@return {qLayoutHandler} the handler of the qLayout
*/


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
        layoutUpdater = _useState2[0],
        setLayoutUpdater = _useState2[1];

  const qObject = qObjectHandler.qObject,
        shouldUpdate = qObjectHandler.shouldUpdate,
        setShouldUpdate = qObjectHandler.setShouldUpdate,
        qVariable = qObjectHandler.qVariable;

  const _ref = qSelectionHandler || false,
        isSelecting = _ref.isSelecting;

  const layoutProvider = qObject || qVariable; //first call to get layout

  (0, _react.useEffect)(() => {
    let isSubscribed = true;

    const runEffect = async layoutProvider => {
      const result = await getLayout(layoutProvider);
      return result instanceof Error ? dispatch({
        type: 'error',
        qError: result
      }) : dispatch({
        type: 'success',
        qLayout: result
      });
    };

    if (qLoading === true && layoutProvider !== null && isSubscribed === true) {
      layoutProvider && runEffect(layoutProvider);
    }

    return () => isSubscribed = false;
  }, [qLoading, layoutProvider, qErrorCounter]); //handle the function that updates the layout: the function changes for generic-objects which are not in quickSelectionMode
  //when an object not in quickSelectionMode is in isSelecting state the update function should be passed by the component
  //using the layout

  const currentPropmiseRef = (0, _react.useRef)(0);
  const updateLayout = (0, _react.useCallback)(() => {
    currentPropmiseRef.current = currentPropmiseRef.current + 1;

    const standardUpdate = async () => {
      const result = await getLayout(layoutProvider, currentPropmiseRef.current);

      if (currentPropmiseRef.current === result.promiseId) {
        return result instanceof Error ? dispatch({
          type: 'error',
          qError: result
        }) : dispatch({
          type: 'success',
          qLayout: result
        });
      }
    };

    if (layoutProvider !== null && isSelecting === true && typeof layoutUpdater === 'function') {
      layoutUpdater();
    } else {
      layoutProvider !== null && standardUpdate();
    }
  }, [layoutUpdater, isSelecting, layoutProvider]); // call for layout update when the engine recalculates the qObject

  (0, _react.useEffect)(() => {
    let isSubscribed = true;

    if (shouldUpdate === true && isSubscribed === true) {
      updateLayout();
      setShouldUpdate(false);
    }

    return () => isSubscribed = false;
  }, [shouldUpdate, updateLayout]); // method used by the components using the layout to update the layout

  const applyQLayoutPatch = (0, _react.useCallback)((path, patch) => {
    const qLayoutPatched = (0, _helpers.getPatchedObject)(qLayout, path, patch);
    dispatch({
      type: 'success',
      qLayout: qLayoutPatched
    });
  }, [qLayout]);
  return (0, _objectSpread2.default)({}, qPromiseHandler, {
    setLayoutUpdater,
    applyQLayoutPatch
  });
};

var _default = useQLayoutReducer;
exports.default = _default;