//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {QGlobal, QGlobalProvider} from './q-global'

const QDoc = React.createContext()

const QGlobalConsumer = props => {
  const initialQDocHandler = {qDoc:null, qError:null, qLoading:true}
  const [qDocHandler, setQDocHandler] = useState(initialQDocHandler)
  const qGlobalHandler = useContext(QGlobal)
  useEffect(()=>{
    if(qGlobalHandler.qError)
    setQDocHandler({qDoc:null, qError:qGlobalHandler.qError, qLoading:false})

    if(qGlobalHandler.qGlobal)
    qGlobalHandler.qGlobal.openDoc(props.qConfig.appId)
    .then(qDoc=>setQDocHandler({qDoc:qDoc, qError:false, qLoading:false}))
    .catch(qError=>setQDocHandler({qDoc:null, qError:{...qError, rqtvMessage:'error loading qDoc'}, qLoading:false}))
  }, [qGlobalHandler,props.qConfig.appId])
  return (
    <QDoc.Provider value={qDocHandler}>
      {props.children}
    </QDoc.Provider>
  )
}

const QDocProvider = (props) => {
  return (
    <QGlobalProvider qConfig={props.qConfig}>
      <QGlobalConsumer qConfig={props.qConfig}>
        {props.children}
      </QGlobalConsumer>
    </QGlobalProvider>
  )
}

export  {QDoc, QDocProvider}
