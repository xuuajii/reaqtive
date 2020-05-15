"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = require("../index");

var _jsxFileName = "/Users/paolo_d/Projects/React/reaqtive/packages/q/src/lib/components/q-share-capability-api.js";

/**
 * QShareCapabilityApi
 *
 * This component is needed when you wan to display in the same React app Qlik Visualizations taken from 2 or more Qlik Sense apps.
 * It wraps the Reaqtive component and provides the QCapabilityAPI context to the components downstream.
 * This work around is needed to avoid to download QCapabilityAPI and AngularJS more than once.
 */
const QShareCapabilityApi = props => _react.default.createElement(_index.QCapabilityApiProvider, {
  qConfig: props.qConfig,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 13
  },
  __self: void 0
}, props.children);

var _default = QShareCapabilityApi;
exports.default = _default;
QShareCapabilityApi.propTypes = {
  /**
   * qConfig is an object that provides reaqtive the params needed to connect to the Qlik server.
   * params are: host, port, secure, prefix. appId is not needed in this case since the only purpose of this component is to download Qlik Capability APIs and provide it downstream.
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
    prefix: _propTypes.default.string.isRequired
  }).isRequired
};