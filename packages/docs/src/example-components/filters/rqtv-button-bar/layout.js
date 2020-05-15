import React from 'react'
import Body from './body'

const Layout = props => {
  const {rqtvListObject, qLayoutHandler} = props
  const qLayout = qLayoutHandler&&qLayoutHandler.qLayout
  const qSize = qLayout&&qLayout.qListObject.qSize
  const qDataPages= qLayout&&qLayout.qListObject.qDataPages

  return(
    props.qLayoutHandler.qLoading===false&&props.qLayoutHandler.qError===false&&qSize.qcy>0
    ?<Body
      rqtvListObject={rqtvListObject}
      qSize={qSize}
      qDataPages={qDataPages}
      qDataPageHeight={props.qDataPageHeight}
    />
    :<></>
  )
}

export default Layout
