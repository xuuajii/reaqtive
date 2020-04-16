import React from 'react'
import useLtrObjectDef from './use-ltr-object-def'
import  {RqtvCards} from '../../../components/card/index'
import {setBackgroundGradientByBrand} from '../../../helpers'

const LtrCards = props => {
  const {brand, brandImage} = props
  const gradient = setBackgroundGradientByBrand(brand)
  const qObjectDef = useLtrObjectDef(brand)
  return(
    <RqtvCards
      deckProps={{
        minDeckHeight:420,
        gradient:gradient,
        showHeader:true,
        title:brand,
        logo:brandImage
      }}
      cardProps={{
        bodyRowLink:'/detail',
        displayGradient:true,
        width:290,
        flexItem:true,
        showAvatar:true,
        rowHeight:'2rem',
        cellWidth:'2rem',
        rowSelectionField:'Country',
        cardSelectionField:'Basket LTR'
      }}
      cardObjectDef={qObjectDef}
    />
  )
}

export default LtrCards


// <QGenericObject qObjectDef={qObjectDef}>
//   {(qGenericObject)=>{
//     const gradient = setBackgroundGradientByBrand(props.brand)
//     const {qLayout, qLoading, qError} = qGenericObject.qLayoutHandler
//     const qHyperCube = qLayout&&qLayout.qHyperCube
//     const noData = qHyperCube&&qHyperCube.qPivotDataPages.length===0
//     const {qMeasureInfo, qDimensionInfo} = (!noData && !qError && !qLoading)&&qHyperCube
//     const {qLeft, qTop, qData} = (!noData && !qError && !qLoading)&&qHyperCube&&qHyperCube.qPivotDataPages[0]
//     return (
//       <RqtvRenderer
//         loading={qLoading}
//         error={qError}
//         noData={noData}
//       >
//         <CardDeckHeader brand={props.brand} brandImage={props.brandImage}/>
//         <CardDeck minHeight={420} backgroundGradient={gradient}>
//           <LtrCardsLayout
//             qLeft={qLeft}
//             qTop={qTop}
//             qData={qData}
//             qMeasureInfo={qMeasureInfo}
//             qDimensionInfo={qDimensionInfo}
//           />
//         </CardDeck>
//       </RqtvRenderer>
//     )
//   }}
// </QGenericObject>
