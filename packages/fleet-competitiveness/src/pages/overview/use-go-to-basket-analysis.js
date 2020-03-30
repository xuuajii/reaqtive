import {useCallback} from 'react'

const useGoToBasketAnalysis = (history, bodyRowValue, productValue) => useCallback((bodyRowValue, productValue) =>{  //(productValue, bodyRowValue) =>
  const queryString = `?selections=Submodel Benchmark:${productValue}&selections=Country:${bodyRowValue}`;
  const link = `${history&&history.location.pathname}/basket-analysis/${queryString}`
  setTimeout(()=>{
    history&&history.push(link)
  }, 200)
},[history, productValue, bodyRowValue])

export default useGoToBasketAnalysis
