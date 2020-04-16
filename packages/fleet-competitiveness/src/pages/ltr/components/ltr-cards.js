import React from 'react'
import {RqtvRenderer} from '@reaqtive/components'
import {QGenericObject} from '@reaqtive/q'
import useLtrObjectDef from '../use-ltr-object-def'
import LtrCardsLayout from './ltr-cards-layout'
import  CardDeck from '../../../components/card-deck/card-deck'
import CardDeckHeader from '../../../components/card-deck/card-deck-header'
import {setBackgroundGradientByBrand} from '../../../helpers'
const LtrCards = props => {
  const qObjectDef = useLtrObjectDef(props.brand)
  return(
    <QGenericObject qObjectDef={qObjectDef}>
      {(qGenericObject)=>{
        const gradient = setBackgroundGradientByBrand(props.brand)
        const {qLayout, qLoading, qError} = qGenericObject.qLayoutHandler
        const qHyperCube = qLayout&&qLayout.qHyperCube
        const noData = qHyperCube&&qHyperCube.qPivotDataPages.length===0
        const {qMeasureInfo, qDimensionInfo} = (!noData && !qError && !qLoading)&&qHyperCube
        const {qLeft, qTop, qData} = (!noData && !qError && !qLoading)&&qHyperCube&&qHyperCube.qPivotDataPages[0]
        return (
          <RqtvRenderer
            loading={qLoading}
            error={qError}
            noData={noData}
          >
            <CardDeckHeader brand={props.brand} brandImage={props.brandImage}/>
            <CardDeck minHeight={420} backgroundGradient={gradient}>
              <LtrCardsLayout
                qLeft={qLeft}
                qTop={qTop}
                qData={qData}
                qMeasureInfo={qMeasureInfo}
                qDimensionInfo={qDimensionInfo}
              />
            </CardDeck>
          </RqtvRenderer>
        )
      }}
    </QGenericObject>
  )
}

export default LtrCards
