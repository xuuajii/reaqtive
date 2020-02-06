import React from 'react'
import {Title, Description, PropsTable} from './index'
const ComponentDocumentation = props => {
  const {displayName, description } = props.componentData
  const propsMetadata = props.componentData.props

  return(
    <>
      <Title title={displayName}/>
      <Description text={description}/>
      <PropsTable propsMetadata={propsMetadata}/>
    </>
  )
}

export default ComponentDocumentation
