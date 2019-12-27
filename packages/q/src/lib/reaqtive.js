//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import {QDocProvider} from './index'
import {QAppProvider} from './index'
import {SystemProvider} from '@reaqtive/layout'

const Reaqtive = props =>{
  const {qConfig, qCapabilityApiRequired, children, ...rqtvAppProps} = props
  return(
    <SystemProvider>
      {qCapabilityApiRequired===true
        ?<QDocProvider qConfig={qConfig}>
          <QAppProvider qConfig={qConfig}>
            {props.children}
          </QAppProvider>
        </QDocProvider>
        :<QDocProvider qConfig={qConfig}>
            {props.children}
        </QDocProvider>
      }
    </SystemProvider>
  )
}

export default Reaqtive
