//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {System} from '@reaqtive/layout'
import {SelectionsBack,SelectionsForward,SelectionsClarAll} from './current-selections-buttons'
import { Icon, currentSelections} from '@reaqtive/layout'

const RqtvCurrentSelectionsToolbar = props => {
  //console.log(props)()
  const system = useContext(System)
  const isMinimized = props.isResponsive&&system.windowWidth<=system.breakPoints['lg']
  //console.log(system.windowWidth, system.breakPoints['md'])
  const showBack = (props.qBackCount>0&&!isMinimized)||props.inModal
  const showForward = (props.qForwardCount>0&&!isMinimized)||props.inModal
  const showClearAll = (props.qSelectionsCount>0&&!isMinimized)||props.inModal
  const show = (props.qBackCount>0||props.qForwardCount>0||props.qSelectionsCount>0)||props.alwaysShowToolbar
  return(
    show?
    <div className={`rqtv-current-selections-toolbar ${props.inModal?'in-modal':''}`}>
      <SelectionsBack disabled={!(props.qBackCount>0)} show={showBack} onClick={props.back} showLabel={!props.showModalToggler}/>
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          {props.showModalToggler&&
            <button className="btn" onClick={props.openCurrentSelectionsModal}>
            <Icon type={currentSelections} size={isMinimized?35:24} style={{marginBottom:'3px'}}/>
              {!isMinimized&&<span style={{marginLeft:'5px'}}>Current Selections</span>}
              <span className="badge">{props.qSelectionsCount}</span>
            </button>
          }
          <SelectionsClarAll disabled={!(props.qSelectionsCount>0)} show={showClearAll} onClick={props.clearAll} showLabel={!props.showModalToggler}/>
        </div>
      <SelectionsForward disabled={!(props.qForwardCount>0)} show={showForward} onClick={props.forward} showLabel={!props.showModalToggler}/>
    </div>
    :<></>
  )
}

RqtvCurrentSelectionsToolbar.propTypes={
  isResponsive:PropTypes.bool,
  showModalToggler:PropTypes.bool,
  inModal:PropTypes.bool
}

RqtvCurrentSelectionsToolbar.defaultProps={
  isResponsive:true,
  showModalToggler:true,
  inModal:false
}

export default RqtvCurrentSelectionsToolbar
