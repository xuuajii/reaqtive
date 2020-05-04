//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect} from 'react'

const getFillersTop = (currentTop, itemHeight) => {
  return Math.max(1,currentTop*itemHeight)
}

const getFillersBottom = (topHeight, visibleListHeight, listHeight) => {
  return Math.max(0,listHeight-(topHeight+visibleListHeight))
}

const getTop = (scrollPosition, listItemHeight, lastPossibleTop) => {
  return scrollPosition===0
        ?0
        :(scrollPosition/listItemHeight)>=lastPossibleTop
        ?lastPossibleTop
        :Math.max(0, Math.round(scrollPosition/listItemHeight))
}

const useScrollHandler = (scrollPosition, currentDisplayArea, size, visibleListHeight, listItemHeight, buffer, getScrollData) => {
  const displayAreaHeight = currentDisplayArea.qHeight*listItemHeight;
  const listHeight = size.qcy*listItemHeight
  const bufferSize=buffer*currentDisplayArea.qHeight;

  const [fillers, setFillers] = useState({top:0, left:0, right:0, bottom:0})

  useEffect(()=>{
    const topHeight=getFillersTop(qDisplayArea.qTop, listItemHeight)
    const bottomHeight=getFillersBottom(topHeight, displayAreaHeight, listHeight)
    setFillers({
      ...fillers,
      top:topHeight,
      bottom:bottomHeight
    })
  },[displayAreaHeight, listHeight, listItemHeight])

  const [qDisplayArea, setQDisplaArea] = useState(currentDisplayArea)

  useEffect(()=>{
    const lastPossibleTop = Math.round(size.qcy-(qDisplayArea.qHeight))
    const topRecord = Math.max(0,getTop(scrollPosition.top, listItemHeight, lastPossibleTop))
    const listHeight = Math.floor(visibleListHeight/listItemHeight)
    const fetchLessLimit = (qDisplayArea.qTop+listHeight)-bufferSize
    const fetchMoreLimit = (qDisplayArea.qTop+listHeight)+bufferSize
    if((topRecord>fetchMoreLimit || (topRecord<fetchLessLimit && qDisplayArea.qTop!==0) || (topRecord>=lastPossibleTop))&&topRecord!==qDisplayArea.qTop){
      setQDisplaArea({...qDisplayArea, qTop:topRecord})
    }
  },[scrollPosition.top, qDisplayArea.qTop, qDisplayArea.qHeight, listItemHeight, bufferSize, size, visibleListHeight])

  useEffect(()=>{
    const topHeight=getFillersTop(qDisplayArea.qTop, listItemHeight)
    const bottomHeight=getFillersBottom(topHeight, displayAreaHeight, listHeight)
    getScrollData(qDisplayArea)
    setFillers({...fillers, top:topHeight, bottom:bottomHeight})
  },[qDisplayArea, listItemHeight, listHeight, displayAreaHeight])


  return {qDisplayArea, fillers}
}

export default useScrollHandler
