//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import BrandLogo from "../card/Card-logo/card-logo";
import Rectangle from "../rectangle";

const CardDeckHeader = props => {

  const title = props.title;
  const logo = props.logo;
  return (
    <div className="container full-screen">
      <div
        className="row mt-5 no-gutters align-items-center"
        style={{
          background:
            "linear-gradient(0deg, rgba(227, 225, 225, 0.57) 0%, rgb(255, 255, 255) 100%)"
        }}
      >
        <div className="col-3 col-sm-2 col-md-2 col-lg-1">
          <Rectangle
            height={57}
            backgroundColor={changeTitleColorbyBrand(title)}
            marginTop={"11px"}
            marginLeft={"30px"}
          />
        </div>
        <div className="col-auto col-sm-auto col-md-auto">
          <div style={{ display: "flex", alignItems: "center" }}>
            <BrandLogo
              brandImage={logo}
              position={"relative"}
              top={"0px"}
              height={"50px"}
            />
            <div style={{ marginLeft: "1.5rem" }}>
              <h1
                style={{
                  //textShadow: "4px 4px 9px rgba(150, 150, 150, 1)",
                  textDecorationLine: "underline",
                  textUnderlinePosition: "under",
                  textDecorationColor: changeTitleColorbyBrand(title),
                  fontSize: "2rem"
                }}
                className="py-3"
              >
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDeckHeader;

const changeTitleColorbyBrand = brand => {
    switch (brand) {
      case "ALFA ROMEO":
        return "#a65163";
        break;
      case "FIAT":
        return "rgb(146, 146, 146)";
        break;
      case "JEEP":
        // return "rgb(199, 113, 42)";
        return "rgb(220, 137, 44)";
        break;
      default:
        break;
    }
  };
