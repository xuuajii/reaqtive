import React from 'react'
import {RqtvRenderer} from '@reaqtive/components'
import {QGenericObject} from '@reaqtive/q'
import CardDeck from '../../components/card-deck/card-deck'
import CardDeckHeader from '../../components/card-deck/card-deck-header'
import {RqtvCard} from './index'
import {extractSubNodes } from '../../helpers'

const RqtvCards = props => {
  const {deckProps, cardProps, cardObjectDef} = props
  return(
    <>
      {deckProps.showHeader&&
        <CardDeckHeader
          {...deckProps}
        />
      }
      <CardDeck
        minHeight={deckProps.minDeckHeight}
        backgroundGradient={deckProps.gradient}
      >
        <QGenericObject qObjectDef={cardObjectDef}>
          {(qGenericObject)=>{
            const {qLoading, qError, qLayout} = qGenericObject.qLayoutHandler
            const {qHyperCube} = qLayout||{}
            const {qPivotDataPages, qMeasureInfo, qDimensionInfo} = qHyperCube||{}
            const noData = qPivotDataPages&&qPivotDataPages.length===0
            const { qLeft, qTop, qData } = qPivotDataPages&&qPivotDataPages[0]||{}
            const setDimensionHeader = (item)=>item.qAttrExps?item.qAttrExps.qValues[0].qText:qDimensionInfo[2].qFallbackTitle
            const cards = qLeft&&qLeft.map((item, itemIndex)=>{
              return({
                key:qLeft&&extractSubNodes(qLeft[itemIndex], 0).qElemNo,
                title:qLeft&&extractSubNodes(qLeft[itemIndex], 1).qElemNo,
                value:extractSubNodes(qLeft[itemIndex], 0).qText,
                title:extractSubNodes(qLeft[itemIndex], 1).qText,
                cardImage:extractSubNodes(qLeft[itemIndex], 1).qAttrExps.qValues[0].qText,
                subTitle:extractSubNodes(qLeft[itemIndex], 1).qAttrExps.qValues[1].qText,
                cardBody:{
                  headers:[setDimensionHeader(extractSubNodes(qLeft[itemIndex], 0)), ...qMeasureInfo.map(measure=>measure.qFallbackTitle)],
                  rows:qTop&&qTop.map((bodyRow, bodyRowIndex)=>{
                    return({
                      key:extractSubNodes(qTop[bodyRowIndex], 0).qElemNo,
                      label:extractSubNodes(qTop[bodyRowIndex], 0).qText,
                      img:extractSubNodes(qTop[bodyRowIndex], 0).qAttrExps&&extractSubNodes(qTop[bodyRowIndex], 0).qAttrExps.qValues[0].qText,
                      imgPlacehoder: qTop&&extractSubNodes(qTop[bodyRowIndex], 0).qAttrExps.qValues[1].qText,
                      cells: qData&&qData[itemIndex].filter((bodyCell, bodyCellIndex) => {
                        return (
                          Math.floor(bodyCellIndex / qMeasureInfo.length) === bodyRowIndex
                        );
                      })
                    })
                  })
                }
              })
            })
            return(
              <RqtvRenderer
                loading={qLoading}
                error={qError}
                noData={noData}
              >
                {qLeft&&cards.map(card=>
                  <RqtvCard
                    {...card}
                    {...cardProps}
                  />
                )}
              </RqtvRenderer>
          )
        }}
        </QGenericObject>
      </CardDeck>
    </>
  )
}

export default RqtvCards
