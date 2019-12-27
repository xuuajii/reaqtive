//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import { useRef } from 'react'
import _ from 'lodash'

const useDeepCompareMemo = (value) => {
  const ref = useRef()
  if(!_.isEqual(value, ref.current)){
    ref.current = value
  }
  return ref.current
}

export default useDeepCompareMemo
