"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QDocProvider = exports.QDoc = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _qGlobal = require("./q-global");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\q\\src\\lib\\contexts\\q-doc.js";

const QDoc = _react.default.createContext();
/**
 * QDoc
 * This context provides a handler for the qDoc provided by Qlik engine Api.
 * The handler is an object with 3 props:
 * qDoc: the actual qDoc provided by the qEngine. It is initially null and it is set when the promis is resolved
 * qError: initially null it is set to true if the promise for the qDoc returns an error
 * qLoading: initially true, it is set to false when the promise to get the qDoc is resolved
 * https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/index.html
 */


exports.QDoc = QDoc;

const QDocProvider = props => {
  return _react.default.createElement(_qGlobal.QGlobalProvider, {
    qConfig: props.qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  }, _react.default.createElement(QGlobalConsumer, {
    qConfig: props.qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: void 0
  }, props.children));
};

exports.QDocProvider = QDocProvider;

const QGlobalConsumer = props => {
  const initialQDocHandler = {
    qDoc: null,
    qError: null,
    qLoading: true
  };

  const _useState = (0, _react.useState)(initialQDocHandler),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qDocHandler = _useState2[0],
        setQDocHandler = _useState2[1];

  const qGlobalHandler = (0, _react.useContext)(_qGlobal.QGlobal);
  (0, _react.useEffect)(() => {
    if (qGlobalHandler.qError) setQDocHandler({
      qDoc: null,
      qError: qGlobalHandler.qError,
      qLoading: false
    });
    if (qGlobalHandler.qGlobal) qGlobalHandler.qGlobal.openDoc(props.qConfig.appId).then(qDoc => setQDocHandler({
      qDoc: qDoc,
      qError: false,
      qLoading: false
    })).catch(qError => setQDocHandler({
      qDoc: null,
      qError: (0, _objectSpread2.default)({}, qError, {
        rqtvMessage: 'error loading qDoc'
      }),
      qLoading: false
    }));
  }, [qGlobalHandler, props.qConfig.appId]);
  return _react.default.createElement(QDoc.Provider, {
    value: qDocHandler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 45
    },
    __self: void 0
  }, props.children);
};