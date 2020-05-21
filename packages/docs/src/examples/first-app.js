import React from 'react'
import Reaqtive  from '@reaqtive/q'
import {RqtvDropdownFilter, QViz, RqtvVizContainer} from '@reaqtive/components'

import "@reaqtive/components/dist/index.scss";

const qConfig = {                                 //For QS Desktop
    host: '40.113.14.238',                        //localhost
    secure: true,                                 //false
    port: 443,                                    //4848
    prefix: '',                                   //''
    appId: '8aa3a035-0689-4aab-a920-d6722509ed51' //your app file name (e.g. 'Executive dashboard.qvf')
};

const FirstApp = props =>
<div className='container'>
  <Reaqtive
    qConfig={qConfig}
  >
    <RqtvDropdownFilter
      qFieldExpr="Customer"
      dropdownMenuItemStyle={{textTransform:'uppercase'}}
    />
    <QViz
      id="Revenue By Product Group"
      title="Revenue By Product Group"
      chartProps={{
        chartType:'barchart',
        rest: {
          qHyperCubeDef:{
            qDimensions:[{
              "qDef":{
                "qFieldDefs": ["[Product Group Desc]"],
                 "qFieldLabels": ["Product Group Desc"],
                 //"qSortCriterias":[{qSort:1}],
                 "qReverseSort":true
               }
             }],
            qMeasures:[{
              "qDef":{
                "qDef":"Sum([Sales Quantity]*[Sales Price])",
                "qLabel":"Revenue"
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
  </Reaqtive>
</div>
export default FirstApp
