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
import { RqtvApp, RqtvPage, RqtvStandardTemplate } from "@reaqtive/components";

import qConfig from "./q-config";
/* Import Assets */
import Logo from "./images/logo.png";
const sideMenuFieldsMatch = { method: "include", mask: ['*Benchmark*', '*Year*', '*Basket*'] }
const stdTemplateProps = {
  usePageHeader:false,
  useContainerFluid:true,
  searchFieldsMatch:sideMenuFieldsMatch,
  containerClassName:"full-screen",
}
const App = props => {
  const maximizeEl = useRef();
  return (
    <Reaqtive qConfig={qConfig} qCapabilityApiRequired={true}>
      {/*<ExampleApp />*/}
      <RqtvApp
        title=""
        brand={Logo}
        brandUrl={'/'}
        brandStyle={{
          width: 100,
          height: "auto"
        }}
        sideMenuFieldsMatch={sideMenuFieldsMatch}
      >
        <RqtvPage path={"/overview-by-country"} exactActiveMatch={false} >
          <RqtvStandardTemplate {...stdTemplateProps}>
            <Overview maximizeEl={maximizeEl}/>
          </RqtvStandardTemplate>
        </RqtvPage>
        <RqtvPage path={"/overview-by-product"} exactActiveMatch={false} >
          <RqtvStandardTemplate {...stdTemplateProps}>
            <Overview maximizeEl={maximizeEl}/>
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*PURCHASING*/}
        <RqtvPage path={"/purchasing"} exactActiveMatch={false} >
          <RqtvStandardTemplate {...stdTemplateProps}>
            <Purchasing maximizeEl={maximizeEl}/>
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*LONG TERM RENTAL*/}
        <RqtvPage path={"/long-term-rental"} exactActiveMatch={false} >
          <RqtvStandardTemplate {...stdTemplateProps}>
            <Ltr maximizeEl={maximizeEl}/>
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*LONG TERM RENTAL*/}
        <RqtvPage path={"/tco-&-residual-value"} exactActiveMatch={false} >
          <RqtvStandardTemplate {...stdTemplateProps}>
            <Tco maximizeEl={maximizeEl}/>
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*Home*/}
        <RqtvPage path={"/"} exactActiveMatch={false} linkName="home" exact={true}>
          <RqtvStandardTemplate {...stdTemplateProps} useSideMenu={false}>
            <Home/>
          </RqtvStandardTemplate>
        </RqtvPage>
      </RqtvApp>
    </Reaqtive>
  );
};

export default App;
