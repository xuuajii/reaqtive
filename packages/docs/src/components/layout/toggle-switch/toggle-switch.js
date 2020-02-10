//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useState, useEffect } from "react";
import "./toggle-switch.scss";

const ToggleSwitch = props => {
  return (
    <>
      <input
        checked={props.isOn}
        onChange={props.onChange}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{
          background: props.isOn && props.activatedColor,
          transform: `scale(${props.scaleValue})`
        }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default ToggleSwitch;

ToggleSwitch.defaultProps = {
  activatedColor: "#5C88DA",
  defaultSwitchStatus: true,
  scaleValue: 0.5
};
