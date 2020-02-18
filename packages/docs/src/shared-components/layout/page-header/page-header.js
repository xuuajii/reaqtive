import React, { useContext } from "react";
import {
  RqtvPageContext,
  RqtvDropdownFilter,
  RqtvAppContext
} from "@reaqtive/components";
import { Navbar } from "@reaqtive/layout";

const PageHeader = props => {
  const rqtvPage = useContext(RqtvPageContext);
  const { pageData } = rqtvPage;

  return (
    <Navbar
      className={`page-header ${props.className ? props.className : ""}`}
      style={{ ...props.style }}
    >
      <div className={`navbar-brand`}>
        <h3>{props.title || pageData.title}</h3>
      </div>
      <div style={{display:"flex", width:"33.333%",justifyContent: "space-around"}} className="mr-5">
        <button type="button" class="btn btn-primary">
          Button
        </button>
        <button type="button" class="btn btn-primary">
          Button
        </button>
        <button type="button" class="btn btn-primary">
          Button
        </button>
        <button type="button" class="btn btn-primary">
          Button
        </button>

        <RqtvDropdownFilter
          qFieldExpr="Year Month" //required prop
          showSearch={false}
          dropdownMenuHeight={300}
          showCaret={true}
          toggle={false}
          quickSelectMode={true}
        />
      </div>

      {props.children}
    </Navbar>
  );
};

export default PageHeader;
