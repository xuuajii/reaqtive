import React from 'react'
import {ComponentDocumentation} from '../example-components/components-docs/index'
import _ from 'lodash'
const packageData = require('../packages-data/q.json')
const ReaqtiveQ = props => {
  const componentsData = _.omitBy(packageData, (item)=>item.description.length===0);
  const componentsNormalizedData = _.values(componentsData);//_.mapValues(componentsData, (component)=>_.values(component));
  console.log(componentsNormalizedData)
  const data=packageData['packages\\q\\src\\lib\\components\\q-generic-object.js']
  return(
    //<ComponentDocumentation title = {'a'} componentData={data}/>
    <>
      {componentsNormalizedData.map((component, index)=><ComponentDocumentation key={index} componentData={component}/>)}
    </>
  )
}

export default ReaqtiveQ
