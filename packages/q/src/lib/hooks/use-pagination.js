import {useState, useEffect} from 'react'

const usePagination = (currentDisplayArea, qSize, getScrollData) => {
  const lastPage = currentDisplayArea?Math.ceil(qSize.qcy/currentDisplayArea.qHeight):0;
  const initialPage = currentDisplayArea?Math.ceil(currentDisplayArea.qTop/currentDisplayArea.qHeight)+1:0;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const newQTop = currentDisplayArea?(currentPage-1)*currentDisplayArea.qHeight:0

  const newDisplayArea = {...currentDisplayArea, qTop:newQTop}
  useEffect(()=>{
    if(newQTop!==currentDisplayArea.qTop){
      getScrollData(newDisplayArea)
    }
  },[currentPage])
  return {currentPage, lastPage, newDisplayArea, setCurrentPage}
}

export default usePagination
