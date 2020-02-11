//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from 'react';
import {
    RqtvApp,
    RqtvPage,
    RqtvStandardTemplate,
    RqtvBlankTemplate
  } from "@reaqtive/components";

const LongTermRental = props => {
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
            <h1>LTR</h1>
          </RqtvStandardTemplate>
        </RqtvPage>
    );
}

export default LongTermRental;