import {useMemo} from 'react'
import {flagsImgFolder, medalsImgFolder} from '../../../helpers'

const getMedalExpr = (field) => `='${medalsImgFolder}/'&
  pick(
    if([Flag Is Benchmark LTR]=1,
      rangemin(rank(Avg({<$(lastMonthSet)>} ${field})),4)
    ),'gold','silver','bronze','no'
  )&'_medal_no_stripe.svg'`

const useLtrObjectDef = (brand) => {
  const qObjectDef = useMemo(()=>{
    return(
            {
              qInfo: {
                qType: "hypercube"
              },
              qHyperCubeDef: {
                qDimensions: [
                  {
                    qDef: {
                    qGrouping: "N",
                    qFieldDefs: [`[Basket LTR]`],
                    qLabelExpression:"Basket LTR",
                    qSortCriterias: [
                      {
                        qSortByNumeric: 1,
                        qSortByAscii: 1
                      }
                    ]
                  },
                    qAttributeExpressions:[
                      {qExpression:"='Rank out of '&count({<$(lastMonthSet)>}  distinct Model)"}
                    ],
                    qNullSuppression: true
                  },
                  {
                    qDef: {
                      qGrouping: "N",
                      qFieldDefs:[ `=if([Brand Benchmark LTR]='${brand}',Model)`],
                      qLabelExpression:"Model Benchmark",
                    },
                    qAttributeExpressions:[
                      {qExpression:`=if([Brand Benchmark LTR]='${brand}',[Model Image Benchmark LTR])`},
                      {qExpression:`=if([Brand Benchmark LTR]='${brand}',[Brand Benchmark LTR])`},
                    ],
                    qNullSuppression: true
                  },
                  {
                    qDef: {
                      qGrouping: "N",
                      qFieldDefs: [`=if(match([Country ISO Code], 'IT','DE','FR','ES','GB')>0, [Country])`],
                      qLabelExpression:"Country",
                      qSortCriterias: [
                        {
                          qSortByExpression: 1,
                          qExpression: {
                            qv: `=ord(left([Brand Benchmark],1))`
                          }
                        }
                      ]
                    },
                    qAttributeExpressions:[
                      {qExpression:`=if(match([Country ISO Code], 'IT','DE','FR','ES','GB')>0, '${flagsImgFolder}/'&lower([Country ISO Code])&'_rounded.svg')`},
                      {qExpression:`=if(match([Country ISO Code], 'IT','DE','FR','ES','GB')>0, [Country ISO Code])`}
                    ],
                    qNullSuppression: true
                  }
                ],
                qMeasures:[
                  {
                    qDef: {
                      qDef: `if([Flag Is Benchmark LTR]=1,rank(Avg({<$(lastMonthSet)>}-[Med Monthly Rent])))`,
                      qLabel: "Rent Mth",
                      qSortBy: {
                        qSortByNumeric: 0,
                        qSortByAscii: 1
                      }
                    },
                    qAttributeExpressions:[
                      {qExpression:getMedalExpr('-[Med Monthly Rent]')}
                    ]
                  },
                  {
                    qDef: {
                      qDef: `if([Flag Is Benchmark LTR]=1,rank(Avg({<$(lastMonthSet)>}-[Med Monthly SMR]),1,1))`,
                      qLabel: "Cost SMR Mth",
                      qSortBy: {
                        qSortByNumeric: 0,
                        qSortByAscii: 1
                      }
                    },
                    qAttributeExpressions:[
                      {qExpression:getMedalExpr('-[Med Monthly SMR]')}
                    ]
                  },
                  {
                    qDef: {
                      qDef: `if([Flag Is Benchmark LTR]=1,rank(Avg({<$(lastMonthSet)>}[Med RV]/[Net Price])))`,
                      qLabel: "RV %",
                      qSortBy: {
                        qSortByNumeric: 0,
                        qSortByAscii: 1
                      }
                    },
                    qAttributeExpressions:[
                      {qExpression:getMedalExpr('[Med RV]/[Net Price]')}
                    ]
                  },
                ],
                qNoOfLeftDims: 2,
                qMode: "P",
                qAlwaysFullyExpanded: true,
                qIndentMode: false,
                //qInterColumnSortOrder: [0,1,2,3,4],
                qSuppressZero: true,
                qInitialDataFetch: [
                  {
                    qLeft: 0,
                    qWidth: 100,
                    qTop: 0,
                    qHeight: 300
                  }
                ]
              }
            }
    )
  },[brand])
  return qObjectDef
}

export default useLtrObjectDef
