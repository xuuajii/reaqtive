import React from 'react'
import PropTypes from 'prop-types'

const CardHeader = props => {
    const className = `row no-gutters card-header ${props.className}`
    const style = {width:props.width, minWidth:props.width, ...props.style}
    return (
      <div className={className} style={style}>
        {props.children}
      </div>
    )
}

export default CardHeader

CardHeader.propTypes = {
  className:PropTypes.string,
  style:PropTypes.object,
  width:PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

CardHeader.defaultProps = {
  className:' ',
  style:{},
  width:'auto',
}
