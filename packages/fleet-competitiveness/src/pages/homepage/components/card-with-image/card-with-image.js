//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import {useHistory} from 'react-router-dom'
import './card-with-image.scss';

const CardWithImage = props => {
  const history = useHistory()
  const navigate= () => {
    history.push(props.link)
  }
  return (
    <>
      <div id="card-with-image" className="card" onClick={navigate}>
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
