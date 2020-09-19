import React, {useState, useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import {TabIndicator, Tab} from './index'
import {System} from '../contexts/index'

const TabList = props=> {
  const {useTabIndicator} = props
  const system = useContext(System)
  const activeTabEl = useRef();
  const children = React.Children.toArray(props.children)
  const tabsWidth = props.tabListEl.current&&props.tabListEl.current.offsetWidth
  const updateIndicator = () =>{
    if(activeTabEl.current){
      setIndicatorPlacement({
        left:activeTabEl.current.offsetLeft,
        width:activeTabEl.current.offsetWidth,
        top:activeTabEl.current.offsetHeight-1,
      })
    }
  }

  const [indicatorPlacement, setIndicatorPlacement] = useState()
  useEffect(()=>{
    useTabIndicator&&updateIndicator()
  }, [props.activeTab, system.windowWidth, tabsWidth, useTabIndicator])

  return(
    <nav className={`nav nav-tabs tab-list ${props.className}`} style={props.style} ref={props.tabListEl}>
      {
        children.map((child, index)=>{
          const additionalProps =  {
            setActiveTab:props.setActiveTab,
            isActive:props.activeTab===index,
            index:index,
            useIcons:props.useIcons
          }
          return typeof child.type === "function"
          ?React.cloneElement(child, additionalProps.isActive?{...additionalProps, activeTabEl:activeTabEl}:additionalProps)
          :<Tab {...additionalProps} key={child.key} {...child.props}>{child}</Tab>
        })
      }
      {useTabIndicator&&<TabIndicator {...indicatorPlacement}/>}
    </nav>
  )
}

TabList.propTypes ={
  className:PropTypes.string,
  style:PropTypes.object,
  useIcons:PropTypes.bool,
  useTabIndicator:PropTypes.bool
}

TabList.defaultProps ={
  className:'',
  style:{},
  useIcons:false,
  useTabIndicator:true
}

export default TabList
