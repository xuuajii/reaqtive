import {useState, useEffect, useRef} from 'react'

const getFillersTop = (currentTop, itemHeight) => {
  return Math.max(0,currentTop*itemHeight)
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

  const qDisplayArea = useRef(currentDisplayArea)
  const [fillers, setFillers] = useState({top:0,bottom:0,left:0,right:0})

  const listHeight = size.qcy*listItemHeight
  const displayAreaHeight = currentDisplayArea.qHeight*listItemHeight;

  useEffect(()=>{
    const topHeight=getFillersTop(currentDisplayArea.qTop, listItemHeight)
    const bottomHeight=getFillersBottom(topHeight, displayAreaHeight, listHeight)
    setFillers({
      ...fillers,
      top:topHeight,
      bottom:bottomHeight
    })
  },[displayAreaHeight, listHeight, listItemHeight, currentDisplayArea])

  const prevScroll=useRef({top:0,left:0})
  useEffect(()=>{
    const bufferSize=buffer*currentDisplayArea.qHeight;
    const lastPossibleTop = Math.ceil(size.qcy-(currentDisplayArea.qHeight))
    const visibleStart = Math.max(0,getTop(scrollPosition.top, listItemHeight, lastPossibleTop))
    const visibleListItems = visibleListHeight/listItemHeight
    const visibleEnd = visibleStart+visibleListItems
    const displayStart = currentDisplayArea.qTop
    const displayEnd=currentDisplayArea.qTop+currentDisplayArea.qHeight
    const shouldFetchLess = Math.max(0,visibleStart-bufferSize)<displayStart||(scrollPosition.top===0&&currentDisplayArea.qTop===0)
    const shouldFecthMore = Math.min(visibleEnd+bufferSize)>displayEnd||(visibleStart>=lastPossibleTop&&currentDisplayArea.qTop!==lastPossibleTop)
    const topHeight=getFillersTop(visibleStart, listItemHeight)
    const bottomHeight=displayStart<lastPossibleTop?getFillersBottom(topHeight, displayAreaHeight, listHeight):0
    if((shouldFecthMore && scrollPosition.top>prevScroll.current.top)){
      qDisplayArea.current={...qDisplayArea.current, qTop:visibleStart}
      getScrollData(qDisplayArea.current)
      //prevScroll.current={top:Math.max(0,visibleStart)}
    }
    if(shouldFetchLess && scrollPosition.top<prevScroll.current.top){
      qDisplayArea.current={...qDisplayArea.current, qTop:Math.max(0,visibleStart-bufferSize)}
      getScrollData(qDisplayArea.current)
    }
    prevScroll.current={...prevScroll.current,top:scrollPosition.top}
  },[scrollPosition.top,currentDisplayArea,listItemHeight,visibleListHeight,buffer,displayAreaHeight,listHeight,size])

  // useEffect(()=>{
  //   console.log()
  //   getScrollData(qDisplayArea.current)
  // },[qDisplayArea.current])


  return {qDisplayArea:qDisplayArea.current, fillers}
}

export default useScrollHandler
