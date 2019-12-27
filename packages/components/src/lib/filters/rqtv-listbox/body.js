//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React,{useState} from 'react'
import { useDebounce } from 'use-debounce';
import {useScrollHandler} from '@reaqtive/q'
import {RqtvSpinner} from '../../loading/index'

const Body = props => {
  const {bodyEl} = props;
  const [scrollPosition, setScrollPosition] = useState({top:0, left:0})
  const [debouncedScrollPosition] = useDebounce(scrollPosition, 100);
  const visilbleListHeight = bodyEl.current?bodyEl.current.clientHeight:0;
  const handleScroll = () => {
    setScrollPosition({top:bodyEl.current.scrollTop, left:bodyEl.current.scrollLeft});
  }
  const handleClick = (e)=>{
    const callback = () => {if(props.rqtvListObject.isSelecting===false){
      bodyEl.current.scrollTop=0
      getScrollData({...props.data.qArea,qTop:0})
    }}
    props.rqtvListObject.selectValue(Number(e.target.dataset.qElemNumber),callback)

  }

  const getScrollData = (qDisplayArea) =>{
    if(props.rqtvListObject)
    {
      // props.setQLayoutPatcher({
      //   path:'qLayout/qListObject/qDataPages',
      //   getQLayoutPatch:(callback)=>
        props.rqtvListObject.getNewDataPage(qDisplayArea)
      // })
    }
  }
  const scrollHandler = useScrollHandler(debouncedScrollPosition, props.data.qArea, props.size, visilbleListHeight, props.listItemHeight, 0.2, getScrollData)

  //const showSpinner = props.rqtvListObject.isGettingScrollData||(debouncedScrollPosition.top!==0&&Math.abs(1-debouncedScrollPosition.top/scrollPosition.top)>0.5)
  return (
    <>
      <div className="rqtv-listbox-body" style={{...props.listStyle, height:props.height, maxHeight:props.height, minHeight:props.height, overflow:'auto',}} ref={bodyEl} onScroll={handleScroll}>
      {/*showSpinner&&<RqtvSpinner isSticky={true}/>*/}
          <ul className="list-group">
            <li hidden={!scrollHandler.fillers.top} style={{height:scrollHandler.fillers.top}}></li>
            {props.data.qMatrix.map(row=>
                <li
                  className={`list-group-item ${row[0].qState}`}
                  key={row[0].qElemNumber}
                  data-q-elem-number={row[0].qElemNumber}
                  onClick={(e)=>handleClick(e)}
                  style={{...props.itemStyle, height:props.listItemHeight}}
                  title={row[0].qText}
                >
                  {row[0].qText}
                </li>
            )}
            <li hidden={!scrollHandler.fillers.bottom} style={{height:scrollHandler.fillers.bottom}}></li>
          </ul>
      </div>
    </>
  )
}

export default Body
