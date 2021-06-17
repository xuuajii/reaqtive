import React from 'react'
import Reaqtive from '@reaqtive/q'
import {MyComponentWithQGlobal, MyComponentWithQDoc, MyComponentWithQCapabilityApi, MyComponentWithQApp, MyQGenericObject, MyQVariable} from './index'
import {MyRqtvNavbar, MyRqtvListbox, MyRqtvDropdownFilter, MyRqtvButtonBar, MyRqtvModalListbox, MyRqtvSearchField, MyRqtvMultibox, MyQVizExamples, MyRqtvContainerExample,MyRqtvCurrentSelections, MyRqtvSearchObject} from '../components/index'

const MyReaqtiveComponent = props => {
  // This qConfig allows to connect to on Qlik Sense Desktop and open the app called Executive Dashboard
  const qConfig = {                                 //For QS Desktop
      host: 'localhost',                        //localhost
      secure: true,                                 //false
      port: 3000,                                    //4848
      prefix: 'hdr',                                   //''
      appId: '0abf830f-4dbb-4ad5-a844-87f01b42b360'//'8aa3a035-0689-4aab-a920-d6722509ed51' //your app file name (e.g. 'Executive dashboard.qvf')
  };

  return (
    <Reaqtive qConfig={qConfig}>
      {props.children}
      {/*<div className="container">
        <Wrapper>
         <MyRqtvListbox/>
        </Wrapper>
        <Wrapper>
         <MyQVizExamples/>
        </Wrapper>
        <Wrapper>
          <div>...</div>
        </Wrapper>
      </div>*/}
    </Reaqtive>
  )
}

const Wrapper = props => <div style={{marginBottom:'2rem'}}>{props.children}</div>

export default MyReaqtiveComponent
