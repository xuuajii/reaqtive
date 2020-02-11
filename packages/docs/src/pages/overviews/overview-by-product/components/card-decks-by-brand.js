//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useState, useEffect, useContext } from "react";
import {
  RqtvRenderer,
  RqtvBreadcrumb,
  RqtvPageContext
} from "@reaqtive/components";
import CardDecksHeader from "./card-decks-header";

const BasketByProduct = props => {
  const { qLayoutHandler } = props;
  const brands =
    (qLayoutHandler.qLayout && qLayoutHandler.qLayout.brands.split(",")) || [];
  const pageInfo = useContext(RqtvPageContext);
  return (
    <>
      <RqtvRenderer
        loading={qLayoutHandler.qLoading}
        error={qLayoutHandler.qError}
        noData={brands.length === 0}
      >
        {brands.map((brand, index) => {
          return isNaN(brand) ? (
            <CardDecksHeader key={brand} brand={brand}/>
          ) : null;
        })}
      </RqtvRenderer>
    </>
  );
}

export default BasketByProduct;

