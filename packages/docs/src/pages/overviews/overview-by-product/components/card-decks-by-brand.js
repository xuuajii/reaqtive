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
  const brands = qLayoutHandler.qLayout && qLayoutHandler.qLayout.brandJSON.split("|").map(brand=>JSON.parse(brand))||[]

  const pageInfo = useContext(RqtvPageContext);
  return (
    <>
      <RqtvRenderer
        loading={qLayoutHandler.qLoading}
        error={qLayoutHandler.qError}
        noData={brands.length === 0}
      >
        {brands.map((brand, index) => {
          return isNaN(Number(brand.description)) ? (
            <CardDecksHeader key={brand.description} brand={brand.description} brandImage={brand.brandImage}/>
          ) : null;
        })}
      </RqtvRenderer>
    </>
  );
}

export default BasketByProduct;
