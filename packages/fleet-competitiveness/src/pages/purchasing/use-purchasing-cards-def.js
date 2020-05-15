import {useMemo} from 'react'
import {flagsImgFolder} from '../../helpers'

const usePurchasingCardsDef = (brand) => {
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
                    qFieldDefs: [`=[Submodel Benchmark]`],
                    qLabelExpression:"Basket",
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
                      qFieldDefs:[ `=if([Brand Benchmark]='${brand}',[Submodel Benchmark])`],
                    },
                    qAttributeExpressions:[
                      {qExpression:`=if([Brand Benchmark]='${brand}',[Model Image Benchmark])`},
                      {qExpression:`=if([Brand Benchmark]='${brand}',[Brand Benchmark])`},
                    ],
                    qNullSuppression: true
                  },
                  {
                    qDef: {
                      qGrouping: "N",
                      qFieldDefs: [`[Country]`],
                      qLabelExpression:"' '",
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
                      {qExpression:`='${flagsImgFolder}/'&lower([Country ISO Code])&'_rounded.svg'`},
                      {qExpression:`=[Country ISO Code]`}
                    ],
                    qNullSuppression: true
                  }
                ],
                qMeasures:[
                  {
                    qDef: {
                      qDef: `($(visualIndexBenchmark($(lastMonthSet),FBD,[Vehicle Discounted Price Business])))`,
                      qLabel: "BEA Index",
                      qSortBy: {
                        qSortByNumeric: 0,
                        qSortByAscii: 1
                      }
                    }
                  },
                  {
                    qDef: {
                      qDef: `($(realIndexBenchmark($(lastMonthSet),FBD,[Vehicle Discounted Price Business])))`,
                      qLabel: "AEA Index",
                      qSortBy: {
                        qSortByNumeric: 0,
                        qSortByAscii: 1
                      }
                    }
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

export default usePurchasingCardsDef
