//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const Switch = props => {

  const [isOn, setIsOn] = useState(props.isOn)

  const labelAnimation = useSpring({
    config:{duration:10},
    backgroundColor : isOn ? `${props.activatedColor}` : `${props.disactivatedColor}` ,
    transform: `scale(${props.scaleValue})`
  });

  const buttonAnimation = useSpring({
    config:{duration:10},
    left : !isOn ? 0+'%' : 50+'%'
  });

  const toggle = (e) => {
    (typeof props.onChange === 'function')&&props.onChange(e)
    setIsOn(!isOn)
  }

  const flexDirection = props.labelPosition==='top'||props.labelPosition==='bottom'?'flex-column':'flex-row'

  return (
    <div className={`switch-container ${flexDirection}`}>
      <span className={`switch-label ${props.labelPosition}`}>{props.label}</span>
      <animated.label
        style={labelAnimation}
        className="switch-slider"
        htmlFor={props.id}
      >
        <input
          checked={isOn}
          onChange={toggle}
          className="switch-checkbox"
          type="checkbox"
        />
        <animated.span className={`switch-button`} style={buttonAnimation}/>
      </animated.label>
    </div>
  );
};

export default Switch;

Switch.defaultProps = {
  labelPosition:'left',
  label:'My Switch Label',
  activatedColor: "#5C88DA",
  disactivatedColor: "grey",
  defaultSwitchStatus: true,
  scaleValue: 1,
  isOn: false,
  onChange : function(e) {
    return null;
  }
};
