import React from "react";
import "./Card.scss";
import { useHistory } from "react-router-dom";
import CardLogo from "./Card-logo/CardLogo";
//import CardKPI from "./Card-KPI/CardKPI";
//import CardBody from "./Card-Body/CardBody";

export default function Card(props) {
  let history = useHistory();

  return (
    <div
      onClick={() => history.replace(props.redirect)}
      id={props.id}
      className={"card" + (props.flexItemClassName ? " flex-item" : "")}
      style={{ width: props.width }}
    >
      <div className="row no-gutters">
        {props.displayLogo && <CardLogo img={props.brandImage} />}
        <div
          className={
            "col-auto px-3 mt-3" + (props.gradient ? " pickgradient" : "")
          }
        >
          <img
            className={props.imgWidth ? "card-img" : ""}
            width={props.imgWidth}
            src={props.img}
            alt="..."
          />
        </div>
        <div
          style={{ bottom: props.cardInfoBottom }}
          className={
            "col-auto col-sm-12 col-md-12 pl-3 pl-sm-0 px-md-3 mt-sm-3 w-100" +
            (props.isInfoAbsolute ? " card-info" : "")
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
      {/*props.displayKPI && <CardKPI {...props} />*/}
      {/*props.displayBody && <CardBody {...props} />*/}
    </div>
  );
}

Card.defaultProps = {
  title: "Title",
  text: "SubTitle",
  img: require("../../../images/placeholders/car.png"),
  brandImage: require("../../../images/placeholders/brand.png"),
  isInfoAbsolute: false,
  displayLogo: false,
  displayKPI: false,
  displayBody: false,
  gradient: false,
  verticalLayout: true,
  width: 250,
  imgWidth: "100%"
};
