import React from 'react'
import {RqtvApp} from '@reaqtive/components'
import {HomePage, FirstPage} from './rqtv-page'

const MyRqtvApp = (props) => {
  return(
    <RqtvApp title="Example App">
        <FirstPage path="/first-page"/>
        <HomePage path="/" linkName="HOME"/>
    </RqtvApp>
  )
}

export default MyRqtvApp
