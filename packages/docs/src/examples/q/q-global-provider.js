import React, {useContext} from 'react'
import {QGlobal} from '@reaqtive/q'

const MyComponentWithQGlobal = props => {
  const qGlobalHandler = useContext(QGlobal)
  console.log(qGlobalHandler)
  return(
    /*
      This component must be wrapped by Reaqtive to use the desired context.
      Since contexts are provided as promises you must always check if they are available or still loading using the handler properties
    */
    <div>This comoponent have access to the qGlobal class and call its methods</div>
  )
}

export default MyComponentWithQGlobal
