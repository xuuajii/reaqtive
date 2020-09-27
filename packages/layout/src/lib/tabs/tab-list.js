import React, {useState, useEffect, useRef, useContext, useMemo, useLayoutEffect, useCallback, forwardRef } from 'react'
import PropTypes from 'prop-types'
import {TabIndicator, Tab} from './index'
import {ScrollableContainer, useResize} from '../index'
import {System} from '../contexts/index'

const TabList = props=> {
  const {useTabIndicator, tabListEl, animated, scrollable, activeTab, setActiveTab, useIcons, shadow, justifiyContent,
        fixedTabWidth, className, style} = props
  const system = useContext(System)
  const activeTabEl = useRef();
  const scrollableRef = useRef()
  const scrollContainerRef=useRef()
  const children = React.Children.toArray(props.children)

  const rect = useResize(tabListEl.current)
  const tabsWidth = rect&&rect.width

  const updateIndicator = useCallback(() =>{
    if(activeTabEl.current){
      setIndicatorPlacement({
        left:activeTabEl.current.offsetLeft,
        width:activeTabEl.current.offsetWidth,
        //top:activeTabEl.current.offsetHeight-2,
      })
    }
  })

  const [indicatorPlacement, setIndicatorPlacement] = useState()
  useEffect(()=>{
    useTabIndicator&&updateIndicator()
  }, [activeTab, system.windowWidth, tabsWidth, useTabIndicator])

  useEffect(()=>{
    if(activeTabEl.current&&scrollContainerRef.current&&scrollable===true){
      scrollContainerRef.current.scrollTo(activeTabEl.current.offsetLeft)
    }
    if(activeTabEl.current&&tabListEl.current&&scrollable===false){
      tabListEl.current.scrollLeft=activeTabEl.current.offsetLeft
    }
  },[activeTab])


  return(
    <Scroller
      ref={scrollContainerRef}
      shadow={shadow}
      scrollableRef={scrollableRef}
      tabListEl={tabListEl}
      animate={animated}
      scrollable={scrollable}
      displayContent={justifiyContent==='start'||justifiyContent==='end'?justifiyContent:'center'}
    >
      <nav className={`tab-list ${scrollable?'':'overflow-hidden'} flex-grow-1 ${className}`} style={style} ref={tabListEl}>
        <ul className={`nav nav-tabs flex-grow-1 ${'justify-content-'+justifiyContent}`} ref={scrollableRef}>
          {children.map((child, index)=>{
              const additionalProps =  {
                setActiveTab:setActiveTab,
                isActive:activeTab===index,
                index:index,
                useIcons:useIcons,
                fixedWidth:fixedTabWidth
              }
              return typeof child.type === "function"
              ?React.cloneElement(child, additionalProps.isActive?{...additionalProps, activeTabEl:activeTabEl}:additionalProps)
              :<Tab  key={child.key} {...child.props} {...additionalProps} >{child}</Tab>
            })
          }
          {useTabIndicator&&<TabIndicator {...indicatorPlacement} />}
        </ul>
      </nav>
    </Scroller>
  )
}

function Scroller(props, ref){
  const {scrollable, scrollableRef, tabListEl, animate, shadow, displayContent} = props
  return(
    scrollable
    ?<ScrollableContainer ref={ref} className={`tab-list-wrapper ${'justify-content-'+displayContent} ${shadow?'rqtv-shadow':''}`} scrollableEl={scrollableRef} containerEl={tabListEl} animate={animate}>
      {props.children}
    </ScrollableContainer>
    :<div className={`tab-list-wrapper ${'justify-content-'+displayContent} ${shadow?'rqtv-shadow':''}`}>
      {props.children}
    </div>
  )
}

Scroller = forwardRef(Scroller)

TabList.propTypes ={
  className:PropTypes.string,
  style:PropTypes.object,
  useIcons:PropTypes.bool,
  scrollable:PropTypes.bool,
  useTabIndicator:PropTypes.bool,
  animated:PropTypes.bool,
  justifiyContent:PropTypes.string,
  tabListEl: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  activeTab:PropTypes.number,
  setActiveTab:PropTypes.func,
  shadow:PropTypes.bool,
  fixedTabWidth:PropTypes.bool
}

TabList.defaultProps ={
  className:'',
  style:{},
  useIcons:false,
  useTabIndicator:true,
  scrollable:true,
  animated:false,
  justifiyContent:'center',
  fixedTabWidth:false
}

export default TabList
