//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useRef } from "react";
import Home from "./pages/home";
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

const App = props => {
  const maximizeEl = useRef();
  return (
    <Reaqtive qConfig={qConfig} qCapabilityApiRequired={true}>
      {/*<ExampleApp />*/}
      <RqtvApp
        sideMenuFields={{ method: "include", mask: ["**"] }}
        title="Fleet Competitiveness"
      >
        {/*Home*/}
        <RqtvPage path={"/"} id={0} title="Home Page" exact={true}>
          <RqtvStandardTemplate
            usePageHeader={false}
            sideMenuFieldsMatch={{
              method: "include",
              mask: ["Cust*", "*Desc*"]
            }}
            useContainerFluid={false}
          >
            <Home maximizeEl={maximizeEl} />
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*Quick Start*/}
        <RqtvPage path={"/quick-start"} id={1} title="Quick Start">
          <RqtvStandardTemplate useContainerFluid={false}>
            <SetUp />
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*Visualizations*/}
        <RqtvPage
          path={"/visualizations"}
          exact={true}
          id={3}
          title="Visualizations"
        >
          <RqtvStandardTemplate useContainerFluid={false}>
            <Visualizations />
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*Filters*/}
        <RqtvPage
          path={"/filters"}
          id={2}
          title="Filters"
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
        {/*Filters*/}
        <RqtvPage
          path={"/reaqtive-q"}
          id={4}
          title="@raqtive/q"
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
