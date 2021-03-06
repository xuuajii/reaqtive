//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types';
import { QGenericObject } from '@reaqtive/q'
import Layout from './layout'
import {useMapPropsToDef} from '../helpers/index'
import {RqtvDropdownButton} from '@reaqtive/components'
import RqtvListObject from '../rqtv-list-object'

const RqtvDropdown = props =>{
  const [show, setShow] = useState(false)
  const [justHidden, setJustHidden] = useState()
  const dropdownEl = useRef();
  const toggleShow = () => {
    setShow(!show)
  }
  const handleClick = () => {
    if(!justHidden){
      toggleShow()
    }
  }

  const hideDropdownMenu = (e) => {
    setJustHidden(true)
    setShow(false)
    setTimeout(()=>setJustHidden(false),500)
  }

  const {qFieldExpr, qSortObject, qLabelExpr, qId} = props
  const qObjectDef = useMapPropsToDef({qFieldExpr, qSortObject, qLabelExpr, qId})
  const qButtonLabelExpr = props.qLabelExpr?props.qLabelExpr:qObjectDef.label.qStringExpression.qExpr
    return(
      <div className={`dropdown ${show ? 'show' : ''} rqtv-dropdown`} ref={dropdownEl}>
        <RqtvDropdownButton
          onClick={handleClick}
          show={show}
          qLabelExpr={qButtonLabelExpr}
          showCaret={true}
        />
        {show&&
          <QGenericObject qObjectDef={qObjectDef} quickSelectionMode={props.quickSelectionMode}>
            <RqtvListObject {...props}>
              <Layout {...props} show={show } hideDropdownMenu={hideDropdownMenu}/>
            </RqtvListObject>
          </QGenericObject>
        }
      </div>
  )
}

RqtvDropdown.propTypes={
  qFieldExpr:PropTypes.string.isRequired,
  qFieldLabelExpr:PropTypes.string,
  qSortObject:PropTypes.object,
  showSearch:PropTypes.bool,
  dropdownMenuHeight:PropTypes.number,
  dropdownMenuWidth:PropTypes.number,
  showCaret:PropTypes.bool,
  buttonColor:PropTypes.string,
  buttonFontColor:PropTypes.string,
  buttonStyle:PropTypes.object,
  dropdownMenuStyle:PropTypes.object,
  dropdownMenuItemStyle:PropTypes.object,
  hideHorizontalScrollbar:PropTypes.bool,
  quickSelectionMode:PropTypes.bool,
}

RqtvDropdown.defaultProps={
  qSortObject:{ qSortByState: 1, qSortByFrequency: 0, qSortByNumeric: 0, qSortByAscii: 0, qSortByLoadOrder: 0, qSortByExpression: 0 },
  showSearch:true,
  dropdownMenuHeight:300,
  dropdownMenuWidth:265,
  showCaret:true,
  buttonColor:'primary',
  buttonFontColor:'light',
  buttonStyle:{},
  dropdownMenuStyle:{},
  dropdownMenuItemStyle:{},
  hideHorizontalScrollbar:false,
  quickSelectionMode:false,
}
export default RqtvDropdown
