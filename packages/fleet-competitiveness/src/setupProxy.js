//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

const proxy = require('http-proxy-middleware');
const qConfig = require('./q-config');
//console.log(qConfig)
const protocol = `http${((qConfig.secure === true) ? 's' : '')}`;
const host = qConfig.host;
const port = qConfig.port;

console.log('Reaqtive will use this URL to connect to Qlik:', protocol+'://'+host+':'+port);

module.exports = app => {
  app.use(['*/resources/*','*/extension/*','*/extensions/*','*/Exports/*','/api/*','*/sockjs-node/*'],
  proxy({
          target: `${protocol}://${host}:${port}`,//'http://localhost:4848',//
          ws: true,
          wss: true,
          changeOrigin: true,
          secure: false,
          onProxyRes: function onProxyRes(proxyRes, req, res) {
                  proxyRes.headers['Access-Control-Allow-Origin'] = '*';
                  proxyRes.headers['Access-Control-Allow-Credentials']= true;    // add new header to response
        }
    })
  );
};
