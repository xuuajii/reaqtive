import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import Button from './button'
import {LuiIcon} from '../index'


const DropdownButton = props => {

  const onClick = (e)=>{
    typeof props.onClick==='function' && props.onClick(e);
    typeof props.toggleMenu==='function' && props.toggleMenu();
  }

  return(
    <Button className={`dropdown-toggle hide-caret ${props.className}`} type="button" onClick={onClick} style={props.style}>
      {props.label}
      {!props.hideCaret&&<LuiIcon iconType={`triangle-${props.show?'top':'bottom'}`} className="caret"/>}
    </Button>
  )
  //{props.icon()}
}

export default DropdownButton

DropdownButton.propTypes = {
  className:PropTypes.string,
  hideCaret:PropTypes.bool
}

DropdownButton.defaultProps = {
  className:'btn-primary text-light',
  hideCaret:false
}
