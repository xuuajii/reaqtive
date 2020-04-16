//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useEffect, useContext} from "react";
import { QGenericObject, QListObject } from "@reaqtive/q";
import {RqtvPageHeader, RqtvBreadcrumb} from '@reaqtive/components';
import CardDecksByBrand from "./components/card-decks-by-brand";
// import  {Breadcrumb}  from "../../../shared-components/index.js";
import { RqtvPage, RqtvStandardTemplate, RqtvPageContext } from "@reaqtive/components";
import BasketAnalysis from "../basket/basket-analysis";
import { Route } from "react-router-dom";
import OverviewHeader from '../overview-header'
//import BasketAnalysis from "../basket-analysis";

const OverviewByProduct = props => {
  return (
    <RqtvPage
        path={props.path}
        id={9}
        title={props.title}
        qTitleExpr="'overview by product - '&$(lastMonthLabel)"
      >
      <RqtvStandardTemplate
       sideMenuFieldsMatch={props.sideMenuFieldsMatch}
       useContainerFluid={false}
       containerClassName={"full-screen"}
       usePageHeader={false}
      >
        <RqtvPage
          path={props.path + "/basket-analysis"}
          id={10}
          qConditionExpr={"=count(distinct [Country])=1 and count(distinct [Submodel Benchmark])=1"}
          fallbackPage={props.path}
          qTitleExpr ="'basket analysis - '&only([Submodel Benchmark])&'-'&only([Country ISO Code])&' - '&$(lastMonthLabel)"
        >
          <OverviewHeader/>
          <RqtvBreadcrumb/>
          <BasketAnalysis />
        </RqtvPage>
        <RqtvPage
          path={props.path}
          exact={true}
          qTitleExpr ="'overview by product'&' - '&$(lastMonthLabel)"
        >
          <OverviewHeader/>
          <RqtvBreadcrumb/>
          <Layout/>
        </RqtvPage>
      </RqtvStandardTemplate>
    </RqtvPage>
  );
};

const Layout = props => {
  const rqtvPageContext = useContext(RqtvPageContext)
  const [showNavbarCollapse, setShowNavbarCollapse] = useState(false)
  const toggleNavbarCollapse = () => setShowNavbarCollapse(!showNavbarCollapse)
  return(
    <div className="overview-by-product">
      <QGenericObject qObjectDef={brandListObjectDef}>
        <CardDecksByBrand />
      </QGenericObject>
    </div>
  )
}

export default OverviewByProduct;

const brandListObjectDef = {
  qInfo: {
    qType: "tableData"
  },
  brands: {
    qStringExpression: {
      qExpr: "concat(distinct [Brand Benchmark],',')"
    }
  },
  brandJSON: {
    qStringExpression: {
      qExpr: `concat(distinct '{"description":"'&[Brand Benchmark]&'",'&'"brandImage":"'&rangemaxstring([Brand Image Benchmark],0)&'"}', '|')`
    }
  }
};
