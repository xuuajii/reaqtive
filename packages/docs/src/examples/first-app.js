import React from 'react'
import Reaqtive  from '@reaqtive/q'
import {RqtvDropdownFilter, QViz, RqtvVizContainer} from '@reaqtive/components'

const qConfig = {                                 //For QS Desktop
    host: '40.113.14.238',                        //localhost
    secure: true,                                 //false
    port: 443,                                    //4848
    prefix: '',                                   //''
    appId: '3c4333d5-2053-4c0c-933c-9096b5f76e86' //your app file name (e.g. 'Executive dashboard.qvf')
};

const FirstApp = props =>
<div className='container'>
  <Reaqtive
    qConfig={qConfig}
  >
    <RqtvDropdownFilter
      qFieldExpr="Brand IHS"
      dropdownMenuItemStyle={{textTransform:'uppercase'}}
    />
    <RqtvDropdownFilter
      qFieldExpr="Vehicle"
      dropdownMenuItemStyle={{textTransform:'uppercase'}}
    />
    <QViz
      id="Revenue By SubGroup"
      title="Revenue By SubGroup"
      chartProps={{
        chartType:'barchart',
        rest: {
          qHyperCubeDef:{
            qDimensions:[{
              "qDef":{
                "qFieldDefs": ["[Year]"],
                 "qFieldLabels": ["Year"],
                 //"qSortCriterias":[{qSort:1}],
                 "qReverseSort":true
               }
             }],
            qMeasures:[{
              "qDef":{
                "qDef":"=$(volumes)",
                "qLabel":"Volumes"
              }
            }]
          },
          "showTitles": false,
          "title": "Revenue",
          "barGrouping":{grouping:"stacked"},
          "orientation":'horizontal'
        }
      }}
      height={500}
    />
    {props.children}
  </Reaqtive>
</div>
export default FirstApp
