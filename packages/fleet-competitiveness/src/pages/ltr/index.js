import React from 'react'
import {RqtvPage, RqtvStandardTemplate} from '@reaqtive/components'

const Ltr = props => {
  return(
    <RqtvPage
      maximizeEl={props.maximizeEl}
      path={props.path}
      id={props.id}
      title={props.title}
      exact={props.exact}
    >
      <RqtvStandardTemplate
        usePageHeader={true}
        useContainerFluid={true}
        searchFieldsMatch={props.searchFieldsMatch}
      >
      </RqtvStandardTemplate>
    </RqtvPage>
  )
}

export default Ltr
