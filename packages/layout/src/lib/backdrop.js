//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import PropTypes from 'prop-types'
import {useTransition, animated} from 'react-spring'
const Backdrop = props => {
  //  const animatedProps = useSpring({
  //   opacity:props.show?0.5:0,
  //   display:props.show===true?'block':'none'
  // })

  const transitions = useTransition(props.show, null, {
    from: {  display: 'none', opacity: 0},
    enter: { display: 'block', opacity: 0.5 },
    leave: { opacity: 0 },
  })

  const onClick = () => {
    console.log(1)
    props.onClick&&props.onClick()
  }
  const {zIndex} = props
  return transitions.map(({ item, key, props }) =>
      item &&
      <animated.div
        key={key}
        className={`modal-backdrop show`}
        style={{zIndex:zIndex, ...props}}
        onClick={onClick}
      />)
}

Backdrop.propTypes={
  zIndex:PropTypes.number
}

Backdrop.defaultProps={
  zIndex:1040
}

export default Backdrop
