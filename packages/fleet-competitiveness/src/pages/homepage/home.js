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
import { NavLink } from "react-router-dom";
import { RqtvAppContext } from "@reaqtive/components";
import Overviews from "./sections/overview-section";
import Channels from "./sections/channel-section";
import Footer from "./sections/footer";
import Divider from "./components/divider";
import "./home.scss";

const Home = props => {
  const rqtvApp = useContext(RqtvAppContext);
  console.log(rqtvApp)
  return (
    rqtvApp && (
      <>
        <section id="main" className="parallax">
          <Overviews />
          <Channels />
        </section>
        <Divider height={70} backgroundColor={"rgba(212, 205, 205, 0.81)"} />
        <section id="footer" className="parallax pt-5">
          <Footer />
        </section>
      </>
    )
  );
};
export default Home;