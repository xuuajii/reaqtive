import React from "react";
import CardBox from "../../../shared-components/layout/card-deck/card-deck";
import Card from "../../../shared-components/layout/card/Card";
import { extractSubNodes } from "../../../example-components/helpers";
import { RqtvBreadcrumb } from "@reaqtive/components";

const BasketAnalysisCardsLayout = props => {
  let hypercube = props.hypercube;
  let visualDiff =
    hypercube.qMeasureInfo[3].qMax - hypercube.qMeasureInfo[3].qMin;
  let minVisualPrice = hypercube.qMeasureInfo[3].qMin;
  let discountedPrivateDiff =
    hypercube.qMeasureInfo[4].qMax - hypercube.qMeasureInfo[4].qMin;
  let minDiscountedPrivate = hypercube.qMeasureInfo[4].qMin;
  let discountedBusinessDiff =
    hypercube.qMeasureInfo[5].qMax - hypercube.qMeasureInfo[5].qMin;
  let minDiscountedBusiness = hypercube.qMeasureInfo[5].qMin;

  return (
    <>
      <CardBox>
        {hypercube.qPivotDataPages[0].qLeft[0].qSubNodes.map(function(
          item,
          index
        ) {
          return (
            <Card
              key={index}
              title={extractSubNodes(item, 3).qText}
              text={extractSubNodes(item, 4).qText}
              visualPrice={hypercube.qPivotDataPages[0].qData[index][3].qText}
              discountedPrivate={
                hypercube.qPivotDataPages[0].qData[index][4].qText
              }
              discountedBusiness={
                hypercube.qPivotDataPages[0].qData[index][5].qText
              }
              visualPriceLabel={"Private"}
              discountedPrivateLabel={"Fleet By Dealer"}
              discountedBusinessLabel={"LTR"}
              flexItem={true}
              isInfoAbsolute={true}
              price={hypercube.qPivotDataPages[0].qTop[0].qText}
              bea={hypercube.qPivotDataPages[0].qTop[1].qText}
              aea={hypercube.qPivotDataPages[0].qTop[2].qText}
              priceValue={hypercube.qPivotDataPages[0].qData[index][0].qText}
              beaValue={hypercube.qPivotDataPages[0].qData[index][1].qText}
              aeaValue={hypercube.qPivotDataPages[0].qData[index][2].qText}
              visualPriceRange={visualDiff}
              minVisualPrice={minVisualPrice}
              discountedPrivateRange={discountedPrivateDiff}
              minDiscountedPrivate={minDiscountedPrivate}
              discountedBusinessRange={discountedBusinessDiff}
              minDiscountedBusiness={minDiscountedBusiness}
              displayLogo={true}
              displayKPI={true}
              displayBody={true}
              gradient={true}
              img={extractSubNodes(item, 5).qText}
              height={"auto"}
              brandImage={extractSubNodes(item, 6).qText}
              maxWidth={"60px"}
              paddingRight={"12px"}
              top={"10px"}
              cardInfoBackground = {"none"}
            />
          );
        })}
      </CardBox>
    </>
  );
};

export default BasketAnalysisCardsLayout;
