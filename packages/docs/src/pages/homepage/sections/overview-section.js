//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import CardOverlay from "../components/card-with-overlay/card-with-overlay";
import "./overview-section.scss";

const OverviewSection = props => {
  return (

      <div id="overview" className="align-items-center">
        <div className="container">
          <div className="row">
            <div className=" col-sm-12 col-md-6 my-4">
              <CardOverlay
                img={require("../../../images/homepage/flags.jpg")}
                title={"Overview by Market"}
                text={
                  "Index & prices analysis cross-model for Fleet by Dealer and Long Term Rental"
                }
                redirect={`/overview-by-country`}
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

  );
};

export default OverviewSection;
