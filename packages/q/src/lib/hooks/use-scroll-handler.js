//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect} from 'react'

const useScrollHandler = (scrollPosition, currentDisplayArea, size, visibleListHeight, listItemHeight, buffer, getScrollData) => {
  const [memoizedSize, setMemoizedSize] = useState(size);
  const listHeight = size.qcy*listItemHeight;
  const displayAreaHeight = currentDisplayArea.qHeight*listItemHeight;
  const numOfViewportItems = visibleListHeight/listItemHeight;
  const lastQTop = size.qcy-currentDisplayArea.qHeight;
  const bufferSize=buffer*currentDisplayArea.qHeight;
  const visibleStart = Math.floor(scrollPosition.top / listItemHeight);
  //const visibleEnd = Math.min((visibleStart + numOfViewportItems) - 1, size.qcy);
	//const newQTop = Math.floor(Math.max(0, Math.min(visibleStart - bufferSize, listItemsCount - currentDisplayArea.qHeight)));
  //console.log(scrollPosition, currentDisplayArea, size, visibleListHeight, listItemHeight, 0.2, getScrollData)
  const newQTop = Math.min(Math.max(Math.ceil(scrollPosition.top/listItemHeight)-bufferSize,0),size.qcy-currentDisplayArea.qHeight)
  const topHeight = Math.max(0, (newQTop) * listItemHeight);
  //console.log(topHeight)
  const bottomHeight = newQTop>=lastQTop?0:Math.max(0, listHeight - (topHeight + displayAreaHeight));

  //const fillers={top:topHeight, bottom:bottomHeight}
  const newDisplayArea = ({...currentDisplayArea, qHeight:currentDisplayArea.qHeight===0?30:currentDisplayArea.qHeight, qTop: isNaN(newQTop)?0:newQTop})
  const [qDisplayArea, setQDisplaArea] = useState(currentDisplayArea)
  const [fillers, setFillers] = useState({top:topHeight, bottom:bottomHeight, right:0, left:0})
  useEffect(() => {
    // console.log(newDisplayArea.qTop, currentDisplayArea.qTop)
    const fetchMore=(
          newDisplayArea.qTop+bufferSize>currentDisplayArea.qTop+2*bufferSize
          ||
          (
            (newDisplayArea.qTop>=size.qcy-currentDisplayArea.qHeight)
            &&
            (newDisplayArea.qTop!==currentDisplayArea.qTop)
          )
        )

    const fetchLess=(newDisplayArea.qTop<currentDisplayArea.qTop-bufferSize
          ||
          newDisplayArea.qTop===0 && currentDisplayArea.qTop!==0
        )
    // console.log(fetchLess)

    if(fetchMore||fetchLess||size.qcy!==memoizedSize.qcy||size.qcx!==memoizedSize.qcx||isNaN(fillers.top)){
      setFillers({top:topHeight, bottom:bottomHeight, right:0, left:0})
      setQDisplaArea(newDisplayArea)
      getScrollData(newDisplayArea)
      setMemoizedSize(size);
    }
  },
  [scrollPosition, size, topHeight]);
  return {qDisplayArea, fillers}
}

export default useScrollHandler
