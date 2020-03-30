"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QAppProvider = exports.QApp = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _qCapabilityApi = require("./q-capability-api");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "C:\\Users\\PDEREGIB\\Technology_Projects\\react\\reaqtive\\packages\\q\\src\\lib\\contexts\\q-app.js";

const QApp = _react.default.createContext();
/**
 * QApp
 * This context provides a handler for the application (qApp) object provided by Qlik Capability APIs.
 * The handler is an object with 3 props:
 * qLoading: initially true, it is set to false when the promise to get the qApp is resolved
 * qApp: the app provided by the qlik Capability APIs. It is initially null and it is set when the promis is resolved
 * qError: initially null it is set to true if the promise to get the qApp returns an error
 */


exports.QApp = QApp;

const QAppProvider = props => {
  return _react.default.createElement(_qCapabilityApi.QCapabilityApiProvider, {
    qConfig: props.qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: void 0
  }, _react.default.createElement(QCapabilityApiConsumer, {
    qConfig: props.qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: void 0
  }, props.children));
};

exports.QAppProvider = QAppProvider;

const QCapabilityApiConsumer = props => {
  const initialQAppHandler = {
    qApp: null,
    qError: null,
    qLoading: true
  };

  const _useState = (0, _react.useState)(initialQAppHandler),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qAppHandler = _useState2[0],
        setQAppHandler = _useState2[1];

  const qCapabilityApiHandler = (0, _react.useContext)(_qCapabilityApi.QCapabilityApi);
  (0, _react.useEffect)(() => {
    if (qCapabilityApiHandler.qError) setQAppHandler({
      qApp: null,
      qError: qCapabilityApiHandler.qError,
      qLoading: false
    });

    if (qCapabilityApiHandler.qlik) {
      const qlik = qCapabilityApiHandler.qlik;
      const qConfig = {
        host: props.qConfig.host,
        port: props.qConfig.port,
        prefix: props.qConfig.prefix !== '' ? "/".concat(props.qConfig.prefix, "/") : '/',
        //props.qConfig.prefix==='' && props.qConfig.port!=='4848'?'/':props.qConfig.prefix,
        isSecure: props.qConfig.secure
      };
      const qApp = qlik.openApp(props.qConfig.appId, qConfig);
      setQAppHandler({
        qApp: qApp,
        qError: false,
        qLoading: false
      });
    }
  }, [qCapabilityApiHandler, props.qConfig.host, props.qConfig.port, props.qConfig.prefix, props.qConfig.secure, props.qConfig.appId]);
  return _react.default.createElement(QApp.Provider, {
    value: qAppHandler,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: void 0
  }, props.children);
};