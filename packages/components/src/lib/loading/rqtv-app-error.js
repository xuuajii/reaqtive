//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react'
import {LuiIcon} from '@reaqtive/layout'
import {containerStyle} from './rqtv-app-renderer-style'
const RqtvAppError = props =>
<div style={containerStyle}>
  <div className="alert alert-light">
    <div className="d-flex flex-column align-items-center">
      <div><LuiIcon iconType="warning-triangle" className="lui-icon--large" style={{color:'red', fontSize:'6rem'}}/></div>
      <div style={{fontSize:'3rem', textAlign:'center'}}>Ooops something went wrong connecting to the qlik engine</div>
      <div style={{margin:10}}>({props.errorMessage})</div>
    </div>
  </div>
</div>
export default RqtvAppError
