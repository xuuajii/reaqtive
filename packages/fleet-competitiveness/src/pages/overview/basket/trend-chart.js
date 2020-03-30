import React from 'react'
import {QViz, RqtvVizContainer} from '@reaqtive/components'

const TrendChart = (props) => {
  const {maximizeElRef}=props
  return(
    <RqtvVizContainer maximizeElRef={maximizeElRef}>
      <QViz
        title={props.chartTitle+' TREND'}
        id={props.chartId}
        height={'300px'}
      />
    </RqtvVizContainer>
  )
}


export default TrendChart
