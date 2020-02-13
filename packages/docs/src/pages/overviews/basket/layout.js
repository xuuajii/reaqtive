//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React, { useState, useEffect} from "react";
import { RqtvSpinner } from "@reaqtive/components";
import Vehicle from "./vehicle";
import {RqtvVizContainer, QViz} from "@reaqtive/components"

const Layout = props => {
  
  const isLayoutLoaded = props.qLayoutHandler.qLayout && props.qLayoutHandler.qLayout;
  const hypercube = isLayoutLoaded && props.qLayoutHandler.qLayout.qHyperCube
  const basket = hypercube && hypercube.qPivotDataPages[0].qLeft[0].qText;

  useEffect(()=>{
    props.setPageTitle(basket)
    console.log("basket",basket)
  },[basket])

  return (
    <div>
      {isLayoutLoaded ? (
        <VehicleLayout
          basket={basket}
          qLeftSubNodes={hypercube.qPivotDataPages[0].qLeft[0].qSubNodes}
          qDataSubNodes={hypercube.qPivotDataPages[0].qData}
          hypercube={hypercube}
        />
      ) : (
        <RqtvSpinner isSticky={true} />
      )}
    </div>
  );
};

export default Layout;

const CompareChart = (props) =>{
  return(
    <RqtvVizContainer>
      <QViz
        title={`AEA INDEX COMPARE`}
        id={props.id}
        chartProps={{
          chartType:'barchart',
          rest: {
            "qHyperCubeDef":{
              qDimensions:[{
                "qDef":{
                  "qFieldDefs": ["[Model]"],
                   "qFieldLabels": ["Model"],
                   "qSortCriterias":[
                     {
                       qSortByExpression: 1,
                       qExpression: {
                         qv: `if([Model]=[Model Benchmark],0,avg([Vehicle Visual Price]))`
                       }
                     }
                   ]
                 }
               }],
               qMeasures:[{
                 "qDef":{
                   "qDef":`=dual(($(realIndex($(lastMonthSet),${props.channel},reference))),($(realIndex($(lastMonthSet),${props.channel},reference))-100))`,
                   "qLabel":"Private Index",
                   // "qNumFormat":{
                   //   qType:"A",
                   //   qFmt:"###0,000"
                   // },
                   //"numFormatFromTemplate":true,
                   "isCustomFormatted":true
                 }
               }],
               qInterColumnSortOrder:[0,1]
            },
            "showTitles": false,
            "title": "Private Index",
            "qSuppressZero":true,
            "dataPoint":{
              "showLabels":true
            },
            "measureAxis":{
              show:"none"
            },
            dimensionAxis:{
              show:"labels"
            }
          }
        }}
        height={'300px'}
      />
    </RqtvVizContainer>
  )
}

const TrendChart = (props) => {
  return(
    <RqtvVizContainer>
      <QViz
        title={`AEA INDEX TREND`}
        id={props.id+'trend'}
        chartProps={{
          chartType:'linechart',
          chartColumns: [
            {
              "qDef":{
                "qFieldDefs": ["[Year Month]"],
                 "qFieldLabels": ["Month"],
                 "":true
               }
             },
            {
              "qDef":{
                "qFieldDefs": ["[Model]"],
                 "qFieldLabels": ["Model"],
                 "":true
               }
             },
            {
              "qDef":{
                "qDef":`=$(realIndex('',${props.channel},reference))`,
                "qLabel":"Private Index",
                "qNumFormat":{
                  "qType":"A",
                }
              }
            }
          ],
          rest: {
            "showTitles": false,
            "title": "Private Index",
            "qSuppressZero":true,
            "scrollbar":{
              "scrollbar":"none"
            },
            "dataPoint":{
              "showLabels":true
            },
            legend:{
              showTitle:false
            },
            "measureAxis":{
              show:"labels"
            },
            dimensionAxis:{
              show:"labels"
            },
            dataPoint:{
              show:true
            }
          }
        }}
        height={'300px'}
      />
    </RqtvVizContainer>
  )
}

const channels = [
  {code:'priv', title:'Private', fieldValue:'[Vehicle Visual Price]'},
  {code:'fbd', title:'Fleet By Dealer', fieldValue:'[Vehicle Discounted Price Private]'},
  {code:'ltr', title:'Long Term Rental', fieldValue:'[Vehicle Discounted Price Business]'}
]

const VehicleLayout = props => {
  
  return (
    <>
      <Vehicle hypercube={props.hypercube} />
      <div className="container-fluid basket-analysis-charts" style={{marginTop:'4rem'}}>
        <div className="row">
              {
                channels.map((channel, index)=>
                  <div className={`col-md-4`} key={channel.code}>
                    <div>
                      <h4 className="channel-card-title">{channel.title}</h4>
                    </div>
                    <div style={{backgroundColor:'#E8EAF6', padding:'0.75rem'}}>
                      <div className="card" style={{border:0}}>
                      <CompareChart
                        id={channel.code}
                        channel={channel.fieldValue}
                        title={channel.title}
                      />
                      </div>
                      <div className="card" style={{marginTop:'1rem', border:0}}>
                      <TrendChart
                        id={channel.code}
                        channel={channel.fieldValue}
                        title={channel.title}
                      />
                      </div>
                    </div>
                    <div style={{height:50}}/>
                  </div>
                )
              }
        </div>
      </div>
    </>
  );
};
