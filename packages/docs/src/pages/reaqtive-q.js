import React, {useState, useMemo, useEffect, useCallback, useContext} from 'react'
import { useLocation, useHistory, Switch, Route, NavLink } from "react-router-dom";
import  {RqtvPage, RqtvListbox} from '@reaqtive/components'
import {useQObjectReducer, useQLayoutReducer, QGlobal, useTriggers} from '@reaqtive/q'

const ReaqtiveQ = props => {
  const qGlobalHandler = useContext(QGlobal)
  const mainPath='/reaqtive-q'
  return(
    //<ComponentDocumentation title = {'a'} componentData={data}/>
    <div>
      <Switch>
        <RqtvPage
          id={7} title="Nested Page"
          path={mainPath+'/nestedpage'}
          fallbackPage="/reaqtive-q"
          triggers={[{type:'fieldSelection',params:{fieldName:'Customer',value:'Benedict', alwaysOneSelected:true}}]}
          conditionExpr="=count(distinct Customer)=1"
        >
          <div>
            <RqtvListbox qFieldExpr="Customer"/>
          </div>
        </RqtvPage>
        <Route path={mainPath}>
          <div>Normal Page</div>
          <NavLink to={mainPath+'/nestedpage/?selections=AccountGroup:69999'}><button>Go To Nested Page</button></NavLink>
        </Route>
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
