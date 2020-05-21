import React, {useState, useEffect, useRef, useContext} from 'react'
import {useTransition, animated} from 'react-spring'
import {System} from '../index'
import PropTypes from 'prop-types'
import {Backdrop} from '../index'
const Modal = props => {

  const [open, setOpen] = useState()
  //console.log(open)
  const modalEl = useRef()
  const system = useContext(System)
  useEffect(()=>{
    if(props.open===true){
      // modalEl.current&&modalEl.current.classList.add('before-close')
      setOpen(props.open)
      system.hideOverflow()
    }
    return () => system.showOverflow()
  }, [props.open])

  const closeModal = () =>{
      setOpen(false)
      if(props.onClose){
        props.onClose()
      }
      system.showOverflow()
  }

  const handleClick = (e) => {
    if(e.target===modalEl.current){
      closeModal()
    }
  }
  const transitions = useTransition(open, null, {
    from: {  display: 'none', opacity: 0, transform: 'translateY(-30px)' },
    enter: { display: 'block', opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-30px)' },
  })
  const children = React.Children.toArray(props.children)
  return (
    <>
      {transitions.map(({ item, key, props }) =>
        item &&
        <animated.div
          key={key}
          style={props}
          onClick={handleClick}
          ref={modalEl}
          className={`modal show ${props.className?props.className:''}`}
        >
            {children.map(child=>React.cloneElement(child, {closeModal:closeModal}))}
        </animated.div>
      )}
      <Backdrop show={open}/>
    </>
  )
  // return(
  //   open
  //   ?<>
  //     <div
  //       onClick={handleClick}
  //       ref={modalEl}
  //       className={`modal  ${open===true?' show':'hide'} ${props.className?props.className:''}`}
  //       style={{display:open===true?'block ':'none'}}
  //     >
  //       {children.map(child=>React.cloneElement(child, {closeModal:closeModal}))}
  //     </div>
  //     <Backdrop show={true}/>
  //   </>
  //   :<></>
  // )
}




Modal.propTypes = {
  open:PropTypes.bool.isRequired
}

export default Modal
