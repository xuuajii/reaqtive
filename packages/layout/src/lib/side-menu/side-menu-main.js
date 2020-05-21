import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated} from 'react-spring'
import {SideMenuContext, SideMenuContextProvider} from './index'

const SideMenuMain = props => {
  return (
    <SideMenuContextProvider {...props}>
      <SideMenuMainLayout {...props}/>
    </SideMenuContextProvider>
  )
}

const SideMenuMainLayout = props => {

  const sideMenuContext = useContext(SideMenuContext)
  const config = sideMenuContext.config

  const left = sideMenuContext.isOpen&&!(config.staticMain)?(`${config.ratio*100}%`):'0%';
  const width = sideMenuContext.isOpen&&!(config.staticMain)?`${(1-config.ratio)*100}%`:'100%'
  const animatedProps = useSpring({
    left: left,
    width:width,
  })
  //console.log(left)
  //width props is added to force update
  const children = React.Children.toArray(props.children)
  return (
    <animated.div style={{position:'relative', display:'flex',width:'100%',...animatedProps}}>
        {children.map(child=>{
          return (typeof child.type)==='string'
          ?React.cloneElement(child)
          :React.cloneElement(child, {mainWidth:width})
        })}
    </animated.div>
  )

}

SideMenuMain.propTypes = {
  alwaysStaticMain:PropTypes.bool,
  breakPoints:PropTypes.object,
  defaultRatio:PropTypes.number
}

SideMenuMain.defaultProps = {
  alwaysStaticMain:false,
}

export default SideMenuMain
