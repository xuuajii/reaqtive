//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useState, useEffect } from "react";
import ToggleSwitch from "../../../shared-components/layout/toggle-switch/toggle-switch";
import Card from "../../../shared-components/layout/card/Card";
import DataPicker from "../../../shared-components/layout/data-picker/data-picker";
const OverviewByMarket = props => {
  const [value, setValue] = useState(false);

  return (
    <>
      <h1>By Market</h1>
      <ToggleSwitch
        isOn={value}
        onChange={function(e) {
          setValue(!value);
        }}
      />
      {value && <p>Attivato</p>}
      <DataPicker />
      <Card
        displayLogo={true}
        isInfoAbsolute={true}
        gradient={true}
        displayKPI={true}
        displayBody={true}
      />
    </>
  );
};

export default OverviewByMarket;
