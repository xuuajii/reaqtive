import React, {useState, useEffect} from 'react'
import {useTransition, animated } from 'react-spring'

const CarouselPanel = props => {
  return(
    <animated.div style={{ ...props.style }}>{props.children}</animated.div>
  )
}

const Carousel = props => {
  //const [index, set] = useState(0)
  const [currentTab, setCurrentTab] = useState(props.index)
  const [signs, setSigns] = useState({from:'-', leave:''})
  useEffect(()=>{
    if(props.index>currentTab){
      setSigns({from:'', leave:'-'})
    } else {
      setSigns({from:'-', leave:''})
    }
    setCurrentTab(props.index)
  },[props.index])
  const transition = useTransition(currentTab, p => p, {
    initial: { width:'100%', top:0 , opacity:1, overflow:'hidden'},
    from: { width:'100%',transform: `translate3d(${signs.from}70%,0,0)`, top:0 , opacity:0, overflow:'hidden'},
    enter: { transform: 'translate3d(0%,0,0)', top:0 , opacity:1, overflow:'hidden'},
    leave: { transform: `translate3d(${signs.leave}70%,0,0)`, top:0, position:'absolute', opacity:0, overflow:'hidden' },
  })
  const carouselProps = props
  return(
    <div className="carousel" style={{display:'flex', height:'100%', width:'100%'}}>
     {transition.map(({ item, props, key }) => {
       //const Page = carouselProps.children[item]
       const child = carouselProps.children[item]
       return <CarouselPanel key={key} style={props}>{child}</CarouselPanel>
     })}
   </div>
  )
}

export {Carousel, CarouselPanel}
