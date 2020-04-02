import React, {useMemo} from 'react'
import {useHistory} from 'react-router-dom'
import { QGenericObject } from '@reaqtive/q'
import  { RqtvRenderer } from '@reaqtive/components'
import useOverviewObjectDef from '../use-overview-object-def'
import Card from "../../../components/card/Card";
import CardBox from "../../../components/card-deck/card-deck";
import useGoToBasketAnalysis from '../use-go-to-basket-analysis'
import {mapHyperCubeToCards} from '../helpers'

const CountryCardDeck = props => {
  const  {marketArea} = props
  const history=useHistory()
  const goToDetail = useGoToBasketAnalysis(history)
  const marketAreaDeckObjectDef = useOverviewObjectDef(marketArea)
  return(
    <div>
      <CardBox>
        <QGenericObject qObjectDef={marketAreaDeckObjectDef}>
          {(qGenericObject)=>{
            const {qLayout, qLoading, qError} = qGenericObject.qLayoutHandler
            const qHyperCube = qLayout&&qLayout.qHyperCube
            const cards = qHyperCube&&mapHyperCubeToCards(qHyperCube)
            return (
              <RqtvRenderer loading={qLoading} error={qError} noData={qHyperCube&&qHyperCube.qPivotDataPages.length===0}>
                {
                  qHyperCube&&qHyperCube.qPivotDataPages.length>0
                  ?cards.map(card=>
                    <Card
                      onBodyRowClick={goToDetail}
                      key={card.title.qElemNo}
                      data={card}
                      title={card.title.qText}
                      text={card.subTitle.qText}
                      img={card.cardImage.qText}
                      brandImage={card.brandImage.qText}
                      flexItem={true}
                      displayBody={true}
                      ovByProduct={true}
                      displayLogo={false}
                      cardBody={card.cardBody}
                      titlePaddingTop={"90px"}
                    />
                  )
                  :<></>
                }
              </RqtvRenderer>
            )
          }}
        </QGenericObject>
      </CardBox>
    </div>
  )
}


export default CountryCardDeck
