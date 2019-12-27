//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, { useContext, useRef} from 'react'
import PropTypes from 'prop-types'
import { useTransition, animated} from 'react-spring'
import { SideMenuContext, SideMenuContextProvider} from './index'
import {System, SystemProvider} from '../index'
import Backdrop from '../backdrop'

const SideMenu = props => {
  return (
    <SideMenuContextProvider {...props}>
      <SideMenuLayout {...props}/>
    </SideMenuContextProvider>
  )
}


const SideMenuLayout = props => {
  const sidemenuEl=useRef()
  const system = useContext(System)
  const sideMenuContext = useContext(SideMenuContext)
  const config = sideMenuContext.config
  const sideMenuStyle = {
    width:Math.trunc(system.windowWidth*config.ratio)
  }

  const transitions = useTransition(sideMenuContext.isOpen, null, {
    from: {  opacity:0.75, transform:`translateX(-100%)` , overflow:'hidden'},
    enter: {  opacity:1, transform:`translateX(0)`, overflow:'hidden' },
    leave: {  opacity:0.75, transform:`translateX(-100%)`, overflow:'hidden' },
    reset:true,
    unique:true
  })

  const sidemenuChildren = sideMenuContext.isOpen?React.Children.toArray(props.children):null
  const sideMenuProps = props
  return (
    <>
      {
        transitions.map(({ item, key, props }) =>
        {return (item &&
          <animated.div key={key} style={props} className={`side-menu ${sideMenuProps.className?sideMenuProps.className:''}`}>
            <div style={{...sideMenuStyle}} ref={sidemenuEl}>{sidemenuChildren}</div>
          </animated.div>)
        })
      }
      <Backdrop show={sideMenuContext.isOpen&&sideMenuContext.config.staticMain} zIndex={99} onClick={sideMenuContext.closeSideMenu}/>
    </>)
}

SideMenu.propTypes = {
  alwaysStaticMain:PropTypes.bool,
  breakPoints:PropTypes.object,
  defaultRatio:PropTypes.number
}

SideMenu.defaultProps = {
  alwaysStaticMain:false,
}

export default SideMenu
