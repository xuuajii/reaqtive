const reaqtiveModules={
  name:'reaqtive',
  rootPath:'../../../..',
  packagesPath:'packages',
  text:`
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

\`\`\`
npm install @reaqtive/components
\`\`\`

## First Reaqtive App

Below you can find the code to create the simplest Reaqtive app. The app shows a dropdown menu to select from one field and one visualization provided by Qlik capability APIs.
The Reaqtive component handles the connection with the Qlik Sense server and it expects connections parameters to be provided in an object called qConfig.


___EXAMPLE___


If you want to use Reaqtive components and utilities follow the links below.

- Create your analytics web app with [@reaqtive/components](https://github.com/taan11/reaqtive/tree/master/packages/q)
- Connect your React app to Qlik with [@reaqtive/q](https://github.com/taan11/reaqtive/tree/master/packages/q)

### qConfig

It is the object used to provide Reaqtive the parameters to connect to Qlik APIs. The Reaqtive components which expect it as a prop, will handle the connection.
If you need to handle multiple environments you will need one qConfig object per environmet. You can save them in a file and use them as needed.
Below an example of one file with 2 environments:

\`\`\`javascript

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
\`\`\`

## How to use Reaqtive with create react app

To use Reaqtive with create-react-app you have to configure a proxy for the webpack development server in order to avoid CORS issues.
To do that you have to install http-proxy-middleware, create a file called setupProxy.js in the src folder of your app and paste the following lines of code in it. For further info follow this [link](#https://create-react-app.dev/docs/proxying-api-requests-in-development).
This is needed whether you want to connect to Qlik Sense Desktop or a remote Qlik Server.

___PROXY___

To connect to a remote Qlik server for developing in your machine you need to start webpack dev server in secure mode. To do that launch the server with the following command:
\`\`\`
HTTPS="true" npm start
\`\`\`

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


`,
  files:{
    example:`docs/src/examples/first-app.js`,
    proxy:`docs/src/setupProxy.js`,
  },
  packages:{
    q:{
      name:'@reaqtive/q',
      path:'q',
      sourcePath:'src/lib',
      examplePath:'../examples/q',
      intro:`# **@reaqtive/q**

This package provides a set of hooks, contexts and components to interact with the [Qlik Engine APIs](https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/EngineAPI/Content/introducing-engine-API.htm) and the [Qlik Capability APIs](https://help.qlik.com/en-US/sense-developer/June2018/Subsystems/EngineAPI/Content/introducing-engine-API.htm).
Its purpose is to simplify the interaction with the engine and provide a set of tested APIs to easily retrieve data and interfaces from the engine.
@reaqtive/q does not provide any layout components, it only allows you to interact with the Qlik engine. You can use it as a stand alone package and develop your layout components using its APIs, as described below.
Depending on your needs and you can install @reaqtive/components instead. It provides a set of ready to use layout components to build data visualization apps on top o Qlik APIs, and depends on @reaqtive/q.
`,
      usage:`
#### Installation
\`\`\`
npm install @reaqtive/q
\`\`\`
`,
      sections:[
        {
          title:'reaqtive',
          paths:['reaqtive.js'],
          docLib:'reactDocgen',
        },
        {
          title:'contexts',
          paths:['contexts/q-*.js'],
          docLib:'reactDocgen',
        },
        {
          title:'components',
          paths:['components/q-*.js'],
          docLib:'reactDocgen',
        },
        {
          title:'hooks',
          paths:['hooks/use-q*-reducer.js', 'hooks/use-q-viz-handler.js'],
          docLib:'jsDoc',
        }
      ]
    },
    components:{
      name:'@reaqtive/components',
      path:'components',
      sourcePath:'src/lib',
      examplePath:'../examples/components',
      intro:`# **@reaqtive/components**

This package helps creating guided analytics using Qlik APIs. It provides a set of reusable react components to speed up mash up developments.
You can choose to use stand alone components and build your own navigation and routing functionalities or you can use [RqtvApp](#rqtvapp) and [RqtvPage](#rqtvpage).

`,
      usage:`
#### Installation

\`\`\`
npm install @reaqtive/components
\`\`\`

[@reaqtive/q](https://github.com/taan11/reaqtive/tree/master/packages/q) will be installed as well, since @reaqtive/components depends on it. [@reaqtive/q](https://github.com/taan11/reaqtive/tree/master/packages/q)  will help you interact with Qlik engine and Qlik Capability APIs
`,
      sections:[
        {
          title:'filters',
          intro:'',
          paths:['filters/**/index.js', 'multibox/index.js'],
          docLib:'reactDocgen'
        },
        {
          title:'visualizations',
          intro:'',
          paths:['visualizations/q-viz.js', 'rqtv-viz-container/index.js'],
          docLib:'reactDocgen'
        },
        {
          title:'app objects',
          intro:'',
          paths:['current-selections/index.js', 'rqtv-search-object/index.js', 'rqtv-navbar/index.js', , 'side-menu/index.js'],
          docLib:'reactDocgen'
        },
        {
          title:'App',
          intro:'Components described in this section are supposed to work together: it is suggested to use RqtvApp if you want to use the other components describe here.',
          paths:['rqtv-app.js', 'pages/*.js'],
          docLib:'reactDocgen'
        },
        {
          title:'Styles',
          intro:`Styles are based on bootstrap classes and components.
In reaqtive components plain boostrap classes have been used and they are scoped using the name of the Reaqtive components they are used into. For example the wrapper div of a RqtvListbox has rqtv-listbox class, the RqtvSideMenu a rqtv-side-menu class.
You can customize the styles the components referring to these classes in your scss files.
Moreover you can customize Reaqtive theme by including a theme file and changing theme variables values. You can add your theme creating an index.scss file and a theme.scss file. Below an example.

*theme.scss*
\`\`\`sass
...
$primary: #5C88DA;
$side-menu-field-list-border-color:rgba(0,0,0,0);
$navbar-bg:#fff;
$navbar-color:$primary;
...
\`\`\`


*index.scss*
\`\`\`sass
// import files with this order otherwise Reaqtive theme will overwrite yours
@import "./styles/theme.scss";
@import "~@reaqtive/components/dist/index.scss";
...
\`\`\`

*index.js*
\`\`\`javascript
...
import './index.scss'
...
\`\`\`

You can find the complete list of Reaqtive theme variable [here](#https://github.com/taan11/reaqtive/blob/master/packages/components/src/lib/styles/theme.scss) and the complete list of Bootstrap variables [here](#https://github.com/twbs/bootstrap/blob/master/scss/_variables.scss)
`,
          paths:['styles/theme.scss'],
          docLib:'styles'
        }
      ]
    }
  }
}

module.exports=reaqtiveModules
