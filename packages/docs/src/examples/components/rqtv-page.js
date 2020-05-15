import React from 'react'
import {RqtvStandardTemplate, RqtvPage} from '@reaqtive/components'
import {useRouteMatch, NavLink} from 'react-router-dom'
import MyRqtvStandardTemplate from './rqtv-standard-template'

const HomePage = props =>
<RqtvPage {...props} exact={true} qTitleExpr="'Homepage'">
  <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Product*']}}>
    <div>Home Page</div>
  </RqtvStandardTemplate>
</RqtvPage>

const FirstPage = props =>{
  return(
    <RqtvPage {...props}>
      <MyFirstNestedPage/>
    </RqtvPage>
  )
}


const MyFirstNestedPage = props =>{
  const { path, url } = useRouteMatch();
  return(
    <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Customer*', 'Account*']}}>
      <RqtvPage
        path={`${path}/with-condition`}
        qConditionExpr={'=count(distinct Customer)=1'}
        fallbackPage={`${path}`}
      >
        <div>this is a nested page with a condition</div>
      </RqtvPage>
      <RqtvPage path={`${path}`} exact={true}>
        <div>this is a nested page with no condition</div>
        <div>
          <NavLink to={`${url}/with-condition/?selections=Customer:Benedict&selections=Account:61099`}><button>go to page with condition</button></NavLink>
        </div>
      </RqtvPage>
    </RqtvStandardTemplate>
  )
}

const SecondPage = props =>
<RqtvPage {...props} qTitleExpr="'Revenue is: '&Sum([Sales Quantity]*[Sales Price])" exactActiveMatch={false}>
  <MyRqtvStandardTemplate/>
</RqtvPage>

export {HomePage, FirstPage, SecondPage}
