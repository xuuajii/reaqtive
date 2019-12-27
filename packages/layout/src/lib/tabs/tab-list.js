//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import {TabIndicator, Tab} from './index'
import {System} from '../contexts/index'

const TabList = props=> {
  const system = useContext(System)
  const activeTabEl = useRef();
  const children = React.Children.toArray(props.children)

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
    updateIndicator()
  }, [props.activeTab, system.triggerResize])

  return(
    <nav className="nav nav-tabs tab-list" ref={props.tabListEl}>
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
      <TabIndicator {...indicatorPlacement}/>
    </nav>
  )
}

TabList.propTypes ={
  useIcons:PropTypes.bool
}

TabList.defaultProps ={
  useIcons:false
}

export default TabList
