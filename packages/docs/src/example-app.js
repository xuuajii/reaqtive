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
    <Reaqtive qConfig={qConfig} qCapabilityApiRequired={true}>
      {/*<ExampleApp />*/}
      <RqtvApp
        sideMenuFields={{method:'include', mask:['**']}}
        title="Reaqtive Demo"
      >
        {/*Quick Start*/}
        <RqtvPage  qTitleExpr="'Quick Start'" path={'/quick-start'}>
          <RqtvStandardTemplate useContainerFluid={false}>
            <SetUp/>
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*Visualizations*/}
        <RqtvPage qTitleExpr="'Visualizations'" path={'/visualizations'}>
          <RqtvStandardTemplate useContainerFluid={false}>
            <Visualizations/>
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*Filters*/}
        <RqtvPage qTitleExpr="'Filters'" path={'/filters'}>
          <RqtvStandardTemplate searchFieldsMatch={{method:'include', mask:['Cust*']}} useContainerFluid={false}>
            <Filters/>
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*Filters*/}
        <RqtvPage qTitleExpr="'@raqtive/q'" exactActiveMatch={false} qConditionExpr="1=1" linkName="@reaqtive/q" path="/reaqtive-q">
            <RqtvStandardTemplate
              searchFieldsMatch={{method:'include', mask:['Cust*']}}
              sideMenuFieldsMatch={{method:'include', mask:['Cust*']}}
              useContainerFluid={false}
              usePageHeader={false}
              showSearch={false}
          >
            <ReaqtiveQ/>
          </RqtvStandardTemplate>
        </RqtvPage>
        {/*Home*/}
        <RqtvPage
            path={'/'}
            exact={true}
            linkName='home page'
            triggers={[
                {type:'clearField',params:{fieldName:'Customer'}},
            ]}
            qTitleExpr='1+1'
        >
          <RqtvStandardTemplate
            sideMenuFieldsMatch={{method:'include', mask:['Cust*', '*Desc*']}}
            useContainerFluid={false}
            sideMenuAdditionalTabs={[
              {
                label:'My additional tab',
                icon:<div>MT</div>,
                tab:<div style={{color:'white', textAlign:'center'}}>My Additional Tab</div>
              }
            ]}
          >
            <Home
              maximizeEl={maximizeEl}
            />
          </RqtvStandardTemplate>
        </RqtvPage>
      </RqtvApp>
    </Reaqtive>
  )
}

export default ExampleApp
// triggers = {[
//   {type:'fieldSelection', params:{fieldName:'Customer', value:'Zocalo', alwaysOneSelected:true}},
//   {type:'fieldSelection', params:{fieldName:'AccountDesc', value:'Commission', alwaysOneSelected:true}}
// ]}
// <RqtvListbox qTitleExpr={'Customer'} qFieldExpr={'Customer'} height={300} qId={1}/>
