import React from 'react'
import Reaqtive from '@reaqtive/q'
import {MyComponentWithQGlobal, MyComponentWithQDoc, MyComponentWithQCapabilityApi, MyComponentWithQApp, MyQGenericObject, MyQVariable} from './index'

const MyReaqtiveComponent = props => {
  // This qConfig allows to connect to on Qlik Sense Desktop and open the app called Executive Dashboard
  const qConfig = {
      host: 'localhost',    //or your Qlik Sense Enterprise host
      secure: false,        //true if you wanto to connect to your QS Enterprise host
      port: 4848,           //443 if you wanto to connect to your QS Enterprise host
      prefix: '',           //the virtual proxy tou want to use on your QS Enterprise host
      appId: 'Executive Dashboard.qvf' //the id of your app on QS Enterprise
  };
  return (
    <Reaqtive
      qConfig={qConfig}
    >
      {/*
        Inside Reaqtive children you will have access to the contexts it provides.
        You can use them individually or combine them in your components
      */}
      <MyComponentWithQGlobal/>
      <MyComponentWithQDoc/>
      <MyComponentWithQCapabilityApi/>
      <MyComponentWithQApp/>
      <MyQGenericObject/>
      <MyQVariable/>
    </Reaqtive>
  )
}

export default MyReaqtiveComponent
