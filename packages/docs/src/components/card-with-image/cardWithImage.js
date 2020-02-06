import React from "react";
import './cardWithImage.scss';

const CardWithImage = props => {
  return (
    <>
      <div id="card-with-image" class="card">
        <img class="card-img-top" src={props.img} style={{height : props.imgHeight, padding: props.imgPadding}}/>
        <div class="card-body pt-2">
          <h5 class="card-title font-weight-bold">{props.title}</h5>
          <p class="card-text">{props.body}</p>
        </div>
      </div>
    </>
  );
};

export default CardWithImage;
