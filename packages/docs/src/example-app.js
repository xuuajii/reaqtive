//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useRef} from 'react'
import { HashRouter  as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/home'
import Visualizations from './pages/visualizations'
import Filters from './pages/filters'
import ReaqtiveQ from './pages/reaqtive-q'
// import Theme from './theme'
// import AppObjects from './app-objects'
// import RqtvAppAndRqtvPage from './rqtv-app-and-rqtv-page'
import Reaqtive from '@reaqtive/q'
import { RqtvApp, RqtvPage, RqtvStandardTemplate, RqtvBlankTemplate } from '@reaqtive/components'
//import BlankTemplateExample from './blank-template-example'
import SetUp from './pages/set-up'
import qConfig from './q-config'

const ExampleApp = props => {
  //const [showApp, set] = useState(true)
  const maximizeEl=useRef();
  //const pages = [{id:'0', title:'Home Page'},{id:'1', title:'Visualiztions Page'},{id:'2', title:'Pagina 2'}]
  return(
    <Router>
      <Reaqtive qConfig={qConfig} qCapabilityApiRequired={true}>
          {/*<ExampleApp />*/}
          <RqtvApp
            sideMenuFields={{method:'include', mask:['**']}}
            title="Reaqtive Demo"
          >
              <Switch>
                {/*Home*/}
                <Route path={'/'} exact={true} linkName='home page'>
                  <RqtvPage
                    title='Home Page'
                    triggers={[
                        {type:'clearField',params:{fieldName:'Customer'}},
                    ]}
                    qTitleExpr='=1+1'
                  >
                    <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Cust*', '*Desc*']}} useContainerFluid={false}>
                      <Home
                        maximizeEl={maximizeEl}
                      />
                    </RqtvStandardTemplate>
                  </RqtvPage>
                </Route>
                {/*Quick Start*/}
                <Route path={'/quick-start'}>
                  <RqtvPage  title='Quick Start'>
                    <RqtvStandardTemplate useContainerFluid={false}>
                      <SetUp/>
                    </RqtvStandardTemplate>
                  </RqtvPage>
                </Route>
                {/*Visualizations*/}
                <Route path={'/visualizations'}>
                  <RqtvPage title='Visualizations'>
                    <RqtvStandardTemplate useContainerFluid={false}>
                      <Visualizations/>
                    </RqtvStandardTemplate>
                  </RqtvPage>
                </Route>
                {/*Filters*/}
                <Route path={'/filters'}>
                  <RqtvPage title='Filters'>
                    <RqtvStandardTemplate searchFieldsMatch={{method:'include', mask:['Cust*']}} useContainerFluid={false}>
                      <Filters/>
                    </RqtvStandardTemplate>
                  </RqtvPage>
                </Route>
                {/*Filters*/}
                <Route path={'/reaqtive-q'} linkName="@reaqtive/q">
                  <RqtvPage title='@raqtive/q' exactActiveMatch={false}>
                    <RqtvStandardTemplate
                      searchFieldsMatch={{method:'include', mask:['Cust*']}}
                      useContainerFluid={false}
                      usePageHeader={true}
                      showSearch={false}
                    >
                      <ReaqtiveQ/>
                    </RqtvStandardTemplate>
                  </RqtvPage>
                </Route>
              </Switch>
          </RqtvApp>
        </Reaqtive>
      </Router>
  )
}

export default ExampleApp
// triggers = {[
//   {type:'fieldSelection', params:{fieldName:'Customer', value:'Zocalo', alwaysOneSelected:true}},
//   {type:'fieldSelection', params:{fieldName:'AccountDesc', value:'Commission', alwaysOneSelected:true}}
// ]}
// <RqtvListbox title={'Customer'} qFieldExpr={'Customer'} height={300} qId={1}/>
