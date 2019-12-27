//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import  {useMemo} from 'react'
import {normalizeExpression} from '../../helpers'
const useMapPropsToDef = (props) => {
  const qFieldExpr = normalizeExpression(props.qFieldExpr)
  const qLabelExpr = props.qLabelExpr?props.qLabelExpr:`
    '${props.qFieldExpr} '&if(getSelectedCount(${qFieldExpr})>0,
      if(count(distinct ${qFieldExpr})=1 and getSelectedCount(${qFieldExpr})=1,
        only(${qFieldExpr}),
        getSelectedCount(${qFieldExpr})&' selected'
      )
    )`

  const {qId, qDataPageHeight} = props
  const {qSortByState, qSortByNumeric, qSortByAscii, qSortByExpression} = props
  const qObjectDef = useMemo(()=>{
    return props.qObjectDef
    ?props.qObjectDef
    :{
      "qInfo": { "qId": `'${props.qId}'`, "qType": "ListObject" },
      "qListObjectDef": {
        "qDef": props.qDimensionDef
          ?props.qDimensionDef
          :{
            "qFieldDefs": [ qFieldExpr ],
            "qFieldLabels": [ props.qFieldExpr ],
            "qSortCriterias": [props.qSortObject],
            "qAutoSortByState": { qDisplayNumberOfRows:props.qSortObject.qSortByState },
            "qLabelExpression": `${props.qLabelExpr}`,
          },
      "qInitialDataFetch": [ {qTop:0,qLeft:0,qHeight:props.qDataPageHeight||30,qWidth:1} ],
    },
      "label":{
        qStringExpression:{
          qExpr:qLabelExpr
        }
      },
      "appObjectId": `'${props.qId}'`,
    }
  },[qId, qFieldExpr, qLabelExpr, qDataPageHeight, qSortByState, qSortByNumeric, qSortByAscii, qSortByExpression])
  return qObjectDef
}

export default useMapPropsToDef
