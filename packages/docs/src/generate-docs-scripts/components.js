const path = require('path');
const fs = require('fs');
const readdirp = require('readdirp');
const reactDocgen = require('react-docgen');
const util = require('util');
const os = require('os');
const jsdoc2md = require('jsdoc-to-markdown')
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');
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
  const fileContent = fs.readFileSync(file);
  try{
    const fileMetadata = reactDocgen.parse(fileContent);
    return {...fileMetadata, sourceFile: file}
  } catch(err){
    console.error(file, '-->', err.message)
  }
}

const addComponentsMetadata = (section) => {
  const components = section.fileList.map(file =>
      extractComponentMetadata(file)
    ).filter(component=>component!==null&&component!==undefined)
  const sortedComponents = section.title==='contexts'?components.reverse():components
  const componentsObject = sortedComponents.reduce((obj, item) => Object.assign(obj, { [item.displayName]: item }), {});
  return {...section, components: componentsObject}
}

const generateComponentMarkdown = (componentMetadata) => {
  console.log(componentMetadata.sourceFile)
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
    const markdownString = headerMarkdown+os.EOL+propsMarkdown+os.EOL+snippetMarkdown+emptyLine
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

const run = async (package, root) => {
  const packagePath = path.join(__dirname, `${root}/${package.path}`);
  const packageSourcePath = path.join(__dirname, `${root}/${package.path}/${package.sourcePath}`);
  const sectionsWithFiles = package.sections.map(section=>addFileListToSection(packageSourcePath, section))
  const sectionsWithComponents = sectionsWithFiles.map(section=>addComponentsMetadata(section))
  const mergedSections = sectionsWithComponents.map(section=>composeSection(section))
  //console.log(mergedSections)
  const callback = ()=> console.log('done')
}
run(reaqtiveModules.packages.components, reaqtiveModules.rootPath)
