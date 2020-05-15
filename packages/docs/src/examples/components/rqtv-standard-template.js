import React from 'react'
import {RqtvStandardTemplate, RqtvPage} from '@reaqtive/components'


const MyRqtvStandardTemplate = props => {
  return(
    <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Customer*', 'Account*']}}>
      <div>Standard Template Example</div>
    </RqtvStandardTemplate>
  )
}

export default MyRqtvStandardTemplate
