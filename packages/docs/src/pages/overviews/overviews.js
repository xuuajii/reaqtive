//
//Copyright (c) 2019 by Paolo Deregibus. All Rights Reserved.
//

import React from "react";
import { RqtvPage, RqtvStandardTemplate } from "@reaqtive/components";
import Overview from "./overview";

const Overviews = props => {
  return (
    <>
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
          containerClassName={"full-screen"}
          usePageHeader={false}
        >
          <Overview {...props} />
        </RqtvStandardTemplate>
      </RqtvPage>
    </>
  );
};

export default Overviews;
