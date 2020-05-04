import React from 'react'
import {RqtvListbox} from '@reaqtive/components'

const MyRqtvListbox = props => {
  return(
    <RqtvListbox
      qFieldExpr="Customer"
      qLabelExpr="=count(distinct Customer)"
      height={300}
    />
  )
}

export default MyRqtvListbox
