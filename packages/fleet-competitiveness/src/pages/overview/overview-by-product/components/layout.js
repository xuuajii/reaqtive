//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import CardBox from "../../../../components/card-deck/card-deck";
import { RqtvRenderer } from "@reaqtive/components";
import Card from "../../../../components/card/Card";
import { useHistory } from "react-router-dom";
import {flagsImgFolder, extractSubNodes, setBackgroundGradientByBrand} from '../../../../helpers'

const Layout = props => {
  const gradient = setBackgroundGradientByBrand(props.brand);
  const { qLayoutHandler } = props;
  const { qObjectHandler } = props;
  const { qObject } = qObjectHandler;
  const { qError, qLoading, qLayout } = qLayoutHandler;
  const qMeasureInfo = qLayout && qLayout.qHyperCube.qMeasureInfo;
  const qPivotDataPages = qLayout && qLayout.qHyperCube.qPivotDataPages;
  const noData = qLayout && qPivotDataPages.length === 0;
  const { qData, qLeft, qTop } = (qPivotDataPages && qPivotDataPages[0]) || {};

  const extractBodyImages = (item, depth) => {
    const bodyImageVaue = extractSubNodes(item, depth)
    const bodyImageUrl = `${flagsImgFolder}/${bodyImageVaue.qText}_rounded.svg`
    //console.log('/images/flags/at_rounded.svg',bodyImageUrl)
    return bodyImageUrl
  }
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
            bodyImgPlacehoder: qTop&&extractSubNodes(qTop[bodyIndex], 1).qAttrExps.qValues[0].qText,
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
    <CardBox backgroundGradient={gradient} key={props.brand} minHeight={420}>
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
