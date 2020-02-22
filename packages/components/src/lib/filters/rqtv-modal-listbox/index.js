//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Modal,ModalDialog,ModalHeader,ModalBody,ModalFooter} from '@reaqtive/layout'
import {RqtvButton} from '../../index'
import {normalizeExpression} from '../../helpers'
import {useQFieldHandler} from '@reaqtive/q'
import RqtvListbox from '../rqtv-listbox/index'

/**
 * RqtvModalListbox
 * It allows you to wrap a listbox inside a modal: the listbox will be hidden and a button will be shown.
 * Clicking the button the listbox will appear inside a modal
 */

const RqtvModalListbox = props => {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const qFieldExpr= normalizeExpression(props.listboxProps.qFieldExpr)
  const qFieldHandler = useQFieldHandler(props.listboxProps.qFieldExpr)
  const qField = qFieldHandler&&qFieldHandler.qField

  const defaultLabelExpr = `
    '${props.listboxProps.qFieldExpr} '&
    if(getSelectedCount(${qFieldExpr})>0,
      if(len(only(${qFieldExpr}))>0,only(${qFieldExpr}),getSelectedCount(${qFieldExpr})&' selected'
      )
    )`;
  const qLabelExpr = props.qLabelExpr?props.qLabelExpr:defaultLabelExpr
  //console.log(qLabelExpr);
  const listboxProps ={showHeaderButtonbar:true, alwaysShowSearch:true, ...props.listboxProps}
  return(
    <div>
      <RqtvButton
        onClick={openModal}
        label={props.listboxProps.qFieldExpr}
        qLabelExpr={qLabelExpr}
        className={props.buttonClassName}
        style={props.buttonStyle}
      />
      <Modal open={showModal} onClose={handleClose}>
        <ModalDialog>
          <ModalHeader title=" " close={handleClose} showDismiss={true}/>
          <ModalBody>
            <RqtvListbox {...props.listboxProps} height={300} alwaysShowSearch={props.alwaysShowSearch} qId={5} onEndSelections={()=>setShowModal(false)}/>
          </ModalBody>
          <ModalFooter showDismiss={true} dismissLabel="Cancel" close={handleClose}>
            { !(qFieldHandler.nxProperties&&qFieldHandler.nxProperties.qOneAndOnlyOne===true)&&
              <button type="button" className="btn btn-primary" onClick={()=>qFieldHandler.qField.clear()}>Clear</button>
            }
          </ModalFooter>
        </ModalDialog>
      </Modal>
    </div>
  )
}

RqtvModalListbox.propTypes = {
  /**
   * The expression used in the listbox title and in the button that toggles the listbox
   */
  qLabelExpr:PropTypes.string,
  /**
   * className for the dropdown button
   */
  buttonClassName:PropTypes.string,
  /**
   * style object to customize the dropdown button
   */
  buttonStyle:PropTypes.object,
  /**
   * the props which will be passed to the listbox
   */
  listboxProps:PropTypes.object
}

RqtvModalListbox.defaultProps = {
  buttonStyle:{},
  buttonClassName:'primary text-light'
}

export default RqtvModalListbox
