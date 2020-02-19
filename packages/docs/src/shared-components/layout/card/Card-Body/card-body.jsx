//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import "./card-body.scss";
import Avatar from "../../../avatar";
let countryCode;
export default function CardBody(props) {
  const handleBodyItemClick = (bodyRowValue) => {
    props.onBodyRowClick(props.data.productId.qText, bodyRowValue);
  };
  return (
    <>
      {props.ovByProduct ? (
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
            {props.cardBody.map(function(item, index) {
              return (
                <div key={index} className="row list align-items-center" >
                  <div
                    className="col-6"
                    onClick={() =>
                      handleBodyItemClick(item.bodyLabel.qText)
                    }
                  >
                    <div className="row align-items-center">
                      <div className="col-5 my-1">
                        {
                          <Avatar
                            avatarPlaceHolder={item.bodyImage.qText}
                            avatarUrl={item.bodyImage}
                            isRounded={true}
                            height={20}
                          />
                        }
                      </div>
                      <div
                        className="col-7 px-0"
                        style={{
                          fontSize: "9px",
                          fontWeight: "bold"
                        }}
                      >
                        {item.bodyLabel.qText}
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
            })}
          </div>
        </>
      ) : (
        <>
          <div className="card-property">
            <div className="label">{props.price}</div>
            <div className="value">{props.priceValue}</div>
          </div>
          <div className="card-property">
            <div className="label">{props.bea}</div>
            <div className="value">{props.beaValue}</div>
          </div>
          <div className="card-property">
            <div className="label">{props.aea}</div>
            <div className="value">{props.aeaValue}</div>
          </div>
        </>
      )}
    </>
  );
}

CardBody.defaultProps = {
  ovByProduct: false
};
