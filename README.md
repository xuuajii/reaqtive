
# **Reaqtive**

Reaqtive is a react library to help creating guided analytics for Qlik Sense, it allows you to easily interact with Qlik's Engine and capability APIs.
The goal of the library is to provide a framework to develop guided analytics applications on top of Qlik Sense/QAP apps. Apps developed with Reaqtive are inteded to satisfy the needs and improve the user experience of those users who do not need self service BI functionalities, but only need to access and navigate standardized visualizations.
Reaqtive aims to bring together the responsiveness and usability on mobile devices provided by Qlik Sense and the navigation functionalities provided by QlikView.
Reaqtive provides a library of ready to use [components](https://github.com/taan11/reaqtive/tree/master/packages/components) and a set of [utilities](https://github.com/taan11/reaqtive/tree/master/packages/q) to interact with Qlik APIs, you can decide to use both or only the utilities.

## Thanks to
![Eng Logo](/logo-eng.png)
Developments are sponsored by [Engineering Ingegneria Informatica](https://www.eng.it/).


## Philosophy
Everything is opt-in: Reaqtive provides a set of tools and developers can pick only what they need.
There 4 ways to use Reaqtive:
1. The most basic usage would be to wrap your React app or component with a Reaqtive tag: Reaqtive will provide the connections to the Qlik APIs and it will be up to you to get data and visualizations.
2. You can use hooks and components provided by [@reaqtive/q](https://github.com/taan11/reaqtive/tree/master/packages/q)
3. You can add components and visualizations provided by @reaqtive/components [components](https://github.com/taan11/reaqtive/tree/master/packages/components)
4. You can add routing and navigation by [RqtvApp] (https://github.com/taan11/reaqtive/tree/master/packages/components#app)


## Before starting
To use Reaqtive app you need to have [node.js](https://nodejs.org/) already installed on your machine and it is recommended to install git (https://git-scm.com/downloads).
To use Reaqtive and the follow this brief guide, you should be familiar with React, npm, Bootstrap and the javascript ecosystem in general.
If you are not you can find useful info and tutorials at the [bottom of the page](#useful-resources).

## Installation

```
npm install @reaqtive/components
```

## First Reaqtive App

Below you can find the code to create the simplest Reaqtive app. The app shows a dropdown menu to select from one field and one visualization provided by Qlik capability APIs.
The Reaqtive component handles the connection with the Qlik Sense server and it expects connections parameters to be provided in an object called qConfig.



```javascript
import React from 'react'
import Reaqtive  from '@reaqtive/q'
import {RqtvDropdownFilter, QViz, RqtvVizContainer} from '@reaqtive/components'

const qConfig = {                                 //For QS Desktop
    host: 'YOUR HOST ADDRESS',                        //localhost
    secure: true,                                 //false
    port: 443,                                    //4848
    prefix: '',                                   //''
    appId: '8aa3a035-0689-4aab-a920-d6722509ed51' //your app file name (e.g. 'Executive dashboard.qvf')
};

const FirstApp = props =>
<div className='container'>
  <Reaqtive
    qConfig={qConfig}
  >
    <RqtvDropdownFilter
      qFieldExpr="Customer"
      dropdownMenuItemStyle={{textTransform:'uppercase'}}
    />
    <QViz
      id="Revenue By SubGroup"
      title="Revenue By SubGroup"
      chartProps={{
        chartType:'barchart',
        rest: {
          qHyperCubeDef:{
            qDimensions:[{
              "qDef":{
                "qFieldDefs": ["[Product Subgroup Desc]"],
                 "qFieldLabels": ["Product Subgroup Desc"],
                 //"qSortCriterias":[{qSort:1}],
                 "qReverseSort":true
               }
             }],
            qMeasures:[{
              "qDef":{
                "qDef":"Sum([Sales Quantity]*[Sales Price])",
                "qLabel":"Revenue"
              }
            }]
          },
          "showTitles": false,
          "title": "Revenue",
          "barGrouping":{grouping:"stacked"},
          "orientation":'horizontal'
        }
      }}
      height={500}
    />
  </Reaqtive>
</div>
export default FirstApp

```



If you want to use Reaqtive components and utilities follow the links below.

- Create your analytics web app with [@reaqtive/components](https://github.com/taan11/reaqtive/tree/master/packages/q)
- Connect your React app to Qlik with [@reaqtive/q](https://github.com/taan11/reaqtive/tree/master/packages/q)

### qConfig

It is the object used to provide Reaqtive the parameters to connect to Qlik APIs. The Reaqtive components which expect it as a prop, will handle the connection.
If you need to handle multiple environments you will need one qConfig object per environmet. You can save them in a file and use them as needed.
Below an example of one file with 2 environments:

```javascript

const qEnvironments = {
  "DESKTOP": {
    host: 'localhost',
    secure: false,
    port: 4848,
    prefix: '',
    appId: 'Executive Dashboard.qvf'
  }
  "SERVER":{
    host: 'MY_QLIK_SERVER_HOST',
    secure: true,
    port: 443,
    prefix: 'MY_QLIK_SERVER_PREFIX',
    appId: 'MY_QLIK_APP_ID'
  }
}

const qConfig = qEnvironments['DESKTOP'];//or qEnvironments['SERVER']

module.exports = module.exports = qConfig.default || qConfig;
```

## How to use Reaqtive with create react app

To use Reaqtive with create-react-app you have to configure a proxy for the webpack development server in order to avoid CORS issues.
To do that you have to install http-proxy-middleware, create a file called setupProxy.js in the src folder of your app and paste the following lines of code in it. For further info follow this [link](#https://create-react-app.dev/docs/proxying-api-requests-in-development).
This is needed whether you want to connect to Qlik Sense Desktop or a remote Qlik Server.


```javascript
//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

//const proxy = require('http-proxy-middleware');
const { createProxyMiddleware } = require('http-proxy-middleware');
const qConfig = require('./q-config');
//console.log(qConfig)
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

```


To connect to a remote Qlik server for developing in your machine you need to start webpack dev server in secure mode. To do that launch the server with the following command:
```
HTTPS="true" npm start
```

[Here](#https://create-react-app.dev/docs/using-https-in-development) you can find more info about using a proxy with CRA.

## Useful resources

Below you can find the links to the official sites of the technologies used to develop Reaqtive.

- [React](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Bootstrap](https://getbootstrap.com/)
- [npm](https://www.npmjs.com/)
- [Create React App](https://create-react-app.dev/)
- [node.js](https://nodejs.org)
- [React Spring](https://www.react-spring.io/)

Below a list of links to tutorials you can watch to get started with the technologies mentioned above:

- [React tutorial](https://www.youtube.com/watch?v=6RhOzQciVwI&list=PL4cUxeGkcC9hNokByJilPg5g9m2APUePI)
- [Bootstrap tutorial](https://www.youtube.com/watch?v=QAgrHLtG1Yk&list=PL4cUxeGkcC9jE_cGvLLC60C_PeF_24pvv)
- [Sass tutorial](https://www.youtube.com/watch?v=St5B7hnMLjg&list=PL4cUxeGkcC9iEwigam3gTjU_7IA3W2WZA)
- [npm tutorial](https://www.youtube.com/watch?v=kQ1j0rEI7EI&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp&index=20)


