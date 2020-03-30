//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState} from "react";
import "./Card.scss";
import { useHistory } from "react-router-dom";
import CardLogo from "./Card-logo/card-logo";
import CardKPI from "./Card-KPI/card-kpi";
import CardBody from "./Card-Body/card-body";
import cardPlaceholder from './images/card-img-placeholder.png'
const Card = props => {
  let history = useHistory();
  const [cardImgSrc, setCardImgSrc] = useState(props.img)
  const onCardImgError = () => {
    setCardImgSrc(cardPlaceholder)
  }
  return (
    <div
      onClick={() => history.replace(props.redirect)}
      id={props.id}
      className={"card" + (props.flexItem ? " flex-item" : "")}
      style={{ width: props.width, minWidth:props.width}}
    >
      <div className="row no-gutters" style={{ width: props.width, minWidth:props.width}}>
        {props.displayLogo && <CardLogo {...props} />}
        <div
          className={
            "col-auto px-3 mt-3" + (props.gradient ? " pickgradient" : "")
          }
          style={{height:props.imgHeight, minHeight:props.imgHeight, margin:'auto'}}
        >
          <img className={"card-img"} src={cardImgSrc} alt="..." onError={onCardImgError} style={{height:props.imgHeight, minHeight:props.imgHeight}}/>
        </div>
        <div
          style={{ bottom: props.cardInfoBottom, background: props.cardInfoBackground }}
          className={
            "col-auto col-sm-12 col-md-12 pl-3 pl-sm-0 px-md-3 mt-sm-3 w-100" +
            (props.isInfoAbsolute ? " card-info-product" : "card-info")
          }
        >
          <h4 style={{ paddingTop: props.titlePaddingTop }}>{props.title}</h4>
          <p
            title={props.text}
            style={{ fontSize: "12px" }}
            className={"card-vehicle-text"}
          >
            {props.text}
          </p>
        </div>
      </div>
      {props.displayKPI && <CardKPI {...props} />}
      {props.displayBody && <CardBody {...props} />}
    </div>
  );
};

export default Card;

Card.defaultProps = {
  title: " ",
  text: " ",
  //img: require("../../../images/placeholders/car.png"),
  //brandImage: require("../../../images/placeholders/brand.png"),
  isInfoAbsolute: true,
  displayLogo: false,
  displayKPI: false,
  displayBody: false,
  gradient: false,
  width: 250,
  cardInfoBottom: 0,
  cardInfoBackground : "linear-gradient(0deg, #ffffff94 30%, rgba(255, 255, 255, 0.1) 100%)",
  imgHeight:139
};
