//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import { QGenericObject, QListObject } from "@reaqtive/q";
import PageHeader from "../../../shared-components/layout/page-header/page-header";
import CardDecksByBrand from "./components/card-decks-by-brand";
import {RqtvBreadcrumb} from "@reaqtive/components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
//import BasketAnalysis from "../basket-analysis";

const OverviewByProduct = props => {
  let match = useRouteMatch();
  return (
    <>
      <Route exact path={`${match.path}/basket-analysis`}>
        {/*<BasketAnalysis />*/}
      </Route>
      <Route exact={true} path={match.path}>
        <div className="overview-by-product">
          <div className="container-fluid">
            <PageHeader style={{ paddingTop: "0.5rem" }}></PageHeader>
          </div>
          <RqtvBreadcrumb />
          <QGenericObject qObjectDef={brandListObjectDef}>
            <CardDecksByBrand />
          </QGenericObject>
        </div>
      </Route>
    </>
  );
};

export default OverviewByProduct;


const brandListObjectDef = {
    qInfo: {
      qType: "tableData"
    },
    brands: {
      qStringExpression: {
        qExpr: "concat(distinct [Brand Benchmark],',')"
      }
    }
  };