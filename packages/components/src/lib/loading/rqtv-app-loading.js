//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import {useSpring, animated} from 'react-spring'
import {containerStyle} from './rqtv-app-renderer-style'
import {Progress} from '@reaqtive/layout'

const AnimatedNumber = (props) => {
  const animatedProps = useSpring({ number: props.number, from: { number: 0 } })
  const style = {
    backgroundColor:props.backgroundColor,
    fontSize:props.fontSize,
    padding:'1rem',
    ...props.style,
  }

  return (
    <animated.span
      className='rqtv-app-loading'
      style={style}>
      {animatedProps.number.interpolate(x => `${x.toFixed(0)}%`)}
    </animated.span>
  )
}

const RqtvAppLoading = props =>{
  return(
    <div style={{...containerStyle}}>
      <div style={{display:'flex', justifyContent:'center',}}>
        <AnimatedNumber number={props.value}/>
      </div>
      <Progress value={props.value} height={props.height}/>
    </div>
  )
}

export default RqtvAppLoading
