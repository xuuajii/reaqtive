const path = require('path');
const fs = require('fs');
const readdirp = require('readdirp');
const reactDocgen = require('react-docgen');
const util = require('util');
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');
const _ = require('lodash')
const componentPath = path.join(__dirname, '../../../q/src/lib/reaqtive.js');
const reaqtiveModules={
  rootPath:'../../..',
  packages:[
    {
      name:'@reaqtive/q',
      path:'q',
      sourcePath:'src/lib',
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
  ]
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

const getSectionFileList = async (packagePath, section) => {
  const sectionPath = `${packagePath}/${section.path}`
  const readdir = util.promisify(fs.readdir);
  const dirItems = await readdir(sectionPath);
  const dirItemPaths = dirItems.map(dirItem=>`${sectionPath}/${dirItem}`)
  const sectionDirItemPaths = await mapAsync(dirItemPaths, markDir)
  return {...section, fileList:sectionDirItemPaths.filter(sectionDirItemPath=>sectionDirItemPath!==null)}
}

const addFileListToSections = async (packagePath, sections) => {
  return Promise.all(sections.map(section => getSectionFileList(packagePath, section)))
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

const generateComponentMarkdown = (componentMetadata) => {
  const renderer = new ReactDocGenMarkdownRenderer();

  const markdownString = renderer.render(
    /* The path to the component, used for linking to the file. */
    componentPath,
    /* The actual react-docgen AST */
    componentMetadata,
    /* Array of component ASTs that this component composes*/
    []);
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
  const sectionComponentsMarkdown = _.map(section.components, (value) => {
    const markdown = generateComponentMarkdown(value)+'\n';
    const cleanedMarkdown = contextCleanUp(markdown)
    return cleanedMarkdown
  })
  return sectionTitle+'\n'+sectionComponentsMarkdown.join('\n')+'<br/>'+'<br/>'+'\n'
}

const run = async (package, root) => {
  const packagePath = path.join(__dirname, `${root}/${package.path}/${package.sourcePath}`);
  const sectionsWithFiles = await addFileListToSections(packagePath, package.sections)
  const sectionsWithComponents = await addComponentsMetadata(sectionsWithFiles)
  const callback = ()=>console.log('done')
  const reaqtiveDocs = composeSection(sectionsWithComponents[0])
  const contextsDocs = composeSection(sectionsWithComponents[1])
  const componentsDocs = composeSection(sectionsWithComponents[2])
  const mergedDocs = reaqtiveDocs+contextsDocs+componentsDocs
  fs.writeFile('q.md', mergedDocs, callback);
}

run(reaqtiveModules.packages[0], reaqtiveModules.rootPath)
