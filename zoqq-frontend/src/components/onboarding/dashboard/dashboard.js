import React, { useState, useEffect } from "react";
import BreadCrumbs from "../../structure/BreadCrumbs";
import General from "./tabs/general";
import BusinessDetails from "./tabs/businessDetails";
import KybDetails from "./tabs/kybDetails";
import ApplicantDetails from "./tabs/applicantDetails";
import StakeholderDetails from "./tabs/stakeholderDetailsAdvance";

function dashboard() {
  const [showTab, setShowTab] = useState(0);

  useEffect(() => {
    var internalBusinessId = sessionStorage.getItem("internalBusinessId");
    var lastScreenCompleted = sessionStorage.getItem("lastScreenCompleted");
    if (internalBusinessId && lastScreenCompleted) {
      var lastScreenCompletedNumber = Number(lastScreenCompleted);
      if (lastScreenCompletedNumber <= 3) {
        setShowTab(0);
      } else if (lastScreenCompletedNumber >= 4 && lastScreenCompletedNumber <= 8) {
        setShowTab(1);
      } else if (lastScreenCompletedNumber >= 9 && lastScreenCompletedNumber <= 14) {
        setShowTab(5);
      } else if (lastScreenCompletedNumber >= 15 && lastScreenCompletedNumber <= 18) {
        setShowTab(3);
      } else if (lastScreenCompletedNumber >= 19 && lastScreenCompletedNumber <= 22) {
        setShowTab(2);
      }
    }
  }, []);

  return (
    <>
      <BreadCrumbs
        data={{
          name: "Business Details",
          img: "/accounts/accounts.svg",
          backurl: "/dashboard",
        }}
      />
      <div className="navigationsub-parent">
        <div className="noticetextprogress-parent">
          <div className="noticetextprogress1">
            <img className="file-zip-icon" alt="" src="/onboarding/lock_1.svg" />
            <div className="status1">
              <div className="add-details-to1">Add details to complete account activation</div>
              <div className="progress1">
                <div className="div6" />
                <div className="div7" id="div7" />
                <div className="div8" />
                <div className="div9" />
                <div className="div10" />
                <div className="div11" />
              </div>
            </div>
          </div>
          <div className="tabs" style={{}}>
            {/* General Details */}
            <button className={showTab == 0 ? "tab" : "tab1"} onClick={() => setShowTab(0)}>
              <img
                className="icon6"
                alt=""
                src={showTab == 0 ? "/onboarding/tabs/select_tab1.svg" : "/onboarding/tabs/tab1.svg"}
              />
              <div className={showTab == 0 ? "label3" : "label4"}>General</div>
            </button>

            {/* Business Details */}
            <button className={showTab == 1 ? "tab" : "tab1"} onClick={() => setShowTab(1)}>
              <img
                className="icon6"
                alt=""
                src={showTab == 1 ? "/onboarding/tabs/select_tab2.svg" : "/onboarding/tabs/tab2.svg"}
              />
              <div className={showTab == 1 ? "label3" : "label4"}>Business Details</div>
            </button>

            {/* Stakeholder Details */}
            <button
              className={showTab == 5 ? "tab" : "tab1"}
              onClick={() => setShowTab(5)}
              style={{ padding: "13px 10px" }}
            >
              <img
                className="icon6"
                alt=""
                src={showTab == 5 ? "/onboarding/tabs/select_tab3.svg" : "/onboarding/tabs/tab3.svg"}
              />
              <div className={showTab == 5 ? "label3" : "label4"}>Stakeholder Details</div>
            </button>

            {/* Applicant Details */}
            <button
              className={showTab == 3 ? "tab" : "tab1"}
              onClick={() => setShowTab(3)}
              style={{ padding: "13px 14px" }}
            >
              <img
                className="icon6"
                alt=""
                src={showTab == 3 ? "/onboarding/tabs/select_tab4.svg" : "/onboarding/tabs/tab4.svg"}
              />
              <div className={showTab == 3 ? "label3" : "label4"}>Applicant Details</div>
            </button>

            {/* KYB Details */}
            <button className={showTab == 2 ? "tab" : "tab1"} onClick={() => setShowTab(2)}>
              <img
                className="icon6"
                alt=""
                src={showTab == 2 ? "/onboarding/tabs/select_tab3.svg" : "/onboarding/tabs/tab3.svg"}
              />
              <div className={showTab == 2 ? "label3" : "label4"}>KYB Details</div>
            </button>
          </div>

          {showTab === 0 ? (
            <General />
          ) : showTab == 1 ? (
            <BusinessDetails />
          ) : showTab == 2 ? (
            <KybDetails />
          ) : showTab == 3 ? (
            <ApplicantDetails />
          ) : (
            <StakeholderDetails />
          )}
        </div>
      </div>
    </>
  );
}

export default dashboard;
