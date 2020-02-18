//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import CardBox from "../../../../shared-components/layout/card-deck/card-deck";
import { RqtvRenderer } from "@reaqtive/components";
import { extractSubNodes } from "../../../../example-components/helpers";
import Card from "../../../../shared-components/layout/card/Card";
import { useHistory } from "react-router-dom";

let gradient;
const Layout = props => {
  setBackgroundGradientByBrand(props.brand);
  const { qLayoutHandler } = props;
  const { qObjectHandler } = props;
  const { qObject } = qObjectHandler;
  const { qError, qLoading, qLayout } = qLayoutHandler;
  const qMeasureInfo = qLayout && qLayout.qHyperCube.qMeasureInfo;
  const qPivotDataPages = qLayout && qLayout.qHyperCube.qPivotDataPages;
  const noData = qLayout && qPivotDataPages.length === 0;
  const { qData, qLeft, qTop } = (qPivotDataPages && qPivotDataPages[0]) || {};
  const cards =
    qPivotDataPages && qPivotDataPages[0] && qPivotDataPages[0].qLeft.map((product, index) => {
      return {
        productId: qLeft[index]&&extractSubNodes(qLeft[index], 0),
        title: qLeft[index]&&extractSubNodes(qLeft[index], 0),
        subTitle: qLeft[index]&&extractSubNodes(qLeft[index], 1),
        cardImage: qLeft[index]&&extractSubNodes(qLeft[index], 2),
        brandImage: qLeft[index]&&extractSubNodes(qLeft[index], 3),
        cardBody: qTop&&qTop.map((bodyRow, bodyIndex) => {
          return {
            bodyLabel: qTop&&extractSubNodes(qTop[bodyIndex], 0),
            bodyImage: qTop&&extractSubNodes(qTop[bodyIndex], 1),
            bodyMeasures: qData&&qData[index].filter((bodyCell, bodyCellIndex) => {
              return (
                Math.floor(bodyCellIndex / qMeasureInfo.length) === bodyIndex
              );
            })
          };
        })
      };
    });
  const history = useHistory();
  const goToDetail = async (productValue, bodyRowValue) => {
    const queryString = `?selections=Submodel Benchmark:${productValue}&selections=Country:${bodyRowValue}`;
    const link = `${history.location.pathname}/basket-analysis/${queryString}`
    setTimeout(()=>{
      history.push(link)
    }, 100)
  };
  return (
    <CardBox backgroundGradient={gradient} key={props.brand}>
      <RqtvRenderer error={qError} loading={qLoading} noData={noData}>
        {cards &&
          cards.map((card, index) => (
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
              imgHeight={"auto"}
              cardBody={card.cardBody}
              titlePaddingTop={"90px"}
            />
          ))}
      </RqtvRenderer>
    </CardBox>
  );
};

export default Layout;

function getCountryExtName(key) {
  switch (key) {
    case "E":
      return "SPAIN";
      break;
    case "NL":
      return "NETHERLANDS";
      break;
    case "B":
      return "BELGIUM";
      break;
    case "CH":
      return "SWITZERLAND";
      break;
    case "I":
      return "ITALY";
      break;
    case "A":
      return "AUSTRIA";
      break;
    case "D":
      return "GERMANY";
      break;
    case "PL":
      return "POLAND";
      break;
    case "F":
      return "FRANCE";
      break;
    default:
      return key;
      break;
  }
}

const setBackgroundGradientByBrand = brand => {
  switch (brand) {
    case "ALFA ROMEO":
      gradient =
        "linear-gradient(136deg, #000000, #210e13, #3b141d, #561726, #843e4d, #9c5262, #a95163, #984456, #812f42, #642231, #540f21, #3d1c1c)";
      break;
    case "FIAT":
      //gradient = "linear-gradient(136deg, #000000, #250f15, #43121f, #641328, #85102e, #92102f, #b10229, #ac1131, #a71531, #a21932, #9d1c32, #981e32)"
      gradient =
        "linear-gradient(136DEG, #000000, #262626, #474747, #6b6b6b, #929292, #929292, #929292, #929292, #6b6b6b, #474747, #262626, #000000)";
      break;
    case "JEEP":
      gradient =
        "linear-gradient(124deg, #000000, #3e1f22, #783931, #af5c34, #dc892c, #dc892c, #dc892c, #dc892c, #af5c34, #783931, #3e1f22, #000000)";
      // gradient =
      //"linear-gradient(136DEG, #000000, #381c1f, #6b312d, #9c4d31, #c7712a, #c7712a, #c7712a, #c7712a, #9c4d31, #6b312d, #381c1f, #000000)";
      break;
    default:
      gradient = "red";
  }
};
