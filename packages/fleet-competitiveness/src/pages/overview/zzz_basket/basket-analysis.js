//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React, {useState, useContext, useRef} from "react";
import BasketAnalysisCards from "./basket-analysis-cards";
import { RqtvPageHeader, RqtvPageContext, RqtvBreadcrumb, RqtvMaximizePortalEl } from "@reaqtive/components";
import BasketAnalysisCharts from './basket-analysis-charts'
import SelectionSwitch from '../../../components/selection-switch'

const qHypercubeDef = {
  qInfo: {
    qType: "hypercube"
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["Submodel Benchmark"],
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
          qFieldDefs: ["Brand"],
          qSortCriterias:[{qSortByExpression:1,qExpression:{qv:'=if(max([Flag Is Benchmark])=1, 1, 100000)'}}]
          //qReverseSort: qReverseSort
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["Model"],
          qSortCriterias:[{qSortByExpression:1,qExpression:{qv:'=if(max([Flag Is Benchmark])=1, 1, 100000)'}}]
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
          qDef: `-`,
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
          qDef: `num($(visualPrice($(lastMonthSet),FBD,[Vehicle Discounted Price Business])), '#,##0')`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "Discounted Price Business",
          qSortBy: {
            qSortByNumeric: 0,
            qSortByAscii: 1
          }
        }
      },
      {
        qDef: {
          qDef: `num($(visualPrice($(lastMonthSet), LTR, [Med Monthly Rent])), '#,##0')`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "Monthly Reant",
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
          qDef: `$(realIndexVsBenchmark($(lastMonthSet),FBD,[Vehicle Discounted Price Business]))`,
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
          qDef: `$(visualIdexVsBenchmark($(lastMonthSet),LTR,[Med Monthly Rent]))`,
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
      <RqtvMaximizePortalEl maximizeElRef={maximizeElRef}/>
      <BasketAnalysisCards qHypercubeDef={qHypercubeDef} showCharts={showCharts}/>
      <BasketAnalysisCharts maximizeElRef={maximizeElRef}/>
    </>
  );
};

export default BasketAnalysis;
