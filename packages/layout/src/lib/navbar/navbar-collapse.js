import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {AnimatedCollapseDiv, System} from '../index'

const NavbarCollapse = props => {
  const system = useContext(System)
  const verticalNavbar = system.windowWidth<system.breakPoints[props.breakPoint]?true:false

  return (
    verticalNavbar===false
    ?<div className={`collapse navbar-collapse show ${props.className}`}>
      {React.Children.toArray(props.children).map(child=>React.cloneElement(child, {verticalNavbar}))}
    </div>
    :<AnimatedCollapseDiv className={`navbar-collapse ${props.className}`} show={props.showCollapse} autoHeight={props.autoHeight}>
      {React.Children.toArray(props.children).map(child=>React.cloneElement(child, {verticalNavbar}))}
    </AnimatedCollapseDiv>
  )
}

export default NavbarCollapse

NavbarCollapse.propTypes={
  className:PropTypes.string,
  breakPoint:PropTypes.string,
  autoHeight:PropTypes.bool
}
NavbarCollapse.defaultProps={
  className:'',
  breakPoint:'lg',
  autoHeight:true
}

// const NavbarCollapse = props => {
//
//   const collapseEl=useRef()
//   const getRefHeight = (ref) => {
//     return ref.current?ref.current.getBoundingClientRect().height:0
//   }
//
//   //((console.log( collapseEl.current&&collapseEl.current.offsetHeight )
//   const transitions = useTransition(props.show, null, {
//     enter: ()=> async next =>{
//       const height= getRefHeight(collapseEl)
//       //console.log(height)
//       if(height){
//         await next({height:height, overflow:'hidden'})
//         await next({  height:"auto", overflow:'visible'})
//       }
//     },
//     leave:()=>async next=>{
//       const height= getRefHeight(collapseEl)
//       //console.log(height)
//       if(height){
//         await next({  height:height, overflow:'hidden'})
//         await next({height:0, overflow:'hidden'})
//       }
//     },
//     from:{  height:0, overflow:'hidden'},
//     unique:true
//     })
//     return transitions.map(({ item, props:animatedProps, key }) =>
//       item&&
//       <animated.div className="collapse navbar-collapse show" key={key} style={{...animatedProps}} >
//           <div ref={collapseEl}>{props.children}</div>
//       </animated.div>
//     )
//
// }
