import React from 'react'
import PropTypes from 'prop-types'
const ModalDialog = props =>{
  const children = React.Children.toArray(props.children)
  return(
    <div className={`modal-dialog ${props.className}`} role="document" style={props.style}>
      <div className="modal-content">
          {children.map(child=>React.cloneElement(child, {closeModal:props.closeModal}))}
      </div>
    </div>
  )
}

export default ModalDialog

ModalDialog.propTypes={
  className:PropTypes.string,
  style:PropTypes.object,
}

ModalDialog.defaultProps={
  className:'',
  style:{},
}
