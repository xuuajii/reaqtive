import React from 'react'
import {RqtvStandardTemplate, RqtvPage, RqtvDropdownFilter} from '@reaqtive/components'
import {useRouteMatch, NavLink} from 'react-router-dom'
import MyRqtvStandardTemplate from './rqtv-standard-template'
import MyRqtvContainerExample from './rqtv-viz-container'
const HomePage = props =>
<RqtvPage {...props} exact={true} qTitleExpr="'Homepage'">
  <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Product*']}}>
    <div>Home Page</div>
    <MyRqtvContainerExample/>
  </RqtvStandardTemplate>
</RqtvPage>

const FirstPage = props =>{
  return(
    <RqtvPage {...props}>
      <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Customer*', 'Account*']}}>
        <MyFirstNestedPage/>
      </RqtvStandardTemplate>
    </RqtvPage>
  )
}


const MyFirstNestedPage = props =>{
  const { path, url } = useRouteMatch();
  return(
    <>
      <RqtvPage
        path={`${path}/with-condition`}
        qConditionExpr={'=count(distinct Customer)=1'}
        fallbackPage={`${path}`}
      >
        <div>this is a nested page with a condition</div>
        <MyRqtvContainerExample/>
      </RqtvPage>
      <RqtvPage path={`${path}`} exact={true}>
        <div>this is a nested page with no condition</div>
        <div>
          <NavLink to={`${url}/with-condition/?selections=Customer:Benedict&selections=Account:61099`}><button>go to page with condition</button></NavLink>
          <MyRqtvContainerExample/>
        </div>
      </RqtvPage>
    </>
  )
}

const SecondPage = props =>
<RqtvPage {...props} qTitleExpr="'Revenue is: '&Sum([Sales Quantity]*[Sales Price])" exactActiveMatch={false}>
  <MyRqtvStandardTemplate/>
</RqtvPage>

export {HomePage, FirstPage, SecondPage}
