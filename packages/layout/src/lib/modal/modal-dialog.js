import React from 'react'

const ModalDialog = props =>{
  const children = React.Children.toArray(props.children)
  return(
    <div className="modal-dialog" role="document">
      <div className="modal-content">
          {children.map(child=>React.cloneElement(child, {closeModal:props.closeModal}))}
      </div>
    </div>
  )
}

export default ModalDialog
