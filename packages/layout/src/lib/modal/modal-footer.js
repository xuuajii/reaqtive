import React from 'react'
import PropTypes from 'prop-types'

const ModalFooter = props =>
<div className={`modal-footer ${props.className}`} style={props.style} >
  {props.showDismiss&&
    <button type="button" className="btn btn-secondary" onClick={props.closeModal}>{props.dismissLabel}</button>
  }
  {props.children}
</div>

export default ModalFooter

ModalFooter.propTypes={
  className:PropTypes.string,
  style:PropTypes.object,
}

ModalFooter.defaultProps={
  className:'',
  style:{},
}
