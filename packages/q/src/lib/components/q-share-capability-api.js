import React from 'react'
import PropTypes from 'prop-types'
import {QCapabilityApiProvider} from '../index'

/**
 * QShareCapabilityApi
 *
 * This component is needed when you wan to display in the same app Qlik Visualizations taken from 2 or more apps.
 * It wraps the Reaqtive component and provides the QCapabilityAPI context to the components downstream.
 * This work around is needed to avoid to download QCapabilityAPI and AngularJS more than once.
 */
const QShareCapabilityApi = props =>
  <QCapabilityApiProvider qConfig={props.qConfig}>
    {props.children}
  </QCapabilityApiProvider>

  export default QShareCapabilityApi

  QShareCapabilityApi.propTypes = {
    /**
     * qConfig is an object that provides reaqtive the params needed to connect to the Qlik server.
     * params are: host, port, secure, prefix. appId is not needed in this case since the only purpose of this component is to download Qlik Capability APIs and provide it downstream.
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
    }).isRequired,
  }
