import React from 'react'
import PropTypes from 'prop-types'

const SectionTitle = props => {

  return(
    <div className={`title-container ${props.className}`} style={{...props.style}}>
      <h4 className="title">{props.title}</h4>
    </div>
  )
}

export default SectionTitle

SectionTitle.propTypes = {
  className:PropTypes.string,
  style:PropTypes.object,
  title:PropTypes.string,
}

SectionTitle.defaultProps = {
  className:'',
  style:{},
  title:'My section title',
}
