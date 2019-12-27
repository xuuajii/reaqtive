//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {QCapabilityApi, QCapabilityApiProvider} from './q-capability-api'

const QApp = React.createContext()

const QCapabilityApiConsumer = props => {
  const initialQAppHandler = {qApp:null, qError:null, qLoading:true}
  const [qAppHandler, setQAppHandler] = useState(initialQAppHandler)
  const qCapabilityApiHandler = useContext(QCapabilityApi)

  useEffect(()=>{
    if(qCapabilityApiHandler.qError)
    setQAppHandler({qApp:null, qError:qCapabilityApiHandler.qError, qLoading:false})

    if(qCapabilityApiHandler.qlik)
    {
      const qlik = qCapabilityApiHandler.qlik;
      const qConfig = {
        host:props.qConfig.host,
        port:props.qConfig.port,
        prefix:props.qConfig.prefix,
        isSecure:props.qConfig.secure
      }
      const qApp = qlik.openApp(props.qConfig.appId, qConfig)

      setQAppHandler({qApp:qApp, qError:false, qLoading:false})
    }
  }, [qCapabilityApiHandler,props.qConfig.host,props.qConfig.port,props.qConfig.prefix,props.qConfig.secure,props.qConfig.appId])
  return (
    <QApp.Provider value={qAppHandler}>
      {props.children}
    </QApp.Provider>
  )
}

const QAppProvider = (props) => {
  return (
    <QCapabilityApiProvider qConfig={props.qConfig}>
      <QCapabilityApiConsumer qConfig={props.qConfig}>
        {props.children}
      </QCapabilityApiConsumer>
    </QCapabilityApiProvider>
  )
}

export  {QApp, QAppProvider}
