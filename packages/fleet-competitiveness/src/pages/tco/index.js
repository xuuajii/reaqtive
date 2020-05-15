import React from 'react'
import {RqtvPage, RqtvStandardTemplate} from '@reaqtive/components'

const Tco = props => {
  return(
    <RqtvPage
      path={props.path}
      qTitleExpr={props.title}
    >
    <div>TCO</div>
    </RqtvPage>
  )
}

export default Tco
