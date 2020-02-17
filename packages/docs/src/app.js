//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useRef } from "react";
import Home from "./pages/homepage/home";
import Purchasing from "./pages/purchasing/purchasing";
import Overviews from "./pages/overviews/overviews";
import LongTermRental from "./pages/long-term-rental/long-term-rental";
import TcoAndResidualValue from "./pages/tco-&-residual-value/tco-and-residual-value";
import Reaqtive from "@reaqtive/q";
import { RqtvApp } from "@reaqtive/components";

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

        <Overviews
          path={"/overview/country"}
          id={1}
          title="Overview by Market"
          mainDimension={"country"}
          exactActiveMatch={false}
        />

        <Overviews
          path={"/overview/product"}
          id={2}
          title="Overview by Product"
          mainDimension={"product"}
          exactActiveMatch={false}
        />
        {/*PURCHASING*/}
        <Purchasing path={"/purchasing"} id={3} title="PURCHASING" />

        {/*LONG TERM RENTAL*/}
        <LongTermRental
          path={"/long-term-rental"}
          id={4}
          title="LONG TERM RENTAL"
        />

        {/*LONG TERM RENTAL*/}
        <TcoAndResidualValue
          path={"/tco-&-residual-value"}
          id={5}
          title="TCO & RESIDUAL VALUE"
        />
      </RqtvApp>
    </Reaqtive>
  );
};

export default App;
