import React, { useState, useEffect } from "react";
import "./toggle-switch.scss";

const ToggleSwtich = props => {
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

export default ToggleSwtich;

ToggleSwtich.defaultProps = {
  activatedColor: "#5C88DA",
  defaultSwitchStatus: true,
  scaleValue: 0.5
};
