"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QAppProvider = exports.QApp = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _qCapabilityApi = require("./q-capability-api");

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\q\\src\\lib\\contexts\\q-app.js";

const QApp = _react.default.createContext();

exports.QApp = QApp;

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
        prefix: props.qConfig.prefix,
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
      lineNumber: 35
    },
    __self: void 0
  }, props.children);
};

const QAppProvider = props => {
  return _react.default.createElement(_qCapabilityApi.QCapabilityApiProvider, {
    qConfig: props.qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: void 0
  }, _react.default.createElement(QCapabilityApiConsumer, {
    qConfig: props.qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: void 0
  }, props.children));
};

exports.QAppProvider = QAppProvider;