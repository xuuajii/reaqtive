//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react';

const Flags = (props) => {
    const isRounded = props.isRounded;
    const country = props.countryCode;
    let shape;
    if(isRounded){
        shape = "rounded";
    } else shape = "rect";
    
    return (
        <img 
            src={require(`../../images/flags/${country}_${shape}.svg`)}
            height={props.height}
            width={props.width}
            type="image/svg+xml"
        />
        
    )
}

Flags.defaultProps = {
    height: 200,
    width: 'auto',
    isRounded: false,
    countryCode : 'de'
  };

export default Flags;

