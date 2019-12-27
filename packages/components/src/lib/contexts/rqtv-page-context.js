//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react';
import PropTypes from 'prop-types';
import {useTriggers} from '@reaqtive/q'

const RqtvPageContext = React.createContext()

const RqtvPageConsumer = props => {
  const triggerState = useTriggers(props.triggers)
  return(
    <RqtvPageContext.Provider
      value={{triggerState, pageData:props.pageData}}
    >
      {props.children}
    </RqtvPageContext.Provider>
  )
}

const RqtvPageProvider = props => {
  return(
    <RqtvPageConsumer {...props}>
      {props.children}
    </RqtvPageConsumer>
  )
}

RqtvPageProvider.propTypes = {
  triggers:PropTypes.array.isRequired
}

RqtvPageProvider.defaultProps = {
  triggers:[]
}

export {RqtvPageProvider, RqtvPageContext}
