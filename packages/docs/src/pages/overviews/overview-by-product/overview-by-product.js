//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useContext} from "react";
import { QGenericObject, QListObject } from "@reaqtive/q";
import {RqtvPageHeader} from '@reaqtive/components';
import CardDecksByBrand from "./components/card-decks-by-brand";
import  {Breadcrumb}  from "../../../shared-components/index.js";
import { RqtvPage, RqtvStandardTemplate, RqtvPageContext } from "@reaqtive/components";
import BasketAnalysis from "../basket/basket-analysis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation
} from "react-router-dom";
//import BasketAnalysis from "../basket-analysis";

const OverviewByProduct = props => {
  const match = useRouteMatch();
  return (
    <>
      <RqtvPage
        path={props.path + "/basket-analysis"}
        id={10}
        title={"props.title"}
        qConditionExpr={"=count(distinct [Country])=1 and count(distinct [Submodel Benchmark])=1"}
        fallbackPage={match.path}
        qTitleExpr ="'basket analysis - '&only([Submodel Benchmark])&'-'&only([Country ISO Code])&' - '&$(lastMonthLabel)"
      >
        <RqtvStandardTemplate
          searchFieldsMatch={{ method: "include", mask: ["Cust*"] }}
          useContainerFluid={false}
          containerClassName={"full-screen"}
          usePageHeader={false}
        >
          <BasketAnalysis />
        </RqtvStandardTemplate>
      </RqtvPage>
      <Route exact={true} path={match.path}>
        <RqtvPage
          path={props.path}
          id={9}
          title={props.title}
          qTitleExpr="'overview by product - '&$(lastMonthLabel)"
        >
          <Layout/>
        </RqtvPage>
      </Route>
    </>
  );
};

const Layout = props => {
  const rqtvPageContext = useContext(RqtvPageContext)

  return(
    <div className="overview-by-product">
      <div className="container-fluid">
        <RqtvPageHeader style={{ paddingTop: "0.5rem" }} title={rqtvPageContext.qTitle}></RqtvPageHeader>
      </div>
      <Breadcrumb/>
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
