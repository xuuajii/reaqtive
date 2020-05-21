import React from 'react'

const ModalFooter = props =>
<div className="modal-footer">
  {props.showDismiss&&
    <button type="button" className="btn btn-secondary" onClick={props.closeModal}>{props.dismissLabel}</button>
  }
  {props.children}
</div>

export default ModalFooter
