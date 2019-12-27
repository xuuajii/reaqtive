//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect} from 'react'

const useIsMounted = () => {
  const [isMounted, set] = useState(true)
  useEffect(()=>{
    return () => set(false)
  },[])
  return isMounted
}

export default useIsMounted
