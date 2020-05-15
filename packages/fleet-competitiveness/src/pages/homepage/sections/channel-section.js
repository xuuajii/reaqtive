//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import "./channel-section.scss";
import CardWithImage from "../components/card-with-image/card-with-image";

const ChannelsSection = props => {
  return (
    <div id="channels" className="align-items-center">
      <div className="container ">
        <div className="row">
          <div className="col-10 offset-1 col-sm-12 offset-sm-0 col-md-4 my-4 ">
            <CardWithImage
              id={"purchasing"}
              imgHeight={170}
              imgPadding = {"13px"}
              img={require("../../../images/homepage/purchasing.jpg")}
              title={"Purchasing"}
              body={"Competitiveness indexes & prices analysis."}
              link={`/purchasing`}
              cursor = {"pointer"}
            />
          </div>
          <div className="col-10 offset-1 col-sm-12 offset-sm-0 col-md-4 my-4">
            <CardWithImage
              id={"purchasing"}
              imgHeight={170}
              imgPadding = {"13px"}
              img={require("../../../images/homepage/ltr.jpg")}
              title={"LTR"}
              body={"Competitiveness indexes & prices analysis."}
              link={`/long-term-rental`}
              cursor = {"pointer"}
            />
          </div>
          <div className="col-10 offset-1 col-sm-12 offset-sm-0 col-md-4 my-4">
            <CardWithImage
              id={"purchasing"}
              imgHeight={170}
              imgPadding = {"13px"}
              img={require("../../../images/homepage/methodology.jpg")}
              title={"TCO & Residual Value"}
              body={"Competitiveness indexes & prices analysis."}
              link={`/tco-&-residual-value`}
              cursor = {"pointer"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelsSection;
