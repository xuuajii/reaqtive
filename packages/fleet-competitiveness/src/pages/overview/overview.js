
import React from 'react';
import {useRouteMatch} from 'react-router-dom'
import {RqtvPage, RqtvStandardTemplate } from '@reaqtive/components'
import OverviewByProduct from './overview-by-product'
import OverviewByCountry from './overview-by-country'
import BasketAnalysis from './basket-analysis'

const Overview = props => {
  const match = useRouteMatch()
  return(
    <>
      <RqtvPage
        path={`${match.path}/detail`}
        fallbackPage={match.path}
        qTitleExpr ="'basket analysis - '&only([Submodel Benchmark])&'-'&only([Country ISO Code])&' - '&$(lastMonthLabel)"
        qConditionExpr={"=count(distinct [Country])=1 and count(distinct [Submodel Benchmark])=1"}
      >
        <BasketAnalysis/>
      </RqtvPage>
      <RqtvPage path={`/overview-by-product`} qTitleExpr="='overview by product '&$(lastMonthLabel)" exact={true}>
        <OverviewByProduct/>
      </RqtvPage>
      <RqtvPage path={`/overview-by-country`} qTitleExpr="='overview by country '&$(lastMonthLabel)" exact={true}>
        <OverviewByCountry/>
      </RqtvPage>
    </>
  )
}

export default Overview;
