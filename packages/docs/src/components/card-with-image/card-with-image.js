import React from "react";
import './card-with-image.scss';

const CardWithImage = props => {
  return (
    <>
      <div id="card-with-image" class="card">
        <img className="card-img-top" src={props.img} style={{height : props.imgHeight, padding: props.imgPadding}}/>
        <div className="card-body pt-2">
          <h5 className="card-title font-weight-bold">{props.title}</h5>
          <p className="card-text">{props.body}</p>
        </div>
      </div>
    </>
  );
};

export default CardWithImage;
