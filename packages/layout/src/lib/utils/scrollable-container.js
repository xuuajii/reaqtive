import React, {useState, useEffect, useRef, useCallback, useContext, useImperativeHandle, forwardRef} from 'react'
import PropTypes from 'prop-types'
import {useSpring} from 'react-spring'
import {Button, Icon, chevronLeft, chevronRight, System, useResize} from '../index'

export const useScrollContainer = (wrapperRef, containerRef, scrollRef, options) => {
  const system = useContext(System)
  const wrapperEl = wrapperRef
  const containerEl = containerRef.current
  const scrollEl = scrollRef.current

  const rect = useResize(wrapperEl.current)
  const containerWidth = rect&&rect.width

  const [scrollState, setScrollState] = useState({})

  const updateScrollState = useCallback(()=>{
    // const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, offsetWidth } = scrollEl.current||{};
    const scrollSize  = scrollEl&&scrollEl.offsetWidth;
    const containerScrollPosition = containerEl&&containerEl.scrollLeft;
    const containerSize = containerWidth||containerEl&&containerEl.offsetWidth;
    const showScroll = scrollSize>containerSize
    const showScrollLess = showScroll===true && containerScrollPosition!==0
    const showScrollMore = showScroll===true && containerScrollPosition<scrollSize-containerSize
    const scrollPagesQty = scrollSize/containerSize
    setScrollState({
        showScroll,
        showScrollLess,
        showScrollMore,
        scrollPagesQty,
        scrollDelta:containerSize,
        scrollSize,
        containerSize,
        scrollPosition:containerScrollPosition
      })
  },[scrollEl, containerEl, system.windowWidth, containerWidth])

  useEffect(()=>{
    updateScrollState()
  },[updateScrollState])

  const [animatedScroll, setAnimatedScroll] = useSpring(() => ({ scrollPosition: 0 }))

  const scroll = (delta) => {
    if(containerEl){
      const scrollDelta = delta//scrollState.containerSize*(direction==='more'?1:-1)*(options.animate?1:0.25)
      const newPosition=containerEl&&(containerEl.scrollLeft+scrollDelta)
      if(options.animate){
        setAnimatedScroll({
          scrollPosition: newPosition,
          reset: true,
          from: { scrollPosition: containerEl.scrollLeft },
          onFrame: props => containerEl&&(containerEl.scrollLeft=props.scrollPosition),
        })
      } else {
        containerEl&&(containerEl.scrollLeft=newPosition)
      }
    }
  }

  const scrollMore = () => scrollState.showScrollMore&&scroll(scrollState.scrollDelta)
  const scrollLess = () => scrollState.showScrollLess&&scroll(-scrollState.scrollDelta)
  const scrollTo = (position) => scroll(position-scrollState.scrollPosition)
  const handleScroll = (e) => {
    updateScrollState()
  }

  return {...scrollState, scrollMore, scrollLess, handleScroll, scrollTo}
}

const ScrollableContainer = (props, ref) => {
  const wrapperEl = useRef()
  const {containerEl, scrollableEl, animate} = props
  const {showScroll, showScrollLess, showScrollMore, scrollMore, scrollLess, handleScroll, scrollTo} = useScrollContainer(wrapperEl, containerEl, scrollableEl,{animate:animate, vertical:props.vertical})
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    scrollTo: (newScrollPosition) => {
      scrollTo(newScrollPosition);
    }
  }));
  return(
    <div className={`scrollable-container ${props.vertical?'vertical':'horizontal'} ${props.className}`} ref={wrapperEl} onScroll={(e)=>handleScroll(e)}>
      {showScroll&&
        <Button className={'btn-scroll'} onClick={scrollLess} style={{height:'100%'}}>
          {(showScrollLess)&&<Icon type={chevronLeft} style={{height:'100%'}}/>}
        </Button>
      }
        {props.children}
      {showScroll&&
        <Button className={'btn-scroll'} onClick={scrollMore} style={{height:'100%'}}>
          {(showScrollMore)&&<Icon type={chevronRight} style={{height:'100%'}}/>}
        </Button>
      }
    </div>
  )
}

export default forwardRef(ScrollableContainer)

ScrollableContainer.propTypes={
  vertical:PropTypes.bool
}

ScrollableContainer.defaultProps={
  direction:false
}
