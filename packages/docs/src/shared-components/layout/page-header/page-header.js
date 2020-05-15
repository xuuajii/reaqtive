import React, { useContext, useState } from "react";
import {
  RqtvPageContext,
  RqtvDropdownFilter,
  RqtvAppContext
} from "@reaqtive/components";

import Switch from "../toggle-switch/toggle-switch";


const PageHeader = props => {
  const rqtvPage = useContext(RqtvPageContext);
  const { pageData } = rqtvPage;
  const [showStatus, setShowStatus] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(false);
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <h3>{props.title || pageData.title}</h3>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => {
            setShowStatus(!showStatus);
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${showStatus ? "show" : ""}`}>
          <ul className="navbar-nav ml-auto align-items-md-center ">
            <li className="nav-item">
              <Switch
                id={2}
                isOn={switchStatus}
                onChange={function(e) {
                  setSwitchStatus(!switchStatus);
                }}
              />
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-primary mr-1">
                Button
              </button>
              <button type="button" className="btn btn-primary mx-1">
                Button
              </button>
              <button type="button" className="btn btn-primary mx-1">
                Button
              </button>
              <button type="button" className="btn btn-primary mx-1">
                Button
              </button>
            </li>
            <li className="nav-item dropdown my-2">
              <RqtvDropdownFilter
                qFieldExpr="Year Month" //required prop
                showSearch={false}
                dropdownMenuHeight={300}
                showCaret={true}
                toggle={false}
                quickSelectMode={true}
              />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default PageHeader;
