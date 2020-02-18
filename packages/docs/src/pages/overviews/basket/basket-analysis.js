//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useContext, useRef} from "react";
import BasketAnalysisCards from "./basket-analysis-cards";
import { RqtvPageHeader, RqtvPageContext, RqtvBreadcrumb, RqtvMaximizePortalEl } from "@reaqtive/components";
import BasketAnalysisCharts from './basket-analysis-charts'

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
const maximizeElRef=useRef()
const rqtvPageContext = useContext(RqtvPageContext)
const title = rqtvPageContext&&rqtvPageContext.qTitle
const [hyperCubeLoaded, setHyperCubeLoaded] = useState(false)
const showCharts = () => {
  setHyperCubeLoaded(true)
}
  return (
    <>
      <div className="container-fluid">
        <RqtvPageHeader title={title} style={{paddingTop:'0.5rem'}}>
        </RqtvPageHeader>
      </div>
      <RqtvMaximizePortalEl maximizeElRef={maximizeElRef}/>
      <RqtvBreadcrumb />
      <BasketAnalysisCards qHypercubeDef={qHypercubeDef} showCharts={showCharts}/>
      {hyperCubeLoaded&&<BasketAnalysisCharts maximizeElRef={maximizeElRef}/>}
    </>
  );
};

export default BasketAnalysis;
