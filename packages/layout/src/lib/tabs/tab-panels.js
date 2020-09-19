import React,{useState, useEffect} from 'react'
import {Carousel, CarouselPanel} from '../index'
const animationWrapperStyle={
  position:'relative',
  width:'100%',
  height:'100%'
}
const TabPanels = props => {
  const [activeTab, setActiveTab] = useState(props.activeTab)
  const [transitionDirection, setTransitionDirection] = useState('up')
  useEffect(() => {
    setTransitionDirection(props.activeTab>activeTab?'up':'down')
    setActiveTab(props.activeTab)
  }, [props.activeTab])

  const children = React.Children.toArray(props.children)
  const {tabsEl, tabListEl} = props

  return (
    <div style={{position:'relative', height:'100%', display:'flex'}}>
       {
         props.animatedTabs
        ?<Carousel index={activeTab}>
          {children.map((child,index)=>{
            return React.cloneElement(child, (typeof child.type==='function')?{tabsEl, tabListEl}:{})
          })}
        </Carousel>
        :children.map((child,index)=>index===activeTab&&
          <div key={index===activeTab&&index} style={{width:'100%'}}>
            {React.cloneElement(child, (typeof child.type==='function')?{tabsEl, tabListEl}:{})}
          </div>
        )
      }
    </div>
  )
}

export default TabPanels
