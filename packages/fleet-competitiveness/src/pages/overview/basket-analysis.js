import React from 'react'
import {RqtvBreadcrumb} from '@reaqtive/components'
import OverviewHeader from './overview-header'
import {RqtvCards} from '../../components/card/index'
import BasketAnalysisCharts from './basket-analysis-charts'

const  BasketAnalysis = props => {
  const gradient = 'linear-gradient(120deg, rgba(240,240,240,1) 0%, rgba(220,220,220,1) 40%, rgba(220,220,220,1) 60%, rgba(240,240,240,1) 100%)'
  return(
    <>
      <OverviewHeader/>
      <RqtvCards
        deckProps={{
          minDeckHeight:420,
          gradient:gradient,
          showHeader:false,
          title:' ',
          logo:' '
        }}
        cardProps={{
          displayGradient:true,
          width:290,
          flexItem:true,
          showAvatar:true,
          rowHeight:'2rem',
          cellWidth:'2rem',
          rowSelectionField:'Country',
          cardSelectionField:'Basket LTR'
        }}
        cardObjectDef={qObjectDef}
      />
      <BasketAnalysisCharts />
    </>
  )
}

export default BasketAnalysis



const qObjectDef = {
  qInfo: {
    qType: "hypercube"
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["=Model&Brand"],
          qSortCriterias:[{qSortByExpression:1,qExpression:{qv:'=if(max([Flag Is Benchmark])=1, 1, 100000)'}}]
        },
        qNullSuppression: true
      },
      {
        qDef: {
          qGrouping: "N",
          qFieldDefs: ["Model"],
        },
        qAttributeExpressions:[
          {qExpression:`=only([Model Image])`},
          {qExpression:`=only(Brand)`},
          {qExpression:`=only([Brand Image])`},
        ],
        qNullSuppression: true
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
          qDef: `num($(visualPrice(lastMonthSet,FBD,[Vehicle Discounted Price Business])), '#,##0')`,
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
          qDef: `num($(visualPrice(lastMonthSet, LTR, [Med Monthly Rent])), '#,##0')`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "Monthly Rent",
          qSortBy: {
            qSortByNumeric: 0,
            qSortByAscii: 1
          }
        },
      },
      {
        qDef: {
          qDef: `'-'`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "PRIVATE",
          qSortBy: {
            qSortByNumeric: 0,
            qSortByAscii: 1
          }
        }
      },
      {
        qDef: {
          qDef: `$(realIndexVsBenchmark(lastMonthSet,FBD,[Vehicle Discounted Price Business]))`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "FBD",
          qSortBy: {
            qSortByNumeric: 0,
            qSortByAscii: 1
          }
        }
      },
      {
        qDef: {
          qDef: `$(visualIdexVsBenchmark(lastMonthSet,LTR,[Med Monthly Rent]))`,
          //qDef: `avg([Vehicle Visual Price])`,
          qLabel: "LTR",
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
    qColumnOrder: [0, 1, 2, 3],
    kpiColumns:[3,4,5]
  }
}
