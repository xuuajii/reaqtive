//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import {Section, Example} from '../components/index'
import {RqtvPageHeader} from '@reaqtive/components'

const SetUp = props =>
<>
  <Section title="1. install node js">
    <div className="card">
      <div className="card-body">
        <p>
          Download the current version of node js and npm from <a href="https://nodejs.org/">node official site </a>
          and follow the instructions to install it.
          <br></br>
          Reaqtive is developed using Node.js 8.12.0
          <br></br>
          If you are not familiar with Node.js and npm here you can find some useful links:
        </p>
        <ul className="link-list">
          <li className="">
            <a href="https://www.w3schools.com/nodejs/nodejs_npm.asp">
              w3 schools npm tutorial
            </a>
          </li>
          <li className="">
            <a href="https://www.youtube.com/watch?v=kQ1j0rEI7EI">
            npm video tutorial
            </a>
          </li>
          <li className="">
            <a href="https://www.npmjs.com/">
              npm official site
            </a>
          </li>
        </ul>
      </div>
    </div>
  </Section>
  <Section title="2. create react app">
    <Example codeString={`
      npx create-react-app my-new-app

      //this task can take a few minutes to complete

      cd my-new-app

      npm start
      `}>
        <div className="card-body">
          <p>
            Create a basic react app using Create React App utility. Open the command line client and run the commands above to install and lunch you app
            Create React App will create all the files needed to set up the boilerplate for developing a React app.
            All the source files (the one you will need to change) are created in my-new-app/src
            <br></br>
            If you are not familiar with React or Create React App (CRA) below you can find some useful resources:
          </p>
          <ul className="link-list">
            <li className="">
              <a href="https://reactjs.org/">
                official react docs
              </a>
            </li>
            <li className="">
              <a href="https://github.com/facebook/create-react-app">
              official create react app (CRA) docs
              </a>
            </li>
            <li className="">
              <a href="https://egghead.io/courses/the-beginner-s-guide-to-react">
                react tutorial
              </a>
            </li>
            <li className="">
              <a href="https://www.youtube.com/watch?v=6RhOzQciVwI&list=PL4cUxeGkcC9hNokByJilPg5g9m2APUePI">
                react context and hooks tutorial (reaqtive does not use class components)
              </a>
            </li>
          </ul>
        </div>
    </Example>
  </Section>
  <Section title="3. install reaqtive">
    <Example codeString="npm install __ADD_REAQTVIE_REPOSITORY_LOCATION__">
      <div className="card-body">
        <p>
          Type the above command in the command line and press enter to add Reaqtive to your application
        </p>
      </div>
    </Example>
  </Section>
  <Section title="4. Create the q-config file">
    <Example codeString={`
    const qConfig = {
      host: 'localhost',                // address of the server
      secure: false,                    // usually true for QS server
      port: 4848,                       // usually 443 for QS Server
      prefix: '',                       // the virtual proxy that will be called
      appId: 'my-qlik-sense-file.qvf'  // app-id in QS Server

    module.exports = qConfig
    `}>
      <div className="card-body">
        <p>
          To connect to Qlik Sense you have to provide Reaqtive an object containing the connection parameters.
          You can find an example of q-config file in the card above. This file can be used to connect to Qlik Sense desktop.
          The path to this file must be contined inside the src folder of your app.
        </p>
      </div>
    </Example>
  </Section>
  <Section title="5. Setup proxy">
    <Example codeString={`
      const proxy = require('http-proxy-middleware');
      const qConfig = require('./my-q-config-file-path');

      const protocol = \`http\${((qConfig.secure === true) ? 's' : '')}\`;
      const host = qConfig.host;
      const port = qConfig.port;

      console.log('Reaqtive will use this URL to connect to Qlik:', protocol+'://'+host+':'+port);

      module.exports = app => {
        app.use(['*/resources/*','*/extension/*','*/extensions/*','*/Exports/*','/api/*','*/sockjs-node/*'],
        proxy({
                target: \`\${protocol}://\${host}:$\{port}\`,
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
      `}>
      <div className="card-body">
        <p>
          When you launch your app locally the react app is served by a local server listening on port 3000, while qlik is listening on a different port (if you are using QS desktop) or on a differente machine.
          To avoid CORS issue  you need to all proxy all communication vs Qlik through port 3000. In this way the browser will trust Qlik server.
          To do that you simply ha to create a file called setupProxy.js in you src directory and paste the line of code shown above.
          The q-config file path used here is the one to the q-config file create in the previous step.
        </p>
      </div>
    </Example>
  </Section>
  <Section title="6. See your data">
    <Example codeString={`
      import React from 'react';
      import qConfig from 'my-q-config-file-path'
      import {Rqtv} from 'reaqtive'
      import {RqtvListbox} from 'reaqtive'

      const App = props =>{
        return(
          <Rqtv qConfig={qConfig} qCapabilityApiRequired={true}>
            {/*<ExampleApp />*/}
            <div className="container">
              <RqtvListbox qFieldExpr="Customer" height={300}/>
            </div>
          </Rqtv>
        )
      }

      export default App;
      `}>
    Now everything should be in place to start the development of a Reaqtive app.
    To see if everything works, replace the content of App.js file in src folder with the snippet above and run npm start if the server is not already running.
    </Example>
  </Section>
</>
export default SetUp
