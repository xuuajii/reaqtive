//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import Cards from "./cards";
import BrandLogo from "../../../../shared-components/layout/card/Card-logo/card-logo";
import Rectangle from "../../../../shared-components/shapes/rectangle";
import AlfaRomeoLogo from "../../../../images/Brand/alfa-romeo.png";
import FiatLogo from "../../../../images/Brand/fiat.png";
import JeepLogo from "../../../../images/Brand/jeep.png";

const CardDecksHeader = props => {

  const brand = props.brand;
  const brandImage = props.brandImage;
  return (
    <div>
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
              backgroundColor={changeTitleColorbyBrand(brand)}
              marginTop={"11px"}
              marginLeft={"30px"}
            />
          </div>
          <div className="col-auto col-sm-auto col-md-auto">
            <div style={{ display: "flex", alignItems: "center" }}>
              <BrandLogo
                brandImage={brandImage}
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
                    textDecorationColor: changeTitleColorbyBrand(brand),
                    fontSize: "2rem"
                  }}
                  className="py-3"
                >
                  {brand}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Cards key={props.brand} brand={props.brand} />
      </div>
    </div>
  );
};

export default CardDecksHeader;

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

  const getBrandLogo = brand => {
    switch (brand) {
      case "ALFA ROMEO":
        return AlfaRomeoLogo;
        break;
      case "FIAT":
        return FiatLogo;
        break;
      case "JEEP":
        return JeepLogo;
        break;
      default:
        break;
    }
  };