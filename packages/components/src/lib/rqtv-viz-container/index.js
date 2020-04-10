//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import {RqtvAppContext} from '../contexts/rqtv-app-context'
import RqtvVizContainerToolbar from './toolbar'
import RqtvVizContainerHeader from './header'
// import { useDebounce } from 'use-debounce';

/**
 * RqtvVizContainer
 *
 * It provide a container to a visualization. It accept multiple children. In case i detects more tha one child,
 * it shows one child at a time and provide a dropdown menu to toggle the desired child.
 * If its children provide exports methods it automatically shows export buttons
 *
 */

const RqtvVizContainer = props => {
  const rqtvAppContext = useContext(RqtvAppContext)
  const activeChartRef = useRef()
  const headerEl = useRef()
  const vizContainerEl = useRef()
  const hasOnlyOneChild = !(Array.isArray(props.children))

  const getItemFromChild = (child) => {
    return({
      id:child.id||child.props.id,
      type:child.type,
      title:child.props.title||child.props.id
    })
  }
  //console.log(activeChartRef.current)
  const items = !(hasOnlyOneChild)?props.children.map(item=>getItemFromChild(item)):[getItemFromChild(props.children)]
  const [activeItem, setActiveItem] = useState(items[0])

  const [activeChart, setActiveChart] = useState(props.children[0]||props.children)
  useEffect(()=>{

    const filterChart = (chart) => {
      if(chart.props.id===activeItem.id){
        return chart
      }
    }
    const chart = hasOnlyOneChild?props.children:props.children.filter(filterChart)[0]
    if (chart.id===null && Array.isArray(props.children)){
      //console.log(chart)
      console.error('if you want to show more than one viz inside a container each viz must have a non-null unique id prop')
    }
    setActiveChart(chart)

  },[activeItem])


  const [showToolbar, setShowToolbar] = useState(false)

  useEffect(()=>{
    activeChartRef.current&&setShowToolbar(true)
  }, [activeChartRef])

  const [maximized, setMaximized] = useState(false)
  const getChartHeight = () => 0.95*((vizContainerEl.current&&vizContainerEl.current.offsetHeight)-(headerEl.current&&headerEl.current.offsetHeight))
  const [chartHeight, setChartHeight] = useState(getChartHeight())
  useEffect(()=>{
    setChartHeight(getChartHeight())
  }, [vizContainerEl.current,headerEl.current])
  useEffect(()=>{
    if(props.maximizeElRef&&props.maximizeElRef.current){
      props.maximizeElRef.current.style.display=maximized
      ?`block`// position:absolute; top:0; left:0; height:100%; width:100%; z-index:300; max-height:100%;`
      :'none';
      const updatedChartHeight=maximized?props.maximizeElRef.current.offsetHeight-headerEl.current.offsetHeight:props.chartHeight
      setChartHeight(updatedChartHeight)
      props.hideScrollWhenMaximized&&rqtvAppContext&&rqtvAppContext.setIsMaximized(maximized)
    }
  },[maximized])

  const toggleMaximize = () => {
    setMaximized((maximized)=>!maximized)
  }

  const vizContainer =
  <div className="viz-container" ref={vizContainerEl} style={{height:maximized?'100%':props.height, border:maximized?0:''}}>
    <RqtvVizContainerHeader
      title={activeItem&&activeItem.title}
      items={items}
      setActiveItem={setActiveItem}
      ref={headerEl}
    >
      {showToolbar&&
        <RqtvVizContainerToolbar
        exportExcel={activeChartRef.current&&activeChartRef.current.exportExcel}
        exportImg={activeChartRef.current&&activeChartRef.current.exportImg}
        exportPdf={activeChartRef.current&&activeChartRef.current.exportPdf}
        showExportExcel={props.showExportExcel}
        showExportPdf={props.showExportPdf}
        showExportImg={props.showExportImg}
        showMaximize={props.maximizeElRef?true:false}
        toggleMaximize={toggleMaximize}
        maximized={maximized}
      />}
    </RqtvVizContainerHeader>
    <div className="viz-container-body">
      { React.cloneElement(activeChart, {ref:activeChartRef, height:isNaN(chartHeight)?0:chartHeight}) }
    </div>
  </div>
  return maximized?ReactDOM.createPortal(vizContainer,props.maximizeElRef.current):vizContainer;
}
RqtvVizContainer.propTypes ={
  /**
   * The height of the container pixels or % can be used
   */
  height:PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Show/hide export to excel button
   */
  showExportExcel:PropTypes.bool,
  /**
   * Show/hide export to pdf button
   */
  showExportPdf:PropTypes.bool,
  /**
   * Show/hide export to img button
   */
  showExportImg:PropTypes.bool,
  /**
   * If true window scrollbar will be hidden when the container is maximized
   */
  hideScrollWhenMaximized:PropTypes.bool,
}

RqtvVizContainer.defaultProps={
  height:300,
  showExportExcel:true,
  showExportPdf:true,
  showExportImg:true,
  hideScrollWhenMaximized:true
}

export default RqtvVizContainer
