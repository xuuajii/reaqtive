import React from 'react'
import PropTypes from 'prop-types'

const Section = props => {

  return(
    <div className={`section ${props.className}`} style={{...props.style}}>
      {props.children}
    </div>
  )
}

export default Section

Section.propTypes = {
  className:PropTypes.string,
  style:PropTypes.object
}

Section.defaultProps = {
  className:'',
  style:{}
}
