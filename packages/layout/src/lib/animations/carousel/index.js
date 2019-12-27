//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import {useTransition, animated } from 'react-spring'

const CarouselPanel = props => {
  return(
    <animated.div style={{ ...props.style }}>{props.children}</animated.div>
  )
}

const Carousel = props => {
  //const [index, set] = useState(0)
  const transition = useTransition(props.index, p => p, {
    initial: { width:'100%', top:0 , opacity:1, overflow:'hidden'},
    from: { width:'100%',transform: `translate3d(${props.index===1?'':'-'}70%,0,0)`, top:0 , opacity:0, overflow:'hidden'},
    enter: { transform: 'translate3d(0%,0,0)', top:0 , opacity:1, overflow:'hidden'},
    leave: { transform: `translate3d(${props.index===1?'-':''}70%,0,0)`, top:0, position:'absolute', opacity:0, overflow:'hidden' },
  })
  const carouselProps = props
  return(
    <div className="carousel" style={{display:'flex', height:'100%', width:'100%'}}>
     {transition.map(({ item, props, key }) => {
       //const Page = carouselProps.children[item]
       const child = carouselProps.children[item]
       return React.cloneElement(child, {style:props})
     })}
   </div>
  )
}

export {Carousel, CarouselPanel}
