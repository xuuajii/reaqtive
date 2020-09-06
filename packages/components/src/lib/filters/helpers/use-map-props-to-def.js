import  {useMemo} from 'react'
import {normalizeExpression} from '../../helpers'
const useMapPropsToDef = (props) => {


  const {qId, qDataPageHeight} = props
  const {qSortByState, qSortByNumeric, qSortByAscii, qSortByExpression, qState} = props

  const qFieldExpr = normalizeExpression(props.qFieldExpr)
  const qLabelExpr = props.qLabelExpr?props.qLabelExpr:`
    '${props.qFieldExpr} '&if(getSelectedCount(${qFieldExpr},0,${props.qState===""?"":"'"+props.qState+"'"})>0,
      if(count({${props.qState}} distinct ${qFieldExpr})=1 and getSelectedCount(${qFieldExpr},0,${props.qState===""?"":"'"+props.qState+"'"})=1,
        only({${props.qState}} ${qFieldExpr}),
        getSelectedCount(${qFieldExpr},0,${props.qState===""?"":"'"+props.qState+"'"})&' selected'
      )
    )`

  const qObjectDef = useMemo(()=>{
    return props.qObjectDef
    ?props.qObjectDef
    :{
      "qInfo": { "qType": "ListObject" },
      "qListObjectDef": {
        "qStateName":props.qState,
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
