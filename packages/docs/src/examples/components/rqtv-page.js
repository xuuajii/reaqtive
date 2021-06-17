import React, {useRef, useEffect} from 'react'
import {RqtvStandardTemplate, RqtvPage, RqtvCurrentSelections, RqtvSearchField,  RqtvListbox, RqtvModalListbox, RqtvDropdownFilter} from '@reaqtive/components'
import {useRouteMatch, NavLink} from 'react-router-dom'
import {useQFieldReducer, QGenericObject} from '@reaqtive/q'
import MyRqtvStandardTemplate from './rqtv-standard-template'
import MyRqtvContainerExample from './rqtv-viz-container'
import TabsExample from './tabs'

const qObjectDef = {
  qInfo:{
    qType:'listobject'
  },
    "qListObjectDef": {
      "qDef": {
          "qFieldDefs": [ "Customer" ],
          "qFieldLabels": [ "Customer" ],
        },
    "qInitialDataFetch": [ {qTop:0,qLeft:0,qHeight:30,qWidth:1} ],
  }
}

const HomePage = props =>{
const qObjectHandleRef=useRef()
const click = () => {
  console.log(qObjectHandleRef.current.getQObject())
}

return(<RqtvPage {...props} exact={true} qTitleExpr="'Homepage'">
  <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Product*']}}>
    <div>Home Page</div>
    <button onClick={click}>Ciao</button>
    <QGenericObject ref={qObjectHandleRef} qObjectDef={qObjectDef}>
      {(qObject)=> {
        return (<button>Ciao</button>)
      }}
    </QGenericObject>
    <RqtvDropdownFilter qFieldExpr="Customer" quickSelectionMode={false}/>
    <RqtvSearchField qFieldExpr="Customer" quickSelectionMode={true}/>
    <MyRqtvContainerExample/>
    <RqtvCurrentSelections qState="comparison"/>
    <RqtvListbox qFieldExpr={"Customer"} />
  </RqtvStandardTemplate>
</RqtvPage>)
}

const FirstPage = props =>{
  return(
    <RqtvPage {...props}>
      <RqtvStandardTemplate sideMenuFieldsMatch={{method:'include', mask:['Customer*', 'Account*']}}>
        <RqtvListbox qFieldExpr="Customer" />
        <MyFirstNestedPage/>
      </RqtvStandardTemplate>
    </RqtvPage>
  )
}


const MyFirstNestedPage = props =>{
  const { path, url } = useRouteMatch();

  return(
    <>
      <RqtvPage
        path={`${path}/with-condition`}
        qConditionExpr={'=count(distinct Customer)=1'}
        fallbackPage={`${path}`}
      >
        <div>this is a nested page with a condition</div>
        <MyRqtvContainerExample/>
      </RqtvPage>
      <RqtvPage path={`${path}`} exact={true}>
        <div>this is a nested page with no condition</div>
        <div>
          <NavLink to={`${url}/with-condition/?selections=Customer:Benedict&selections=Account:61099`}><button>go to page with condition</button></NavLink>
          <MyRqtvContainerExample/>
        </div>
      </RqtvPage>
    </>
  )
}

const SecondPage = props =>
<RqtvPage {...props} qTitleExpr="'Revenue is: '&Sum([Sales Quantity]*[Sales Price])" exactActiveMatch={false}>
  <MyRqtvStandardTemplate>
    <TabsExample/>
  </MyRqtvStandardTemplate>
</RqtvPage>

export {HomePage, FirstPage, SecondPage}
