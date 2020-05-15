import React, {useState, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import { useScrollHandler } from '@reaqtive/q'
import { useDebouncedCallback } from 'use-debounce';

const QScrollHandler = props => {
  const [scrollPosition, setScrollPosition] = useState({top:0, left:0})

  const [updateScrollPosition] = useDebouncedCallback(
    // function
    (target) => {
      //setValue(e);
      setScrollPosition({top:target.scrollTop, left:0})
    },
    // delay in ms
    props.debounceDelay
  );

  const bodyEl = useRef()
  const loadedEl=useRef()
  const loadedElHeight = loadedEl.current&&loadedEl.current.getBoundingClientRect().height
  const {qDataPages, visibleHeight, qSize, getDataPage} = props;
  const itemQty = qDataPages.reduce((total, item) => total + item['qArea']['qHeight'], 0)
  const listItemHeight = Math.round(loadedElHeight/itemQty)

  const scrollHandler = useScrollHandler(scrollPosition, qDataPages[0].qArea, qSize, visibleHeight, listItemHeight, 0.2, getDataPage)
  const bodyElementRef = props.bodyEl!==undefined?props.bodyEl:bodyEl

  return(
    <div style={{height:visibleHeight,minHeight:visibleHeight,maxHeight:visibleHeight, overflowY:'auto', ...props.style}} onScroll={(e)=>updateScrollPosition(e.target)} ref={bodyElementRef}>
      <div style={{maxHeight:scrollHandler.fillers.top||0,minHeight:scrollHandler.fillers.top||0, height:scrollHandler.fillers.top||0}}/>
      <div ref={loadedEl} >
        {props.children}
      </div>
      <div style={{maxHeight:scrollHandler.fillers.bottom||0, minHeight:scrollHandler.fillers.bottom||0, height:scrollHandler.fillers.bottom||0}}/>
    </div>
  )
}

export default QScrollHandler


QScrollHandler.propTypes = {
  debounceDelay:PropTypes.number
}

QScrollHandler.defualtProps={
  debounceDelay:200
}
