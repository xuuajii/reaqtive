import React from 'react'
import {RqtvStandardTemplate, RqtvPage} from '@reaqtive/components'
import {useRouteMatch, NavLink} from 'react-router-dom'


const MyRqtvStandardTemplate = props => {
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
          <NavLink to={`${url}/with-condition/?selections=Customer:Benedict&selections=Account:61099'`}><button>go to page with condition</button></NavLink>
        </div>
      </RqtvPage>
    </RqtvStandardTemplate>
  )
}

export default MyRqtvStandardTemplate
