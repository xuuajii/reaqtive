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
