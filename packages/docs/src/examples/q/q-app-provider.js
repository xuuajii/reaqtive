import React, {useContext} from 'react'
import {QApp} from '@reaqtive/q'

const MyComponentWithQApp = props => {
  const qAppHandler = useContext(QApp)
  console.log(qAppHandler)
  return(
    /*
      This component must be wrapped by Reaqtive to use the desired context.
      Since contexts are provided as promises you must always check if they are available or still loading using the handler properties
    */
    <div>This comoponent have access to the qApp class and call its methods</div>
  )
}

export default MyComponentWithQApp
