//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useRef} from 'react'
import { RqtvButton } from '../index'
import {LuiIcon} from '@reaqtive/layout'

const RqtvRendererContainer = props => {
  const loadingContainer=useRef()
  const loadingContainerEl=loadingContainer.current
  const loadingContainerHeight=loadingContainerEl&&loadingContainerEl.parentNode.offsetHeight
  const fixedStyles=props.isFixed?{position:'fixed', height:'100%', width:'100%', left:0, top:0}:{}
  const stickyStyles=props.isSticky===true?{position:'sticky', top:0}:{}
  const height=props.top?'100%':loadingContainerHeight
  return(
    <div className={"rqtv-loading-container"} style={{display:'flex',height:height, width:'100%', ...stickyStyles, ...fixedStyles}} ref={loadingContainer}>
      <div style={{display:'flex', justifyContent:'center', flexGrow:1,alignItems:'center',  height:'90%'}}>
        {React.cloneElement(props.children, {height:loadingContainerHeight})}
      </div>
    </div>
  )
}

const RqtvSpinner = props =>{
  const color = props.color?`text-${props.color}`:'rqtv-spinner-color'
  return(
    <RqtvRendererContainer isFixed={props.isFixed} isSticky={props.isSticky}>
      <div className={`spinner-border ${color}`} role="status" style={props.style}>
        <span className="sr-only">Loading...</span>
      </div>
    </RqtvRendererContainer>
  )
}

const RqtvNoData = props =>
<RqtvRendererContainer isFixed={props.isFixed}>
  <div className="rqtv-no-data">
    <span className="lui-icon lui-icon--minus" style={{margin:'0.5rem'}}/>
    <span>No data available</span>
  </div>
</RqtvRendererContainer>



const RqtvError = props =>
<RqtvRendererContainer isFixed={props.isFixed}>
  <div>
    <RqtvButton className='rqtv-error-refresh' onClick={props.reload} label={<LuiIcon iconType="reload"/>}/>
    <span>Error Loading Content</span>
  </div>
</RqtvRendererContainer>



export {RqtvNoData, RqtvSpinner, RqtvError};
