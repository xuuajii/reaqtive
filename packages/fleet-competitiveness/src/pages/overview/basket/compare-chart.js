import React from 'react'
import {QViz, RqtvVizContainer} from '@reaqtive/components'

const CompareChart = (props) =>{
  const {maximizeElRef}=props
  return(
    <RqtvVizContainer maximizeElRef={maximizeElRef}>
      <QViz
        title={props.chartTitle+' COMPARE'}
        id={props.chartId}
        height={'300px'}
      />
    </RqtvVizContainer>
  )
}

export default CompareChart
