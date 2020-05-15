import React from 'react'
import {QViz, RqtvVizContainer} from '@reaqtive/components'

const CompareChart = (props) =>{
  const {maximizeElRef}=props
  return(
    <RqtvVizContainer maximizeElRef={maximizeElRef}>
      <QViz
        title={`AEA INDEX COMPARE`}
        id={props.id}
        chartProps={{
          chartType:'barchart',
          rest: {
            "qHyperCubeDef":{
              qDimensions:[{
                "qDef":{
                  "qFieldDefs": ["[Model]"],
                   "qFieldLabels": ["Model"],
                   "qSortCriterias":[
                     {
                       qSortByExpression: 1,
                       qExpression: {
                         qv: `if([Model]=[Model Benchmark],0,avg([Vehicle Visual Price]))`
                       }
                     }
                   ]
                 }
               }],
               qMeasures:[{
                 "qDef":{
                   "qDef":`=dual(($(realIndex($(lastMonthSet),${props.channel},reference))),($(realIndex($(lastMonthSet),${props.channel},reference))-100))`,
                   "qLabel":"Private Index",
                   // "qNumFormat":{
                   //   qType:"A",
                   //   qFmt:"###0,000"
                   // },
                   //"numFormatFromTemplate":true,
                   "isCustomFormatted":true
                 }
               }],
               qInterColumnSortOrder:[0,1]
            },
            "showTitles": false,
            "title": "Private Index",
            "qSuppressZero":true,
            "dataPoint":{
              "showLabels":true
            },
            "measureAxis":{
              show:"none"
            },
            dimensionAxis:{
              show:"labels"
            }
          }
        }}
        height={'300px'}
      />
    </RqtvVizContainer>
  )
}

export default CompareChart
