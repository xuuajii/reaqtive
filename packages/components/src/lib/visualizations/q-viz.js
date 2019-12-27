//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext, useEffect, useRef, useImperativeHandle, forwardRef, useLayoutEffect} from 'react'
import PropTypes from 'prop-types'
import { QApp } from '@reaqtive/q'
import { System } from '@reaqtive/layout'
import {RqtvSpinner} from '../index'
import {useQVizHandler} from '@reaqtive/q'

const QViz = forwardRef((props, ref) => {

  const qAppHandler = useContext(QApp)
  const system = useContext(System)
  const qVizWrapperEl = useRef()
  const qVizHandler = useQVizHandler(qAppHandler.qApp, props.id, props.chartProps)
  const qVizRef = useRef(qVizHandler.qViz)

  useEffect(()=>{
    if(qVizHandler.qVizLoading===false && props.showTitle===false && !(props.chartProps&&props.chartProps.rest.showTitles===true)){
      qVizHandler.qViz.setOptions({showTitles:false});
    }
    qVizRef.current=qVizHandler.qViz
  }, [qVizHandler.qViz])

  useEffect(()=>{
    //console.log(1)
    setTimeout(()=> resize(), 300)
  },[system])

  const resize = () => {
    qVizRef.current&&qVizRef.current.resize()
  }

  const exportExcel = () => {
    qVizRef&&qVizRef.current.exportData({format:'CSV_T', state: 'A'}).then(function (link) {
      window.open(link);
    });
  }

  const exportImg = () => {
    const settings = { format: 'png', height: qVizWrapperEl.current.offsetHeight, width: qVizWrapperEl.current.offsetWidth }
    qVizRef&&qVizRef.current.exportImg(settings).then(function (link) {
      window.open(link);
    });
  }

  const exportPdf = () => {
    const settings = { documentSize: 'a4', aspectRatio: 2, orientation: "landscape" }
    qVizRef&&qVizRef.current.exportPdf(settings).then(function (link) {
      window.open(link);
    });
  }

  useImperativeHandle(ref, () => ({
    exportExcel: () => {
      exportExcel()
    },
    exportImg: () =>{
      exportImg()
    },
    exportPdf: () =>{
      exportPdf()
    }
  }));

  return(
    <div style={{height:props.height, width:'100%'}} ref={qVizWrapperEl}>
      {(qVizHandler.qViz!==null)
        ?<div id={props.id} style={{height:'100%', width:'100%'}}></div>
        :<RqtvSpinner/>
      }
    </div>
  )
})



QViz.propTypes = {
  showTitle : PropTypes.bool
}

QViz.defaultProps = {
  showTitle:false
}

export default QViz
