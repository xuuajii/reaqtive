//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React from 'react'
import {QDocProvider, QAppProvider } from './index'
import {SystemProvider} from '@reaqtive/layout'
import PropTypes from 'prop-types';

/**
 * Reaqtive is the main component of the library. It provides Reaqtive contexts to its child or children
 * Provided contexts are: QGlobal, QDoc, QCapabilityApis, QApp and System.
 *
 */
const Reaqtive = props =>{
  const {qConfig, qCapabilityApiRequired, children, ...rqtvAppProps} = props
  return(
    <SystemProvider>
      {qCapabilityApiRequired===true
        ?<QDocProvider qConfig={qConfig}>
          <QAppProvider qConfig={qConfig}>
            {props.children}
          </QAppProvider>
        </QDocProvider>
        :<QDocProvider qConfig={qConfig}>
            {props.children}
        </QDocProvider>
      }
    </SystemProvider>
  )
}

Reaqtive.propTypes={
  /**
 * qConfig is an object that provides reaqtive the params needed to connect to the Qlik server.
 * params area:
 * host: the ip address or domain of the Qlik SystemProvider
 * port: the port on which Qlik server is listening
 * secure: true if the Qlik server uses https, false otherwise
 * prefix: Qlik's virtual proxy path
 * appId: the id of the app reaqtive should connect to
 */
  qConfig:PropTypes.shape({
    host: PropTypes.string,
    port: PropTypes.number,
    secure: PropTypes.bool,
    port: PropTypes.number,
    appId:PropTypes.string
  }).isRequired,

  /**
 * if true Reaqtive downloads capability APIs from Qlik server and provides the qlik object and the qApp to its children
 */
  qCapabilityApiRequired:PropTypes.bool
}

Reaqtive.defaultProps={
  qCapabilityApiRequired:true
}

export default Reaqtive
