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

const getQField = async (qDoc, qFieldName, qState) => {
  try {
    const qField = await qDoc.getField(qFieldName, qState);
    return qField;
  } catch (err) {
    return err;
  }
};

const setAlwaysOneSelected = async (qField, defaultValue) => {
  // console.log('setting always 1 selected')
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
/**
 * @typedef {object} qfieldHandler - the object returned by useQLayoutReducer
 * @property {boolean} qLoading - if true the the handler is still waiting for response from the qlik server
 * @property {boolean} qError - if true there was an error retrieving the qField from the engine
 * @property {object} qField - the object returned from the server to interact with the field
 */

/**
 * @typedef {function} hook
 * @type {function}
 */

/**
  *@function useQFieldReducer
  *@description a hook to retrieve a field from qDoc. if provided a defaulta value it selecte the value when it mounts and set the field to always one selected if isAlwaysOneSelected is set to true
  *@kind hook
  *@param {string} qFieldName - the name of the field
  *@param {string} [qState] - the the alternate state the field will be linked to
  *@param {boolean} [isAlwaysOneSelected=false] - flag to set isAlwaysOneSelected
  *@param {string} [defaultValue] - the defaultValue to be selected before setting isAlwaysOneSelected to true
  *@param {boolean} [resetOnUnmount] - if set to true it set isAlwaysOneSelected to false when unmount
  *@return {qfieldHandler} the handler of the qlik field
*/


const useQFieldReducer = (qFieldName, qState, isAlwaysOneSelected, defaultValue, resetOnUnmount = true) => {
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
      const result = await getQField(qDoc, qFieldName, qState);
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
  }, [qDoc, qFieldName, qState]); // 11/11/2020 --> Previous remove alwaysOneSelected on unMount which was runninng even if the component was not unMounted
  // it can be removed if it no counter effects are found
  // useEffect(()=>{
  //   return () => {
  //     const onUnmount = async()=>{
  //       const result = await removeAlwaysOneSelected(qField)
  //     }
  //     qField&&qField.removeAllListeners()
  //     if(resetOnUnmount===true&&qField&&isAlwaysOneSelected===true){
  //       onUnmount()
  //     }
  //   }
  // },[qField, qLoading, qError, errorCounter])

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
    return () => {
      const onUnmount = async () => {
        const result = await removeAlwaysOneSelected(qField);
      };

      qField && qField.removeAllListeners();

      if (resetOnUnmount === true && qField && isAlwaysOneSelected === true) {
        onUnmount();
      }
    };
  }, [qField, isAlwaysOneSelected]);
  return (0, _objectSpread2.default)({}, qPromiseHandler);
};

var _default = useQFieldReducer;
exports.default = _default;