import React from 'react'
import {useSpring, animated} from 'react-spring'

const TabIndicator = props =>{
  const animatedProps = useSpring({...props})
  //console.log(props)
  return <animated.div
  className="tab-indicator"
    style={{
      position:'absolute',
      height:3,
      borderRadius:'2rem',
      bottom:-1,
      ...props,
      ...animatedProps
    }}
  />
}

export default TabIndicator
