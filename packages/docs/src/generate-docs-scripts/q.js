const path = require('path');
const fs = require('fs');
const readdirp = require('readdirp');
const reactDocgen = require('react-docgen');
const util = require('util');
const os = require('os');
const jsdoc2md = require('jsdoc-to-markdown')
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');
const _ = require('lodash')
const {generateHooksSection, readHooksMetadata} = require('./generate-hooks-section')
const templates = require('./templates')
const componentPath = path.join(__dirname, '../../../q/src/lib/reaqtive.js');
const emptyLine = os.EOL+'<br></br>'+os.EOL;
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
    }
  }
}

const getFileList = async (package) => {
  let files = []
  for await (const entry of readdirp(packagePath)) {
    const {path} = entry;
    files.push(packagePath+'\\'+path)
  }
  return files
}

const markDir = async (path) => {
  try{
    const lstat = util.promisify(fs.lstat);
    const info = await lstat(path)
    return info.isFile()?path:null
  } catch(err){
    console.log(err)
    return err
  }
}

const getSectionFileList = async (section, packagePath) => {
  const sectionPath = `${packagePath}/${section.path}`
  const readdir = util.promisify(fs.readdir);
  const dirItems = await readdir(sectionPath);
  const dirItemPaths = dirItems.map(dirItem=>`${sectionPath}/${dirItem}`)
  const sectionDirItemPaths = await mapAsync(dirItemPaths, markDir)
  return {...section, fileList:sectionDirItemPaths.filter(sectionDirItemPath=>sectionDirItemPath!==null)}
}

const addFileListToSections = async (packagePath, sections) => {
  //return Promise.all(sections.map(section => getSectionFileList(packagePath, section)))
  return mapAsync(sections, getSectionFileList, [packagePath])
}

const addComponentsMetadata = async (sections) => {
  const iterateSections = async (section) => {
    const components = await mapAsync(section.fileList, extractComponentMetadata)
    const cleanedComponents = components.filter(component=>component!==null&&component!==undefined)

    const componentObject = cleanedComponents.reduce(
      (obj, item) => Object.assign(obj, { [item.displayName]: item }), {});
      return {...section, components: componentObject}
  }
  const sectionsWithComponents = await mapAsync(sections, iterateSections)
  return sectionsWithComponents
}

const extractComponentMetadata = async (file) => {
  try{
    const readFile = util.promisify(fs.readFile);
    const fileContent = await readFile(file);
    const fileMetadata = reactDocgen.parse(fileContent);
    const componentObject = {};
    return fileMetadata.description&&fileMetadata.description.length>0?fileMetadata:null
  } catch(err) {
    console.log(err)
  }
}

const mapAsync = async (iterable, asyncMethod, params=[]) => {
  return Promise.all(iterable.map(iteratee => asyncMethod(iteratee, ...params)))
}

const addSnippets = async (section, examplePath) => {

  const generateComponentSnippet = async (componentName, componentsExamplePath) => {
    try {
      const readFile = util.promisify(fs.readFile);
      const exampleFullPath = path.join(__dirname,examplePath)
      const fileContent = await readFile(`${exampleFullPath}\\${_.kebabCase(componentName)}.js`,'utf8');
      return {componentName:componentName, snippet:`\`\`\`javascript
${fileContent}\`\`\``
}
    } catch(err){
      console.log(`example file not found for ${componentName}`,err)
    }
  }

  const sectionExamplePath = `${examplePath}`
  const snippets = await mapAsync(Object.keys(section.components), generateComponentSnippet, [examplePath])
  //console.log(snippets)
  const componentSnippets = _.mapValues(_.keyBy(snippets, 'componentName'), 'snippet')
  const componentsWithSnippets = _.map(section.components, component=>{
    return { ...component, snippet:componentSnippets[component.displayName]}
  })
  return {...section, components:componentsWithSnippets}
}

