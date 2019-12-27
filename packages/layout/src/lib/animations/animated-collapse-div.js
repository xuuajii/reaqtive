//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useRef} from 'react'
// import PropTypes from 'prop-types'
import {useTransition, animated} from 'react-spring'



const AnimatedCollapseDiv = props => {

  const collapseEl=useRef()
  const getRefHeight = (ref) => {
    return ref.current?ref.current.getBoundingClientRect().height:0
  }
  const height= props.height?props.height:getRefHeight(collapseEl)

  //((console.log( collapseEl.current&&collapseEl.current.offsetHeight )
  const transitions = useTransition(props.show, null, {
    enter: ()=> async next =>{
      if(height){
        await next({height:height, overflow:'hidden', marginTop:-33, opacity:1})
        await next({height:height, overflow:'visible', marginTop:-33, opacity:1})
      }
    },
    leave:()=>async next=>{
      // console.log(height)
      if(height){
        await next({height:height, overflow:'hidden', marginTop:-33, opacity:1})
        await next({height:0, overflow:'hidden', marginTop:0, opacity:0})
      }
    },
    from:{  height:0, overflow:'hidden', marginTop:0, opacity:0},
    unique:true,
    reverse:!(props.show)
    })

    return transitions.map(({ item, props:animatedProps, key }) =>{
      return item&&
        <animated.div className={`collapse show ${props.className}`} key={key} style={{...animatedProps}} >
            <div ref={collapseEl}>{props.children}</div>
        </animated.div>
      }
    )

}

export default AnimatedCollapseDiv
