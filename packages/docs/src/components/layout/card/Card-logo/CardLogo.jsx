//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import "./CardLogo.scss";

export default function CardLogo(props) {
  return (
    <img
      className="card-logo"
      src={props.img}
      style={{ height: props.height, position: props.position, top: props.top }}
    />
  );
}

CardLogo.defaultProps = {
  img: require("../../../../images/placeholders/brand.png"),
  height: "50px",
  position: "absolute",
  top: "5px"
};
