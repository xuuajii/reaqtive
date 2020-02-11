//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState} from "react";
//import Basket from "../example-components/overview-by-product/basket-view/basket";
import PageHeader from '../../components/layout/page-header/page-header';
import {RqtvBreadcrumb} from "@reaqtive/components";

const qHypercubeDef = {
  qInfo: {
    qType: "hypercube"
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["Basket"],
          qSortCriterias: [
            {
              qSortByNumeric: 1,
              qSortByAscii: 1
            }
          ]
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["%KEY_VEHICLE"],
          qSortCriterias: [
            {
              qSortByNumeric: 1,
              qSortByAscii: 1
            }
          ]
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["UID Code"],
          qSortCriterias: [
            {
              qSortByExpression: 1,
              qExpression: {
                qv: `if(Model=[Model Benchmark] and [UID Code]=[UID Benchmark], 1, 200)`
              }
            }
          ]
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["Brand"]

          //qReverseSort: qReverseSort
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["Model"]

          //qReverseSort: qReverseSort
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["Version"]
          //qSortCriterias:  bomNavigationHandler.bomLevels.map(bomLevel=>sortCriterias),
          //qReverseSort: qReverseSort
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["[Model Body Image]"]
          //qSortCriterias:  bomNavigationHandler.bomLevels.map(bomLevel=>sortCriterias),
          //qReverseSort: qReverseSort
        },
        qNullSuppression: false
      },
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["[Brand Image]"]
          //qSortCriterias:  bomNavigationHandler.bomLevels.map(bomLevel=>sortCriterias),
          //qReverseSort: qReverseSort
        },
        qNullSuppression: false
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef: `($(visualPrice($(lastMonthSet),[Vehicle Visual Price])))`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "List Price",
          qSortBy: {
            qSortByNumeric: 0,
            qSortByAscii: 1
          }
        }
      },
      {
        qDef: {
          qDef: `round(100*$(visualPrice($(lastMonthSet),[Vehicle Discounted Price Private]))/$(benchmarkVisualPrice($(lastMonthSet),[Vehicle Discounted Price Private],reference)))`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "List Price Index BEA",
          qSortBy: {
            qSortByNumeric: 0,
            qSortByAscii: 1
          }
        }
      },
      {
        qDef: {
          qDef: `round(100*$(realPrice($(lastMonthSet),[Vehicle Discounted Price Private],reference))/$(benchmarkVisualPrice($(lastMonthSet),[Vehicle Discounted Price Private],reference)))`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "List Price Index AEA",
          qSortBy: {
            qSortByNumeric: 0,
            qSortByAscii: 1
          }
        }
      },
      {
        qDef: {
          qDef: `($(realIndex($(lastMonthSet), [Vehicle Visual Price], reference)))`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "Visual Price",
          qSortBy: {
            qSortByNumeric: 0,
            qSortByAscii: 1
          }
        }
      },
      {
        qDef: {
          qDef: `($(realIndex($(lastMonthSet), [Vehicle Discounted Price Private], reference)))`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "Discounted Price Private",
          qSortBy: {
            qSortByNumeric: 0,
            qSortByAscii: 1
          }
        }
      },
      {
        qDef: {
          qDef: `($(realIndex($(lastMonthSet), [Vehicle Discounted Price Business], reference)))`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "Discounted Price Business",
          qSortBy: {
            qSortByNumeric: 0,
            qSortByAscii: 1
          }
        }
      }
    ],
    qMode: "P",
    qAlwaysFullyExpanded: true,
    qIndentMode: false,
    qInterColumnSortOrder: [0, 1, 2, 3],
    qSuppressZero: true,
    qInitialDataFetch: [
      {
        qLeft: 0,
        qWidth: 8,
        qTop: 0,
        qHeight: 300
      }
    ],
    qColumnOrder: [0, 1, 2, 3]
  }
};

const BasketAnalysis = (props) => {

const [title,setTitle] = useState("basket analysis")

  return (
    <>
      <div className="container-fluid">
        <PageHeader title={`BASKET ANALYSIS ${title ? '- ' + title : ''} `} style={{paddingTop:'0.5rem'}}>
        </PageHeader>
      </div>
      <RqtvBreadcrumb />
      <Basket setPageTitle={setTitle} qHypercubeDef={qHypercubeDef} />
    </>
  );
};

export default BasketAnalysis;
