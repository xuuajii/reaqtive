//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect} from 'react'
import qConfigHelpers from './helpers/q-config-helpers'

const QCapabilityApi = React.createContext(null)

const QCapabilityApiProvider = props => {
  const qConfigForProxy = qConfigHelpers.useProxy(props.qConfig)
  const requireJSUrl = qConfigHelpers.createSenseURL(qConfigForProxy, 'requireJS')
  const baseUrl = qConfigHelpers.createSenseURL(qConfigForProxy, 'baseUrl')
  const qlikJSUrl = qConfigHelpers.createSenseURL(qConfigForProxy, 'qlikJS')
  const qlikCSSUrl = qConfigHelpers.createSenseURL(qConfigForProxy, 'qlikCSS')

  const loadQlikCSS = (qlikCSSUrl) => {
    const qlikCSS = document.createElement('link');
    //console.log(qlikCSSUrl);
    qlikCSS.href = qlikCSSUrl;
    qlikCSS.type = 'text/css';
    qlikCSS.rel = 'stylesheet';
    document.head.appendChild(qlikCSS);
    return new Promise((resolve) => {
      qlikCSS.onload = () => resolve(qlikCSSUrl);
      //qlikCSS.onerror = () => reject(qlikCSSURL);
    });
  }

  const loadRequireJS = (requireJSUrl) => {
    const qRequireJS = document.createElement('script');
    document.head.appendChild(qRequireJS);
    qRequireJS.src = requireJSUrl;
    qRequireJS.async = true;
    return new Promise((resolve) => {
      qRequireJS.onload = () => resolve(requireJSUrl);
      //qRequireJS.onerror = () => reject(qRequireJSURL);
    });
  }

  const loadCapabilityAPI = (baseURL, qlikJSURL) => {
        window.require.config({baseUrl: baseURL, paths: { qlik: qlikJSURL}});
        return new Promise((resolve) => {
            window.require(['js/qlik'], (qlik) => {
            //   let qConfigCapability = (this.state==='localhost')?qConfigForProxy:props.qConfig;
            //   //const qApp = qlik.openApp(this.state.appId, {"host":this.state.host, "prefix":this.state.prefix, "port":this.state.port, "isSecure":this.state.secure});
            //   const qApp = qlik.openApp(
            //     qConfigCapability.appId,
            //     {
            //       "host":qConfigCapability.host,
            //       "prefix":qConfigCapability.prefix,
            //       "port":qConfigCapability.port,
            //       "isSecure":qConfigCapability.secure
            //     }
            //   );
            //   qlik.setOnError( function ( error ) {
          	//  	console.log(error);
          	// });
            //console.log(qApp)
            resolve(qlik);
           });
         });
      }

  const [qCapabilityApiHandler, setQCapabilityApiHandler] = useState({qLoadingRequireJS:true, qLoadingQlikJS:true, qError:false, qlik:null})
  const [qCssHandler, setQCssHandler] = useState({qLoadingCss:true, qError:false})
  useEffect(()=>{
    //load qlik Sense CSS
    loadQlikCSS(qlikCSSUrl)
    .then(setQCssHandler({qLoadingCss:false, qError:false}))
    .catch(qError=>setQCssHandler({qLoadingCss:false, qError:{...qError, rqtvMessage:'error loading capability apis qlik css'}}))

    //load requireJS and then qlik capability APIS
    loadRequireJS(requireJSUrl)
    .then(require=>loadCapabilityAPI(baseUrl,qlikJSUrl)
      .then(qlik=>setQCapabilityApiHandler({...qCapabilityApiHandler, qLoadingQlikJS:false, qLoadingRequireJS:false, qlik:qlik}))
      .catch(qError=>setQCapabilityApiHandler({...qCapabilityApiHandler, qLoadingQlikJS:false, qLoadingRequireJS:false, qError:{...qError, rqtvMessage:'error loading capability apis qlikJS'}}))
    )
    .catch(qError=>setQCapabilityApiHandler({...qCapabilityApiHandler, qLoadingRequireJS:false, qError:{...qError, rqtvMessage:'error loading capability apis requireJS'}}))

  },[props.qConfig])
  return(
    <QCapabilityApi.Provider value={{...qCapabilityApiHandler, ...qCssHandler}}>
      {props.children}
    </QCapabilityApi.Provider>
  )
}

export {QCapabilityApi, QCapabilityApiProvider}
