import React from 'react'
import {setBackgroundGradientByBrand} from '../../helpers'
import {RqtvCards} from '../../components/card/index'
import usePurchasingCardsDef from './use-purchasing-cards-def'

const PurchasingCards = props => {
  const {brand, brandImage} = props
  const gradient = setBackgroundGradientByBrand(brand)
  const purchasingCardsDef = usePurchasingCardsDef(brand)
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
        width:250,
        flexItem:true,
        showAvatar:true,
        cardSelectionField:'Submodel Benchmark',
        rowSelectionField:'Country'
      }}
      cardObjectDef={purchasingCardsDef}
    />
  )
}

export default PurchasingCards


// <>
//   <CardDeckHeader
//     brand={props.brand}
//     brandImage={props.brandImage}
//   />
//   <CardDeck
//     minHeight={420}
//     backgroundGradient={gradient}
//   >
//     <QGenericObject qObjectDef={purchasingCardsDef}>
//       {(qGenericObject)=>{
//         const {qLoading, qError, qLayout} = qGenericObject.qLayoutHandler
//         const {qHyperCube} = qLayout||{}
//         const {qPivotDataPages, qMeasureInfo, qDimensionInfo} = qHyperCube||{}
//         const noData = qPivotDataPages&&qPivotDataPages.length===0
//         const { qLeft, qTop, qData } = qPivotDataPages&&qPivotDataPages[0]||{}
//         const setDimensionHeader = (item)=>item.qAttrExps?item.qAttrExps.qValues[0].qText:qDimensionInfo[2].qFallbackTitle
//         const cards = qLeft&&qLeft.map((item, itemIndex)=>{
//           return({
//             key:qLeft&&extractSubNodes(qLeft[itemIndex], 0).qElemNo,
//             title:qLeft&&extractSubNodes(qLeft[itemIndex], 1).qElemNo,
//             value:extractSubNodes(qLeft[itemIndex], 0).qText,
//             title:extractSubNodes(qLeft[itemIndex], 1).qText,
//             cardImage:extractSubNodes(qLeft[itemIndex], 1).qAttrExps.qValues[0].qText,
//             subTitle:extractSubNodes(qLeft[itemIndex], 1).qAttrExps.qValues[1].qText,
//             cardBody:{
//               headers:[setDimensionHeader(extractSubNodes(qLeft[itemIndex], 0)), ...qMeasureInfo.map(measure=>measure.qFallbackTitle)],
//               rows:qTop&&qTop.map((bodyRow, bodyRowIndex)=>{
//                 return({
//                   key:extractSubNodes(qTop[bodyRowIndex], 0).qElemNo,
//                   label:extractSubNodes(qTop[bodyRowIndex], 0).qText,
//                   img:extractSubNodes(qTop[bodyRowIndex], 0).qAttrExps&&extractSubNodes(qTop[bodyRowIndex], 0).qAttrExps.qValues[0].qText,
//                   imgPlacehoder: qTop&&extractSubNodes(qTop[bodyRowIndex], 0).qAttrExps.qValues[1].qText,
//                   cells: qData&&qData[itemIndex].filter((bodyCell, bodyCellIndex) => {
//                     return (
//                       Math.floor(bodyCellIndex / qMeasureInfo.length) === bodyRowIndex
//                     );
//                   })
//                 })
//               })
//             }
//           })
//         })
//         return(
//           <RqtvRenderer
//             loading={qLoading}
//             error={qError}
//             noData={noData}
//           >
//             {qLeft&&cards.map(card=>
//               <RqtvCard
//                 {...card}
//                 gradient={true}
//                 width={250}
//                 flexItem={true}
//                 showAvatar={true}
//                 bodyRowLink={props.bodyRowLink}
//               />
//             )}
//           </RqtvRenderer>
//       )
//     }}
//     </QGenericObject>
//   </CardDeck>
// </>
