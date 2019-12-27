//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import Body from './body'
import {RqtvRenderer} from '../../loading/index'
import {useListObjectRendererMap} from '../helpers/index'

const Layout = props =>
{ const qLayout = props.qLayoutHandler.qLayout
  const rendererProps = useListObjectRendererMap(props.qLayoutHandler, props.qObjectHandler)
  return(
    <RqtvRenderer {...rendererProps}>
      <div className="btn-group rqtv-button-bar" role="group" aria-label="Basic example">
        <Body
          data={qLayout&&qLayout.qListObject.qDataPages[0]}
          size={qLayout&&qLayout.qListObject.qSize}
          qDataPageHeight={props.qDataPageHeight}
          qObject={props.qObject}
          //setQLayoutPatcher={props.setQLayoutPatcher}
          rqtvListObject={props.rqtvListObject}
          buttonSize={props.buttonSize}
        />
      </div>
    </RqtvRenderer>
  )
}

export default Layout
