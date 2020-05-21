"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = require("react");

var _index = require("../index");

const useListObjectNxProperties = qObject => {
  const qDoc = (0, _react.useContext)(_index.QDoc);

  const _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qNxProperties = _useState2[0],
        setQNxProperties = _useState2[1];

  const _useState3 = (0, _react.useState)(0),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        qRetryCount = _useState4[0],
        setQRetryCount = _useState4[1];

  const _useState5 = (0, _react.useState)({
    isError: false,
    errorMessage: null
  }),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        qEngineError = _useState6[0],
        setQEngineError = _useState6[1];

  function getNxProperties(qObject) {
    qObject.getProperties().then(qProperties => {
      const qDef = qProperties.qListObjectDef.qDef;
      const qActiveField = qDef.qFieldDefs[qDef.qActiveField];
      getField(qActiveField);
    }).catch(err => handleQEngineError(err));
  }

  function getField(fieldName) {
    qDoc.getField(fieldName).then(qField => qField.getNxProperties().then(nxProperties => setQNxProperties(nxProperties))).catch(err => handleQEngineError(err));
  }

  function handleQEngineError(errorMessage) {
    setQRetryCount(prevRetryCount => prevRetryCount + 1);

    if (qRetryCount > 10) {
      setQEngineError({
        isError: true,
        errorMessage: errorMessage
      });
    }
  } // Similar to componentDidMount and componentDidUpdate:


  (0, _react.useEffect)(() => {
    if (qObject !== null) {
      getNxProperties(qObject);
    }
  }, [qObject, qEngineError]);
  return {
    qEngineError,
    qNxProperties
  };
};

var _default = useListObjectNxProperties;
exports.default = _default;