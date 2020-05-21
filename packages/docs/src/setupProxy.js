/**
 * This code configure a proxy to solve CORS issues while developing on your local machine and connecting to Qlik APIs.
 * It must be placed in 'src/setupProxy.js'
 */

const { createProxyMiddleware } = require('http-proxy-middleware');
const qConfig = require('./q-config');

const protocol = `http${((qConfig.secure === true) ? 's' : '')}`;
const host = qConfig.host;
const port = qConfig.port;

console.log('***************************************************************');
console.log('Reaqtive will use this URL to connect to Qlik:', protocol+'://'+host+':'+port);
console.log('***************************************************************');

module.exports = app => {
  app.use(['*/resources/*','*/extension/*','*/extensions/*','*/Exports/*','/api/*','*/sockjs-node/*'],
  createProxyMiddleware({
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
