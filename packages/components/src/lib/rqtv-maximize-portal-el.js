//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

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
  maximizeElRef:PropTypes.object.isRequired,
  style:PropTypes.object,
  maximizeFullPage:PropTypes.bool
}
RqtvMaximizePortalEl.defaultProps={
  style:{position:'absolute', top:0, left:0, height:'100%', width:'100%', zIndex:300, maxHeight:'100%'},
  maximizeFullPage:true
}

export default RqtvMaximizePortalEl
