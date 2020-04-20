import React from 'react'
import {QViz, RqtvVizContainer} from '@reaqtive/components'

const TrendChart = props => {
  return(
    <RqtvVizContainer height={props.height} maximizeElRef={props.maximizeElRef}>
      <QViz
        id={'trend'+props.chartProps.measure}
        title={props.chartProps.title}
        chartProps={{
          chartType:'linechart',
          rest:{
            qHyperCubeDef:{
              qDimensions:[
                {
                 qDef:{
                   qFieldDefs: ["[Year Month]"],
                   qFieldLabels: ["Year Month"],
                  },
                  qNullSuppression:true
                },
                {
                 qDef:{
                   qFieldDefs: [`=Model`],
                   qFieldLabels: ["Version"],
                  },
                  qNullSuppression:true
                }
            ],
              qMeasures:[
                {
                  qDef:{
                    qDef:`($(${props.chartProps.measure}('',FBD,[Vehicle Discounted Price Business])))`,
                    qLabel:"AEA Index",
                  }
                }
              ]
            },
            dataPoint:{
              show:true
            },
            dimensionAxis:{
              show:'labels'
            },
            measureAxis:{
              show:'labels'
            },
            legend:{
              showTitle:false
            }
          }
        }}
      />
    </RqtvVizContainer>
  )
}

export default TrendChart
