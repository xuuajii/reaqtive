//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState} from 'react';

const Avatar = (props) => {
    const {avatarUrl, avatarPlaceHolder, isRounded, height, width, position, left, right, top, bottom } = props;

    const [imgError, setImgError]=useState()

    const replaceEmptyImage = () => {
      setImgError(true)
    }
    const style = {height, width, position, left, right, top, bottom, ...props.style}
    return (
        imgError||props.avatarUrl===undefined
        ?<span className={props.className} style={{textTransform:'uppercase', ...style}}>{avatarPlaceHolder}</span>
        :<img
            onError={replaceEmptyImage}
            src={avatarUrl}
            style={{maxWidth:'130%', ...style}}
            type="image/svg+xml"
        />

    )
}

Avatar.defaultProps = {
    height: 200,
    width: 'auto'
  };

export default Avatar;
