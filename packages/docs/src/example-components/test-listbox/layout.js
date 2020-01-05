//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React, {useEffect, useRef} from 'react'
import {useOutsideEventListener} from '@reaqtive/layout'

const Layout = props => {
  const qLayout = props.qLayoutHandler&&props.qLayoutHandler.qLayout
  const qMatrix = qLayout&&qLayout.qListObject.qDataPages[0].qMatrix
  const qArea = qLayout&&qLayout.qListObject.qDataPages[0].qArea
  // console.log(qLayout,qMatrix)
  const {qObject} = props.qObjectHandler
  const {qListObject} = props
  const { isSelecting, beginSelections, endSelections} = props.qSelectionHandler
  const {setOnUpdate, applyQLayoutPatch} = props.qLayoutHandler
  const listboxEl=useRef();

  useOutsideEventListener(listboxEl, ()=>endSelections(0), isSelecting)

  useEffect(()=>{
    const qDisplayArea = qArea
    setOnUpdate({fn:()=>qListObject.getDataPage(qDisplayArea)})
  },[qArea])

  const askDataPage = () => {
    qListObject.getDataPage({qTop:57, qLeft:0, qHeight:10, qWidth:1})
  }

  const select = (value) => {
    qListObject.selectValue(value)
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

export default Layout
