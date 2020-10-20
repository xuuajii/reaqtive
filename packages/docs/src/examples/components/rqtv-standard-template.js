import React from 'react'
import {RqtvStandardTemplate, RqtvPage} from '@reaqtive/components'


const MyRqtvStandardTemplate = props => {
  return(
    <RqtvStandardTemplate sideMenuClickAwayAccept={false}>
      <div>Standard Template Example</div>
      {props.children}
    </RqtvStandardTemplate>
  )
}

export default MyRqtvStandardTemplate
