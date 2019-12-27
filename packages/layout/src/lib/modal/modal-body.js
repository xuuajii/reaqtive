//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'

const ModalBody = props =>
<div className="modal-body" ref={props.modalBodyEl}>
  {props.children}
</div>

export default ModalBody
