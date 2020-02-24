import React from 'react'
import Body from './body'
import {RqtvRenderer} from '../../loading/index'
import {useListObjectRendererMap} from '../helpers/index'

const Layout = props => {
  const {rqtvListObject, qLayoutHandler, qDataPageHeight,goToFirstPageAfterSelection, buttonsStyle, buttonsClassName} = props
  const qLayout = qLayoutHandler&&qLayoutHandler.qLayout
  const qSize = qLayout&&qLayout.qListObject.qSize
  const qDataPages= qLayout&&qLayout.qListObject.qDataPages
  const rendererProps = useListObjectRendererMap(props.qLayoutHandler, props.qObjectHandler)

  return(
    <RqtvRenderer {...rendererProps}>
      <Body
        rqtvListObject={rqtvListObject}
        qSize={qSize}
        qDataPages={qDataPages}
        qDataPageHeight={qDataPageHeight}
        goToFirstPageAfterSelection={goToFirstPageAfterSelection}
        buttonsStyle={buttonsStyle}
        buttonsClassName={buttonsClassName}
      />
    </RqtvRenderer>
  )
}

export default Layout
