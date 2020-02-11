//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import "./Progress.scss";

export default function Progress(props) {
  let rangeValue = props.range;
  let minValue = props.minValue;
  let size = props.size;
  let value = props.value;
  let type = props.type;
  let barSize = props.barSize;
  let label = props.label;
  let textLabel = props.textLabel;
  let proportionalValue;
  let color;
  
  if(value < 99){
    color = "green";
  }
  if(value > 103){
    color = "#f75353"
  }
  if(value > 98 && value < 104){
    color = "orange"
  }

  proportionalValue = (100 * (props.value - minValue)) / rangeValue + 10;
  return (
    <div>
      <div className="pie-chart" style={{color:`${color}`}}>
        <svg width={size} height={size} className="chart">
          <circle
            r={size / 2}
            cx={size / 2}
            cy={size / 2}
            className="pie"
            style={{
              strokeDasharray: `${((size * Math.PI) / 100) *
                Number(proportionalValue)}, 158`
            }}
          ></circle>
          {type === "doughnut" && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 2 - barSize}
              strokeWidth="0"
              className="pie-hole"
            ></circle>
          )}
        </svg>
        {label && <div className="pie-label">{value}</div>}
      </div>
      {label && <div className="text-center text-label mt-1">{textLabel}</div>}
    </div>
  );
}

Progress.defaultProps = {
  barSize: 6,
  label: true,
  size: 50,
  type: "doughnut", //you can use "doughnut,pie,semicircular"
  value: 110,
  textLabel: "N/D",
  minValue: 100,
  range: 103
};
