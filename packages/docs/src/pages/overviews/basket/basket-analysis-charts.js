import React from 'react'
import CompareChart from './compare-chart'
import TrendChart from './trend-chart'
const channels = [
  {code:'priv', title:'Private', fieldValue:'[Vehicle Visual Price]'},
  {code:'fbd', title:'Fleet By Dealer', fieldValue:'[Vehicle Discounted Price Private]'},
  {code:'ltr', title:'Long Term Rental', fieldValue:'[Vehicle Discounted Price Business]'}
]
const BasketAnalysisCharts = props => {
  const {maximizeElRef}=props
  return(
    <div className="container-fluid basket-analysis-charts" style={{marginTop:'4rem'}}>
      <div className="row">
      {
        channels.map((channel, index)=>
          <div className={`col-md-4`} key={channel.code}>
            <div>
              <h4 className="channel-card-title">{channel.title}</h4>
            </div>
            <div style={{backgroundColor:'#E8EAF6', padding:'0.75rem'}}>
              <div className="card" style={{border:0}}>
              <CompareChart
                id={channel.code}
                channel={channel.fieldValue}
                title={channel.title}
                maximizeElRef={maximizeElRef}
              />
              </div>
              <div className="card" style={{marginTop:'1rem', border:0}}>
              <TrendChart
                id={channel.code}
                channel={channel.fieldValue}
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
