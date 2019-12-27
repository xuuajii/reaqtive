//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types';
import {QComponent} from '@reaqtive/q'
import RqtvListObject from '../rqtv-list-object'
import Layout from './layout'
import {useMapPropsToDef} from '../helpers/index'
const RqtvButtonBar = props =>
{
  const {qFieldExpr, qDataPageHeight, qId} =props
  const {qSortObject} = props//{qSortByNumeric: 1, qSortByAscii: 1 }
  const qObjectDef = useMapPropsToDef({qFieldExpr, qSortObject, qDataPageHeight, qId})
  return(
    <QComponent qObjectDef={qObjectDef}>
      <RqtvListObject quickSelectMode={true}>
        <Layout
          //rqtvListObject={rqtvListObject}
          title={props.title}
          //qLayoutHandler={props.qLayoutHandler}
          //setQLayoutPatcher={props.setQLayoutPatcher}
          //qObject={props.qObject}
          qObjectDef={props.qObjectDef}
          //height={500}
          buttonSize={props.buttonSize}
          qDataPageHeight={qDataPageHeight}
        />
      </RqtvListObject>
    </QComponent>
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
  qSortObject:{ qSortByState: 0, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 1, qSortByLoadOrder: 0, qSortByExpression: 0 },
  buttonSize:'btn-sm',
  qDataPageHeight:5
}

export default RqtvButtonBar
