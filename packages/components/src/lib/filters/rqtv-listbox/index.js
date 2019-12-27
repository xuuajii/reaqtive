//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {forwardRef} from 'react'
import PropTypes from 'prop-types';
import Layout from './layout'
import {QComponent} from '@reaqtive/q'
import RqtvListObject from '../rqtv-list-object'
import {useMapPropsToDef} from '../helpers/index'

const RqtvListboxFwdRef = (props, ref) =>
{
  const {qFieldExpr, qSortObject, qId, qLabelExpr} = props
  const qObjectDef = useMapPropsToDef({qFieldExpr, qSortObject, qId, qLabelExpr})

  return(
    <QComponent qObjectDef={qObjectDef}>
      <RqtvListObject>
        <Layout
          //rqtvListObject={rqtvListObject}
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
          focus={props.focus}
        />
      </RqtvListObject>
    </QComponent>
  )
}
const RqtvListbox =forwardRef(RqtvListboxFwdRef)

RqtvListbox.propTypes={
  qFieldExpr:PropTypes.string.isRequired,
  qFieldLabelExpr:PropTypes.string,
  qSortObject:PropTypes.object,
  showHeader:PropTypes.bool,
  showHeaderButtonbar:PropTypes.bool,
  showListboxDropdownMenu:PropTypes.bool,
  alwaysShowSearch:PropTypes.bool,
  height:PropTypes.number,
  listItemHeight:PropTypes.number,
  titleAction:PropTypes.func,
  headerStyle:PropTypes.object,
  titleStyle:PropTypes.object,
  listStyle:PropTypes.object,
  itemStyle:PropTypes.object,
  focus:PropTypes.bool,
}

RqtvListbox.defaultProps={
  showHeader:true,
  showHeaderButtonbar:false,
  showListboxDropdownMenu:true,
  alwaysShowSearch:false,
  qSortObject:{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 },
  height:500,
  listItemHeight:46,
  focus:true,
  titleAction:()=>false,
  headerStyle:{},
  titleStyle:{},
  listStyle:{},
  itemStyle:{}
}

export default RqtvListbox
