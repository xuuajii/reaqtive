//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react'
import {useQObjectReducer, useQLayoutReducer, QGenericObject, QListObject} from '@reaqtive/q'
import { Button } from '@reaqtive/layout'
import { RqtvPageHeader } from '@reaqtive/components'
import {useOutsideEventListener} from '@reaqtive/layout'
import Listbox from '../example-components/filters/test-listbox/index'

const qObjectDef = {
  "qInfo": { "qId": `TestProvaRemake`, "qType": "ListObject" },
  "qListObjectDef": {
    "qDef":{
        "qFieldDefs": [ 'Customer' ],
        "qFieldLabels": ['Customer' ],
        "qSortCriterias": [{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 }],
        "qAutoSortByState": { qDisplayNumberOfRows:1 },
        "qLabelExpression": `Test}`,
      },
  "qInitialDataFetch": [ {qTop:0,qLeft:0,qHeight:30,qWidth:1} ],
},
  "label":{
    qStringExpression:{
      qExpr:'=count(distinct Customer)'
    }
  }
}

const Test = props =>{
  const [mounted, setMounted] = useState(true)
  return(
    <div>
      <RqtvPageHeader>
        <div>
          <Button className="btn-primary" onClick={()=>setMounted(true)}>
            MOUNT
          </Button>
          <Button className="btn-primary" onClick={()=>setMounted(false)}>
            UNMOUNT
          </Button>
        </div>
      </RqtvPageHeader>
      <div style={{marginTop:20, marginBottom:20}}>
      {
        mounted&&
        <Listbox unMount={()=>setMounted(false)} mount={()=>setMounted(true)} mounted={mounted} qObjectDef={qObjectDef}/>
      }
      </div>
    </div>
  )
}

export default Test
