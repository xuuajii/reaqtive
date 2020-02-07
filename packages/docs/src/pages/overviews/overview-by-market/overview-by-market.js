import React, { useState, useEffect } from "react";
import ToggleSwitch from "../../../components/layout/toggle-switch/toggle-switch";
import Card from '../../../components/layout/card/Card';
const OverviewByMarket = props => {
    
  const [value, setValue] = useState(false);

  return (
    <>
      <h1>By Market</h1>
      <ToggleSwitch
        isOn = {value}
        onChange={function(e) {
            setValue(!value);
        }}
      />
      {value && <p>Attivato</p>}

      <Card displayLogo={true} isInfoAbsolute={true} gradient={true} />
    </>
  );
};

export default OverviewByMarket;
