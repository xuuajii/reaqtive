const fs = require('fs');
const util = require('util');
const reactDocgen = require('react-docgen');
const addComponentsMetadata = async (sections) => {
  const iterateSections = async (section) => {
    const components = await mapAsync(section.fileList, extractComponentMetadata)
    const cleanedComponents = components.filter(component=>component!==null&&component!==undefined)
    const sortedComponents = section.title==='contexts'?cleanedComponents.reverse():cleanedComponents
    const componentObject = sortedComponents.reduce(
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

const getSectionFileList = async (section, packagePath, depth) => {
  const sectionPath = `${packagePath}/${section.path}`
  const readdir = util.promisify(fs.readdir);
  const dirItems = await readdir(sectionPath);
  const dirItemPaths = dirItems.map(dirItem=>`${sectionPath}/${dirItem}`)
  const sectionDirItemPaths = await mapAsync(dirItemPaths, markDir)
  return {...section, fileList:sectionDirItemPaths.filter(sectionDirItemPath=>sectionDirItemPath!==null)}
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

const mapAsync = async (iterable, asyncMethod, params=[]) => {
  return Promise.all(iterable.map(iteratee => asyncMethod(iteratee, ...params)))
}

module.exports={addComponentsMetadata, extractComponentMetadata, mapAsync, getSectionFileList}
