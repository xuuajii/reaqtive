import React from 'react'
import PropTypes from 'prop-types'
import { QGenericObject, QListObject } from '@reaqtive/q'
import Layout from './layout'


const BasketAnalysis = props =>{
  return(
    <QGenericObject qObjectDef={props.qHypercubeDef}>
        <Layout {...props}/>
    </QGenericObject>
  )
}

export default BasketAnalysis;