//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState} from 'react';

const Avatar = (props) => {
    const {avatarUrl, avatarPlaceHolder, isRounded} = props;
    
    const [imgError, setImgError]=useState()

    const replaceEmptyImage = () => {
      setImgError(true)
    }
    return (
        imgError
        ?<span style={{textTransform:'uppercase'}}>{avatarPlaceHolder}</span>
        :<img
            onError={replaceEmptyImage}
            src={avatarUrl}
            height={props.height}
            width={props.width}
            type="image/svg+xml"
        />

    )
}

Avatar.defaultProps = {
    height: 200,
    width: 'auto'
  };

export default Avatar;
