import React from 'react'

const ModalBody = props =>
<div className="modal-body" ref={props.modalBodyEl}>
  {props.children}
</div>

export default ModalBody
