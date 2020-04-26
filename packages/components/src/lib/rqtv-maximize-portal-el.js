//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

/**
 * RqtvMaximizePortalEl
 *
 * It renders a portal to which a ref can be passed. The portal can be used to maximize visualizations in the app.
 */

const RqtvMaximizePortalEl = props => {
  const [maximizedHeight, set] = useState(0)
  useEffect(()=>{
    if(props.maximizeFullPage){
      const body = document.getElementsByTagName('body')[0]
      const windowHeight=window.innerHeight
      const bodyTop = body.getBoundingClientRect().top
      set(windowHeight-bodyTop)
    } else {
      set(props.style.height)
    }
  }
  , [props.style.height, props.maximizeFullPage])

  return <div ref={props.maximizeElRef} style={{...props.style, height:maximizedHeight, minHeight:maximizedHeight, zIndex:10}}/>
}

RqtvMaximizePortalEl.propTypes={
  /**
   * the ref which will be attached to the dom element
   */
  maximizeElRef:PropTypes.object.isRequired,
  /**
   * style of the object which will contain the maximized visualization
   */
  style:PropTypes.object,
  /**
   * if true the maximized visualization will occupy all the space below the navbar and on the right of the sidemenu. Page overflow will be hidden
   */
  maximizeFullPage:PropTypes.bool
}
RqtvMaximizePortalEl.defaultProps={
  style:{position:'absolute', top:0, left:0, height:'100%', width:'100%', zIndex:300, maxHeight:'100%'},
  maximizeFullPage:true
}

export default RqtvMaximizePortalEl
