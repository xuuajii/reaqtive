//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types';
import Layout from './layout'
import {QComponent} from '@reaqtive/q'
import RqtvListObject from '../rqtv-list-object'
import {useMapPropsToDef} from '../helpers/index'


const RqtvSearchField = props =>
{
  const {qFieldExpr, qSortObject, qId} = props
  const qObjectDef = useMapPropsToDef({qFieldExpr, qSortObject, qId})
  // console.log(props)
  return(
    <QComponent qObjectDef={qObjectDef}>
      <RqtvListObject>
        <Layout
          //rqtvListObject={rqtvListObject}
          title={props.title||props.qFieldExpr}
          //qLayoutHandler={props.qLayoutHandler}
          showHeader={props.showHeader}
          //setQLayoutPatcher={props.setQLayoutPatcher}
          //qObject={props.qObject}
          height={props.height}
          listItemHeight={props.listItemHeight}
          showHeaderButtonbar={props.showHeaderButtonbar}
          showListboxDropdownMenu={props.showListboxDropdownMenu}
          alwaysShowSearch={props.alwaysShowSearch}
          titleAction={props.titleAction}
          headerStyle={props.headerStyle}
          titleStyle={props.titleStyle}
          listStyle={props.listStyle}
          itemStyle={props.itemStyle}
        />
      </RqtvListObject>
    </QComponent>
  )
}

RqtvSearchField.propTypes={
  qFieldExpr:PropTypes.string.isRequired,
  qFieldLabelExpr:PropTypes.string,
  qSortObject:PropTypes.object,
  height:PropTypes.number,
  listItemHeight:PropTypes.number,
  listStyle:PropTypes.object,
  itemStyle:PropTypes.object
}

RqtvSearchField.defaultProps={
  qSortObject:{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 },
  height:150,
  listItemHeight:46,
  listStyle:{},
  itemStyle:{}
}

export default RqtvSearchField
