import React from 'react'
import CompareChart from './compare-chart'
import TrendChart from './trend-chart'
const channels = [
  {code:'PRIV', title:'Private', fieldValue:'[Vehicle Discounted Price Private]', chartTitle:'AEA Index', compareChartId:"QEVECyj", trendChartId:"cPmhgwT"},
  {code:'FBD', title:'Fleet By Dealer', fieldValue:'[Vehicle Discounted Price Business]', chartTitle:'AEA Index', compareChartId:"EsbLFj", trendChartId:"wTVQZ"},
  {code:'LTR', title:'Long Term Rental', fieldValue:'[Med Monthly Rent]',chartTitle:'BEA Index', compareChartId:"zMdmLM", trendChartId:"nSvwp"}
]
const BasketAnalysisCharts = props => {
  const {maximizeElRef}=props
  return(
    <div className="container-fluid basket-analysis-charts" style={{marginTop:'4rem'}}>
      <div className="row">
      {
        channels.map((channel, index)=>
          <div className={`col-lg-4`} key={channel.code}>
            <div>
              <h4 className="channel-card-title">{channel.title}</h4>
            </div>
            <div style={{backgroundColor:'#E8EAF6', padding:'0.75rem'}}>
              <div className="card" style={{border:0}}>
              <CompareChart
                id={channel.code}
                chartId={channel.compareChartId}
                channelCode={channel.code}
                fieldValue={channel.fieldValue}
                chartTitle={channel.chartTitle}
                title={channel.title}
                maximizeElRef={maximizeElRef}
              />
              </div>
              <div className="card" style={{marginTop:'1rem', border:0}}>
              <TrendChart
                id={channel.code}
                channelCode={channel.code}
                chartId={channel.trendChartId}
                fieldValue={channel.fieldValue}
                chartTitle={channel.chartTitle}
                title={channel.title}
                maximizeElRef={maximizeElRef}
              />
              </div>
            </div>
            <div style={{height:50}}/>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default BasketAnalysisCharts
