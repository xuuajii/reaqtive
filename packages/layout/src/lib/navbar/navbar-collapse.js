//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useRef} from 'react'
// import PropTypes from 'prop-types'
import {useTransition, animated} from 'react-spring'



const NavbarCollapse = props => {

  const collapseEl=useRef()
  const getRefHeight = (ref) => {
    return ref.current?ref.current.getBoundingClientRect().height:0
  }

  //((console.log( collapseEl.current&&collapseEl.current.offsetHeight )
  const transitions = useTransition(props.show, null, {
    enter: ()=> async next =>{
      const height= getRefHeight(collapseEl)
      //console.log(height)
      if(height){
        await next({height:height, overflow:'hidden'})
        await next({  height:"auto", overflow:'visible'})
      }
    },
    leave:()=>async next=>{
      const height= getRefHeight(collapseEl)
      //console.log(height)
      if(height){
        await next({  height:height, overflow:'hidden'})
        await next({height:0, overflow:'hidden'})
      }
    },
    from:{  height:0, overflow:'hidden'},
    unique:true
    })
    return transitions.map(({ item, props:animatedProps, key }) =>
      item&&
      <animated.div className="collapse navbar-collapse show" key={key} style={{...animatedProps}} >
          <div ref={collapseEl}>{props.children}</div>
      </animated.div>
    )

}

export default NavbarCollapse
