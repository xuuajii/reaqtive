import React from 'react'
import {RqtvPage, RqtvStandardTemplate} from '@reaqtive/components'

const Purchasing = props => {
  return(
    <RqtvPage
      maximizeEl={props.maximizeEl}
      path={props.path}
      id={props.id}
      qTitleExpr={props.title}
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

export default Purchasing
