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
@reaqtive/q provides 4 types of APIs which are listed below.

`,
      conclusion:`
#### Installation
@reaqtive/q does not provide any layout components, it only allows you to interact with the Qlik engine. You can use it as a stand alone package and develop your layout components using its APIs, as described below.
\`\`\`
npm install @reaqtive/q
\`\`\`
Depending on your needs and you can install @reaqtive/components instead. It provides a set of ready to use layout components to build data visualization apps on top o Qlik APIs, and depends on @reaqtive/q.
\`\`\`
npm install @reaqtive/components
\`\`\`
`,
      sections:[
        {
          title:'reaqtive',
          path:'',
          docLib:'reactDocgen',
        },
        {
          title:'contexts',
          path:'contexts',
          docLib:'reactDocgen',
        },
        {
          title:'components',
          path:'components',
          docLib:'reactDocgen',
        },
        {
          title:'hooks',
          path:'hooks',
          docLib:'jsDoc',
        }
      ]
    },
    components:{
      name:'@reaqtive/components',
      path:'components',
      sourcePath:'src/lib',
      examplePath:'../examples/components',
      sections:[
        {
          title:'filters',
          paths:['filters/**/index.js', 'multibox/index.js'],
          dicLib:'reactDocgen'
        },
        {
          title:'visualizations',
          paths:['visualizations/q-viz.js', 'rqtv-viz-container/index.js'],
          dicLib:'reactDocgen'
        },
        {
          title:'app objects',
          paths:['current-selections/index.js', 'rqtv-search-object/index.js', 'rqtv-navbar/index.js', , 'side-menu/index.js'],
          dicLib:'reactDocgen'
        },
        {
          title:'App',
          paths:['rqtv-app.js', 'pages/*.js'],
          dicLib:'reactDocgen'
        }
      ]
    }
  }
}

module.exports=reaqtiveModules
