const imgFolder = `${process.env.PUBLIC_URL}/images`
const medalsImgFolder = `${imgFolder}/medals`
const flagsImgFolder = `${imgFolder}/flags/icons`
const flagsBordersImgFolder = `${imgFolder}/flags/borders`

const extractSubNodes = (recursiveDimension, depth) =>{
  if(depth===0){
    const {qSubNodes, ...rest} = recursiveDimension||{}
    return rest
  } else {
    return extractSubNodes(recursiveDimension&&recursiveDimension.qSubNodes[0], depth-1)
  }
}

const brandListObjectDef = {
  qInfo: {
    qType: "tableData"
  },
  brands: {
    qStringExpression: {
      qExpr: "concat(distinct [Brand Benchmark],',')"
    }
  },
  brandJSON: {
    qStringExpression: {
      qExpr: `concat(distinct '{"description":"'&[Brand Benchmark]&'",'&'"brandImage":"'&rangemaxstring([Brand Image Benchmark],0)&'"}', '|')`
    }
  }
};

const setBackgroundGradientByBrand = brand => {
  return brand === "ALFA ROMEO"
  ?"linear-gradient(136deg, #000000, #210e13, #3b141d, #561726, #843e4d, #9c5262, #a95163, #984456, #812f42, #642231, #540f21, #3d1c1c)"
  : brand ==="FIAT"
  ? "linear-gradient(136DEG, #000000, #262626, #474747, #6b6b6b, #929292, #929292, #929292, #929292, #6b6b6b, #474747, #262626, #000000)"
  : brand==="JEEP"
  ? "linear-gradient(124deg, #000000, #3e1f22, #783931, #af5c34, #dc892c, #dc892c, #dc892c, #dc892c, #af5c34, #783931, #3e1f22, #000000)"
  : "#E8EAF6";
}

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

export {imgFolder, flagsImgFolder, flagsBordersImgFolder, medalsImgFolder, mapHyperCubeToCards, extractSubNodes, brandListObjectDef, setBackgroundGradientByBrand}
