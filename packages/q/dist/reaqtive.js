"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _index = require("./index");

var _layout = require("@reaqtive/layout");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/q/src/lib/reaqtive.js";

/**
 * Reaqtive is the main component of the library. It provides Reaqtive contexts to its child or children.</br>
 * Provided contexts are:
 *- [QGlobal](#qglobal) </br>
 *- [QDoc](#qdoc) </br>
 *- [QCapabilityApi](#qcapabilityapi) </br>
 *- [QApp](#qapp) </br>
 *
 */
const getContexts = (appId, qCapabilityApiRequired, qCapabilityApiShared) => {
  if (!appId) {
    return props => _react.default.createElement(_index.QGlobalProvider, {
      qConfig: props.qConfig,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: void 0
    }, props.children);
  }

  if (appId && !qCapabilityApiRequired) {
    return props => _react.default.createElement(_index.QGlobalProvider, {
      qConfig: props.qConfig,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: void 0
    }, _react.default.createElement(_index.QDocProvider, {
      qConfig: props.qConfig,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: void 0
    }, props.children));
  }

  if (appId && qCapabilityApiRequired && !qCapabilityApiShared) {
    return props => _react.default.createElement(_index.QGlobalProvider, {
      qConfig: props.qConfig,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: void 0
    }, _react.default.createElement(_index.QCapabilityApiProvider, {
      qConfig: props.qConfig,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      },
      __self: void 0
    }, _react.default.createElement(_index.QDocProvider, {
      qConfig: props.qConfig,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: void 0
    }, _react.default.createElement(_index.QAppProvider, {
      qConfig: props.qConfig,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: void 0
    }, props.children))));
  }

  if (appId && qCapabilityApiRequired && qCapabilityApiShared) {
    return props => _react.default.createElement(_index.QGlobalProvider, {
      qConfig: props.qConfig,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 48
      },
      __self: void 0
    }, _react.default.createElement(_index.QDocProvider, {
      qConfig: props.qConfig,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      },
      __self: void 0
    }, _react.default.createElement(_index.QAppProvider, {
      qConfig: props.qConfig,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: void 0
    }, props.children)));
  }
};

const Reaqtive = props => {
  const qConfig = props.qConfig,
        qCapabilityApiRequired = props.qCapabilityApiRequired,
        children = props.children,
        rqtvAppProps = (0, _objectWithoutProperties2.default)(props, ["qConfig", "qCapabilityApiRequired", "children"]);
  const qCapabilityApiHandler = (0, _react.useContext)(_index.QCapabilityApi);
  const qCapabilityApiShared = qCapabilityApiHandler ? true : false;
  const contexts = getContexts(qConfig.appId, qCapabilityApiRequired, qCapabilityApiShared);
  return _react.default.createElement(_layout.SystemProvider, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: void 0
  }, contexts(props));
};

Reaqtive.propTypes = {
  /**
   * qConfig is an object that provides reaqtive the params needed to connect to the Qlik server.
   * params are: host, port, secure, prefix, appId: the id of the app reaqtive should connect to
   */
  qConfig: _propTypes.default.shape({
    /**
     * host: the ip address or domain of the Qlik SystemProvider
     */
    host: _propTypes.default.string.isRequired,

    /**
     * port: the port on which Qlik server is listening
     */
    port: _propTypes.default.number.isRequired,

    /**
     * secure: true if the Qlik server uses https, false otherwise
     */
    secure: _propTypes.default.bool.isRequired,

    /**
     * prefix: Qlik's virtual proxy path
     */
    prefix: _propTypes.default.string.isRequired,

    /**
     * appId: the id of the app reaqtive should connect to
     */
    appId: _propTypes.default.string.isRequired
  }).isRequired,

  /**
   * if true Reaqtive downloads capability APIs from Qlik server and provides the qlik object and the qApp to its children
   */
  qCapabilityApiRequired: _propTypes.default.bool
};
Reaqtive.defaultProps = {
  qCapabilityApiRequired: true
};
var _default = Reaqtive;
exports.default = _default;