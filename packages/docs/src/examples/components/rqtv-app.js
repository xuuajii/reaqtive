import React from 'react'
import {RqtvApp} from '@reaqtive/components'
import {HomePage, FirstPage, SecondPage} from './rqtv-page'

const MyRqtvApp = (props) => {
  return(
    <RqtvApp title="Example App" neverToggleFieldsMatch={{method:'include', mask:['Product*', 'Customer']}}>
        <FirstPage path="/first-page"/>
        <SecondPage path="/second-page"/>
        <HomePage path="/" linkName="HOME"/>
    </RqtvApp>
  )
}

export default MyRqtvApp
