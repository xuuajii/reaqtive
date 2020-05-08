//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React, {useContext} from 'react'
import {QGlobalProvider, QCapabilityApiProvider, QDocProvider, QAppProvider, QCapabilityApi } from './index'
import {SystemProvider} from '@reaqtive/layout'
import PropTypes from 'prop-types';

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
  if(!appId){
    return (props) =>
      <QGlobalProvider qConfig={props.qConfig}>
        {props.children}
      </QGlobalProvider>
  }
  if(appId && !qCapabilityApiRequired){
    return (props) =>
      <QGlobalProvider qConfig={props.qConfig}>
        <QDocProvider qConfig={props.qConfig}>
          {props.children}
        </QDocProvider>
      </QGlobalProvider>
  }
  if(appId && qCapabilityApiRequired && !qCapabilityApiShared){
    return (props) =>
    <QGlobalProvider qConfig={props.qConfig}>
      <QCapabilityApiProvider qConfig={props.qConfig}>
        <QDocProvider qConfig={props.qConfig}>
          <QAppProvider qConfig={props.qConfig}>
            {props.children}
          </QAppProvider>
        </QDocProvider>
      </QCapabilityApiProvider>
    </QGlobalProvider>
  }
  if(appId && qCapabilityApiRequired && qCapabilityApiShared){
    return (props) =>
    <QGlobalProvider qConfig={props.qConfig}>
      <QDocProvider qConfig={props.qConfig}>
        <QAppProvider qConfig={props.qConfig}>
          {props.children}
        </QAppProvider>
      </QDocProvider>
    </QGlobalProvider>
  }
}

const Reaqtive = props =>{
  const {qConfig, qCapabilityApiRequired, children, ...rqtvAppProps} = props
  const qCapabilityApiHandler = useContext(QCapabilityApi)
  const qCapabilityApiShared = qCapabilityApiHandler?true:false
  const contexts = getContexts(qConfig.appId, qCapabilityApiRequired, qCapabilityApiShared)

  return(
      <SystemProvider>
        {contexts(props)}
      </SystemProvider>
    )
}

Reaqtive.propTypes={
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

  /**
   * if true Reaqtive downloads capability APIs from Qlik server and provides the qlik object and the qApp to its children
   */
  qCapabilityApiRequired:PropTypes.bool
}

Reaqtive.defaultProps={
  qCapabilityApiRequired:true
}

export default Reaqtive
