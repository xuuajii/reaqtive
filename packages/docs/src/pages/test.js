import React, {useEffect, useCallback, useRef} from 'react'
import {useQObjectReducer, useQLayoutReducer} from '@reaqtive/q'
import {useOutsideEventListener} from '@reaqtive/layout'

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
  const qObjectHandler = useQObjectReducer(qObjectDef)
  const qLayoutHandler = useQLayoutReducer(qObjectHandler)
  const qLayout = qLayoutHandler.qLayout
  const qMatrix = qLayout&&qLayout.qListObject.qDataPages[0].qMatrix
  const qArea = qLayout&&qLayout.qListObject.qDataPages[0].qArea
  // console.log(qLayout,qMatrix)
  const {qObject, isSelecting, beginSelections, endSelections} = qObjectHandler
  const {setOnUpdate, applyQLayoutPatch} = qLayoutHandler
  const listboxEl=useRef();

  useOutsideEventListener(listboxEl, ()=>endSelections(1,()=>console.log('demo')), isSelecting)

  const getDataPage = useCallback((qDisplayArea) => {
    qObject&&qObject.getListObjectData('/qListObjectDef',[qDisplayArea])
    .then(qNewDataPage=>{
      //console.log(qNewDataPage)
      applyQLayoutPatch('qLayout/qListObject/qDataPages', qNewDataPage)
    })
    .catch(qErr=>{
      console.log(qErr)
    })
  },[qObject, applyQLayoutPatch])

  useEffect(()=>{
    const qDisplayArea = qArea
    setOnUpdate({fn:()=>getDataPage(qDisplayArea)})
  },[qArea])

  const askDataPage = () => {
    getDataPage({qTop:57, qLeft:0, qHeight:10, qWidth:1})
  }

  const select = (value) => {
    if(isSelecting){
      qObject.selectListObjectValues('/qListObjectDef',[value], true)
    } else {
      beginSelections(() => qObject.selectListObjectValues('/qListObjectDef',[value], true))
    }
  }

  return(
    <div>
      <div>Test</div>
      <div ref={listboxEl} className="container-fluid" style={{maxHeight:200, height:200, overflowY:'auto'}}>
        {qLayoutHandler.qLoading===false&&qLayoutHandler.qError===false&&qMatrix&&
          <ul className="list-group">
            {qMatrix.map((item, index)=>{
              return <li className={`list-group-item ${item[0].qState}`} key={item[0].qElemNumber} onClick={()=>select(item[0].qElemNumber)}>{item[0].qText}</li>
            })}
          </ul>
        }
      </div>
    <button className="btn btn-primary" onClick={askDataPage}>New Data Page</button>
    </div>
  )
}

export default Test
