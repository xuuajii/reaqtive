import React from "react";
import './cardWithOverlay.scss'
import { useHistory } from 'react-router-dom';

const CardOverlay = props => {
    //let history = useHistory();
    return(
    <div /*onClick={() => history.replace(props.redirect)}*/ id="card-overlay" className="card bg-dark text-white">
        <img
        src={props.img}
        className="card-img"
        alt="..."
        />
        <div className="card-img-overlay">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">
            {props.text}
        </p>
        </div>
    </div>
    )
}

export default CardOverlay;

CardOverlay.defaultProps = {
    img : require('../../images/placeholders/car.png'),
    title: "Title",
    text : "Text"
}