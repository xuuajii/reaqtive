import React, {useState, useEffect} from 'react'
import {useDebounce} from 'use-debounce'

const rectMap = new WeakMap()

function manageRects(entries) {
  for(let entry of entries){
    const setter = rectMap.get(entry.target)
    setter(entry.contentRect)
  }
}

// Babel changes `global` to `window` for client-side code
const observer = 'ResizeObserver' in global && new ResizeObserver(manageRects)

const useResize = (element) => {
  const [rect, setRect] = useState()
  useEffect(()=>{
    if(!element){
      return
    } else {
      rectMap.set(element, setRect)
      observer.observe(element)
    }
    return ()=>{
      observer.unobserve(element)
      rectMap.delete(element)
    }
  },[element])
  const [debouncedRect] = useDebounce(rect,300)
  return debouncedRect
}

export default useResize
