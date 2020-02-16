const os = require('os');
const jsdoc2md = require('jsdoc-to-markdown')
const emptyLine='<br></br>'

const readHooksMetadata = async (hookFilePath) => {
  const rawMetadataArray = await jsdoc2md.getTemplateData({files:hookFilePath})
  return rawMetadataArray
}

generateHooksSection = (section) => {
  const rawMetadataArray = section.hooksMetadata
  const filteredMetadataArray = rawMetadataArray&&rawMetadataArray.filter(block=>(block.comment!=='' && block.id.substring(0,3)==='use'))
  //const template = await jsdoc2md.render({data:filteredMetadataArray})
  // const callback = ()=>
  const generateHookMarkDown = (hook) => {
    const title = `### **${hook.name}**`
    const description = `#### Description
${hook.description}`
    const kind = `${hook.kind}`
    const generateParams = (params) => {
      const header = `param | type | default value | required | description
---- | :----: | :-------: | :--------: | -----------
`
      const rows = params.map(param=>
        `__${param.name}__ | ${param.type.names[0]} |${
          param.defaultvalue?param.defaultvalue:''
        } | ${
          !param.optional? ':white_check_mark:' : ':x:'
        } | ${
          param.description?param.description:''
        }`
      ).join(os.EOL)
      return header+rows
    }
    const generateReturns = (returns) => {
      const title = returns.map(item => `#### Returns
It returns a **${item.type.names[0]}**: ${item.description}
`)

      const generateReturnsTable = (item) => {
        const header = `name | type | description
---- | :----: | -------
`
        const returnProps = rawMetadataArray.filter(block=> block.name===item.type.names[0])[0].properties
        const rows = returnProps.map(prop =>{
        return  `__${prop.name}__ | ${prop.type.names[0]}| ${
            prop.description?prop.description:''
          }`
        }).join(os.EOL)
        return header+rows
      }
      const returnsTable = returns.map(item=>generateReturnsTable(item))
      const returnsItem = title+os.EOL+returnsTable
      return returnsItem
    }
    const paramsTable=generateParams(hook.params)
    const returns = generateReturns(hook.returns)
    const markDown = title+os.EOL+os.EOL+description+os.EOL+os.EOL+'#### Params'+os.EOL+paramsTable+os.EOL+returns+os.EOL
    return markDown
  }
  const markdown = filteredMetadataArray.map(hook=>generateHookMarkDown(hook)).join(os.EOL)+emptyLine
  return markdown
}
module.exports = {generateHooksSection, readHooksMetadata}
