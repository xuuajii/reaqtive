"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _react = require("react");

var _qDoc = require("../contexts/q-doc");

const getVariableByName = async (qDoc, variableName) => {
  try {
    const variable = qDoc.getVariableByName(variableName);
    return variable;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getVariableById = async (qDoc, variableId) => {
  try {
    const variable = qDoc.getVariableById(variableId);
    return variable;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const initialState = {
  qVariable: null,
  qError: false,
  qErrorCounter: 0,
  maxErrorCounter: 10,
  rqtvMessage: null,
  qErrorObject: null,
  qLoading: true
};

const qVariableReducer = (state, action) => {
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
        qVariable: action.qVariable
      });

    default:
      throw new Error();
  }
};
/**
 * @typedef {object} qVariableHandler - the object returned by useQLayoutReducer
 * @property {boolean} qLoading - if true the the handler is still waiting for response from the qlik server
 * @property {boolean} qError - if true there was an error retrieving the qVariable from the engine
 * @property {object} qVariable - the object returned from the server to interact with the variable
 * @property {boolean} shouldUpdate - a boolean variable which is set to true when the object is recalculated and you should ask the engine fro the layou (e.g. after selections)
 * @property {function} setShouldUpdate - a function to clean up the shouldupdate property after the needed effects have run
 */

/**
 * @typedef {function} hook
 * @type {function}
 */

/**
  *@function useQVariableReducer
  *@description hook to retrieve a variable already available in the qDoc
  *@kind hook
  *@param {string} id - the name or id of the variable
  *@param {string} [idType=name] - tells to the variable reducer whether to use the name or id to retrieve the variable
  *@return {qVariableHandler} the handler of the variable
*/


const useQVaraibleReducer = (id, idType = 'name') => {
  const qDocHandler = (0, _react.useContext)(_qDoc.QDoc);
  const qDoc = qDocHandler && qDocHandler.qDoc;

  const _useReducer = (0, _react.useReducer)(qVariableReducer, initialState),
        _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
        qPromiseHandler = _useReducer2[0],
        dispatch = _useReducer2[1];

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        shouldUpdate = _useState2[0],
        setShouldUpdate = _useState2[1];

  const errorCounter = qPromiseHandler.errorCounter,
        qLoading = qPromiseHandler.qLoading,
        qError = qPromiseHandler.qError,
        qVariable = qPromiseHandler.qVariable;
  (0, _react.useEffect)(() => {
    const runEffect = async () => {
      let getVariable;

      switch (idType) {
        case 'name':
          getVariable = getVariableByName;
          break;

        case 'id':
          getVariable = getVariableById;
          break;

        default:
          throw new Error();
      }

      if (qDoc) {
        const result = await getVariable(qDoc, id);
        result instanceof Error ? dispatch({
          type: 'error',
          qError: result
        }) : dispatch({
          type: 'success',
          qVariable: result
        });
      }
    };

    if (qLoading) {
      runEffect();
    }
  }, [qDoc, id, idType, qLoading]);
  (0, _react.useEffect)(() => {
    if (qLoading === false && qVariable !== null) {
      setShouldUpdate(true);
      qVariable.on('changed', () => setShouldUpdate(true));
    }

    return () => qVariable && qVariable.removeAllListeners();
  }, [qLoading, qVariable]);
  return (0, _objectSpread2.default)({}, qPromiseHandler, {
    shouldUpdate,
    setShouldUpdate
  });
};

var _default = useQVaraibleReducer;
exports.default = _default;