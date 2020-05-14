import React from 'react'
import {RqtvStandardTemplate, RqtvPage} from '@reaqtive/components'
import MyRqtvStandardTemplate from './rqtv-standard-template'

const HomePage = props =>
<RqtvPage {...props} exact={true} qTitleExpr="'Homepage'">
  <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Product*']}}>
    <div>Home Page</div>
  </RqtvStandardTemplate>
</RqtvPage>

const FirstPage = props =>
<RqtvPage {...props} qTitleExpr="'Revenue is: '&Sum([Sales Quantity]*[Sales Price])" exactActiveMatch={false}>
  <MyRqtvStandardTemplate/>
</RqtvPage>

export {HomePage, FirstPage}
