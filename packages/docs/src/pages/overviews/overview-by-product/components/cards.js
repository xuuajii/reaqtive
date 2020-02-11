//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import { QGenericObject } from "@reaqtive/q";
import Layout from './layout';

const Cards = props => {
  let brand = props.brand;
  const qHypercubeDef = {
      qInfo: {
        qType: "hypercube"
      },
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qGrouping: "N",
              qFieldDefs: ["Model Benchmark"],
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
             qFieldDefs:[ `=if([Brand Benchmark]='${brand}', [Brand Benchmark])`],
            },
            qNullSuppression: true
          },
          
          {
            qDef: {
              qGrouping: "N",
              qFieldDefs: ["Model Body Image Benchmark"]
            },
            qNullSuppression: true
          },
          {
            qDef: {
              qGrouping: "N",
              qFieldDefs: ["Brand Image Benchmark"]
            },
            qNullSuppression: true
          },
          {
            qDef: {
              qGrouping: "N",
              qFieldDefs: ["Country"]
              
              //qReverseSort: qReverseSort
            },
            qNullSuppression: true
          },
          {
            qDef: {
              qGrouping: "N",
              qFieldDefs: ["JATO Country Code"]
    
              //qReverseSort: qReverseSort
            },
            qNullSuppression: true
          }
          
        ],
        qMeasures: [
          
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
        qNoOfLeftDims: 4,
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
        ],
        qColumnOrder: [0,1, 2, 3]
      }
    };
  return (
    <QGenericObject qObjectDef={qHypercubeDef}>
      <Layout key={props.brand} brand={props.brand}/>
    </QGenericObject>
  );
};

export default Cards;
