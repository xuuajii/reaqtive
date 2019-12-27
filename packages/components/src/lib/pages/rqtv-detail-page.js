//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React,{useState, useEffect, useContext, useMemo} from 'react'
import PropTypes from 'prop-types'
import {Route, useLocation, useHistory, useParams} from 'react-router-dom'
import {RqtvBreadcrumb} from '../index'
import {useTriggers} from '@reaqtive/q'
import {useQObjectHandler} from '@reaqtive/q'
import {useQLayoutHandler} from '@reaqtive/q'
import {QDoc} from '@reaqtive/q'
import {RqtvRenderer} from '../index'


const RqtvDetailPage = props => {
  return(
    <Route path={props.masterPath+'/detail/:detailFieldValue'}>
      <RqtvDetail field={props.field} masterPath={props.masterPath}>
        {props.children}
      </RqtvDetail>
    </Route>
  )
}


const RqtvDetail = props => {
  const history = useHistory()
  const params = useParams()

  const triggerDone = useTriggers([{type:'fieldSelection', params:{fieldName:props.field, value:params.detailFieldValue}}])
  const fieldCountDef = useMemo(()=>{return(
    {
      "qInfo": { "qType": "LayoutExpressions" },
      "fieldCount":{
        qStringExpression:{
          qExpr:`count(distinct ${props.field})`
        }
      }
    })
  }, [props.field])
  const qDoc = useContext(QDoc)
  const qObjectHandler = useQObjectHandler(qDoc.qDoc, fieldCountDef)
  const qLayoutHandler = useQLayoutHandler(qObjectHandler.qObject)
  const fieldCount = qLayoutHandler.qLayout&&qLayoutHandler.qLayout.fieldCount
  useEffect(()=>{
    if(fieldCount!=='1' && fieldCount!==null){
      history.push(props.masterPath)
    }
  },[fieldCount])
  return(
    <RqtvRenderer loading={qLayoutHandler.qLoading} error={qLayoutHandler.qError}>
      {props.children}
    </RqtvRenderer>
  )
}

RqtvDetailPage.propTypes = {
  field:PropTypes.string.isRequired
}

export default RqtvDetailPage
