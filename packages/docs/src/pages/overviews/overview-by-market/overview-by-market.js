//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//
import React from "react";
import { Route } from 'react-router-dom'
import { RqtvPage } from '@reaqtive/components'
import { QGenericObject } from '@reaqtive/q'
import PageHeader from './page-header'
import CardDeckHeader from './card-deck-header'
import CountryCardDeck from './country-card-deck'
// import ToggleSwitch from "../../../shared-components/layout/toggle-switch/toggle-switch";
// import Card from "../../../shared-components/layout/card/Card";
// import DataPicker from "../../../shared-components/layout/data-picker/data-picker";
// import PageHeader from "../../../shared-components/layout/page-header/page-header";

const marketAreasObjectDef = {
  qInfo:{
    qType:"tableData"
  },
  qMarketAreas:{
    qStringExpression:{
      qExpr:`concat(distinct '{"description":"'&[Market Area]&'"}', '|')`
    }
  }
}

const OverviewByMarket = props => {

  return (
    <>
      <Route exact={true} path={props.path}>
        <RqtvPage
          path={props.path}
          id={props.id}
          title="overview by country"
          qTitleExpr="'overview by country - '&$(lastMonthLabel)"
          exact={true}
        >
          <PageHeader fallbackTitle="Overview By Country"/>
          <QGenericObject qObjectDef={marketAreasObjectDef}>
            {(qGenericObject)=> {
              const marketAreas = qGenericObject.qLayoutHandler.qLayout && qGenericObject.qLayoutHandler.qLayout.qMarketAreas.split("|").map(marketArea=>JSON.parse(marketArea))||[]
              return marketAreas && marketAreas.map(marketArea =>
                <div key={marketArea.description} >
                  <CardDeckHeader title={marketArea.description}/>
                  <CountryCardDeck marketArea={marketArea.description}/>
                </div>
              )
            }}
          </QGenericObject>
        </RqtvPage>
      </Route>
    </>
  );
};

export default OverviewByMarket;
// <PageHeader {...props} />
// <div className="ml-5">
//   <h1>By Market</h1>
//   <ToggleSwitch
//     isOn={value}
//     onChange={function(e) {
//       setValue(!value);
//     }}
//   />
//   {value && <p>Attivato</p>}
//   <DataPicker />
//   <Card
//     displayLogo={true}
//     isInfoAbsolute={true}
//     gradient={true}
//     displayKPI={true}
//     displayBody={true}
//   />
// </div>
