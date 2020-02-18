import React from 'react'
import {QViz, RqtvVizContainer} from '@reaqtive/components'

const TrendChart = (props) => {
  const {maximizeElRef}=props
  return(
    <RqtvVizContainer maximizeElRef={maximizeElRef}>
      <QViz
        title={`AEA INDEX TREND`}
        id={props.id+'trend'}
        chartProps={{
          chartType:'linechart',
          chartColumns: [
            {
              "qDef":{
                "qFieldDefs": ["[Year Month]"],
                 "qFieldLabels": ["Month"],
                 "":true
               }
             },
            {
              "qDef":{
                "qFieldDefs": ["[Model]"],
                 "qFieldLabels": ["Model"],
                 "":true
               }
             },
            {
              "qDef":{
                "qDef":`=$(realIndex('',${props.channel},reference))`,
                "qLabel":"Private Index",
                "qNumFormat":{
                  "qType":"A",
                }
              }
            }
          ],
          rest: {
            "showTitles": false,
            "title": "Private Index",
            "qSuppressZero":true,
            "scrollbar":{
              "scrollbar":"none"
            },
            "dataPoint":{
              "showLabels":true
            },
            legend:{
              showTitle:false
            },
            "measureAxis":{
              show:"labels"
            },
            dimensionAxis:{
              show:"labels"
            },
            dataPoint:{
              show:true
            }
          }
        }}
        height={'300px'}
      />
    </RqtvVizContainer>
  )
}


export default TrendChart
