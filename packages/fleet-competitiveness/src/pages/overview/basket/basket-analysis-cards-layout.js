import React from "react";
import CardBox from "../../../components/card-deck/card-deck";
import Card from "../../../components/card/Card";
import { extractSubNodes } from "../../../helpers";
import { RqtvBreadcrumb } from "@reaqtive/components";

const BasketAnalysisCardsLayout = props => {
  let hypercube = props.hypercube;
  let visualDiff =
    Math.max(hypercube.qMeasureInfo[4].qMax, hypercube.qMeasureInfo[5].qMax)
    - Math.min(hypercube.qMeasureInfo[4].qMin, hypercube.qMeasureInfo[5].qMin);
  let minVisualPrice = Math.min( hypercube.qMeasureInfo[4].qMin, hypercube.qMeasureInfo[5].qMin);
  return (
    <>
      <CardBox>
        {hypercube.qPivotDataPages[0].qLeft[0].qSubNodes.map(function(
          item,
          index
        ) {
          return (
            <Card
              key={extractSubNodes(item, 0).qText}
              title={extractSubNodes(item, 1).qText}
              text={extractSubNodes(item, 0).qText}
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
              discountedPrivateRange={visualDiff}
              minDiscountedPrivate={minVisualPrice}
              discountedBusinessRange={visualDiff}
              minDiscountedBusiness={minVisualPrice}
              displayLogo={true}
              displayKPI={true}
              displayBody={true}
              gradient={true}
              img={extractSubNodes(item, 2).qText}
              height={"auto"}
              brandImage={extractSubNodes(item, 3).qText}
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
