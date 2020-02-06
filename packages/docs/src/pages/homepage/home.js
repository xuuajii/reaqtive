//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useRef, useContext } from "react";
import {
  RqtvApp,
  RqtvPage,
  RqtvStandardTemplate,
  RqtvBlankTemplate
} from "@reaqtive/components";
import { RqtvPageHeader, Section } from "../../app-components/index";
import { NavLink } from "react-router-dom";
import { RqtvAppContext } from "@reaqtive/components";
import Overviews from "./sections/OverviewSection";
import Channels from "./sections/ChannelsSection";
import Footer from "./sections/Footer";
import "./home.scss";

const Home = props => {
  const rqtvApp = useContext(RqtvAppContext);
  return (
    rqtvApp && (
      <RqtvPage
        maximizeEl={props.maximizeEl}
        path={props.path}
        id={props.id}
        title={props.title}
        exact={props.exact}
      >
        <RqtvStandardTemplate
          usePageHeader={false}
          sideMenuFieldsMatch={{
            method: "include",
            mask: ["Cust*", "*Desc*"]
          }}
          useContainerFluid={false}
          containerClassName={"full-screen"}
        >
          <section id="main" className="parallax">
            <Overviews />
            <Channels /> 
          </section>
          <section id="footer" className="parallax pt-5">
            <Footer />
          </section>
          
        </RqtvStandardTemplate>
      </RqtvPage>
    )
  );
};
export default Home;
