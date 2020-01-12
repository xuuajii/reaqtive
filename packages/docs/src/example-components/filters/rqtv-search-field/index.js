//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React from 'react'
import PropTypes from 'prop-types'
import { QGenericObject } from '@reaqtive/q'
import RqtvListObject from '../rqtv-list-object'
import Layout from './layout'
import {useMapPropsToDef} from '../helpers/index'

const RqtvSearchField = props =>{
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

RqtvSearchField.propTypes={
  qFieldExpr:PropTypes.string.isRequired,
  qFieldLabelExpr:PropTypes.string,
  qSortObject:PropTypes.object,
  quickSelectionMode:PropTypes.bool,
  dropdownMenuHeight:PropTypes.number,
  dropdownMenuWidth:PropTypes.number,
  hideHorizontalScrollbar:PropTypes.bool,
}

RqtvSearchField.defaultProps={
  qSortObject:{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 },
  quickSelectionMode:false,
  dropdownMenuHeight:300,
  dropdownMenuWidth:265,
  hideHorizontalScrollbar:false,
}
// showSearch:PropTypes.bool,
// dropdownMenuHeight:PropTypes.number,
// dropdownMenuWidth:PropTypes.number,
// showCaret:PropTypes.bool,
// buttonColor:PropTypes.string,
// buttonFontColor:PropTypes.string,
// buttonStyle:PropTypes.object,
// dropdownMenuStyle:PropTypes.object,
// dropdownMenuItemStyle:PropTypes.object,
// hideHorizontalScrollbar:PropTypes.bool,
// quickSelectionMode:PropTypes.bool,

export default RqtvSearchField
