import React from 'react'
import {useSpring, animated} from 'react-spring'

const TabIndicator = props =>{
  const animatedProps = useSpring({...props})
  //console.log(props)
  return <animated.div
  className="tab-indicator"
    style={{
      position:'absolute',
      height:2,
      borderRadius:'2rem',
      ...props,
      ...animatedProps
    }}
  />
}

export default TabIndicator
