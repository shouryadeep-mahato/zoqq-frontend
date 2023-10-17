import React, { useEffect, useState } from "react";
import * as functions from "../js/account-setup.js";

export default function Verification() {
  const [professionElements, setProfessionElements] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await functions.fetchUserPersonaDetails();
        console.log(data); // Handle the resolved data here

        // Split the professions into groups of two
        const professionGroups = [];
        for (let i = 0; i < data.length; i += 2) {
          const group = data.slice(i, i + 2);
          professionGroups.push(group);
        }

        // Special handling for the last group if the length is odd
        if (data.length % 2 === 1) {
          professionGroups[professionGroups.length - 1].push({
            professionName: "Others",
            professionId: "others",
          });
        }

        // Update the state to render the generatedProfessionElements
        const generatedProfessionElements = professionGroups.map((group, index) => (
          <div className="stroke-1" key={index}>
            {group.map((profession) => (
              <label className="option lable2 cursor" key={profession.professionName}>
                <div className="icon2">
                  <img className="handphone-laptop-icon2" alt="" src="signup/Signup/public/handphone-laptop2.svg" />
                </div>
                <input
                  type="checkbox"
                  name="Freelancer"
                  value={profession.professionName}
                  onChange={functions.toggleBackground}
                />
                {profession.professionName}
              </label>
            ))}
          </div>
        ));
        setProfessionElements(generatedProfessionElements);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };

    fetchData();

    //clearPreviousStyleTags();
    importNewCss();
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
      const css = await import("../css/accountSetUp.css");
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
      <div className="account-setup-1">
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
            <div className="buttontexticon1">
              <div className="continue1">Continue</div>
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
              <div className="chevron-down">
                <img className="arrow-icon" alt="" src="signup/Signup/public/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="form">
          <div className="back">
            <img className="arrow-right-short-icon1" alt="" src="signup/Signup/public/arrowrightshort1.svg" />

            <div className="explore-zoqq">Back</div>
          </div>
          <div className="title">
            <div className="account-setup1">Account Setup</div>
            <div className="lable-text1">Setup the account to your needs</div>
          </div>
          <div className="fields">
            <div className="business-details">Who are you?</div>
            {professionElements}

            <span id="errorMessage" className="error-message"></span>
            <div className="stroke-6">
              <button className="button-main" type="button" onClick={functions.submitPersona}>
                <div className="label3">Next Step</div>
                <img className="job-icon" alt="" src="signup/Signup/public/double-right-sign.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <script
        src="signup/Signup/public/https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"
      ></script>
    </>
  );
}
