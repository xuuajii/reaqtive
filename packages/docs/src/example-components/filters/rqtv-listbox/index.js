//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React from 'react'
import PropTypes from 'prop-types'
import { QGenericObject } from '@reaqtive/q'
import RqtvListObject from '../rqtv-list-object'
import Layout from './layout'
import {useMapPropsToDef} from '../helpers/index'

const RqtvListbox = props =>{
  const {qFieldExpr, qSortObject, qId, qLabelExpr} = props
  const qObjectDef = useMapPropsToDef({qFieldExpr, qSortObject, qId, qLabelExpr})
  return(
    <QGenericObject
      qObjectDef={qObjectDef}
      quickSelectionMode={props.quickSelectionMode}
    >
      <RqtvListObject {...props}>
        <Layout {...props}/>
      </RqtvListObject>
    </QGenericObject>
  )
}

RqtvListbox.propTypes={
  qFieldExpr:PropTypes.string.isRequired,
  qFieldLabelExpr:PropTypes.string,
  qSortObject:PropTypes.object,
  showHeader:PropTypes.bool,
  showHeaderButtonbar:PropTypes.bool,
  showListboxDropdownMenu:PropTypes.bool,
  alwaysShowSearch:PropTypes.bool,
  height:PropTypes.number,
  titleAction:PropTypes.func,
  headerStyle:PropTypes.object,
  titleStyle:PropTypes.object,
  listStyle:PropTypes.object,
  itemStyle:PropTypes.object,
  focus:PropTypes.bool,
  quickSelectionMode:PropTypes.bool
}

RqtvListbox.defaultProps={
  showHeader:true,
  showHeaderButtonbar:false,
  showListboxDropdownMenu:true,
  alwaysShowSearch:false,
  qSortObject:{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 },
  height:500,
  focus:true,
  titleAction:()=>false,
  headerStyle:{},
  titleStyle:{},
  listStyle:{},
  itemStyle:{},
  quickSelectionMode:false
}

export default RqtvListbox
