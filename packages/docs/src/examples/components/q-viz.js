import React from 'react'
import {QViz} from '@reaqtive/components'

const MyQVizExamples = () =>
  <>
    <MyQVizFromApp/>
    <MyQVizOnTheFly/>
  </>


const MyQVizFromApp = props => {
  return(
    <QViz
      id="QYthJs"
      height={250}
    />
  )
}

const MyQVizOnTheFly = props =>{
  return(
    <QViz
      id="VizExample1"
      chartProps={{
        chartType:'barchart',
        chartColumns: [
          {
            "qDef":{
              "qFieldDefs": ["[Product Sub Group Desc]"],
               "qFieldLabels": ["Product Sub Group"],
               "qSortCriterias":[{qSortByExpression:1,qExpression:"=Sum([Sales Quantity]*[Sales Price])"}],
               "qReverseSort":true
             }
           },
          "Customer Type",
          {
            "qDef":{
              "qDef":"=Sum([Sales Quantity]*[Sales Price])",
              "qLabel":"Revenue"
            }
          }
        ],
        rest: {
          "showTitles": false,
          "title": "Revenue",
          "barGrouping":{grouping:"stacked"}
        }
      }}
      height={300}
    />
  )
}

export default MyQVizExamples
