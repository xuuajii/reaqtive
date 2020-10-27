import React from 'react'
import PropTypes from 'prop-types'

const ModalBody = props =>
<div className={`modal-body ${props.className}`} style={props.style} ref={props.modalBodyEl}>
  {props.children}
</div>

export default ModalBody

ModalBody.propTypes={
  className:PropTypes.string,
  style:PropTypes.object,
}

ModalBody.defaultProps={
  className:'',
  style:{},
}
