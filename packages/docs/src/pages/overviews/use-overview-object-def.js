import {useMemo} from 'react'
import {flagsBordersImgFolder} from '../../helpers'

const useOverviewObjectDef = (marketArea) => {
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
                    qFieldDefs: [`=if([Market Area]='${marketArea}', Country)`],
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
                      qGrouping: "N", //${brand}
                      //qFieldDefs: ["Brand Benchmark"]
                      qFieldDefs:[ `=''`],
                    },
                    qNullSuppression: true
                  },
                  {
                    qDef: {
                      qGrouping: "N",
                      qFieldDefs: [`='${flagsBordersImgFolder}/'&lower([Country ISO Code])&'.png'`]
                    },
                    qNullSuppression: true
                  },
                  {
                    qDef: {
                      qGrouping: "N",
                      qFieldDefs: ["=' '"]
                    },
                      qNullSuppression: true
                  },
                  {
                    qDef:{
                      qGrouping:"N",
                      qFieldDefs:["=if([UID Benchmark]=[UID Code], [Submodel Benchmark])"],
                      qSortCriterias: [
                        {
                          qSortByExpression: 1,
                          qExpression: {
                            qv: `=ord(left([Brand Benchmark],1))`
                          }
                        }
                      ]
                    },
                    qNullSuppression: true
                  },
                  {
                    qDef:{
                      qGrouping:"N",
                      qFieldDefs:["=if([UID Benchmark]=[UID Code], [Brand Image Benchmark])"],
                    },
                    qNullSuppression: true
                  }
                ],
                qMeasures:[
                  {
                    qDef: {
                      qDef: `($(realIndex($(lastMonthSet), [Vehicle Discounted Price Private], basket)))`,
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
                      qDef: `($(realIndex($(lastMonthSet), [Vehicle Discounted Price Business], basket)))`,
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
                      qDef: `($(realIndex($(lastMonthSet), -, basket)))`,
                      //qDef: `avg([Vehicle Visual Price])`,
                      qLabel: "Discounted Price Business",
                      qSortBy: {
                      qSortByNumeric: 0,
                      qSortByAscii: 1
                      }
                    }
                  }
                ],
                qNoOfLeftDims: 4,
                qMode: "P",
                qAlwaysFullyExpanded: true,
                qIndentMode: false,
                //qInterColumnSortOrder: [0,1,2,3,4],
                qSuppressZero: false,
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
  },[marketArea])
  return qObjectDef
}

export default useOverviewObjectDef