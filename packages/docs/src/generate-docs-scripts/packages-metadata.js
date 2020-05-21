const gitSite = 'https://github.com/xuuajii/reaqtive/tree/master'
const reaqtiveModules={
  name:'reaqtive',
  gitSite:gitSite,
  rootPath:'../../../..',
  packagesPath:'packages',
  text:`
# **Reaqtive**

Reaqtive is a react library to help creating guided analytics for Qlik Sense, it allows you to easily interact with Qlik's Engine and Capability APIs.
The goal of the library is to provide a framework to develop guided analytics applications on top of Qlik Sense/QAP apps.
Apps developed with Reaqtive are inteded improve experience of those users who do not need self service BI functionalities, but only need to navigate predefined visualizations.
Reaqtive aims to bring together the responsiveness and usability on mobile devices provided by Qlik Sense with the navigation functionalities provided by QlikView.
All the examples are made using the \`\`\\Executive Dasboard.qvf\`\`\` which included in this repository.
If you already tried Reaqtive and you are having troubles with Reaqtive check the [FAQ](#faq) section or raise an issue.


## Thanks to

Reaqtive is sponsored by [Engineering Ingegneria Informatica](https://www.eng.it/).


## Usage
Everything is opt-in: Reaqtive provides a set of tools and developers can pick only what they need.
There 4 ways to use Reaqtive:
1. The most basic usage would be to wrap your React app or component with a Reaqtive tag: Reaqtive will provide the connections to the Qlik APIs and it will be up to you to get data and visualizations.
2. You can use hooks and components included in [@reaqtive/q](${gitSite}/packages/q), which are ready to use interfaces to interact with the QIX Engine
3. You can add layout components and visualizations provided by [@reaqtive/components](${gitSite}/packages/components)
4. You can add routing and navigation using [RqtvApp](${gitSite}/packages/components#app)


## Before starting
To use Reaqtive in your app you need to have [node.js](https://nodejs.org/) already installed on your machine and it is recommended to install [git](https://git-scm.com/downloads).
You should be familiar with React, npm, Bootstrap and the javascript ecosystem in general.
If you are not you can find useful info and tutorials at the [bottom of the page](#useful-resources).

## Installation

\`\`\`
npm install @reaqtive/components
\`\`\`

## First Reaqtive App

Below you can find the code to create the simplest Reaqtive app. It is assumed that you have alredy created a [React app](https://create-react-app.dev/) and, if you are using CRA, that you have created the [setupProxy file](#how-to-use-reaqtive-with-create-react-app).
The app shows a dropdown menu to be used as a filter and one visualization provided by Qlik Capability APIs.
The Reaqtive component handles the connection with the Qlik Sense server and it expects connections parameters to be provided in an object called qConfig.
Notice that at the top of the page Reaqtive scss file has been imported (for [details](${gitSite}/packages/components#styles)).


___EXAMPLE___


If you want to use Reaqtive components and utilities follow the links below.

- Create your analytics web app with [@reaqtive/components](${gitSite}/packages/components)
- Connect your React app to Qlik with [@reaqtive/q](${gitSite}/packages/q)

### qConfig

It is the object used to provide Reaqtive the parameters to connect to Qlik APIs. It has to be passed as a prop to the Reaqtive component that will handle the connection.
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
To do that you have to \`\`\`npm install http-proxy-middleware\`\`\`, create a file called setupProxy.js in the src folder of your app and paste the following lines of code in it (notice that the qConfig object is imported from an external file). For further info follow this [link](https://create-react-app.dev/docs/proxying-api-requests-in-development).
This is needed whether you want to connect to Qlik Sense Desktop or a remote Qlik Server.

___PROXY___

To connect to a remote Qlik server for developing on your local machine you need to start webpack dev server in secure mode. To do that launch the server with the following command:
\`\`\`
HTTPS="true" npm start
\`\`\`

[Here](#https://create-react-app.dev/docs/using-https-in-development) you can find more info about using a proxy with CRA.


## Deploy your app to Qlik Sense Enterprise

1. in the root folder of your project (the parent of the src folder) create a file called exactly \`\`\`.env.production\`\`\` and add this line: \`\`\`PUBLIC_URL = /extensions/your-app-name\`\`\`
2. Open a command line tool in your root folder and run the command \`\`\`npm run build\`\`\` this will create a build folder which will contain all the files to be deployed
3. Create a qExt file as explained [here](https://help.qlik.com/en-US/sense-developer/June2019/Subsystems/Mashups/Content/Sense_Mashups/mashups-getting-started.htm) and place it in the build folder. The name property in this file must match the app name you enterd in .env.production
4. zip the content of the build folder (not the folder itself: when opening the zip file you must see the content of the build folder not the build folder)
5. upload the zip as an extension using the QMC and navigate to \`\`\`https://your.qlik.server/extensions/your-rqtv-app-name/index.html\`\`\`


## Useful resources

Below you can find the links to the official sites of the technologies used to develop Reaqtive.

- [React](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Bootstrap](https://getbootstrap.com/)
- [npm](https://www.npmjs.com/)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Create React App](https://create-react-app.dev/)
- [React Spring](https://www.react-spring.io/)
- [node.js](https://nodejs.org)

Below a list of links to tutorials you can watch to get started with the technologies mentioned above:

- [React tutorial](https://www.youtube.com/watch?v=6RhOzQciVwI&list=PL4cUxeGkcC9hNokByJilPg5g9m2APUePI)
- [Bootstrap tutorial](https://www.youtube.com/watch?v=QAgrHLtG1Yk&list=PL4cUxeGkcC9jE_cGvLLC60C_PeF_24pvv)
- [Sass tutorial](https://www.youtube.com/watch?v=St5B7hnMLjg&list=PL4cUxeGkcC9iEwigam3gTjU_7IA3W2WZA)
- [npm tutorial](https://www.youtube.com/watch?v=kQ1j0rEI7EI&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp&index=20)

## FAQ

__Q__:Is it possible to connect to more than one Qlik App?

__A__: Yes, if you want to use only the engine APIs remember to set to false the qCapabilityApiRequired of the Reaqtive components. If you need to use also the capablity APIs you must use the [QShareCapabilityApi](https://github.com/taan11/reaqtive/blob/master/packages/q/src/lib/components/q-share-capability-api.js) component
##

__Q__: While developing I can't connect to Qlik APIs because of CORS issues

__A__: Remeber to create the setupProxy file as explained [here](#how-to-use-reaqtive-with-create-react-app)
##

__Q__: While developing I can't connect to Qlik remote server

__A__: Be sure to have an active session with Qlik Sense in the same browser and to start the development server in secure mode (HTTPS="true"). Check [this section](#how-to-use-reaqtive-with-create-react-app)
##

__Q__: How can I deploy my mash up to Qlik Sense Enterprise?

__A__: Check [this section](#deploy-your-app-to-qlik-sense-enterprise)
##

__Q__: When I navigate to a page with condition using query string, I am always redirected to the fallback page

__A__: Add a key property to your RqtvPages. This will force them to unmount when changing the url in your address bar
##

__Q__: I can use the Engine API, but I can't see the objects provided by the Capability APIs

__A__: You are likely to have started your React app in non secure mode: add HTTPS="true" before npm start.
##
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
You can choose to use stand alone components and build your own navigation and routing functionalities or you can use [RqtvApp](#rqtvapp) and [RqtvPage](#rqtvpage) for built-in page navigation functionalities.

`,
      usage:`
#### Installation

\`\`\`
npm install @reaqtive/components
\`\`\`

[@reaqtive/q](${gitSite}/packages/q) will be installed as well, since @reaqtive/components depends on it. [@reaqtive/q](${gitSite}/packages/q)  will help you interact with Qlik engine and Qlik Capability APIs
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
          title:'Triggers',
          intro:'RqtvApp and RqtvPage accept arrays of triggers as props. They are fired before rendering the app or the page. This is still an experimental feature, but data structures are very unlikely to change. Below you can find the types of triggers you can use described as PropTypes',
          paths:['custom-prop-types/trigger.js'],
          docLib:'customDataType'
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
    },
    layout:{
      name:'@reaqtive/layout',
      path:'layout'
    }
  }
}

module.exports=reaqtiveModules
