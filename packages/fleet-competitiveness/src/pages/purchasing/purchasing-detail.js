import React from 'react'
import {RqtvPage} from '@reaqtive/components'

const PurchasingDetail = props => {
  return(
    <RqtvPage
      path={props.path}
      fallbackPage={props.fallbackPage}
      qConditionExpr={"=count(distinct [Submodel Benchmark])=1 and count(distinct Country)=1"}
    >
      <div>Purchasing Detail</div>
    </RqtvPage>
  )
}

export default PurchasingDetail
