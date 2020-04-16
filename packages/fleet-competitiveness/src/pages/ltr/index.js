import React from 'react'
import { RqtvPage, RqtvStandardTemplate } from '@reaqtive/components'
import LtrOverview from './ltr-overview'
import LtrDetail from './ltr-detail'

const Ltr = props => {
  return(
    <RqtvPage
      maximizeEl={props.maximizeEl}
      path={props.path}
      id={props.id}
      qTitleExpr="'LTR analysis '&$(lastMonthLabel)"
      exact={props.exact}
    >
      <RqtvStandardTemplate
        usePageHeader={false}
        useContainerFluid={true}
        searchFieldsMatch={props.searchFieldsMatch}
        containerClassName={"full-screen ltr"}
      >
        <LtrDetail path={props.path + "/detail"}/>
        <LtrOverview path={props.path}/>
      </RqtvStandardTemplate>
    </RqtvPage>
  )
}

export default Ltr
