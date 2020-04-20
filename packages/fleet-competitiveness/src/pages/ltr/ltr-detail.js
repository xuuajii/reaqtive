import React, {useState, useRef} from 'react'
import { RqtvPage, RqtvPageHeader, RqtvNavbarCollapse, RqtvNavbarToggle, RqtvNavbarNav, RqtvBreadcrumb, QViz, RqtvVizContainer, RqtvMaximizePortalEl } from '@reaqtive/components'
import {QGenericObject} from '@reaqtive/q'
import {Switch, NavItem} from '@reaqtive/layout'
import SelectionSwitch from '../../components/selection-switch'
import {Section, SectionTitle} from '../../components/index'
import LtrHeader from './components/ltr-header'

const LtrDetail = props => {
  const maximizeElRef = useRef()
  return(
    <RqtvPage
      path={props.path}
      qConditionExpr={"=count(distinct [Basket LTR])=1 and count(distinct Country)=1"}
      fallbackPage={props.fallbackPage}
      qTitleExpr ="only([Basket LTR])&' '&only([Country ISO Code])&' - '&$(lastMonthLabel)"
    >
      <LtrHeader/>
      <RqtvMaximizePortalEl maximizeElRef={maximizeElRef}/>
      <div className="container-fluid" style={{marginTop:'1rem'}}>
        <Section>
          <SectionTitle title="STOCK CHARTS"/>
          <div className="row">
            <div className="col-md-4">
              <StockChart id="stock1" measureField="Monthly Rent" title="Monthly Rent" maximizeElRef={maximizeElRef}/>
            </div>
            <div className="col-md-4">
              <StockChart id="stock2" measureField="Monthly SMR" title="Monthly SMR" maximizeElRef={maximizeElRef}/>
            </div>
            <div className="col-md-4">
              {<StockChart id="stock3" measureField="RV]/[Net Price" title="Residual Value %" maximizeElRef={maximizeElRef}/>}
            </div>
          </div>
        </Section>
        <Section className="section">
          <SectionTitle title="TREND CHARTS - MONTHLY RENT"/>
          <div className="row">
            <div className="col-md-6">
              <TrendChart id="trend1" showLegend={false} showMeasureAxis={'labels'} measure="=num(avg([Med Monthly Rent]), '#,##0')" title="Median Monthly Rent" maximizeElRef={maximizeElRef}/>
            </div>
            <div className="col-md-6">
              <TrendChart id="trend1" showLegend={true} showMeasureAxis={'none'} measure="=dual(rank(avg([Med Monthly Rent])), -rank(avg([Med Monthly Rent])))" title="Rank Monthly Rent" maximizeElRef={maximizeElRef}/>
            </div>
          </div>
        </Section>
        <Section className="section">
          <SectionTitle title="TREND CHARTS - RESIDUAL VALUE"/>
          <div className="row">
            <div className="col-md-6">
              <TrendChart id="trend1" showLegend={false} showMeasureAxis={'labels'} measure="=num(avg([Med RV]/[Net Price]), '#,##0%')" title="Median Residual Value %" maximizeElRef={maximizeElRef}/>
            </div>
            <div className="col-md-6">
              <TrendChart id="trend1" showLegend={true} showMeasureAxis={'none'} measure="=dual(rank(avg([Med RV]/[Net Price])), -rank(avg([Med RV]/[Net Price])))" title="Rank Monthly Rent" maximizeElRef={maximizeElRef}/>
            </div>
          </div>
        </Section>
      </div>
    </RqtvPage>
  )
}

const StockChart = props => {
  const {measureField, title, id, maximizeElRef} = props
  //const [measure, setMeasure] = useState(`=if(%Point='Min',avg([Min ${measureField}]),if(%Point='Med',avg([Med ${measureField}]),avg([Max ${measureField}])))`)
  const measure = `=if(%Point='Min',avg([Min ${measureField}]),if(%Point='Med',avg([Med ${measureField}]),avg([Max ${measureField}])))`
  return(
    <RqtvVizContainer maximizeElRef={maximizeElRef}>
    <QViz
      title={title}
      id={id}
      chartProps={{
         chartType:'distributionplot',
         rest: {
           "qHyperCubeDef":{
             qDimensions:[
                 {
                  "qDef":{
                    "qFieldDefs": ["%Point"],
                     "qFieldLabels": ["Distribution Point"],
                   },
                 },
                {
                 "qDef":{
                   "qFieldDefs": ["[Model]"],
                    "qFieldLabels": ["Model"],
                  },
                  qNullSuppression:true
                }
              ],
              qMeasures:[{
                "qDef":{
                  "qDef":`=if(%Point='Min',avg([Min ${measureField}]),if(%Point='Med',avg([Med ${measureField}]),avg([Max ${measureField}])))`,
                  "qLabel":"Monthly Rent",
                }
              }],
           },
           "orientation":'vertical',
           "dimensionAxis":{
             "show":"labels"
           },
           "measureAxis":{
             "show":"labels"
           },
           "dataPoint":{
             "bubbleScales":50
           },
           legend:{
             show:false
           },
           color:{
             point:{
              "auto": false,
              "mode": "byDimension",
              // byDimDef:{
              //   "label": "Distribution Point",
              //   "key": "%Point",
              //   "type": "expression"
              //  }
             }
           }
         }
       }}
      height={'300px'}
    />
    </RqtvVizContainer>
  )
}

const TrendChart = props => {
  const {title, id, maximizeElRef, measure, showMeasureAxis, showLegend} = props
  return(
    <RqtvVizContainer maximizeElRef={maximizeElRef}>
    <QViz
      title={title}
      id={id}
      chartProps={{
         chartType:'linechart',
         rest: {
           "qHyperCubeDef":{
             qDimensions:[
                 {
                  "qDef":{
                    "qFieldDefs": ["Year Month"],
                     "qFieldLabels": ["Year Month"],
                   },
                  qNullSuppression:true
                 },
                {
                 "qDef":{
                   "qFieldDefs": ["[Model]"],
                    "qFieldLabels": ["Model"],
                  },
                  qNullSuppression:true
                }
              ],
              qMeasures:[{
                "qDef":{
                  "qDef":measure,
                  "qLabel":title,
                  "isCustomFormatted":true
                }
              }],
              qInterColumnSortOrder:[0,1]
           },
           "showTitles": false,
           "qSuppressZero":true,
           "dimensionAxis":{
             "show":"labels"
           },
           legend:{
             show:showLegend,
             showTitle:false
           },
           dataPoint:{
             show:true
           },
           measureAxis:{
             show:showMeasureAxis
           }
         }
       }}
      height={'300px'}
    />
    </RqtvVizContainer>
  )
}


export default LtrDetail
