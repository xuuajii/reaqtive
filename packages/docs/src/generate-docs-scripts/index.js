const path = require('path');
const fs = require('fs');
const readdirp = require('readdirp');
const reactDocgen = require('react-docgen');
const util = require('util');
const os = require('os');
const jsdoc2md = require('jsdoc-to-markdown')
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');
//const generateHooksMarkdown = require('./generate-hooks-markdown')
const _ = require('lodash')
var glob = require("glob")
const templates = require('./templates')
const reaqtiveModules = require('./packages-metadata')
const emptyLine = os.EOL+'<br></br>'+os.EOL;

const addFileListToSection = (packagePath, section) => {
  const fileList = section.paths?section.paths.map(path=>getDirItems(`${packagePath}/${path}`)).reduce((accumulator, value)=>[...accumulator,...value]):[]
  return {...section, fileList:fileList}
}

const getDirItems = (dirPath) => glob.sync(`${dirPath}`)

const extractComponentMetadata = (file) => {

  const readFile = (file) => {
    try{
      const fileContent = fs.readFileSync(file);
      return fileContent
    } catch(err){
      console.log(`error reading file --> ${file}`)
    }
  }
  const fileContent = readFile(file)
  try{
    const fileMetadata = reactDocgen.parse(fileContent);
    return {...fileMetadata, sourceFile: file}
  } catch(err){
    console.error(file, '-->', err.message)
  }
}

const addComponentsMetadata = (section, examplePath) => {
  const components = section.fileList.map(file =>
      extractComponentMetadata(file)
    ).filter(component=>component!==null&&component!==undefined)

  const sortedComponents = section.title==='contexts'?components.reverse():components

  const componentsObject = sortedComponents.reduce((obj, item) => Object.assign(obj, { [item.displayName]: item }), {});

  const addSnippet = (component) => {
    const snippet = getSnippet(component.displayName, examplePath)
    const regExp = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g;
    const match = snippet.replace(regExp,'YOUR HOST ADDRESS');

    const cleansedSnippet = snippet.replace(regExp,'YOUR HOST ADDRESS');

    return {...component, componentName:component.displayName, snippet:cleansedSnippet}
  }

  const componentsObjectWithSnippets = _.map(componentsObject, addSnippet)
  return {...section, components: componentsObjectWithSnippets}
}

const getSnippet = (objName, examplePath) => {
  const exampleFilePath = `${examplePath}/${_.kebabCase(objName)}.js`

  try {
    const fileContent = fs.readFileSync(exampleFilePath,'utf8');
    const snippet = `\`\`\`javascript
${fileContent}
\`\`\``;
    return snippet
  } catch(err){
    console.log(`missing example file --> ${objName}`)
  }
}

const addHooksMetadata = (section, examplePath) => {
  const jsDocArray=_.flatten(section.fileList.map(file=>jsdoc2md.getTemplateDataSync({files:file})))
  //console.log(jsDocArray)
  const hooksMetadataArray = jsDocArray.filter(block=>(block.comment!=='' && block.id.substring(0,3)==='use'))
  const hooks = _.keyBy(hooksMetadataArray, 'longname')
  const addReturns = (item) => {
    const properties = jsDocArray.filter(block=> block.name===item.returns[0].type.names[0])[0].properties
    return {...item, returns:[{...item.returns[0], props:properties}]}
  }
  hooksWithReturns = _.map(hooks, addReturns)
  const addSnippet = (hook, examplePath) => {
    const snippet = getSnippet(hook.longname, examplePath)
    return {...hook, snippet}
  }
  const hooksWithSnippets = _.map(hooksWithReturns, addSnippet)

  //console.log(hooksWithSnippet)
  return {...section, hooks:hooksWithSnippets}
}

const addCustomData = (section) => {
  const snippet = fs.readFileSync(section.fileList[0], 'utf8')
  const firstLinePos = snippet.indexOf(os.EOL)
  const lastLinePos = snippet.lastIndexOf('export')

  console.log(lastLinePos)
  return {...section, snippet:'```javascript'+os.EOL+snippet.substr(0,lastLinePos).substr(firstLinePos + 1)+'```'+os.EOL}
}

const addSectionMetadata = (section, examplePath) => {
  let sectionWithMetadata
  switch(section.docLib){
    case 'reactDocgen':
      sectionWithMetadata=addComponentsMetadata(section, examplePath)
    break;
    case 'jsDoc':
      sectionWithMetadata=addHooksMetadata(section, examplePath)
    break;
    case 'styles':
      sectionWithMetadata=(section)
    break;
    case 'customDataType':
      sectionWithMetadata=addCustomData(section)
    break;
    default:
    console.log(`no doc library found (${section.docLib}) for section ${section.name}`)
  }
  return sectionWithMetadata
}

const generateComponentMarkdown = (componentMetadata) => {

  const headerRenderer = new ReactDocGenMarkdownRenderer({template:templates.headerTemplate});
  const propsTableRenderer = new ReactDocGenMarkdownRenderer({template:templates.propsTable});
  const headerMarkdown = headerRenderer.render(
    /* The path to the component, used for linking to the file. */
    'componentPath',
    /* The actual react-docgen AST */
    componentMetadata,
    /* Array of component ASTs that this component composes*/
    []);
  const snippetMarkdown = componentMetadata.snippet?`**Example:** ${os.EOL}`+componentMetadata.snippet:'';
  const propsTableMarkdown = propsTableRenderer.render(
    /* The path to the component, used for linking to the file. */
    'componentPath',
    /* The actual react-docgen AST */
    componentMetadata,
    /* Array of component ASTs that this component composes*/
    []);
    const propsMarkdown = componentMetadata.props?`**Props**: ${os.EOL}`+propsTableMarkdown:''
    const markdownString = headerMarkdown+os.EOL+snippetMarkdown+os.EOL+propsMarkdown+emptyLine
    return markdownString
}

