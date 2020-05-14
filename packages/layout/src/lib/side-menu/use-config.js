//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import {useState, useEffect} from 'react'

const useConfig = (currentScreenType, options) => {
  //options=options?options:{breakPoints:{xxl:0.175,xl:0.2,lg:0.25,default:0.5}, alwaysStaticMain:false}
  //console.log(options)
  const breakPoints = options.breakPoints?options.breakPoints:{xxl:0.2,xl:0.25,lg:0.35,default:0.66}
  const defaultRatio = breakPoints&&breakPoints.default?breakPoints.default:options.defaultRatio
  const alwaysStaticMain = options.alwaysStaticMain

  const [ratio, setRatio] = useState(breakPoints&&breakPoints[currentScreenType]?breakPoints[currentScreenType]:defaultRatio)
  const [staticMain, setStaticMain] = useState()

  useEffect(()=>{
    const updatedRatio = breakPoints&&breakPoints[currentScreenType]?breakPoints[currentScreenType]:defaultRatio
    setRatio(updatedRatio)
  }, [currentScreenType, breakPoints, defaultRatio])

  useEffect(()=>{
    const isStatic = ((ratio===defaultRatio)||(alwaysStaticMain===true))?true:false
    setStaticMain(isStatic)
  },[ratio])

  return {ratio, staticMain}

}

export default useConfig
