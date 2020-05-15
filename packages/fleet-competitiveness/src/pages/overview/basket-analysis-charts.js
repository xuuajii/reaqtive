import React, {useRef} from 'react'
import {QViz, RqtvVizContainer, RqtvMaximizePortalEl} from '@reaqtive/components'
import {SectionTitle} from '../../components/index'

const channels = [
  {code:'PRIV', title:'Private', fieldValue:'[Vehicle Discounted Price Private]', chartTitle:'AEA Index', compareChartId:"QEVECyj", trendChartId:"cPmhgwT"},
  {code:'FBD', title:'Fleet By Dealer', fieldValue:'[Vehicle Discounted Price Business]', chartTitle:'AEA Index', compareChartId:"EsbLFj", trendChartId:"wTVQZ"},
  {code:'LTR', title:'Long Term Rental', fieldValue:'[Med Monthly Rent]',chartTitle:'BEA Index', compareChartId:"zMdmLM", trendChartId:"nSvwp"}
]
const BasketAnalysisCharts = props => {
  const maximizeElRef = useRef()
  return(
    <div className="container-fluid basket-analysis-charts" style={{marginTop:'4rem'}}>
      <div className="row">
      <RqtvMaximizePortalEl maximizeElRef={maximizeElRef}/>
      {
        channels.map((channel, index)=>
          <div className={`col-lg-4 section-column`} key={channel.code}>
            <div className={'col'}>
            <SectionTitle title={channel.title}/>
              <div className="chart-container">
              <RqtvVizContainer maximizeElRef={maximizeElRef}>
                  <QViz
                    title={channel.chartTitle+' COMPARE'}
                    id={channel.compareChartId}
                    height={'300px'}
                  />
                </RqtvVizContainer>
              <RqtvVizContainer maximizeElRef={maximizeElRef}>
                <QViz
                  title={channel.chartTitle+' TREND'}
                  id={channel.trendChartId}
                  height={'300px'}
                />
              </RqtvVizContainer>
              </div>
            </div>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default BasketAnalysisCharts
