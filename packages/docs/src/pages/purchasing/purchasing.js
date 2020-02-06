import React from 'react';
import {
    RqtvApp,
    RqtvPage,
    RqtvStandardTemplate,
    RqtvBlankTemplate
  } from "@reaqtive/components";

const Purchasing = props => {
    return(
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
            <h1>Purchasing</h1>
          </RqtvStandardTemplate>
        </RqtvPage>
    );
}

export default Purchasing;