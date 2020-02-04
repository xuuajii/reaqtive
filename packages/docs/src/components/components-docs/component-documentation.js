import React from 'react'
import {Title, Description, PropsTable} from './index'
const ComponentDocumentation = props => {
  const {displayName, description } = props.componentData
  const propsData = props.componentData.props

  return(
    <>
      <Title title={displayName}/>
      <Description text={description}/>
      <PropsTable props={propsData}/>
    </>
  )
}

export default ComponentDocumentation
