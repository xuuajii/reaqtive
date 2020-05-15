//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react';
import './card-deck.scss';

export default function CardBox (props) {
    return(
        <div style={{backgroundImage:props.backgroundGradient, zIndex:0, minHeight:props.minHeight}} className="card-box-container" >
            <ul className="flex-container">
                {props.children}
            </ul>
        </div>
    );
}

CardBox.defaultProps = {
  minHeight:243
}
