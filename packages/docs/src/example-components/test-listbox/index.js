//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React from 'react'
import { QGenericObject, QListObject } from '@reaqtive/q'
import Layout from './layout'


const Listbox = props =>{
  return(
    <QGenericObject qObjectDef={props.qObjectDef}>
      <QListObject>
        <Layout {...props}/>
      </QListObject>
    </QGenericObject>
  )
}

export default Listbox
