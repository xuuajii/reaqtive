import React from "react";

const Rectangle = props => {
  return (
    <div
      style={{
        height: props.height,
        width: props.width,
        backgroundColor: props.backgroundColor,
        transform: "skewX(-45deg)",
        marginLeft: props.marginLeft,
        marginTop: props.marginTop
      }}
    ></div>
  );
};

export default Rectangle;

Rectangle.defaultProps = {
  height: 10,
  width: 40,
  height: 100,
  backgroundColor: "#555"
};
