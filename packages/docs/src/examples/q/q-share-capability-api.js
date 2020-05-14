import React from 'react'
import {QShareCapabilityApi, Reaqtive} from '@reaqtive/q'

const qConfig = {                                 //For QS Desktop
      host: '40.113.14.238',                        //localhost
      secure: true,                                 //false
      port: 443,                                    //4848
      prefix: '',                                   //''
  };
const app1 = '8aa3a035-0689-4aab-a920-d6722509ed51'
const app2 = '58d7234b-b31c-4f24-b1f8-2c7453e557fa' 

const MySharedCapabilityApis = props =>
<QShareCapabilityApi qConfig={qConfig}>
  <Reaqtive qConfig={...qConfig, appId:app1}>
    ... your components here
  </Reaqtive>
  <Reaqtive qConfig={...qConfig, appId:app2}>
    ... your components here
  </Reaqtive>
</QShareCapabilityApi>

export default MySharedCapabilityApis
