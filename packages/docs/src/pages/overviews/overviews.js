import React from "react";
import {
  RqtvApp,
  RqtvPage,
  RqtvStandardTemplate,
  RqtvBlankTemplate
} from "@reaqtive/components";
import Overview from "./overview";

const Overviews = props => {
  return (
    <RqtvPage
      path={props.path}
      id={props.id}
      title={props.title}
      // triggers={[
      //   {type:'fieldSelection',params:{fieldName:'Customer',value:'Benedict', alwaysOneSelected:true}},
      //   //{type:'fieldSelection',params:{fieldName:'AccountDesc',value:'Bonus'}},
      // ]}
    >
      <RqtvStandardTemplate
        searchFieldsMatch={{ method: "include", mask: ["Cust*"] }}
        useContainerFluid={false}
      >
        {props.mainDimension === "country" ? (
          <OverviewByCountry mainDimension={props.mainDimension} />
        ) : (
          <OverviewByProduct mainDimension={props.mainDimension} />
        )}
      </RqtvStandardTemplate>
    </RqtvPage>
  );
};

export default Overviews;

const OverviewByCountry = props => (
    <Overview mainDimension={props.mainDimension} />
  );
  const OverviewByProduct = props => (
    <Overview mainDimension={props.mainDimension} />
  );