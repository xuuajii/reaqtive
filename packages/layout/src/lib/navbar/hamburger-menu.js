//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import { animated, useSpring, config } from 'react-spring'

const openedTransformationConfig = {
    top: 'translate(2, 2) rotate(0)',
    center: 'translate(2, 14) rotate(0)',
    bottom: 'translate(2, 26) rotate(0)',
    opacity:1
}

const closedTransformationConfig = {
    top: 'translate(10, 0) rotate(45)',
    center: 'translate(-50, 14) rotate(0)',
    bottom: 'translate(7, 28) rotate(-45)',
    opacity:0
}

const HamburgerMenu = ({ isOpen }) => {
    const { top, center, bottom, opacity } = useSpring({
        to: isOpen ? closedTransformationConfig : openedTransformationConfig,
        config: config.stiff,
    })
    return (
        <span className="hamburger-menu">
          <animated.svg width="44" height="35" viewBox="0 0 44 35" xmlns="http://www.w3.org/2000/svg">
              <animated.rect width="40" height="3" rx="1" transform={top} />
              <animated.rect width="40" height="3" rx="1" transform={center} opacity={opacity}/>
              <animated.rect width="40" height="3" rx="1" transform={bottom} />
          </animated.svg>
        </span>
    )
}

export default HamburgerMenu
