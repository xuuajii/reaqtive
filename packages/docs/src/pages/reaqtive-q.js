import React, {useState, useMemo, useEffect, useCallback, useContext, useRef} from 'react'
import { useLocation, useHistory, Switch, Route, NavLink } from "react-router-dom";
import  {RqtvPage, RqtvPageHeader, RqtvListbox, RqtvNavbarNav, RqtvNavbarToggle, RqtvNavbarCollapse, RqtvDropdownFilter, QViz} from '@reaqtive/components'
import {useQObjectReducer, useQLayoutReducer, QGlobal, useTriggers} from '@reaqtive/q'
import {Switch as SwitchToggle, NavItem} from '@reaqtive/layout'

const ReaqtiveQ = props => {
  const qGlobalHandler = useContext(QGlobal)
  const mainPath='/reaqtive-q'
  const chartRef = useRef()
  const action=()=>{
    const qViz = chartRef.current&&chartRef.current.getQViz()
    console.log(qViz)
  }
  return(
    //<ComponentDocumentation title = {'a'} componentData={data}/>
    <div>
      <Switch>
        <RqtvPage
            fallbackPage="/reaqtive-q"
            qConditionExpr="=count(distinct Customer)=1"
            qTitleExpr="'Nested Page'"
            exactActiveMatch={false}
            path={mainPath+'/nestedpage'}
          >
          {/*triggers={[{type:'fieldSelection',params:{fieldName:'Customer',value:'Benedict', alwaysOneSelected:true}}]}*/}
            <div>
              <button className="btn btn-primary" onClick={action}>succhia</button>
            </div>
            <div>
              <RqtvListbox qFieldExpr="Customer"/>
            </div>
            <div>
            <QViz
              id="VizExample1"
              chartProps={{
                chartType:'barchart',
                chartColumns: [
                  {
                    "qDef":{
                      "qFieldDefs": ["[Product Sub Group Desc]"],
                       "qFieldLabels": ["Product Sub Group"],
                       "qSortCriterias":[{qSortByExpression:1,qExpression:"=Sum([Sales Quantity]*[Sales Price])"}],
                       "qReverseSort":true
                     }
                   },
                  "Customer Type",
                  {
                    "qDef":{
                      "qDef":"=Sum([Sales Quantity]*[Sales Price])",
                      "qLabel":"Revenue"
                    }
                  }
                ],
                rest: {
                  "showTitles": false,
                  "title": "Revenue",
                  "barGrouping":{grouping:"stacked"}
                }
              }}
              height={'300px'}
            />
            </div>
            <div>
              <QViz key="pDKRhr" id="pDKRhr" title="scatter chart" height="500px" ref={chartRef}/>
            </div>
        </RqtvPage>
        <RqtvPage
            qTitleExpr="'Main Page'"
            exactActiveMatch={false}
            path={mainPath}
            exact={true}
          >
            <RqtvPageHeader>
              <RqtvNavbarToggle/>
              <RqtvNavbarCollapse>
                <RqtvNavbarNav>
                  <NavItem>
                    <RqtvDropdownFilter qFieldExpr="Customer" align='right'/>
                  </NavItem>
                  <NavItem className="nav-item">
                    <SwitchToggle label="Ciao"/>
                  </NavItem>
                </RqtvNavbarNav>
              </RqtvNavbarCollapse>
            </RqtvPageHeader>
            <div>Normal Page</div>
            <NavLink to={mainPath+'/nestedpage/?selections=Customer:Benedict&selections=Account:61099'}><button>Go To Nested Page</button></NavLink>
        </RqtvPage>
      </Switch>
    </div>
  )
}

// const useQPageObjectDef = (qConditionExpr) => useMemo(()=>{
//   return {
//     qInfo: {
//       qType: "tableData"
//     },
//     qCondition: {
//       qStringExpression: {
//         qExpr: qConditionExpr
//       }
//     }
//   }
// }, [qConditionExpr])
//
// const NestedPage = props =>{
//   const location = useLocation();
//   const history = useHistory();
//   const qConditionExpr = "count(distinct Customer)>1";
//   const qObjectDef=useQPageObjectDef(qConditionExpr)
//   const qObjectHandler = useQObjectReducer(qObjectDef)
//   const qLayoutHandler = useQLayoutReducer(qObjectHandler)
//   const qCondition = qLayoutHandler.qLayout&&qLayoutHandler.qLayout.qCondition
//
//   const [conditionSatisfied, setCondtionSatisfied] = useState()
//   useEffect(()=>{
//     if(qCondition==='0'){
//       setCondtionSatisfied(false)
//     }
//     if(qCondition==='-1'){
//       setCondtionSatisfied(true)
//     }
//   },[qCondition])
//   useEffect(()=>{
//     if(conditionSatisfied===false){
//       history.push(props.fallbackPage)
//     }
//   },[conditionSatisfied])
//
//   if(conditionSatisfied===null|| conditionSatisfied===undefined){
//     return <div>aaaa</div>
//   } else{
//     return(
//       <RqtvPage id={props.id} title={props.title} path={props.path}>
//         <div>
//           <RqtvListbox qFieldExpr="Customer"/>
//         </div>
//       </RqtvPage>
//     )
//   }
// }

export default ReaqtiveQ
