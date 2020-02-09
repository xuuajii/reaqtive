import React, {useContext} from 'react'
import {QDoc} from '@reaqtive/q'

const MyComponentWithQDoc = props => {
  const qDocHandler = useContext(QDoc)
  console.log(qDocHandler)
  return(
    /*
      This component must be wrapped by Reaqtive to use the desired context.
      Since contexts are provided as promises you must always check if they are available or still loading using the handler properties
    */
    <div>This comoponent have access to the qDoc class and call its methods</div>
  )
}

export default MyComponentWithQDoc
