//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import { useState, useEffect } from 'react'

const useQVizHandler = (qApp, id, chartProps) => {
  const qVizInitialState = {qVizLoading:true, qViz:null}
  const [qVizHandler, setQVizHandler] = useState(qVizInitialState)

  if(chartProps && qVizHandler.qVizLoading===true){
    qApp&&qApp.visualization.create(
      chartProps.chartType,
      chartProps.chartColumns,
      chartProps.rest
    )
    .then(qViz => setQVizHandler({qVizLoading:false, qViz:qViz}))
  }

  if(id && qVizHandler.qVizLoading===true && !(chartProps)){
    qApp&&qApp.visualization.get(id)
    .then(qViz => setQVizHandler({qVizLoading:false, qViz:qViz}))
  }

  useEffect(()=>{
    if(qVizHandler.qViz){
      qVizHandler.qViz.show(id)
    }
  }, [qVizHandler, id])
  return(qVizHandler)
}

export default useQVizHandler
