import React from 'react'
import {RqtvApp} from '@reaqtive/components'
import {HomePage, FirstPage, SecondPage} from './rqtv-page'

const MyRqtvApp = (props) => {
  return(
    <RqtvApp title="Example App" brandUrl='/'>
        <FirstPage path="/first-page"/>
        <SecondPage path="/second-page"/>
        <HomePage path="/" linkName="HOME"/>
    </RqtvApp>
  )
}

export default MyRqtvApp
