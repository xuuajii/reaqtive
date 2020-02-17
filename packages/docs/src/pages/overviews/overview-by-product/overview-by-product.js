//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import { QGenericObject, QListObject } from "@reaqtive/q";
import PageHeader from "../../../shared-components/layout/page-header/page-header";
import CardDecksByBrand from "./components/card-decks-by-brand";
import { RqtvBreadcrumb } from "@reaqtive/components";
import { RqtvPage, RqtvStandardTemplate } from "@reaqtive/components";
import BasketAnalysis from "../basket/basket-analysis";
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
      <RqtvPage
        path={props.path + "/basket-analysis"}
        id={10}
        title={"props.title"}
        conditionExpr={"=count(distinct [Country])=1 and count(distinct [Submodel Benchmark])=1"}
        fallbackPage={match.path}
        // triggers={[
        //   {type:'fieldSelection',params:{fieldName:'Customer',value:'Benedict', alwaysOneSelected:true}},
        //   //{type:'fieldSelection',params:{fieldName:'AccountDesc',value:'Bonus'}},
        // ]}

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
