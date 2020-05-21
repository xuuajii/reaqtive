import React from 'react'
import {AnimatedCollapseDiv} from '../index'

const CollapseBody = props =>{
  const childType=props.children.type;

  const headerHeight = props.collapseHeaderEl.current&&props.collapseHeaderEl.current.offsetHeight

  if(childType.render&&childType.render.name.indexOf('RqtvListbox')!==-1){
    const height = props.height-(headerHeight||0)
    return <AnimatedCollapseDiv  hideTitleWhenExpanded={props.hideTitleWhenExpanded} height={height}  className="collapse-body" show={props.isExpanded}>{React.cloneElement(props.children, {titleAction:props.handleChange, height:height})}</AnimatedCollapseDiv>
  }
    return <AnimatedCollapseDiv  hideTitleWhenExpanded={props.hideTitleWhenExpanded} height={props.height} className="collapse-body" show={props.isExpanded}>{props.children}</AnimatedCollapseDiv>
}

export default CollapseBody
