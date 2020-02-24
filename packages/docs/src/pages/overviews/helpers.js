import { extractSubNodes } from "../../example-components/helpers";

/**
 * Function to map qHyperCube to Cards layout.
 * Each card correspond to 1 row of the qHyperCube.
 * TO DO - improve mapping function to have the functionalities described below.
 * Card Header: it contains the id and title (same value), image, logo, and subtitle and these are retrieved from the 1st, 2nd, 3rd, 4th dimension respectively
 * it is always visible and cannot be hidden
 * Card kpis: it contains the (the first n measures) which are displayed as gauges. They can be hidden
 * Card body: it contains a table per each card. The rows of the table could be the 5th and 6th dimensions (image and text) or the nth measure
*/
const mapHyperCubeToCards = (qHyperCube) => {

  const qPivotDataPage=qHyperCube.qPivotDataPages[0]
  const { qMeasureInfo } = qHyperCube||{}
  const {qLeft, qTop, qData } = qPivotDataPage||{}


  const extractMeasures = (cardIndex, cardBodyRowIndex) => {
    const measureArray = qData[cardIndex].filter((bodyCell, bodyCellIndex) => {
      return (
        Math.floor(bodyCellIndex / qMeasureInfo.length) === cardBodyRowIndex
      );
    })
    return measureArray
  }

  const extractCardBody = (cardIndex) => {
    const bodyRows = qTop.map((bodyRow, bodyIndex)=>{
      return {
        bodyLabel:extractSubNodes(qTop[bodyIndex], 0),
        bodyImage: extractSubNodes(qTop[bodyIndex], 1),
        bodyMeasures:extractMeasures(cardIndex, bodyIndex)
      }
    })
    return bodyRows
  }


  const mapDataPageToCard = (card, index) => {
    return{
      productId: qLeft[index]&&extractSubNodes(qLeft[index], 0),
      title: qLeft[index]&&extractSubNodes(qLeft[index], 0),
      subTitle: qLeft[index]&&extractSubNodes(qLeft[index], 1),
      cardImage: qLeft[index]&&extractSubNodes(qLeft[index], 2),
      brandImage: qLeft[index]&&extractSubNodes(qLeft[index], 3),
      cardBody: extractCardBody(index)
    }
  }

  const cards = qHyperCube?qLeft.map((card, index)=> mapDataPageToCard(card, index)):[]
  return cards
}

export { mapHyperCubeToCards }
