import React from 'react'
import PropTypes from 'prop-types'
import {QCapabilityApiProvider} from '../index'

const QShareCapabilityApi = props =>
  <QCapabilityApiProvider qConfig={props.qConfig}>
    {props.children}
  </QCapabilityApiProvider>

  export default QShareCapabilityApi

  QShareCapabilityApi.propTypes = {
    /**
     * qConfig is an object that provides reaqtive the params needed to connect to the Qlik server.
     * params are: host, port, secure, prefix, appId: the id of the app reaqtive should connect to
     */
    qConfig:PropTypes.shape({
      /**
       * host: the ip address or domain of the Qlik SystemProvider
       */
      host: PropTypes.string.isRequired,
      /**
       * port: the port on which Qlik server is listening
       */
      port: PropTypes.number.isRequired,
      /**
       * secure: true if the Qlik server uses https, false otherwise
       */
      secure: PropTypes.bool.isRequired,
      /**
       * prefix: Qlik's virtual proxy path
       */
      prefix: PropTypes.string.isRequired,
      /**
       * appId: the id of the app reaqtive should connect to
       */
      appId:PropTypes.string.isRequired
    }).isRequired,
  }
