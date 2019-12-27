//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const QGlobal = React.createContext()

const QGlobalProvider = (props) => {
  const initialQGlobalHandler = {qGlobal:null, qError:null, qLoading:true}
  const [qGlobalHandler, setQGlobalHandler] = useState(initialQGlobalHandler)

  useEffect(()=>{
    const connectToQEngine = () => {
      const url = SenseUtilities.buildUrl(props.qConfig);
      const session = enigma.create({ schema, url });
      return new Promise((resolve) => {
        resolve(session.open());
      });
    }
    connectToQEngine()
    .then(qGlobal=>{setQGlobalHandler({qError:null, qLoading:false, qGlobal:qGlobal})})
    .catch(qError=>setQGlobalHandler({qGlobal:null, qLoading:false, qError:{...qError, rqtvMessage:'error loading qGlobal'}}))
  }, [props.qConfig])
  return (
    <QGlobal.Provider value={qGlobalHandler}>
      {props.children}
    </QGlobal.Provider>
  )
}

export  {QGlobal, QGlobalProvider}
