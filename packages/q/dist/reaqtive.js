"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _index = require("./index");

var _layout = require("@reaqtive/layout");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "C:\\Users\\paolo_d\\Projects\\reaqtive\\packages\\q\\src\\lib\\reaqtive.js";

/**
 * Reaqtive is the main component of the library. It provides Reaqtive contexts to its child or children
 * Provided contexts are: QGlobal, QDoc, QCapabilityApis, QApp and System.
 *
 */
const Reaqtive = props => {
  const qConfig = props.qConfig,
        qCapabilityApiRequired = props.qCapabilityApiRequired,
        children = props.children,
        rqtvAppProps = (0, _objectWithoutProperties2.default)(props, ["qConfig", "qCapabilityApiRequired", "children"]);
  return _react.default.createElement(_layout.SystemProvider, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: void 0
  }, qCapabilityApiRequired === true ? _react.default.createElement(_index.QDocProvider, {
    qConfig: qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    },
    __self: void 0
  }, _react.default.createElement(_index.QAppProvider, {
    qConfig: qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: void 0
  }, props.children)) : _react.default.createElement(_index.QDocProvider, {
    qConfig: qConfig,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: void 0
  }, props.children));
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