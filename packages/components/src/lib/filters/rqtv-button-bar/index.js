import React from 'react'
import PropTypes from 'prop-types';
import { QGenericObject } from '@reaqtive/q'
import Layout from './layout'
import {useMapPropsToDef} from '../helpers/index'
import RqtvListObject from '../rqtv-list-object'

const RqtvButtonBar = props => {
  const {qFieldExpr, qSortObject, qLabelExpr, qId, qDataPageHeight} = props
  const qObjectDef = useMapPropsToDef({qFieldExpr, qSortObject, qLabelExpr, qId, qDataPageHeight})
  return(
    <QGenericObject qObjectDef={qObjectDef} quickSelectionMode={true} toggle={props.toggle}>
      <RqtvListObject {...props} >
        <Layout {...props} />
      </RqtvListObject>
    </QGenericObject>
  )
}

RqtvButtonBar.propTypes={
  qFieldExpr:PropTypes.string.isRequired,
  qFieldLabelExpr:PropTypes.string,
  qSortObject:PropTypes.object,
  buttonSize:PropTypes.string,
  qDataPageHeight:PropTypes.number,
}

RqtvButtonBar.defaultProps={
  qSortObject:{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 1, qSortByLoadOrder: 0, qSortByExpression: 0 },
  buttonSize:'btn-sm',
  qDataPageHeight:5,
  toggle:true
}

export default RqtvButtonBar
