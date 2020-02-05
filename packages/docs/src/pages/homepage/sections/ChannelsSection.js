import React from "react";
import './ChannelsSection.scss';

const ChannelsSection = props => {
  return (
    <div id="channels">
      <div className="container">
        <div className="row">
          <div className="col-10 offset-1 col-sm-12 offset-sm-0 col-md-4 mt-3">
            <Card
              id={"purchasing"}
              height={"144px"}
              img={require("../../../images/purchasing.jpg")}
              title={"Purchasing"}
              text={"Competitiveness indexes & prices analysis."}
              style={{ maxWidth: 540 + "px" }}
              redirect={`/purchasing`}
              py={3}
            />
          </div>
          <div className="col-10 offset-1 col-sm-12 offset-sm-0 col-md-4 mt-3">
            <Card
              id={"ltr"}
              height={"144px"}
              img={require("../../../images/ltr.jpg")}
              title={"LTR"}
              text={"Long Term Rental cost analysis."}
              style={{ maxWidth: 540 + "px" }}
              redirect={`/ltr`}
              py={3}
            />
          </div>
          <div className="col-10 offset-1 col-sm-12 offset-sm-0 col-md-4 mt-3">
            <Card
              id={"tco"}
              height={"144px"}
              img={require("../../../images/methodology.jpg")}
              title={"TCO & Residual Value"}
              text={"Cost analysis of a vehicle's life cycle."}
              style={{ maxWidth: 540 + "px" }}
              redirect={`/tco-residual-value`}
              py={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelsSection;