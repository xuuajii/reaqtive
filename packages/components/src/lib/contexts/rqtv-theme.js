import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';

const RqtvTheme = React.createContext()

const RqtvAppConsumer = props => {
  const theme = {
    useRippleEffect:true,
    useShadowEffect:true,
    useAnimations:true
  }
  return (
    <RqtvTheme.Provider value={rqtvAppHandler}>
      {props.children}
    </RqtvTheme.Provider>
  )
}

const RqtvThemeProvider = (props) => {
  return (
    <RqtvThemeProvider qConfig={props.qConfig}>
      <RqtvThemeApiConsumer qConfig={props.qConfig}>
        {props.children}
      </RqtvThemeApiConsumer>
    </RqtvThemeProvider>
  )
}

export  {RqtvTheme, RqtvThemeProvider}
