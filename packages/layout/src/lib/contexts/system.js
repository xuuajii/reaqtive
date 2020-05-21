import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useDebounce } from 'use-debounce';


const System = React.createContext()

const SystemProvider = (props) => {

  const calculateScreenType = (width) => {
    //console.log(width>=props.breakPoints.xl)
    switch(true){
      case width >= props.breakPoints.xxl:
          return 'xxl'
        //break;
      case width >= props.breakPoints.xl:
          return 'xl'
        //break;
      case width >= props.breakPoints.lg:
          return 'lg'
        //break;
      case width >= props.breakPoints.md:
          return 'md'
        //break;
      case width >= props.breakPoints.sm:
          return 'sm'
        //break;
      default:
        return 'xs'
    }
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [debouncedWindowWidth] = useDebounce(windowWidth, 100);
  useEffect(()=>{
    const handleWindowWidth = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleWindowWidth);
    return ()=>window.removeEventListener("resize", handleWindowWidth)
  },[])
  const [screenType, setScreenType] = useState(calculateScreenType(window.innerWidth))

  useEffect(()=>{
    setScreenType(calculateScreenType(window.innerWidth))
  }, [debouncedWindowWidth])
  //handle html Overflow
  const html = () => document.getElementsByTagName('html')[0]
  const hideOverflow = () => {
    html().style.overflow ='hidden'
  }
  const showOverflow = () => {
    html().style.overflow ='auto'
  }

  return (
    <System.Provider value={{ windowWidth, screenType, breakPoints:props.breakPoints, hideOverflow, showOverflow, getAppMainNode:html}}>
      {props.children}
    </System.Provider>
  )
}
SystemProvider.propTypes={
  breakPoints:PropTypes.object
}
SystemProvider.defaultProps={
  breakPoints:{
    sm:350,
    md:576,
    lg:768,
    xl:992,
    xxl:1200
  }
}

export  {System, SystemProvider}
