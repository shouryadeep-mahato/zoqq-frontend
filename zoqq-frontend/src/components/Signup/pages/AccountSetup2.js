import React, { useEffect, useState } from "react";
import * as functions from "../js/account-setup-2.js";

export default function Verification() {
  const [professionElements, setProfessionElements] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      var UserPersonaValues = sessionStorage.getItem("UserPersona").split(",");
      var userPersona = UserPersonaValues[0];

      try {
        const inputObject = await functions.fetchUserPersonaFeatures(userPersona);
        const data = [];

        // Iterate over the keys of the inputObject and create an array of objects
        for (const key in inputObject) {
          if (inputObject.hasOwnProperty(key)) {
            const obj = {};
            obj["column"] = inputObject[key];
            data.push(obj);
          }
        }

        //console.log(JSON.stringify(data, null, 2));

        // Split the professions into groups of two
        const professionGroups = [];
        for (let i = 0; i < data.length; i += 2) {
          const group = data.slice(i, i + 2);
          professionGroups.push(group);
        }

        // Special handling for the last group if the length is odd
        if (data.length % 2 === 1) {
          professionGroups[professionGroups.length - 1].push({
            column: "Others",
          });
        }

        // Update the state to render the generatedProfessionElements
        const generatedProfessionElements = professionGroups.map((group, index) => (
          <div className="stroke-2" key={index}>
            {group.map((profession) => (
              <div className="option2 option" key={profession.column}>
                <div className="icon2">
                  <img className="handphone-laptop-icon2" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <span className="label label2" onClick={functions.toggleBackground}>
                  {profession.column}
                </span>
              </div>
            ))}
          </div>
        ));
        setProfessionElements(generatedProfessionElements);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
    importNewCss();
  }, []);

  const importNewCss = async () => {
    try {
      const css = await import("../css/accountSetUp2.css");
    } catch (error) {
      console.error("Error importing CSS:", error);
    }
  };

  return (
    <>
      <div className="account-setup-2">
        <div className="head">
          <div className="logo">
            <img className="logo-icon" alt="" src="signup/Signup/public/logo@2x.png" />
          </div>
          <div className="step-1-parent">
            <div className="step-1">
              <img className="job-icon" alt="" src="signup/Signup/public/job.svg" />

              <div className="business-details">Business details</div>
            </div>
            <div className="step-1">
              <img className="job-icon" alt="" src="signup/Signup/public/user7.svg" />

              <div className="business-details">Account Setup</div>
            </div>
            <div className="buttontexticon">
              <div className="chevron-right">
                <img className="vector-icon" alt="" src="signup/Signup/public/vector.svg" />
              </div>
            </div>
            <div className="step-3">
              <div className="business-details">3.</div>
              <div className="explore-zoqq">Explore Zoqq</div>
            </div>
          </div>
          <div className="language">
            <div className="button-secondary">
              <div className="business-details">ENG</div>
              <div className="icons-chevrons">
                <img className="arrow-icon" alt="" src="signup/Signup/public/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="form">
          <div className="back">
            <img className="arrow-right-short-icon" alt="" src="signup/Signup/public/arrowrightshort.svg" />

            <div className="explore-zoqq">Back</div>
          </div>
          <div className="title">
            <div className="account-setup1">Account Setup</div>
            <div className="lable-text1">Setup the account to your needs</div>
          </div>
          <div className="fields">
            <div className="business-details">What do you want to use?</div>
            {professionElements}
            {/* <div className="stroke-2">
              <div className="option2 option">
                <div className="icon2">
                  <img className="handphone-laptop-icon" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <span className="label label2" onClick={functions.toggleBackground}>
                  Accept payments on my own website
                </span>
              </div>
              <div className="option2 option">
                <div className="icon2">
                  <img className="handphone-laptop-icon" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <span className="label label2" onClick={functions.toggleBackground}>
                  Accept payments on my own website
                </span>
              </div>
            </div>
            <div className="stroke-2">
              <div className="option2 option">
                <div className="icon2">
                  <img className="handphone-laptop-icon" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <span className="label label2" onClick={functions.toggleBackground}>
                  Accept payments on my own website
                </span>
              </div>
              <div className="option2 option">
                <div className="icon2">
                  <img className="handphone-laptop-icon" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <span className="label label2" onClick={functions.toggleBackground}>
                  Accept payments on my own website
                </span>
              </div>
            </div>
            <div className="stroke-2">
              <div className="option2 option">
                <div className="icon2">
                  <img className="handphone-laptop-icon" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <span className="label label2" onClick={functions.toggleBackground}>
                  Accept payments on my own website
                </span>
              </div>
              <div className="option2 option">
                <div className="icon2">
                  <img className="handphone-laptop-icon" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <span className="label label2" onClick={functions.toggleBackground}>
                  Accept payments on my own website
                </span>
              </div>
            </div>
            <div className="stroke-2">
              <div className="option2 option">
                <div className="icon2">
                  <img className="handphone-laptop-icon" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <span className="label label2" onClick={functions.toggleBackground}>
                  Accept payments on my own website
                </span>
              </div>
              <div className="option2 option">
                <div className="icon2">
                  <img className="handphone-laptop-icon" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <span className="label label2" onClick={functions.toggleBackground}>
                  Accept payments on my own website
                </span>
              </div>
            </div>
            <div className="stroke-2">
              <div className="option2 option">
                <div className="icon2">
                  <img className="handphone-laptop-icon" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <span className="label label2" onClick={functions.toggleBackground}>
                  Accept payments on my own website
                </span>
              </div>
              <div className="option2 option">
                <div className="icon2">
                  <img className="handphone-laptop-icon" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <span className="label label2" onClick={functions.toggleBackground}>
                  Accept payments on my own website
                </span>
              </div>
            </div> */}
            <span className="error-message" id="errorMessage"></span>
            <div className="stroke-6">
              <button className="button-main" type="button" onClick={functions.submitFeatures}>
                <div className="label1">Next Step</div>
                <img className="job-icon" alt="" src="signup/Signup/public/double-right-sign.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
