import React from 'react'
import PropTypes from 'prop-types'

const Card = props => {
  const className = `card ${props.flexItem?'flex-item':''} ${props.className}`
  const style = {width:props.width, minWidth:props.width, ...props.style}
  return (
    <div
      id={props.id}
      className={className}
      style={style}
    >
      {props.children}
    </div>
  )
}

export default Card

Card.propTypes = {
  className:PropTypes.string,
  style:PropTypes.object,
  flexItem:PropTypes.bool,
  width:PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Card.defaultProps = {
  className:' ',
  style:{},
  flexItem:false,
  width:'auto',
}
