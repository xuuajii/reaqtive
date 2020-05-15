import React from 'react'
import {RqtvVizContainer, QViz} from '@reaqtive/components'

const ScatterChart = props => {
  return(
    <RqtvVizContainer height={props.height} maximizeElRef={props.maximizeElRef}>
      <QViz
        title="BEA vs AEA matrix"
        id="scatter-chart"
        chartProps={
          {
            chartType:'scatterplot',
            rest:{
              qHyperCubeDef:{
                qDimensions:[
                    {
                     qDef:{
                       qFieldDefs: ["=Model&' '&Version"],
                       qFieldLabels: ["Version"],
                      },
                      qAttributeDimensions: [
                        {
                          qDef: "Brand",
                          id: "colorByAlternative",
                          label: "Brand"
                        }
                      ],
                      qNullSuppression:true
                    },
                 ],
                 qMeasures:[
                   {
                     qDef:{
                       qDef:`$(visualIndexVsBenchmark($(lastMonthSet),FBD,[Vehicle Discounted Price Business]))`,
                       qLabel:"BEA Index Rent",
                     }
                   },
                   {
                     qDef:{
                       qDef:`$(realIndexVsBenchmark($(lastMonthSet),FBD,[Vehicle Discounted Price Business]))`,
                       qLabel:"AEA Index Rent",
                     }
                   }
                ],
              },
              refLine:{
                refLinesX:[
                  {
                    show:true,
                    label:'',
                    paletteColor:{color:'#000'},
                    refLineExpr:{
                      label:'100',
                      value:'100'
                    }
                  }
                ],
                refLinesY:[
                  {
                    show:true,
                    label:'',
                    paletteColor:{color:'#000'},
                    refLineExpr:{
                      label:'100',
                      value:'100'
                    }
                  }
                ]
              },
              dataPoint:{
                bubbleSizes:10
              },
              gridLine:{
                auto:false,
                spacing:0
              },
              color:{
                auto:false,
                mode:'byDimension',
                byDimDef:{
                  "label": "Brand",
                  "key": "Brand",
                  "type": "expression"
                 }
              },
              legend:{
                showTitle:false,

              }
            }
          }
        }
      />
    </RqtvVizContainer>
    )
}

export default ScatterChart
