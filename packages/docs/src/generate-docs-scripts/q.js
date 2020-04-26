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
const reaqtiveModules = require('./packages-metadata')
const {addComponentsMetadata, extractComponentMetadata, mapAsync, getSectionFileList} = require('./helpers')

const addFileListToSections = async (packagePath, sections) => {
  return mapAsync(sections, getSectionFileList, [packagePath])
}

const addSnippets = async (section, examplePath) => {

  const generateComponentSnippet = async (componentName, componentsExamplePath) => {
    try {
      const readFile = util.promisify(fs.readFile);
      const exampleFullPath = path.join(__dirname,examplePath)
      const fileContent = await readFile(`${exampleFullPath}/${_.kebabCase(componentName)}.js`,'utf8');
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
