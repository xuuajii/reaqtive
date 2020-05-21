import React, {useState, useEffect, useRef} from 'react'
// import PropTypes from 'prop-types'
import {useTransition, animated} from 'react-spring'



const AnimatedCollapseDiv = props => {

  const collapseEl=useRef()
  const getRefHeight = (ref) => {
    return ref.current?ref.current.getBoundingClientRect().height:0
  }

  const [height, setHeight] = useState(props.height)

  useEffect(()=>{
    if(props.show===true){
      const rectHeight = collapseEl.current&&collapseEl.current.getBoundingClientRect().height
      const newHeight=props.height?props.height:rectHeight
      setHeight(newHeight)
    }
  },[props.show, props.height])

  const transitions = useTransition(props.show, null, {
    enter: ()=> async next =>{
      if(height){
        await next({height:height, overflow:'hidden', marginTop:props.hideTitleWhenExpanded?-33:0, opacity:1})
        await next({height:props.autoHeight===true?'auto':height, overflow:'visible', marginTop:props.hideTitleWhenExpanded?-33:0, opacity:1})
      }
    },
    leave:()=>async next=>{
      if(height){
        await next({height:height, overflow:'hidden', marginTop:props.hideTitleWhenExpanded?-33:0, opacity:1})
        await next({height:0, overflow:'hidden', marginTop:0, opacity:0})
      }
    },
    update: ()=> async next =>{
      if(height){
        await next({height:height, overflow:'hidden', marginTop:props.hideTitleWhenExpanded?-33:0, opacity:1})
        await next({height:props.autoHeight===true?'auto':height, overflow:'visible', marginTop:props.hideTitleWhenExpanded?-33:0, opacity:1})
      }
    },
    from:{  height:0, overflow:'hidden', marginTop:0, opacity:0 },
    unique:true,
    reverse:!props.show
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
