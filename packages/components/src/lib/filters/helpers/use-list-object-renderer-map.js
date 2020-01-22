//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect} from 'react'
const useListObjectRendererMap = (qLayoutHandler, qObjectHandler) => {
  const [rendererProps, set] = useState({loading:true,error:false,noData:false})
  useEffect(()=>{
    const{qLoading,qError,qLayout}=qLayoutHandler
    const qDataPages = ((qLayout&&qLayout.qListObject.qDataPages[0]))

    set({
      loading:qLoading,
      error:qError,
      noData:!(qDataPages)||(qDataPages&&qDataPages.qMatrix.length===0)||qDataPages===null,
      reload:qObjectHandler.reloadObject
    })
    //return ()=>set(null)
  },[qLayoutHandler, qObjectHandler.reloadObject])
  return rendererProps
}

export default useListObjectRendererMap
