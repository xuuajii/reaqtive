import React, { useState, useEffect, useContext } from 'react'
import {System} from '../contexts/system'

const useMediaQuery = (query) => {
  const system = useContext(System)
  const [match, setMatch] = useState()
  const supportMediaQueries = typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
  useEffect(()=>{
    if(supportMediaQueries){
      console.log(query)
      const match = window.matchMedia(query)
      setMatch(match.matches)
    }
  },
  [system.windowWidth, query, supportMediaQueries])
  return supportMediaQueries?match:undefined
}

export default useMediaQuery
