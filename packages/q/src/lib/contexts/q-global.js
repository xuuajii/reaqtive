import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.20.0.json');
const SenseUtilities = require('enigma.js/sense-utilities');

const MAX_RETRIES = 3;
const responseInterceptors = [{
  // We only want to handle failed responses from QIX Engine:
  onRejected: function retryAbortedError(sessionReference, request, error) {
    // We only want to handle aborted QIX errors:
    if (error.code === schema.enums.LocalizedErrorCode.LOCERR_GENERIC_ABORTED) {
      // We keep track of how many consecutive times we have tried to do this call:
      request.tries = (request.tries || 0) + 1;
      // We do not want to get stuck in an infinite loop here if something has gone
      // awry, so we only retry until we have reached MAX_RETRIES:
      if (request.tries <= MAX_RETRIES) {
        return request.retry();
      }
    }
    // If it was not an aborted QIX call, or if we reached MAX_RETRIES, we let the error
    // trickle down to potential other interceptors, and finally down to resolving/rejecting
    // the initial promise that the user got when invoking the QIX method:
    return this.Promise.reject(error);
  },
}];

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
      const session = enigma.create({ schema, url, responseInterceptors });
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
