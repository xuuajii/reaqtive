import React, {useContext, useEffect, useRef, useImperativeHandle, forwardRef, useLayoutEffect} from 'react'
import PropTypes from 'prop-types'
import { QApp } from '@reaqtive/q'
import { System } from '@reaqtive/layout'
import {RqtvSpinner} from '../index'
import {useQVizHandler} from '@reaqtive/q'

/**
 * QViz
 *
 * It is a component that allows to retrieve Qlik visualizations.
 * Qlik visualizations can be retrieved by id (if they already exists in the Qlik Sense app) or
 * they can be created on the fly providing the properties to the engine.
 * QViz also provide an imperative handle to inteact with Qlik visualizazion.
 * To access the handle you have to provide a handle to the QViz component
 *
 */


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
    },
    getQViz: () => {
      return qVizRef.current
    }
  }));

  return(
    <div style={{height:props.height, width:'100%'}} ref={qVizWrapperEl}>
      {(qVizHandler.qViz!==null)
        ?<div id={qVizHandler.vizId} style={{height:'100%', width:'100%'}}></div>
        :<RqtvSpinner/>
      }
    </div>
  )
})



QViz.propTypes = {
  /**
   * show/hide the title in Qlik visualization
   *
   */
  showTitle : PropTypes.bool,
  /**
   * the id of the visualization to be retrieved and of the div that will contain it
   *
   */
  id: PropTypes.string.isRequired,
  /**
   * the properties of the object to be created on the fly
   * chartProps must be passed as: {'chartType':'string', 'columns':'array', 'rest':'object'} see this link for details https://help.qlik.com/en-US/sense-developer/February2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/VisualizationAPI/VisualizationAPI.htm
   *
   */
  chartProps: PropTypes.object
}

QViz.defaultProps = {
  showTitle:false
}

export default QViz
