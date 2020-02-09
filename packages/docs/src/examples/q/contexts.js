import React, {useContext} from 'react'
import {QGlobal, QDoc, QCapabilityApi, QApp } from '@reaqtive/q'

const MyReaqtiveComponentLayout = props => {
  const qGlobalHandler = useContext(QGlobal)
  const qDocHandler = useContext(QDoc)
  const qCapabilityApiHandler = useContext(QCapabilityApi)
  const qAppHandler = useContext(QApp)
  console.log(qGlobalHandler, qDocHandler, qCapabilityApiHandler, qAppHandler)
  return(
    <div>My Component Layout, here you have access to contexts provided by Reaqtive</div>
  )
}

export default MyReaqtiveComponentLayout
