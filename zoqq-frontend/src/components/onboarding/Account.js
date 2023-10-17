import React, { useEffect } from "react";
import "./account.css";
import Dashboard from "./dashboard/dashboard";
import SideBar from "../SideBar";

function Account() {
  useEffect(() => {
    document.getElementById("sidebar").style.height = "100%";
  }, []);
  return (
    <div className="container-fluid row px-0 mx-0" id="onboarding-main-form">
      <div className="col-2 mx-0 px-0">
        <SideBar />
      </div>
      <div className="col-10 mx-0 px-0" id="main-container">
        <Dashboard />
      </div>
    </div>
  );
}

export default Account;
