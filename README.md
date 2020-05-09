
# **Reaqtive**

Reaqtive is a react library to help creating guided analytics for Qlik Sense, it allows you to easily interact with Qlik's Engine and capability APIs.
The goal of the library is to provide a framework to develop guided analytics applications on top of Qlik Sense/QAP apps. Apps developed with Reaqtive are inteded to satisfy the needs and improve the user experience of those users who do not need self service BI functionalities, but only need to access and navigate standardized visualizations.
Reaqtive aims to bring together the responsiveness and usability on mobile devices provided by Qlik Sense and the navigation functionalities provided by QlikView.
Reaqtive provides a library of ready to use [components](#https://github.com/taan11/reaqtive/tree/master/packages/components) and a set of [utilities](#https://github.com/taan11/reaqtive/tree/master/packages/q) to interact with Qlik APIs, you can decide to use both or only the utilities.

## Before starting
To use Reaqtive app you need to have node.js (https://nodejs.org/) already installed on your machine and it is recommended to install git (https://git-scm.com/downloads).
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
___EXAMPLE_FILE___
```

## qConfig

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

## Usage with create react app

To use Reaqtive with create-react-app you have to configure a proxy for the webpack development server in order to avoid CORS issues.
To do that you have to install http-proxy-middleware, create a file called setupProxy.js in the src folder of your app and paste the following lines of code in it. For further info follow this [link](#https://create-react-app.dev/docs/proxying-api-requests-in-development).
This is needed whether you want to connect to Qlik Sense Desktop or a remote Qlik Server.

___PROXY_FILE___

To connect to a remote Qlik server for developing in your machine you need to start webpack dev server in secure mode. To do that launch the server with the following command:
```
HTTPS="true" npm start
```

Here you [can](#https://create-react-app.dev/docs/using-https-in-development) find more info.

## Useful resources

- react tutorial (#)
- node.js tutorial (#)
- javascript tutorial (#)

## Thanks to

