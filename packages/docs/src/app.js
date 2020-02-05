//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useRef } from "react";
import Home from "./pages/homepage/home";
import Visualizations from "./pages/visualizations";
import Filters from "./pages/filters";
import ReaqtiveQ from "./pages/reaqtive-q";
import { HashRouter as Router } from "react-router-dom";
import Reaqtive from "@reaqtive/q";
import {
  RqtvApp,
  RqtvPage,
  RqtvStandardTemplate,
  RqtvBlankTemplate
} from "@reaqtive/components";
import SetUp from "./pages/set-up";
import qConfig from "./q-config";
/* Import Assets */
import Logo from "./images/logo.png";

const App = props => {
  const fields = [
    "Basket",
    "Year Month",
    "Model",
    "Brand",
    "Country",
    "UID Code",
    "Model Version",
    "Fuel Type",
    "Model Benchmark",
    "Flag In Avg",
    "Submodel Benchmark"
  ];
  const maximizeEl = useRef();
  return (
    <Reaqtive qConfig={qConfig} qCapabilityApiRequired={true}>
      {/*<ExampleApp />*/}
      <RqtvApp
        sideMenuFields={{ method: "include", mask: ["**"] }}
        title=""
        brand={Logo}
        brandStyle={{
          width: 100,
          height: "auto"
        }}
        sideMenuFieldsMatch={{ method: "include", mask: fields }}
      >
        {/*Home*/}
        <Home
          maximizeEl={maximizeEl}
          path={"/"}
          id={0}
          title="Home"
          exact={true}
        />

        {/*Quick Start*/}
        <RqtvPage
          path={"/overview-by-market"}
          id={1}
          title="OVERVIEW BY MARKET"
        >
          <RqtvStandardTemplate useContainerFluid={false}>
            <SetUp />
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*OVERVIEW BY PRODUCT*/}
        <RqtvPage
          path={"/overview-by-product"}
          exact={true}
          id={3}
          title="OVERVIEW BY PRODUCT"
        >
          <RqtvStandardTemplate useContainerFluid={false}>
            <Visualizations />
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*PURCHASING*/}
        <RqtvPage
          path={"/purchasing"}
          id={2}
          title="PURCHASING"
          // triggers={[
          //   {type:'fieldSelection',params:{fieldName:'Customer',value:'Benedict', alwaysOneSelected:true}},
          //   //{type:'fieldSelection',params:{fieldName:'AccountDesc',value:'Bonus'}},
          // ]}
        >
          <RqtvStandardTemplate
            searchFieldsMatch={{ method: "include", mask: ["Cust*"] }}
            useContainerFluid={false}
          >
            <Filters />
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*LONG TERM RENTAL*/}
        <RqtvPage
          path={"/long-term-rental"}
          id={4}
          title="LONG TERM RENTAL"
          // triggers={[
          //   {type:'fieldSelection',params:{fieldName:'Customer',value:'Benedict', alwaysOneSelected:true}},
          //   //{type:'fieldSelection',params:{fieldName:'AccountDesc',value:'Bonus'}},
          // ]}
        >
          <RqtvStandardTemplate
            searchFieldsMatch={{ method: "include", mask: ["Cust*"] }}
            useContainerFluid={false}
            usePageHeader={true}
          >
            <ReaqtiveQ />
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*LONG TERM RENTAL*/}
        <RqtvPage
          path={"/tco-&-residual-value"}
          id={5}
          title="TCO & RESIDUAL VALUE"
          // triggers={[
          //   {type:'fieldSelection',params:{fieldName:'Customer',value:'Benedict', alwaysOneSelected:true}},
          //   //{type:'fieldSelection',params:{fieldName:'AccountDesc',value:'Bonus'}},
          // ]}
        >
          <RqtvStandardTemplate
            searchFieldsMatch={{ method: "include", mask: ["Cust*"] }}
            useContainerFluid={false}
            usePageHeader={true}
          >
            <ReaqtiveQ />
          </RqtvStandardTemplate>
        </RqtvPage>
      </RqtvApp>
    </Reaqtive>
  );
};

export default App;
