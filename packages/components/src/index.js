import React, {useContext} from 'react'
import ReactDOM from 'react-dom'
import {Rqtv, RqtvApp, RqtvButton, RqtvListbox, RqtvPage, RqtvStandardTemplate} from './lib/index'
import {QDoc} from '@reaqtive/q'
import {Button} from '@reaqtive/layout'

import './lib/index.scss'

const qConfig = {
    host: 'localhost',
    secure: false,
    port: 4848,
    prefix: '',
    appId: 'Executive Dashboard.qvf'
  };

  const App = props =>{
    return(
      <Rqtv qConfig={qConfig} qCapabilityApiRequired={true}>

        {/*<ExampleApp />*/}
        <div className="container">
          <Button>
            Azz
          </Button>
          <RqtvApp
            useRouter={false}
          >
          <RqtvPage path={"/"} exact={true} title={"aaaa"}>
          <RqtvStandardTemplate>
            <div>iddio</div>
            <RqtvButton label="iddio"/>
            <RqtvListbox qFieldExpr="Customer"/>
            </RqtvStandardTemplate>
            </RqtvPage>
          </RqtvApp>
        </div>
        
      </Rqtv>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));
