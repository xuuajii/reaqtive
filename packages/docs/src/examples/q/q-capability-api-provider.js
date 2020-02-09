import React, {useContext} from 'react'
import {QCapabilityApi} from '@reaqtive/q'

const MyComponentWithQCapabilityApi = props => {
  const qCapabilityApiHandler = useContext(QCapabilityApi)
  console.log(qCapabilityApiHandler)
  return(
    /*
      This component must be wrapped by Reaqtive to use the desired context.
      Since contexts are provided as promises you must always check if they are available or still loading using the handler properties
    */
    <div>This comoponent have access to the  qlik class provided by the qCapabilityApi and call its methods</div>
  )
}

export default MyComponentWithQCapabilityApi
