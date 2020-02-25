import {useMemo} from 'react'
const qButtonObjectDef = (qLabelExpr, qColorExpr) => useMemo(()=>{return(
  {
    "qInfo": { "qType": "LayoutExpressions" },
    "label":{
      qStringExpression:{
        qExpr:qLabelExpr
      }
    },
    "color":{
      qStringExpression:{
        qExpr:qColorExpr
      }
    },
  })
}, [qLabelExpr, qColorExpr])

export default qButtonObjectDef
