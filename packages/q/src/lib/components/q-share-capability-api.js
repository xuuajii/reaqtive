import React from 'react'
import {QCapabilityApiProvider} from '../index'

const QShareCapabilityApi = props =>
  <QCapabilityApiProvider qConfig={props.qConfig}>
    {props.children}
  </QCapabilityApiProvider>

  export default QShareCapabilityApi
