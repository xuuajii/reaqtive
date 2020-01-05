//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useRef, useEffect} from 'react'
import { useScrollHandler } from '@reaqtive/q'

const QScrollHandler = props => {
  const [scrollPosition, setScrollPosition] = useState({top:0, left:0})
  const updateScrollPosition = (e) => {
    setScrollPosition({top:e.target.scrollTop, left:0})
  }

  const loadedEl=useRef()
  const loadedElHeight = loadedEl.current&&loadedEl.current.getBoundingClientRect().height
  const {qDataPages, visibleHeight, qSize, getDataPage} = props;
  const itemQty = qDataPages.reduce((total, item) => total + item['qArea']['qHeight'], 0)
  const listItemHeight = loadedElHeight/itemQty

  const scrollHandler = useScrollHandler(scrollPosition, qDataPages[0].qArea, qSize, visibleHeight, listItemHeight, 0.2, getDataPage)

  return(
    <div style={{height:visibleHeight, minHeight:visibleHeight, maxHeight:visibleHeight, overflowY:'auto'}} onScroll={(e)=>updateScrollPosition(e)}>
      <div style={{height:scrollHandler.fillers.top||0}}/>
        <div ref={loadedEl}>
          {props.children}
        </div>
      <div style={{height:scrollHandler.fillers.bottom||0}}/>
    </div>
  )
}

export default QScrollHandler
