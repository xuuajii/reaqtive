import React from 'react'
import {RqtvPage, RqtvStandardTemplate} from '@reaqtive/components'
import PurchasingOverview from './purchasing-overview'
import PurchasingDetail from './purchasing-detail'
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
        containerClassName={"full-screen purchasing"}
      >
        <PurchasingDetail path={props.path+'/detail'} fallbackPage={props.path}/>
        <PurchasingOverview path={props.path} />
      </RqtvStandardTemplate>
    </RqtvPage>
  )
}

export default Purchasing
