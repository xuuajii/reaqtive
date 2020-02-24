import React from 'react'
import {RqtvListbox} from '@reaqtive/components'

const MyRqtvListbox = props => {
  return(
    <RqtvListbox
      qFieldExpr="$Field"
      qLabelExpr="=count(distinct Customer)"
      height={300}
      itemStyle={{
        textTransform:'uppercase',
        fontFamily:'serif'
      }}
    />
  )
}

export default MyRqtvListbox