const generateHookMarkDown = (hook) => {
  //console.log(hook)
  const title = `### **${hook.name}**`
  const description = `#### Description
${hook.description}`
  const kind = `${hook.kind}`
  const paramsTable=templates.hookParams(hook.params)
  const returns = templates.hookReturns(hook.returns)
  const markDown = title+os.EOL+os.EOL+description+os.EOL+os.EOL+'#### Params'+os.EOL+paramsTable+os.EOL+returns+os.EOL
  return markDown
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
  const sectionIntro = section.intro&&section.intro!==''?section.intro+os.EOL+os.EOL:''
  const sectionComponentsMarkdown = section.components!==undefined
  ?_.map(section.components, (component) => {
    const markdown = generateComponentMarkdown(component)+os.EOL
    const cleanedMarkdown = contextCleanUp(markdown)+os.EOL
    return cleanedMarkdown
  })
  :[]
  const sectionHooksMarkdown = section.hooks!==undefined?_.map(section.hooks, generateHookMarkDown):[];
  const wholeSectionSnippet = section.snippet?section.snippet+os.EOL:''
  return sectionTitle+os.EOL+sectionIntro+wholeSectionSnippet+sectionComponentsMarkdown.join(os.EOL)+sectionHooksMarkdown.join(os.EOL)
}

const addPackageIntro = (package, mergedSectionsMarkdown) => {
  const packageSummary = mergedSectionsMarkdown&&'### PROVIDED FEATURES'+os.EOL+package.sections.map(section =>
    `- [${section.title.toUpperCase()}](#${_.kebabCase(section.title)}) </br>${os.EOL}`).reduce((accumulator,item)=>accumulator+item)

  return package.intro+os.EOL+package.usage+os.EOL+packageSummary+os.EOL+mergedSectionsMarkdown
}

const addFile = (text, filePath, replaceString) => {
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const regExp = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g;
  //const match = snippet.replace(regExp,'YOUR HOST ADDRESS');
  const cleansedFileContent = fileContent.replace(regExp,'YOUR HOST ADDRESS');

  const textWithFile = text.replace(replaceString,os.EOL+'\`\`\`'+`javascript${os.EOL}${cleansedFileContent}${os.EOL}`+'\`\`\`'+os.EOL)
  return textWithFile
}

const updatePackageDocs = async (package, root) => {
  console.log(`started ${package.name} docs`)
  const packagePath = path.join(__dirname, `${root}/${package.path}`);
  const packageSourcePath = path.join(__dirname, `${root}/${package.path}/${package.sourcePath}`);
  //console.log(packageSourcePath)
  const packageExamplesPath = path.join(__dirname, `${package.examplePath}`);
  const sectionsWithFiles = package.sections&&package.sections.map(section=>addFileListToSection(packageSourcePath, section))
  const sectionsWithComponents = sectionsWithFiles&&sectionsWithFiles.map(section=>addSectionMetadata(section, packageExamplesPath))
  const mergedSections = sectionsWithComponents&&sectionsWithComponents.map(section=>composeSection(section)).join(os.EOL)
  const packageDocs = addPackageIntro(package, mergedSections)
  const callback = ()=> console.log(`done ${package.name} docs`)
  fs.writeFile(`${packagePath}/README.md`, packageDocs, callback);
}
const updateReaqtiveDocs = (metadata) => {
  const rootPath=path.join(__dirname, `${metadata.rootPath}`);
  const packagesPath=path.join(__dirname, `${metadata.rootPath}/${metadata.packagesPath}`);
  console.log('started reaqtive docs')
  const reaqtiveDocs = metadata.text
  const textWithProxy = addFile(reaqtiveDocs, packagesPath+'/'+metadata.files.proxy, '___PROXY___')
  const textWithExample = addFile(textWithProxy, packagesPath+'/'+metadata.files.example, '___EXAMPLE___')
  const callback = ()=> console.log(`done reaqtive docs`)
  //console.log(`${rootPath}/README.md`, reaqtiveDocs)
  fs.writeFile(`${rootPath}/README.md`, textWithExample, callback);
}

const updatePackagesFolderDocs = (reaqtiveModules) => {
  const packagesPath=path.join(__dirname, `${reaqtiveModules.rootPath}/${reaqtiveModules.packagesPath}`);
  const generateLink = (package) => `- [${package.name}](${reaqtiveModules.gitSite}/${reaqtiveModules.packagesPath}/${package.path})`
  const packagesLinks = _.map(reaqtiveModules.packages, generateLink)
  const markdown = `
# Reaqtive Packages
If you want to see Reaqtive documentation you should go [here](${reaqtiveModules.gitSite})
If you want to see the documentation of a specific package follow the links below:

${packagesLinks.join(os.EOL)}

  `
  const callback = ()=>console.log('generated package courtesy page')
  fs.writeFile(`${packagesPath}/README.md`, markdown, callback);
}

const run = () => {
  updateReaqtiveDocs(reaqtiveModules)
  updatePackagesFolderDocs(reaqtiveModules)
  updatePackageDocs(reaqtiveModules.packages.components, reaqtiveModules.rootPath+'/'+reaqtiveModules.packagesPath)
  updatePackageDocs(reaqtiveModules.packages.q, reaqtiveModules.rootPath+'/'+reaqtiveModules.packagesPath)
  updatePackageDocs(reaqtiveModules.packages.layout, reaqtiveModules.rootPath+'/'+reaqtiveModules.packagesPath)
}

run()
