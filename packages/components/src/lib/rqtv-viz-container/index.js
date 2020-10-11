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
 * It provides a container to a visualization. It accepts multiple children. In case i detects more tha one child,
 * it shows one child at a time and a dropdown menu to toggle the desired child.
 * If its children provide exports methods it automatically shows export buttons
 *
 */

const RqtvVizContainer = props => {
  const rqtvAppContext = useContext(RqtvAppContext)
  const passedVizRef = props.vizRef
  const selfVizRef = useRef()
  const vizRef = passedVizRef?passedVizRef:selfVizRef
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
  //console.log(vizRef.current)
  const items = !(hasOnlyOneChild)?props.children.map(item=>getItemFromChild(item)):[getItemFromChild(props.children)]
  const [activeItem, setActiveItem] = useState(items[0])

  const [activeViz, setActiveViz] = useState(props.children[0]||props.children)
  useEffect(()=>{

    const filterViz = (viz) => {
      if(viz.props.id===activeItem.id){
        return viz
      }
    }
    const viz = hasOnlyOneChild?props.children:props.children.filter(filterViz)[0]
    if (viz.id===null && Array.isArray(props.children)){
      //console.log(viz)
      console.error('if you want to show more than one viz inside a container each viz must have a non-null unique id prop')
    }
    setActiveViz(viz)

  },[activeItem])


  const [showToolbar, setShowToolbar] = useState(false)

  useEffect(()=>{
    vizRef.current&&setShowToolbar(true)
  }, [vizRef.current])


  const getVizHeight = () => 0.95*((vizContainerEl.current&&vizContainerEl.current.offsetHeight)-(headerEl.current&&headerEl.current.offsetHeight))
  const [vizHeight, setVizHeight] = useState(getVizHeight())

  const [maximized, setMaximized] = useState(false)
  useEffect(()=>{
    if(props.maximizeElRef&&props.maximizeElRef.current){
      props.maximizeElRef.current.style.display=maximized
      ?`block`// position:absolute; top:0; left:0; height:100%; width:100%; z-index:300; max-height:100%;`
      :'none';
      const updatedVizHeight=maximized?props.maximizeElRef.current.offsetHeight-headerEl.current.offsetHeight:props.vizHeight
      setVizHeight(updatedVizHeight)
      props.hideScrollWhenMaximized&&rqtvAppContext&&rqtvAppContext.setIsMaximized(maximized)
    }
  },[maximized])

  const toggleMaximize = () => {
    if(typeof props.onMaximize === 'function'){
      props.onMaximize()
    }
    setMaximized((maximized)=>!maximized)
  }

  const vizContainer =
  <div className={`viz-container ${props.className}`} ref={vizContainerEl} style={{height:maximized?'100%':props.height, border:maximized?0:''}}>
    <RqtvVizContainerHeader
      title={activeItem&&activeItem.title}
      items={items}
      setActiveItem={setActiveItem}
      ref={headerEl}
      className={`${props.containerClassName}`}
    >
      {showToolbar&&
        <RqtvVizContainerToolbar
        exportExcel={vizRef.current&&vizRef.current.exportExcel}
        exportImg={vizRef.current&&vizRef.current.exportImg}
        exportPdf={vizRef.current&&vizRef.current.exportPdf}
        showExportExcel={props.showExportExcel}
        showExportPdf={props.showExportPdf}
        showExportImg={props.showExportImg}
        showMaximize={props.maximizeElRef?true:false}
        toggleMaximize={toggleMaximize}
        maximized={maximized}
      />}
    </RqtvVizContainerHeader>
    <div className="viz-container-body">
      { React.cloneElement(activeViz, {ref:vizRef, height:isNaN(getVizHeight())?0:getVizHeight()}) }
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
  /**
   * Container css classes
   */
  className:PropTypes.string,
  /**
   * Container header css classes
   */
  containerClassName:PropTypes.string,
  /**
   * Ref to the currently shown Viz
   */
  vizRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object({ current: PropTypes.oneOfType([PropTypes.instanceOf(Element),PropTypes.func] })
  ])
}

RqtvVizContainer.defaultProps={
  height:300,
  showExportExcel:true,
  showExportPdf:true,
  showExportImg:true,
  hideScrollWhenMaximized:true,
  className:'',
  containerClassName:'',
}

export default RqtvVizContainer
