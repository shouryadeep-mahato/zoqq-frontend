import React, { useEffect, useState } from "react";
import * as functions from "../js/business-details.js";

export default function Verification() {
  useEffect(() => {
    const fetchData = async () => {
      await functions.listCountry();
      await functions.listMobileCountryCode();
      functions.GetCognitoUserInfo();
    };
    document.getElementById("buttonText").style.display = "flex";
    document.getElementById("buttonLoader").style.display = "none";
    importNewCss();
    fetchData();
  }, []);

  // Function to clear previous style tags from the head element
  const clearPreviousStyleTags = () => {
    const head = document.getElementsByTagName("head")[0];
    const styleTags = head.getElementsByTagName("style");

    // Remove each style tag from the head element
    while (styleTags.length > 0) {
      head.removeChild(styleTags[0]);
    }
  };

  // Function to dynamically import the new CSS file
  const importNewCss = async () => {
    try {
      const css = await import("../css/businessDetails.css");
      // You can also append the CSS to the head element if required
      // const styleElement = document.createElement("style");
      // styleElement.innerHTML = css.default;
      // document.head.appendChild(styleElement);
    } catch (error) {
      console.error("Error importing CSS:", error);
    }
  };
  return (
    <>
      <div class="business-details">
        <div class="head">
          <div class="logo">
            <img class="logo-icon" alt="" src="signup/Signup/public/logo@2x.png" />
          </div>
          <div class="step-1-parent">
            <div class="step-1">
              <img class="job-icon" alt="" src="signup/Signup/public/job2.svg" />

              <div class="div">Business details</div>
            </div>
            <div class="buttontexticon">
              <div class="chevron-right">
                <img class="vector-icon" alt="" src="signup/Signup/public/vector.svg" />
              </div>
            </div>
            <div class="step-2">
              <div class="div">2.</div>
              <div class="account-setup">Account Setup</div>
            </div>
            <div class="buttontexticon">
              <div class="chevron-right">
                <img class="vector-icon" alt="" src="signup/Signup/public/vector.svg" />
              </div>
            </div>
            <div class="step-2">
              <div class="div">3.</div>
              <div class="account-setup">Explore Zoqq</div>
            </div>
          </div>
          <div class="language">
            <div class="button-secondary">
              <div class="div">ENG</div>
              <div class="icons-chevrons">
                <img class="arrow-icon" alt="" src="signup/Signup/public/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="form">
          <div class="title">
            <div class="business-details2">Business details</div>
            <div class="lable-text">Add some details about your business</div>
          </div>
          <div class="fields">
            <div class="stroke-1">
              <div class="input-text">
                <img class="user-6-icon" alt="" src="signup/Signup/public/user6.svg" />

                <div class="divider"></div>
                <div class="containertext">
                  <div class="lable">Your Name</div>
                  <input class="text-text" type="text" id="personName" />
                </div>
              </div>
            </div>
            <div class="stroke-1">
              <div class="input-text">
                <img class="user-6-icon" alt="" src="signup/Signup/public/work.svg" />

                <div class="divider"></div>
                <div class="containertext">
                  <div class="lable">Business Name</div>
                  <input class="text-text" type="text" id="businessName" />
                </div>
              </div>
            </div>

            {/* Phone Number and Country Code Div Starts */}

            <div class="stroke-4">
              <div class="input-text2">
                <img class="user-6-icon" alt="" src="signup/Signup/public/phone.svg" />

                <div class="divider"></div>
                <div class="containertext2">
                  <select class="form-select2" id="countryCode">
                    <option value=""></option>
                  </select>
                </div>
              </div>
              <div class="input-text3">
                <div class="containertext2">
                  <input
                    class="text-text"
                    type="number"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    onChange={functions.restrictInput}
                  />
                </div>
              </div>
            </div>

            {/* Phone Number and Country Code Div Ends */}

            <div class="stroke-5">
              <div class="input-text">
                <img class="user-6-icon" alt="" src="signup/Signup/public/maps.svg" />

                <div class="divider"></div>
                <div class="containertext2">
                  <select class="form-select2" id="countryName">
                    <option value="">Select Country</option>
                  </select>
                </div>
              </div>
            </div>

            <span id="errorMessage" className="error-message"></span>

            <div class="stroke-3">
              <button class="button-main" type="button" id="button-main" onClick={functions.submitBusinessDetails}>
                <div id="buttonText" style={{ display: "flex" }}>
                  <div class="label1">Continue</div>
                  <img class="job-icon" alt="" src="signup/Signup/public/double-right-sign.svg" />
                </div>
                <div id="buttonLoader" style={{ display: "flex" }}>
                  <img class="job-icon" alt="" src="signup/Signup/public/loader.gif" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
