//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useRef} from 'react'
// import PropTypes from 'prop-types'
import {useTransition, animated} from 'react-spring'



const AnimatedCollapseDiv = props => {

  const collapseEl=useRef()
  const getRefHeight = (ref) => {
    return ref.current?ref.current.getBoundingClientRect().height:0
  }
  //const height = props.height?props.height:getRefHeight(collapseEl)

  const [height, setHeight] = useState(props.height)
  const [show, setShow] = useState(props.height>0?false:true)
  useEffect(()=>{
    setShow(props.show)
  },[props.show])

  useEffect(()=>{
    if(show===true){
      const rectHeight = collapseEl.current&&collapseEl.current.getBoundingClientRect().height
      const newHeight=props.height?props.height:rectHeight
      setHeight(newHeight)
    }
  },[show, props.height])

  const transitions = useTransition(show, null, {
    enter: ()=> async next =>{
      if(height){
        await next({height:height, overflow:'hidden', marginTop:props.hideTitleWhenExpanded?-33:0, opacity:1})
        await next({height:props.height?height:'auto', overflow:'visible', marginTop:props.hideTitleWhenExpanded?-33:0, opacity:1})
      }
    },
    leave:()=>async next=>{
      // console.log(height)
      if(height){
        await next({height:props.height?height:'auto', overflow:'hidden', marginTop:props.hideTitleWhenExpanded?-33:0, opacity:1})
        await next({height:0, overflow:'hidden', marginTop:0, opacity:0})
      }
    },
    from:{  height:0, overflow:'hidden', marginTop:0, opacity:0},
    unique:true,
    reverse:!show
  })

  return transitions.map(({ item, props:animatedProps, key }) =>{
    return item&&
      <animated.div className={`collapse ${props.className} show `} key={key} style={{...animatedProps}} >
          <div ref={collapseEl}>{props.children}</div>
      </animated.div>
    }
  )

}

export default AnimatedCollapseDiv
