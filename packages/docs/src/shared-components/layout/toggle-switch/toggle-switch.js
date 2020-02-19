//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

import "./toggle-switch.scss";

const ToggleSwitch = props => {


  const labelTransition = useSpring({
    backgroundColor : props.isOn ? `${props.activatedColor}` : `${props.disactivatedColor}` ,
    transform: `scale(${props.scaleValue})`
  });

  return (
    <>
      <input
        checked={props.isOn}
        onChange={props.onChange}
        className="react-switch-checkbox"
        id={props.id}
        type="checkbox"
      />
        <animated.label
          style={props.onChange && labelTransition}
          className="react-switch-label"
          htmlFor={props.id}
        >
          <span className={`react-switch-button`} />
        </animated.label>
      
    </>
  );
};

export default ToggleSwitch;

ToggleSwitch.defaultProps = {
  id: "react-switch-new",
  activatedColor: "#5C88DA",
  disactivatedColor: "grey",
  defaultSwitchStatus: true,
  scaleValue: 0.5,
  isOn: false,
  onChange : function(e) {
    return null;
  }
};
