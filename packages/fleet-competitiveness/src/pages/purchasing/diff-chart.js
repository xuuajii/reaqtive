import React from 'react'
import {QViz, RqtvVizContainer} from '@reaqtive/components'

const DiffChart = props => {
  const chartProps=[
    {
      measure:"realIndexVsBenchmark",
      title:"AEA Index vs prev month"
    }
  ]
  return(
    <RqtvVizContainer height={props.height} maximizeElRef={props.maximizeElRef}>
      {chartProps.map((chart, index)=>
        <QViz
          id={index}
          title={chart.title}
          chartProps={{
            chartType:'barchart',
            rest:{
              qHyperCubeDef:{
                qDimensions:[
                  {
                   qDef:{
                     qFieldDefs: [`=if(len(aggr(($(${chart.measure}($(lastMonthSet),FBD,[Vehicle Discounted Price Business])))
                        -
                        ($(${chart.measure}PrevMonth(FBD,[Vehicle Discounted Price Business]))), Model,Version))>0,
                        Model&' '&Version)`
                    ],
                     qFieldLabels: ["Version"],
                     qSortCriterias:[{qSortByExpression:1, qExpression:{qv:`fabs(($(${chart.measure}($(lastMonthSet),FBD,[Vehicle Discounted Price Business])))-($(${chart.measure}PrevMonth(FBD,[Vehicle Discounted Price Business]))))`}}]
                    },
                    qNullSuppression:true
                  }
              ],
                qMeasures:[
                  {
                    qDef:{
                      qDef:`($(${chart.measure}($(lastMonthSet),FBD,[Vehicle Discounted Price Business])))
                        -
                        ($(${chart.measure}PrevMonth(FBD,[Vehicle Discounted Price Business])))`,
                      qLabel:"AEA Index",
                    }
                  }
                ]
              },
              orientation:'horizontal',
              dataPoint:{
                showLabels:true
              },
              color:{
                auto:false,
                mode:"byExpression",
                colorExpression:`=if(($(${chart.measure}($(lastMonthSet),FBD,[Vehicle Discounted Price Business])))
                  -
                  ($(${chart.measure}PrevMonth(FBD,[Vehicle Discounted Price Business])))>0, rgb(68,119,170), rgb(210,210,210))`
              },
              dimensionAxis:{
                show:'labels'
              },
              measureAxis:{
                show:'labels'
              }
            }
          }}
        />
      )}
    </RqtvVizContainer>
  )
}

export default DiffChart
