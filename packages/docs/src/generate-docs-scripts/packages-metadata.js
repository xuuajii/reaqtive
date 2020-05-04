const reaqtiveModules={
  name:'reaqtive',
  rootPath:'../../..',
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
          intro:'',
          paths:['rqtv-app.js', 'pages/*.js'],
          docLib:'reactDocgen'
        },
        {
          title:'Styles',
          intro:'',
          paths:['styles/thems.scss'],
          docLib:'styles'
        }
      ]
    }
  }
}

module.exports=reaqtiveModules
