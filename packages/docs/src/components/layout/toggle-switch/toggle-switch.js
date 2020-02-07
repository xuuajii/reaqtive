import React, { useState, useEffect } from "react";
import "./toggle-switch.scss";

const ToggleSwtich = props => {
  const [checked, setChecked] = useState(false);

  const onChange = e => {
    setChecked(!checked);
  };

  useEffect(() => {
    props.onChange(checked);
  }, [checked]);

  return (
    <div
      className={"toggle-switch" + (props.small ? " small-switch" : "")}
      style={{ width: props.width }}
    >
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        name="toggleSwitch"
        id={props.id}
        onChange={onChange}
      />
      <label className="toggle-switch-label" htmlFor={props.id}>
        <span
          className={
            props.disabled
              ? "toggle-switch-inner toggle-switch-disabled"
              : "toggle-switch-inner"
          }
        />
        <span
          className={
            props.disabled
              ? "toggle-switch-switch toggle-switch-disabled"
              : "toggle-switch-switch"
          }
        />
      </label>
    </div>
  );
};

export default ToggleSwtich;

ToggleSwtich.defaultProps = {
  disabled: false,
  small: false
};
