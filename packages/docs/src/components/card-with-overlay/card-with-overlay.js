//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import "./card-with-overlay.scss";
import { useHistory } from "react-router-dom";

const CardOverlay = props => {
  const history = useHistory();
  return (
    <div
      id="card-overlay"
      onClick={() => history.replace(props.redirect)}
      className="card bg-dark text-white"
    >
      <img src={props.img} className="card-img" alt="..." />
      <div className="card-img-overlay">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.text}</p>
      </div>
    </div>
  );
};

export default CardOverlay;

CardOverlay.defaultProps = {
  img: require("../../images/placeholders/car.png"),
  title: "Title",
  text: "Text"
};
