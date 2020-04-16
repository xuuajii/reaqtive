import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../avatar'


const CardLogo = (props) => {
  const {width, height, imgUrl, placeholder, position, left, right, top, bottom, style } = props
  return (
    <Avatar
      avatarPlaceHolder={placeholder}
      avatarUrl={imgUrl}
      width={width}
      height={height}
      position={position}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
      style={style}
    />
  );
}

CardLogo.propTypes = {
  //img: require("../../../../images/placeholders/brand.png"),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  position: PropTypes.string,
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CardLogo.defaultProps = {
  //img: require("../../../../images/placeholders/brand.png"),
  height: 50,
  top: 5,
  position: "absolute",
};

export default CardLogo