const addExamplesToSections = async (sections, componentsExamplePath) => {
  return mapAsync(sections, addSnippets, [componentsExamplePath])
}

const generateComponentMarkdown = (componentMetadata) => {
  const headerRenderer = new ReactDocGenMarkdownRenderer({template:templates.headerTemplate});
  const propsTableRenderer = new ReactDocGenMarkdownRenderer({template:templates.propsTable});
  const headerMarkdown = headerRenderer.render(
    /* The path to the component, used for linking to the file. */
    componentPath,
    /* The actual react-docgen AST */
    componentMetadata,
    /* Array of component ASTs that this component composes*/
    []);
  const snippetMarkdown = componentMetadata.snippet?`**Example:** ${os.EOL}`+componentMetadata.snippet:'';
  const propsTableMarkdown = propsTableRenderer.render(
    /* The path to the component, used for linking to the file. */
    componentPath,
    /* The actual react-docgen AST */
    componentMetadata,
    /* Array of component ASTs that this component composes*/
    []);
    const propsMarkdown = componentMetadata.props?`**Props**: ${os.EOL}`+propsTableMarkdown:''
    const markdownString = headerMarkdown+'\n'+snippetMarkdown+'\n'+propsMarkdown
    return markdownString
}

const composeSection = (section) => {
  const contextCleanUp = (generatedMarkdown) => {
    if(section.title==='contexts'){
      return generatedMarkdown.replace(/Provider/g, "").replace(/This component does not have any props./g, "");
    } else {
      return generatedMarkdown
    }
  }
  const sectionTitle = '## '+section.title.toUpperCase();
  const sectionComponentsMarkdown = _.map(section.components, (component) => {
    const markdown = generateComponentMarkdown(component)+os.EOL
    const cleanedMarkdown = contextCleanUp(markdown)+os.EOL
    return cleanedMarkdown
  })
  const sectionHooksMarkdown = section.hooksMetadata?generateHooksSection(section):'';
  return sectionTitle+os.EOL+sectionComponentsMarkdown.join(os.EOL)+sectionHooksMarkdown
}

const generateIntro = (package) => {
  const index = package.sections.map(section => `- [${_.capitalize(section.title)}](#${section.title})`).reduce((list, item)=> list+os.EOL+item)+os.EOL
  return package.intro+os.EOL+index+os.EOL+package.conclusion
}

const run = async (package, root) => {
  const packagePath = path.join(__dirname, `${root}/${package.path}`);
  const packageSourcePath = path.join(__dirname, `${root}/${package.path}/${package.sourcePath}`);
  const sectionsWithFiles = await addFileListToSections(packageSourcePath, package.sections)
  const sectionsWithComponents = await addComponentsMetadata(sectionsWithFiles)
  const hooksMetadata = await readHooksMetadata(packageSourcePath+'/hooks/*')
  const sectionsWithHooksMetadata = sectionsWithComponents.map(section=>section.title==='hooks'?{...section, hooksMetadata}:section)
  const sectionsWithSnippets = await addExamplesToSections(sectionsWithHooksMetadata, `${package.examplePath}`)
  // const reaqtiveDocs = composeSection(sectionsWithSnippets[0])
  // const contextsDocs = composeSection(sectionsWithSnippets[1])
  // const componentsDocs = composeSection(sectionsWithSnippets[2])
  //const hooksSection = await generateHooksSection(packageSourcePath+'/hooks/*')

  const mergedSectionsDocs = sectionsWithSnippets.map(section=>composeSection(section)).join(emptyLine)//+hooksSection
  const intro = generateIntro({...package, sections:sectionsWithSnippets})
  const packageDocs = intro+emptyLine+mergedSectionsDocs
  const callback = ()=> console.log('done')
  fs.writeFile(`${packagePath}\\README.md`, packageDocs, callback);
}
run(reaqtiveModules.packages.q, reaqtiveModules.rootPath)
