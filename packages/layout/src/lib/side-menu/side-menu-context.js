import React, {useState, useEffect, useContext } from 'react'
import {System, SystemProvider} from '../index'
import useConfig from './use-config'

const SideMenuContext = React.createContext()

const SystemConsumer = props =>
<SystemProvider>
  {props.children}
</SystemProvider>

const SideMenuContextProvider = props => {
  const system = useContext(System)
  const [isOpen, setIsOpen] = useState(props.isOpen)

  const closeSideMenu= () => {
    setIsOpen(false)
    props.onClose&&props.onClose()
  }
  useEffect(()=>{
    props.isOpen===true?setIsOpen(true):closeSideMenu()
  },[props.isOpen, closeSideMenu])

  const {breakPoints, alwaysStaticMain, defaultRatio} = props
  const config = useConfig(system.screenType, {breakPoints, alwaysStaticMain, defaultRatio})

  const [sidemenuWidthRatio, setSideMenuWidthRatio] = useState(config.ratio)

  const containerWidth = system.windowWidth
  useEffect(()=>{
    setSideMenuWidthRatio(config.ratio)
  },[config.ratio, config.staticMain])
  const sidemenuWidth=containerWidth*sidemenuWidthRatio

  return(
    <SystemConsumer>
      <SideMenuContext.Provider value={{config, closeSideMenu, isOpen, sidemenuWidth}}>
        {props.children}
      </SideMenuContext.Provider>
    </SystemConsumer>
  )
}

export { SideMenuContext, SideMenuContextProvider }
