import React, {useState, useEffect, useRef, useContext,useCallback, useMemo } from 'react'
import {useSpring, animated} from 'react-spring'
import PropTypes from 'prop-types'
import {RqtvSearchField} from '@reaqtive/components'
import {System, Button, Icon, chevronLeft, chevronRight, Tabs, TabList, Tab} from '@reaqtive/layout'
import './tabs.scss'
const TabsExample = props => {
  return(
    <div className="tabs-new">
      <Tabs>
        <TabList animated={true} scrollable={true} justifiyContent="between" shadow style={{maxWidth:700}} fixedTabWidth>
          <Tab label={"Tab 1"}/>
          <Tab label={"Tab 4 Lungo"}/>
          <Tab label={"Tab 5 Lungo"}/>
          <Tab label={"Tab 6 Moooooooooooooooolto Lungo"}/>
          <Tab label={"Tab 7 Lungo"}/>
        </TabList>
      </Tabs>
      <RqtvSearchField qFieldExpr="Line Desc 1" qState="comparison" clickAwayAccept={true}/>
    </div>
  )
}
export default TabsExample

// ///////////////////////////////
// const Tabs = props =>{
//   const tabListEl = useRef();
//   const tabsEl = useRef();
//   const [activeTab, setActiveTab] = useState(props.defaultActiveTab)
//
//   useEffect(()=>{
//     props.onActiveTabChange&&props.onActiveTabChange(activeTab, [])
//   }, [activeTab, props])
//   const children = React.Children.toArray(props.children)
//   return(
//     <div className={`tabs ${props.className}`} style={{position:'relative',...props.style}} ref={tabsEl}>
//     {
//       children.map(child=>
//       React.cloneElement(
//         child,
//         {animatedTabs:props.animatedTabs, setActiveTab:setActiveTab, activeTab:activeTab, tabListEl:tabListEl, tabsEl:tabsEl}
//         )
//       )
//     }
//     </div>
//   )
// }
//
// Tabs.propTypes = {
//   className:PropTypes.string,
//   style:PropTypes.object,
//   defaultActiveTab:PropTypes.number,
//   onActiveTabChange:PropTypes.func,
//   animatedTabs:PropTypes.bool
// }
//
// Tabs.defaultProps = {
//   className:'',
//   style:{},
//   defaultActiveTab:0,
//   onActiveTabChange:()=>true,
//   animatedTabs:false
// }
//
// // export default Tabs
// ////////////////////////
// ///////////////////////
// const Tab = props => {
//   const handleClick = () => {
//     props.setActiveTab(props.index)
//     props.onClick&&props.onClick()
//   }
//   const activeTabEl=props.isActive?props.activeTabEl:null
//
//   const style={
//     ...props.style
//   }
//   const activeClass = () => props.isActive? 'active' : ''
//   const Icon = () => <div className={`tab-icon ${activeClass()}`}>{props.icon||props.label[0]}</div>
//   return props.children
//     ?<span onClick={handleClick}>{props.children}</span>
//     :<div
//           className={`nav-link tab ${props.className} ${activeClass()}`}
//           style={{...style}}
//           onClick={handleClick}
//           ref={activeTabEl}
//       >
//         {props.useIcons&&<Icon/>}
//           <span className="tab-label">{props.label}</span>
//       </div>
// }
//
// Tab.propTypes = {
//   className:PropTypes.string,
//   style:PropTypes.object,
// }
//
// Tab.defaultProps = {
//   className:'',
//   style:{},
// }
//
//
// // export default Tab
// //
// const useScrollContainer = (containerRef, scrollRef, options) => {
//   options = {direction:'horizontal', animate:false, ...options}
//   const containerEl = containerRef.current || {}
//   const scrollEl = scrollRef.current || {}
//
//   const [scrollState, setScrollState] = useState({})
//
//   const updateScrollState = useCallback(()=>{
//     // const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, offsetWidth } = scrollEl.current||{};
//     const scrollSize  = scrollEl&&scrollEl.offsetWidth;
//     const containerScrollPosition = containerEl&&containerEl.scrollLeft;
//     const containerSize = containerEl&&containerEl.offsetWidth;
//     const showScroll = scrollSize>containerSize
//     const showScrollLess = showScroll && containerScrollPosition!==0
//     const showScrollMore = showScroll && containerScrollPosition<scrollSize-containerSize
//     const scrollPagesQty = scrollSize/containerSize
//     setScrollState({
//         showScroll,
//         showScrollLess,
//         showScrollMore,
//         scrollPagesQty,
//         scrollDelta:containerSize,
//         scrollSize,
//         containerSize
//       })
//   },[scrollEl, containerEl])
//
//   useEffect(()=>{
//     updateScrollState()
//   },[updateScrollState])
//
//   const [animateScroll, setAnimatedScroll] = useSpring(() => ({ scrollPosition: 0 }))
//
//   const scroll = (delta) => {
//     const scrollDelta = delta//scrollState.containerSize*(direction==='more'?1:-1)*(options.animate?1:0.25)
//     const newPosition=containerEl.scrollLeft+scrollDelta
//     if(options.animate){
//       setAnimatedScroll({
//         scrollPosition: newPosition,
//         reset: true,
//         from: { scrollPosition: containerEl.scrollLeft },
//         onFrame: props => containerEl.scrollLeft=props.scrollPosition,
//       })
//     } else {
//       containerEl.scrollLeft=newPosition
//     }
//   }
//
//   const scrollMore = () => scrollState.showScrollMore&&scroll(scrollState.scrollDelta)
//   const scrollLess = () => scrollState.showScrollLess&&scroll(-scrollState.scrollDelta)
//   const handleScroll = (e) => {
//     updateScrollState()
//   }
//
//   return {...scrollState, scrollMore, scrollLess, handleScroll}
// }
//
// const ScrollableContainer = props => {
//   const {containerEl, scrollableEl, animate} = props
//   const {showScroll, showScrollLess, showScrollMore, scrollMore, scrollLess, handleScroll} = useScrollContainer(containerEl, scrollableEl, {animate:animate})
//
//   return(
//     <div className={`scrollable-container ${props.className}`} onScroll={(e)=>handleScroll(e)}>
//       <Button onClick={scrollLess}>
//         {(showScroll&&showScrollLess)&&<Icon type={chevronLeft}/>}
//       </Button>
//       {props.children}
//       <Button onClick={scrollMore}>
//         {(showScroll&&showScrollMore)&&<Icon type={chevronRight}/>}
//       </Button>
//     </div>
//   )
// }
//
// const TabList = props=> {
//   const {useTabIndicator, tabListEl, animated, preventScroll} = props
//   const system = useContext(System)
//   const activeTabEl = useRef();
//   const scrollableRef = useRef()
//   const children = React.Children.toArray(props.children)
//   const tabsWidth = tabListEl.current&&tabListEl.current.offsetWidth
//
//   const updateIndicator = () =>{
//     if(activeTabEl.current){
//       setIndicatorPlacement({
//         left:activeTabEl.current.offsetLeft,
//         width:activeTabEl.current.offsetWidth,
//         top:activeTabEl.current.offsetHeight-2,
//       })
//     }
//   }
//
//   const [indicatorPlacement, setIndicatorPlacement] = useState()
//   useEffect(()=>{
//     useTabIndicator&&updateIndicator()
//   }, [props.activeTab, system.windowWidth, tabsWidth, useTabIndicator])
//
//   const Layout = useMemo((layoutProps)=>(layoutProps)=>{
//     return(
//       <nav className={`tab-list ${props.className}`} style={layoutProps.style} ref={tabListEl}>
//         <ul className="nav nav-tabs" ref={scrollableRef}>
//         {
//           children.map((child, index)=>{
//             const additionalProps =  {
//               setActiveTab:props.setActiveTab,
//               isActive:props.activeTab===index,
//               index:index,
//               useIcons:props.useIcons
//             }
//             return typeof child.type === "function"
//             ?React.cloneElement(child, additionalProps.isActive?{...additionalProps, activeTabEl:activeTabEl}:additionalProps)
//             :<Tab {...additionalProps} key={child.key} {...child.props}>{child}</Tab>
//           })
//         }
//         {useTabIndicator&&<TabIndicator {...layoutProps.indicatorPlacement}/>}
//         </ul>
//       </nav>
//     )},[props, useTabIndicator, scrollableRef, tabListEl])
//
//   return(
//     preventScroll
//     ?<div className={`tab-list-wrapper`} style={{overflow:'hidden'}}>
//       <Layout indicatorPlacement={indicatorPlacement} style={{overflow:'hidden', ...props.style}}/>
//     </div>
//     :<ScrollableContainer className={`tab-list-wrapper`} scrollableEl={scrollableRef} containerEl={tabListEl} animate={animated}>
//       <Layout indicatorPlacement={indicatorPlacement} style={{...props.style}}/>
//     </ScrollableContainer>
//   )
// }
//
// TabList.propTypes ={
//   className:PropTypes.string,
//   style:PropTypes.object,
//   useIcons:PropTypes.bool,
//   preventScroll:PropTypes.bool,
//   useTabIndicator:PropTypes.bool,
//   animated:PropTypes.bool
// }
//
// TabList.defaultProps ={
//   className:'',
//   style:{},
//   useIcons:false,
//   useTabIndicator:true,
//   preventScroll:false,
//   animated:false
// }
//
// // export default TabList
//
// /////////////////////////////
//
// const TabIndicator = props =>{
//   const animatedProps = useSpring({...props})
//   return <animated.div
//   className="tab-indicator"
//     style={{
//       position:'absolute',
//       height:2,
//       borderRadius:'2rem',
//       ...props,
//       ...animatedProps
//     }}
//   />
// }
//
// export default TabIndicator
