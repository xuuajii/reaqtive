import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import cardPlaceholder from './images/card-img-placeholder.png'

const CardImage = props => {

  const [cardImgSrc, setCardImgSrc] = useState(props.imgUrl)

  const onCardImgError = () => {
    setCardImgSrc(cardPlaceholder)
  }

  useEffect(()=>{
    props.imgUrl===''&&setCardImgSrc(cardPlaceholder)
  },[props.imgUrl])

  return(
    <div
      className={"col-auto mt-3" + (props.displayGradient ? " pickgradient" : "")}
      style={{height:props.height, minHeight:props.height, margin:'auto'}}
    >
      <img
        className={"card-img"}
        src={cardImgSrc}
        alt="..."
        onError={onCardImgError}
        style={{height:props.height, minHeight:props.height}}
      />
    </div>
  )
}

export default CardImage


CardImage.propTypes={
  height:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  displayGradient:PropTypes.bool,
  imgUrl:PropTypes.string
}

CardImage.defaultProps={
  height:139,
  displayGradient:false,
  imgUrl:''
}
