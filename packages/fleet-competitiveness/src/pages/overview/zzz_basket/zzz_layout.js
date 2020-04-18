//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React, { useState, useEffect} from "react";
import { RqtvSpinner } from "@reaqtive/components";
import BasketAnalysisCards from "./basket-analysis-cards";
import {RqtvVizContainer, QViz} from "@reaqtive/components"

const Layout = props => {

  const isLayoutLoaded = props.qLayoutHandler.qLayout && props.qLayoutHandler.qLayout;
  const hypercube = isLayoutLoaded && props.qLayoutHandler.qLayout.qHyperCube
  const basket = hypercube && hypercube.qPivotDataPages[0].qLeft[0].qText;
  isLayoutLoaded&&props.showCharts()
  return (
    <div>
      {isLayoutLoaded ? (
        <>
          <BasketAnalysisCards hypercube={hypercube} />
        </>
      ) : (
        <RqtvSpinner isSticky={true} />
      )}
    </div>
  );
};

export default Layout;
