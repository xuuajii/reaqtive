"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QCapabilityApiProvider = exports.QCapabilityApi = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _qConfigHelpers = _interopRequireDefault(require("./helpers/q-config-helpers"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\q\\src\\lib\\contexts\\q-capability-api.js";

const QCapabilityApi = _react.default.createContext(null);

exports.QCapabilityApi = QCapabilityApi;

const QCapabilityApiProvider = props => {
  const qConfigForProxy = _qConfigHelpers.default.useProxy(props.qConfig);

  const requireJSUrl = _qConfigHelpers.default.createSenseURL(qConfigForProxy, 'requireJS');

  const baseUrl = _qConfigHelpers.default.createSenseURL(qConfigForProxy, 'baseUrl');

  const qlikJSUrl = _qConfigHelpers.default.createSenseURL(qConfigForProxy, 'qlikJS');

  const qlikCSSUrl = _qConfigHelpers.default.createSenseURL(qConfigForProxy, 'qlikCSS');

  const loadQlikCSS = qlikCSSUrl => {
    const qlikCSS = document.createElement('link'); //console.log(qlikCSSUrl);

    qlikCSS.href = qlikCSSUrl;
    qlikCSS.type = 'text/css';
    qlikCSS.rel = 'stylesheet';
    document.head.appendChild(qlikCSS);
    return new Promise(resolve => {
      qlikCSS.onload = () => resolve(qlikCSSUrl); //qlikCSS.onerror = () => reject(qlikCSSURL);

    });
  };

  const loadRequireJS = requireJSUrl => {
    const qRequireJS = document.createElement('script');
    document.head.appendChild(qRequireJS);
    qRequireJS.src = requireJSUrl;
    qRequireJS.async = true;
    return new Promise(resolve => {
      qRequireJS.onload = () => resolve(requireJSUrl); //qRequireJS.onerror = () => reject(qRequireJSURL);

    });
  };

  const loadCapabilityAPI = (baseURL, qlikJSURL) => {
    window.require.config({
      baseUrl: baseURL,
      paths: {
        qlik: qlikJSURL
      }
    });

    return new Promise(resolve => {
      window.require(['js/qlik'], qlik => {
        //   let qConfigCapability = (this.state==='localhost')?qConfigForProxy:props.qConfig;
        //   //const qApp = qlik.openApp(this.state.appId, {"host":this.state.host, "prefix":this.state.prefix, "port":this.state.port, "isSecure":this.state.secure});
        //   const qApp = qlik.openApp(
        //     qConfigCapability.appId,
        //     {
        //       "host":qConfigCapability.host,
        //       "prefix":qConfigCapability.prefix,
        //       "port":qConfigCapability.port,
        //       "isSecure":qConfigCapability.secure
        //     }
        //   );
        //   qlik.setOnError( function ( error ) {
        //  	console.log(error);
        // });
        //console.log(qApp)
        resolve(qlik);
      });
    });
  };

  const _useState = (0, _react.useState)({
    qLoadingRequireJS: true,
    qLoadingQlikJS: true,
    qError: false,
    qlik: null
  }),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        qCapabilityApiHandler = _useState2[0],
        setQCapabilityApiHandler = _useState2[1];

  const _useState3 = (0, _react.useState)({
    qLoadingCss: true,
    qError: false
  }),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        qCssHandler = _useState4[0],
        setQCssHandler = _useState4[1];

  (0, _react.useEffect)(() => {
    //load qlik Sense CSS
    loadQlikCSS(qlikCSSUrl).then(setQCssHandler({
      qLoadingCss: false,
      qError: false
    })).catch(qError => setQCssHandler({
      qLoadingCss: false,
      qError: (0, _objectSpread2.default)({}, qError, {
        rqtvMessage: 'error loading capability apis qlik css'
      })
    })); //load requireJS and then qlik capability APIS

    loadRequireJS(requireJSUrl).then(require => loadCapabilityAPI(baseUrl, qlikJSUrl).then(qlik => setQCapabilityApiHandler((0, _objectSpread2.default)({}, qCapabilityApiHandler, {
      qLoadingQlikJS: false,
      qLoadingRequireJS: false,
      qlik: qlik
    }))).catch(qError => setQCapabilityApiHandler((0, _objectSpread2.default)({}, qCapabilityApiHandler, {
      qLoadingQlikJS: false,
      qLoadingRequireJS: false,
      qError: (0, _objectSpread2.default)({}, qError, {
        rqtvMessage: 'error loading capability apis qlikJS'
      })
    })))).catch(qError => setQCapabilityApiHandler((0, _objectSpread2.default)({}, qCapabilityApiHandler, {
      qLoadingRequireJS: false,
      qError: (0, _objectSpread2.default)({}, qError, {
        rqtvMessage: 'error loading capability apis requireJS'
      })
    })));
  }, [props.qConfig]);
  return _react.default.createElement(QCapabilityApi.Provider, {
    value: (0, _objectSpread2.default)({}, qCapabilityApiHandler, qCssHandler),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: void 0
  }, props.children);
};

exports.QCapabilityApiProvider = QCapabilityApiProvider;