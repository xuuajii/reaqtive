//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useRef} from 'react'
import PropTypes from 'prop-types';
import {useSpring, useTransition, animated} from 'react-spring'
import {LuiIcon} from '../index'

const CollapseHeader = props =>{
  const animationWrapperEl = useRef()

  const transitions = useTransition(props.isExpanded, null, {
    initial: { position:'absolute',  opacity: 1, transform: 'rotate(0deg)' },
    from: {position:'absolute',  opacity: 0, transform: 'rotate(180deg)' },
    enter: {position:'absolute', opacity: 1 , transform: 'rotate(0deg)'},
    leave: {position:'absolute', opacity: 0 , transform: 'rotate(180deg)'},
  })
  const titleAnimatedStyles = useSpring({opacity: props.isExpanded ? 0 : 1})

  return(
    <div className="collapse-header" style={{overflow:'hidden'}} ref={props.collapseHeaderEl} onClick={(e)=>props.handleChange(e)}>
      {<animated.div style={titleAnimatedStyles}>{props.children}</animated.div>}
      <div className={"icon-animation-container"} ref={animationWrapperEl} style={{position:'relative', flexGrow:1}}>
        {transitions.map(({ item, key, props }) =>
          item
          ? <animated.span key={key} className={"icon-animation"} style={{...props}}><LuiIcon className="collapse-icon" iconType={'close'}/></animated.span>
          : <animated.span key={key} className={"icon-animation"} style={{...props}}><LuiIcon className="collapse-icon" iconType={'arrow-down'}/></animated.span>
        )}
      </div>
    </div>
  )
}

//<LuiIcon className="collapse-icon" iconType={props.isExpanded?'close':'arrow-down'}/>
CollapseHeader.propTypes = {
  hideTitleWhenExpanded:PropTypes.bool
}

CollapseHeader.defaultProps = {
  hideTitleWhenExpanded:false
}

export default CollapseHeader
