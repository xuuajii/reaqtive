import {useMemo} from 'react'
import {flagsImgFolder, flagsBordersImgFolder} from '../../helpers'


const useOverviewCardDef = (categoryFieldName, categoryFieldValue) => {
  const qObjectDef = useMemo(()=>{
    const cardDimension = getCardDimension(categoryFieldName, categoryFieldValue)
    const benchmarkDimension = getBenchmarkDimension(categoryFieldName, categoryFieldValue)
    const rowDimension = getRowDimension(categoryFieldName, categoryFieldValue)
    const qDimensions = [cardDimension, benchmarkDimension, rowDimension]

    return(
            {
              qInfo: {
                qType: "hypercube"
              },
              qHyperCubeDef: {
                qDimensions: qDimensions,
                qMeasures:[
                  {
                    qDef: {
                      qDef: `'-'`,
                      qLabel: "PRIVATE",
                      qSortBy: {
                        qSortByNumeric: 0,
                        qSortByAscii: 1
                      }
                    },
                  },
                  {
                    qDef: {
                      qDef: `($(realIndexBenchmark($(lastMonthSet),FBD,[Vehicle Discounted Price Business])))`,
                      qLabel: "FBD",
                      qSortBy: {
                        qSortByNumeric: 0,
                        qSortByAscii: 1
                      }
                    },
                  },
                  {
                    qDef: {
                      qDef: `($(visualIndexBenchmark($(lastMonthSet),LTR,[Med Monthly Rent])))`,
                      qLabel: "LTR",
                      qSortBy: {
                        qSortByNumeric: 0,
                        qSortByAscii: 1
                      }
                    },
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
  },[categoryFieldName, categoryFieldValue])
  return qObjectDef
}

const getBenchmarkDimension = (categoryFieldName, categoryFieldValue) =>
  categoryFieldName==='brand'
    ?{
      qDef: {
        qGrouping: "N",
        qFieldDefs:[ `=if([Brand Benchmark]='${categoryFieldValue}', [Submodel Benchmark])`],
        qLabelExpression:"'Sub Model Benchmark'",
      },
      qAttributeExpressions:[
        {qExpression:`=if([Brand Benchmark]='${categoryFieldValue}',[Model Image Benchmark])`},
        {qExpression:`=if([Brand Benchmark]='${categoryFieldValue}',[Brand Benchmark])`},
      ],
      qNullSuppression: true
    }
    :{
      qDef: {
      qGrouping: "N",
      qFieldDefs: [`=if([Market Area]='${categoryFieldValue}', Country)`],
      qSortCriterias: [
        {
          qSortByNumeric: 1,
          qSortByAscii: 1
        }
      ]
    },
    qAttributeExpressions:[
      {qExpression:`=if([Market Area]='${categoryFieldValue}','${flagsBordersImgFolder}/'&lower([Country ISO Code])&'.png')`},
      {qExpression:`=if([Market Area]='${categoryFieldValue}',[Country ISO Code])`},
    ],
      qNullSuppression: true
    }



const getCardDimension = (categoryFieldName, categoryFieldValue) =>
  categoryFieldName==='brand'
  ?{
      qDef: {
      qGrouping: "N",
      qFieldDefs: [`[Submodel Benchmark]`],
      qLabelExpression:"'Submodel'",
      qSortCriterias: [
        {
          qSortByNumeric: 1,
          qSortByAscii: 1
        }
      ]
    },
      qNullSuppression: true
    }
  :{
    qDef: {
      qGrouping: "N",
      qFieldDefs:[ `Country`],
      qLabelExpression:"'Country'",
      qSortCriterias: [
        {
          qSortByNumeric: 1,
          qSortByAscii: 1
        }
      ]
    },
    qNullSuppression: true
  }
const getRowDimension = (categoryFieldName, categoryFieldValue) =>
  categoryFieldName==='brand'
  ?{
      qDef: {
        qGrouping: "N",
        qFieldDefs: [`[Country]`],
        qLabelExpression:"'Country'",
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
  : {
    qDef:{
      qGrouping:"N",
      qFieldDefs:["=if([UID Benchmark]=[UID Code], [Submodel Benchmark])"],
      qLabelExpression:"'Submodel'",
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
      {qExpression:`=maxstring(if([UID Benchmark]=[UID Code], [Brand Image Benchmark]))`},
      {qExpression:`=maxstring(if([UID Benchmark]=[UID Code], [Brand Benchmark]))`},
    ],
    qNullSuppression: true
  }



export default useOverviewCardDef
