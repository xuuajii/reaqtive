//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import "./CardBody.scss";
import Flags from "../../../Flags/Flags";
let countryCode;
export default function CardBody(props) {
  const handleBodyItemClick = bodyRowIdField => {
    props.goToDetail(bodyRowIdField, props.data.productId);
  };
  return (
    <>
      <div className="container ">
        <div className="row  font-weight-bold align-items-center">
          <div className="col-6"> Country</div>
          <div className="col-6">
            <div className="row text-center">
              <div className="col-4 px-0">Priv</div>
              <div className="col-4 px-0">FbD</div>
              <div className="col-4 px-0">LTR</div>
            </div>
          </div>
        </div>
        {props.cardBody ? (
          props.cardBody.map(function(item, index) {
            getCountryCode(item.country);
            return (
              <div className="row list align-items-center" key={countryCode}>
                <div
                  className="col-6"
                  onClick={() =>
                    handleBodyItemClick(props.data.cardBody[index].bodyLabel)
                  }
                >
                  <div className="row align-items-center">
                    <div className="col-3 my-1 px-3">
                      <Flags
                        countryCode={countryCode}
                        isRounded={true}
                        height={20}
                      />
                    </div>
                    <div
                      className="col-9 px-3"
                      style={{
                        fontSize: "9px",
                        fontWeight: "bold"
                      }}
                    >
                      {item.country}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="row text-center">
                    <div className="col-4 px-0">
                      {item.bodyMeasures[0].qText}
                    </div>
                    <div className="col-4 px-0">
                      {item.bodyMeasures[1].qText}
                    </div>
                    <div className="col-4 px-0">
                      {item.bodyMeasures[2].qText}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="row list align-items-center" key={countryCode}>
            <div className="col-6">
              <div className="row align-items-center">
                <div className="col-3 my-1 px-3">
                  <Flags
                    countryCode={countryCode}
                    isRounded={true}
                    height={20}
                  />
                </div>
                <div
                  className="col-9 px-3"
                  style={{
                    fontSize: "9px",
                    fontWeight: "bold"
                  }}
                >
                  GERMANY
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row text-center">
                <div className="col-4 px-0">110</div>
                <div className="col-4 px-0">100</div>
                <div className="col-4 px-0">105</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

CardBody.defaultProps = {
  ovByProduct: false
};

const getCountryCode = country => {
  switch (country) {
    case "SPAIN":
      return (countryCode = "es");
      break;
    case "NETHERLANDS":
      return (countryCode = "nl");
      break;
    case "BELGIUM":
      return (countryCode = "be");
      break;
    case "SWITZERLAND":
      return (countryCode = "ch");
      break;
    case "ITALY":
      return (countryCode = "it");
      break;
    case "AUSTRIA":
      return (countryCode = "at");
      break;
    case "FRANCE":
      return (countryCode = "fr");
      break;
    case "GERMANY":
      return (countryCode = "de");
      break;
    case "POLAND":
      return (countryCode = "pl");
      break;
    default:
      return (countryCode = "de");
      break;
  }
};
