import React from 'react'
import PropTypes from 'prop-types'

const CardHeaderText = props => {
  return(
    <div
      style={{...props.style}}
      className={"col-auto col-sm-12 col-md-12"}
    >
      <h4 style={{ paddingTop: props.offset }}>{props.title}</h4>
      <p
        title={props.title}
        style={{ fontSize: "12px" }}
        className={"card-vehicle-text"}
      >
        {props.subTitle}
      </p>
    </div>
  )
}

export default CardHeaderText

CardHeaderText.propTypes={
  background:PropTypes.string,
}

CardHeaderText.defaultProps={
  background : "linear-gradient(0deg, #ffffff94 30%, rgba(255, 255, 255, 0.1) 100%)",
}
