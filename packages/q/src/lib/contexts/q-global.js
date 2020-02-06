//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const QGlobal = React.createContext()
/**
 * QGlobal
 * This context provides a handler for the qGlobal provided by Qlik engine Api.
 * The handler is an object with 3 props:
 * qGlobal: the actual qGlobal provided by the qEngine. It is initially null and it is set when the promis is resolved
 * qError: initially null it is set to true if the promise for the qGlobal returns an error
 * qLoading: initially true, it is set to false when the promise to get the qGlobal is resolved
 * https://help.qlik.com/en-US/sense-developer/February2019/APIs/EngineAPI/index.html
 */
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
