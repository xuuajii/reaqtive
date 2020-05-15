import React, {useRef} from 'react'
import {RqtvPage, RqtvMaximizePortalEl} from '@reaqtive/components'
import PurchasingHeader from './purchasing-header'
import {Section, SectionTitle} from '../../components/index'
import ScatterChart from './scatter-chart'
import DiffChart from './diff-chart'
import TrendChart from './trend-chart'

const PurchasingDetail = props => {
  const maximizeElRef=useRef()
  return(
    <RqtvPage
      path={props.path}
      qTitleExpr="='Purchasing '&only([Submodel Benchmark])&' '&only([Country ISO Code])&' '&$(=lastMonthLabel)"
      fallbackPage={props.fallbackPage}
      qConditionExpr={"=count(distinct [Submodel Benchmark])=1 and count(distinct Country)=1"}
    >
      <PurchasingHeader/>
      <div className="container-fluid purchasing-detail">
      <RqtvMaximizePortalEl maximizeElRef={maximizeElRef}/>
        <Section>
          <SectionTitle title="LAST MONTH POSITIONING"/>
          <div className="row">
            <div  className="col-md-6">
              <ScatterChart maximizeElRef={maximizeElRef} height={350}/>
            </div>
            <div  className="col-md-6">
              <DiffChart maximizeElRef={maximizeElRef} height={350}/>
            </div>
          </div>
        </Section>
        <Section>
          <SectionTitle title="TREND"/>
          <div className="row">
            <div  className="col-md-6">
              <TrendChart
                maximizeElRef={maximizeElRef}
                height={350}
                chartProps={{measure:'visualIndexVsBenchmark', title:'BEA Trend'}}
              />
            </div>
            <div  className="col-md-6">
              <TrendChart
                maximizeElRef={maximizeElRef}
                height={350}
                chartProps={{measure:'realIndexVsBenchmark', title:'AEA Trend'}}
              />
            </div>
          </div>
        </Section>
      </div>
    </RqtvPage>
  )
}

export default PurchasingDetail
