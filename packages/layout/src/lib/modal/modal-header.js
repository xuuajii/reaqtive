import React from 'react'
import PropTypes from 'prop-types'

const ModalHeader = props =>{
  return(
    <div className={`modal-header ${props.className}`} style={props.style}>
      <h5 className="modal-title">{props.title}</h5>
      {props.showDismiss&&
      <button type="button" className="close" onClick={props.closeModal}>
        <span aria-hidden="true">&times;</span>
      </button>
      }
    </div>
  )
}
ModalHeader.propTypes={
  showDismiss:PropTypes.bool
}

ModalHeader.defaultProps={
  showDismiss:true
}

export default ModalHeader
