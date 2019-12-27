//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useDebounce } from 'use-debounce';
import {useScrollHandler} from '@reaqtive/q'
import {useOutsideEventListener} from '@reaqtive/layout'
import DropdownToolbar from './dropdown-toolbar'
import {RqtvSpinner} from '../../loading/index'


const Body = props =>{
  const { data, size, rqtvListObject} = props;
  const bodyEl = useRef();

  const handleScroll = () => {
    setScrollPosition({top:bodyEl.current.scrollTop, left:bodyEl.current.scrollLeft});
  }
  const [scrollPosition, setScrollPosition] = useState({top:0, left:0})
  const [debouncedScrollPosition] = useDebounce(scrollPosition, 50);
  const visilbleListHeight = bodyEl.current?bodyEl.current.clientHeight:0;
  const getScrollData = (qDisplayArea) =>{
    if(props.rqtvListObject){
      props.rqtvListObject.getNewDataPage(qDisplayArea)
    }
  }

  const handleClick = (e)=>{
    const callback = () => {if(props.rqtvListObject.isSelecting===false){
      bodyEl.current.scrollTop=0
      getScrollData({...data.qArea, qTop:0})
    }}
    props.rqtvListObject.selectValue(Number(e.target.dataset.qElemNumber), callback)
  }
  // const clickAwayCallback = (rqtvListObject.isSelecting===false)?()=>props.hideDropdownMenu():()=>endSelections(false)
  // const clickAway = useOutsideEventListener(props.dropdownMenuEl, clickAwayCallback, props.show)
  //
  const [isEndingSelections, setIsEndingSelections] = useState(null)
  useEffect(()=>{
    if(isEndingSelections===false){
      props.hideDropdownMenu()
    }
  },[isEndingSelections])

  useEffect(()=>{
    if(props.qUpdating===false && isEndingSelections===true){
      setIsEndingSelections(false)
    }
  },[props.qUpdating])

  const endSelections = (qAccept) => {
    setIsEndingSelections(true)
    rqtvListObject.endSelections(qAccept)
  }

  const scrollHandler = useScrollHandler(debouncedScrollPosition, data.qArea, size, visilbleListHeight, props.dropdownMenuItemHeight, 0.2,getScrollData)
  //const showSpinner = props.rqtvListObject.isGettingScrollData||(debouncedScrollPosition.top!==0&&Math.abs(1-debouncedScrollPosition.top/scrollPosition.top)>0.2)

  return(
    <ul onScroll={handleScroll} ref={bodyEl} style={{width:props.width, height:props.dropdownMenuHeight, overflowX: 'hidden', overflowY:'auto'}}>
      {props.showToolbar&&
        <DropdownToolbar
          searchListObjectFor={rqtvListObject.searchListObjectFor}
          abortListObjectSearch={rqtvListObject.abortListObjectSearch}
          acceptListObjectSearch={rqtvListObject.acceptListObjectSearch}
          endSelections={endSelections}
          isSelecting={rqtvListObject.isSelecting}
          quickSelectMode={props.quickSelectMode}
          showSearch={props.showSearch}
        />
      }
      {/*showSpinner&&<RqtvSpinner isSticky={true}/>*/}
      <div style={{position:'absolute', top:40, width:'100%'}}>
      <div hidden={!scrollHandler.fillers.top} style={{height:scrollHandler.fillers.top}}></div>
      {props.data.qMatrix.map(record =>
        <li key={record[0].qElemNumber}
          className={`dropdown-item ${record[0].qState}`}
          data-q-elem-number={record[0].qElemNumber}
          onClick={(e)=>handleClick(e)} style={{...props.dropdownMenuItemStyle,height:props.dropdownMenuItemHeight}}
        >
          {record[0].qText}
        </li>
      )}
      <div hidden={!scrollHandler.fillers.bottom} style={{height:scrollHandler.fillers.bottom}}>
      </div>
    </div>
  </ul>
)}

Body.propTypes = {
  showToolbar:PropTypes.bool,
  width:PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
Body.defaultProps = {
  showToolbar:true,
  width:300
}

export default Body
