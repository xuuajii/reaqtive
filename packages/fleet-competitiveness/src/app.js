//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useRef } from "react";
import Home from "./pages/homepage/home";
import Purchasing from "./pages/purchasing/index";
import Overview from "./pages/overview/overview";
import Ltr from "./pages/ltr/index";
import Tco from "./pages/tco/index";
import Reaqtive from "@reaqtive/q";
import { RqtvApp } from "@reaqtive/components";

import qConfig from "./q-config";
/* Import Assets */
import Logo from "./images/logo.png";

const App = props => {
  const sideMenuFieldsMatch = { method: "include", mask: ['*Benchmark*', '*Year*', '*Basket*'] }
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
        sideMenuFieldsMatch={sideMenuFieldsMatch}
      >
        <Overview
          path={"/overview-by-country"}
          id={1}
          title="Overview by Country"
          exactActiveMatch={false}
          sideMenuFieldsMatch={sideMenuFieldsMatch}
        />
        <Overview
          path={"/overview-by-product"}
          id={2}
          exactActiveMatch={false}
          sideMenuFieldsMatch={sideMenuFieldsMatch}
        />
        {/*PURCHASING*/}
        <Purchasing
          path={"/purchasing"}
          id={3}
          title="'PURCHASING'"
          sideMenuFieldsMatch={sideMenuFieldsMatch}
        />
        {/*LONG TERM RENTAL*/}
        <Ltr
          path={"/long-term-rental"}
          id={4}
          title="'LONG TERM RENTAL'"
          sideMenuFieldsMatch={sideMenuFieldsMatch}
        />
        {/*LONG TERM RENTAL*/}
        <Tco
          path={"/tco-&-residual-value"}
          id={5}
          title="'TCO & RESIDUAL VALUE'"
          sideMenuFieldsMatch={sideMenuFieldsMatch}
        />
        {/*Home*/}
        <Home
          maximizeEl={maximizeEl}
          path={"/"}
          id={0}
          title="Home"
          linkName="home"
          exact={true}
          sideMenuFieldsMatch={sideMenuFieldsMatch}
        />
      </RqtvApp>
    </Reaqtive>
  );
};

export default App;
