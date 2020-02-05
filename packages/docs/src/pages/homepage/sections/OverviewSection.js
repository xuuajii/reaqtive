import React from "react";
import CardOverlay from "../../../components/card-with-overlay/cardWithOverlay";
//import Card from "../../../components/shared/Cards/Card/Card";
//import { useHistory } from 'react-router-dom';
import "./OverviewSection.scss";

const OverviewSection = props => {
  return (
    <div className="container">
      <div id="overview" className="row align-items-center">
        <div className="container">
          <div className="row">
            <div className=" col-sm-12 col-md-6 my-4">
              <CardOverlay
                img={require("../../../images/homepage/flags.jpg")}
                title={"Overview by Market"}
                text={
                  "Index & prices analysis cross-model for Fleet by Dealer and Long Term Rental"
                }
                redirect={`/overview-by-market`}
              />
            </div>
            <div className=" col-sm-12 col-md-6 my-4">
              <CardOverlay
                img={require("../../../images/homepage/stelvio.jpg")}
                title={"Overview by Product"}
                text={
                  "Index & prices analysis cross-market for Private, Fleet by Dealer and Long Term Rental"
                }
                redirect={`/overview-by-product`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
