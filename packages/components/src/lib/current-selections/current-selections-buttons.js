import React from 'react'
import {LuiIcon} from '@reaqtive/layout'

const SelectionsButton = props => {
    return (props.show>0&&
    <button className={`btn`} onClick={props.onClick} disabled={props.disabled}>
      <LuiIcon iconType={props.iconType}/>
      {props.showLabel&&props.label}
    </button>
  )
}

const SelectionsBack = props => {
  return(
    <SelectionsButton {...props} iconType={'selections-back'} label='back'/>
  )
}

const SelectionsForward = props => {
  return(
    <SelectionsButton {...props} iconType={'selections-forward'} label='forward'/>
  )
}

const SelectionsClarAll = props => {
  return(
    <SelectionsButton {...props} iconType={'clear-selections'} label='clear all'/>
  )
}

export {SelectionsBack,SelectionsForward,SelectionsClarAll}
