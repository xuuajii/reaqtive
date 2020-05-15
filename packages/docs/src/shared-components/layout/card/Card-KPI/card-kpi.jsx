//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import Progress from "../../../Progress/Progress";

export default function CardKPI(props) {
  return (
    <div className="d-flex w-100 justify-content-around mb-3">
      <Progress
        value={props.visualPrice}
        textLabel={props.visualPriceLabel}
        range={props.visualPriceRange}
        minValue = {props.minVisualPrice}
      />
      <Progress
        value={props.discountedPrivate}
        textLabel={props.discountedPrivateLabel}
        range={props.discountedPrivateRange}
        minValue = {props.minDiscountedPrivate}
      />
      <Progress
        value={props.discountedBusiness}
        textLabel={props.discountedBusinessLabel}
        range={props.discountedBusinessRange}
        minValue = {props.minDiscountedBusiness}
      />
    </div>
  );
}
