import React, { useState, useEffect } from "react";
import ToggleSwitch from "../../../components/layout/toggle-switch/toggle-switch";

const OverviewByMarket = props => {
  const [isSwitchActivated, setIsSwitchActivated] = useState(false);

  useEffect(() => {
    if (isSwitchActivated) {
      //do something
    }
  }, [isSwitchActivated]);
  return (
    <>
      <h1>By Market</h1>
      <ToggleSwitch
        id={1}
        small={true}
        onChange={function(e) {
          setIsSwitchActivated(e);
        }}
      />
      {isSwitchActivated && <p>Attivato</p>}
    </>
  );
};

export default OverviewByMarket;
