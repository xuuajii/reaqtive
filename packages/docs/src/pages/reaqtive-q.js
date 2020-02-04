import React from 'react'
import {ComponentDocumentation} from '../components/components-docs/index'
const packageData = require('../packages-data/q.json')
const ReaqtiveQ = props => {

  const data=packageData['packages\\q\\src\\lib\\components\\q-generic-object.js']
  return(
    <ComponentDocumentation title = {'a'} componentData={data}/>
  )
}

export default ReaqtiveQ
