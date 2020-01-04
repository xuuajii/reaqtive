import React, {useState, useEffect, useCallback, useRef} from 'react'
import {useQObjectReducer, useQLayoutReducer, QGenericObject} from '@reaqtive/q'
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
  const [mounted, setMounted] = useState(true)
  return(
    <div>
      <div>Test</div>
      {
        mounted
        ?<Listbox unMount={()=>setMounted(false)} mount={()=>setMounted(true)} mounted={mounted}/>
        :<button className="btn btn-primary" onClick={()=>setMounted(true)}>MOUNT</button>
      }
    </div>
  )
}

const QListObject = props => {
  const {qObject} = props.qObjectHandler
  const {handleSelections} = props.qSelectionHandler

  const qListObject={
    selectValue: (value) => {
      handleSelections(() => {
        //console.log('select')
        qObject.selectListObjectValues('/qListObjectDef',[value], true)
      } )
    }
  }
  return React.cloneElement(props.children, {...props, qListObject})
}

const Listbox = props =>{
  return(
    <QGenericObject qObjectDef={qObjectDef}>
      <QListObject>
        <Layout {...props}/>
      </QListObject>
    </QGenericObject>
  )
}

const Layout = props => {
  const qLayout = props.qLayoutHandler&&props.qLayoutHandler.qLayout
  const qMatrix = qLayout&&qLayout.qListObject.qDataPages[0].qMatrix
  const qArea = qLayout&&qLayout.qListObject.qDataPages[0].qArea
  // console.log(qLayout,qMatrix)
  const {qObject} = props.qObjectHandler
  const { isSelecting, beginSelections, endSelections} = props.qSelectionHandler
  const {setOnUpdate, applyQLayoutPatch} = props.qLayoutHandler
  const listboxEl=useRef();

  useOutsideEventListener(listboxEl, ()=>endSelections(0), isSelecting)

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
    //console.log('click')
    props.qListObject.selectValue(value)
    // if(isSelecting){
    //   qObject.selectListObjectValues('/qListObjectDef',[value], true)
    // } else {
    //   beginSelections(() => qObject.selectListObjectValues('/qListObjectDef',[value], true))
    // }
  }

  const accept = () => {
    endSelections(1)
    props.unMount()
  }

  const reject = () => {
    endSelections(0)
    props.unMount()
  }

  const toggle = () => {
    props.mounted?props.unMount():props.moount()
  }

  return(
    <>
      <div ref={listboxEl} className="container-fluid" style={{maxHeight:200, height:200, overflowY:'auto'}}>
        <div style={{display:'flex', justifyContent:"space-between"}}>
          <h5>Customer</h5>
          <div>
            {isSelecting&&
              <>
                <button className="btn btn-success" onClick={accept}>ACCEPT</button>
                <button className="btn btn-danger" onClick={reject}>REJECT</button>
              </>
            }
            <button className="btn btn-primary" onClick={toggle}>{props.mounted?'UNMOUNT':'MOUNT'}</button>
          </div>
        </div>
        <div>
        {props.qLayoutHandler.qLoading===false&&props.qLayoutHandler.qError===false&&qMatrix&&
          <ul className="list-group">
            {qMatrix.map((item, index)=>{
              return <li className={`list-group-item ${item[0].qState}`} key={item[0].qElemNumber} onClick={()=>select(item[0].qElemNumber)}>{item[0].qText}</li>
            })}
          </ul>
        }
        </div>
      </div>
      <div className="btn-group">
        <button className="btn btn-primary" onClick={askDataPage}>New Data Page</button>
      </div>
    </>
  )
}

export default Test
