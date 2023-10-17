import React, { useEffect, useState } from "react";
import * as functions from "../js/sign-up-verification.js";
//import "../css/signUpVerification.css";

export default function Verification() {
  useEffect(() => {
    // Use require.context to get all files from the directory
    // const requireContext = require.context(
    //   "../assets/Signup/public",
    //   false,
    //   /\.(svg|png|jpg|jpeg|gif)$/
    // );
    // // Call the function and get all files in the directory
    // importAll(requireContext).then((fetchedAssets) => {
    //   setAssets(fetchedAssets);
    // });
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
      const css = await import("../css/signUpVerification.css");
      // You can also append the CSS to the head element if required
      // const styleElement = document.createElement("style");
      // styleElement.innerHTML = css.default;
      // document.head.appendChild(styleElement);
    } catch (error) {
      console.error("Error importing CSS:", error);
    }
  };

  return (
    <div className="sign-up-verification" id="signUpVerification">
      <img className="graphics-icon" alt="" src="signup/Signup/public/graphics.svg" />

      <form className="form">
        <div className="title">
          <div className="we-have-sent">We have sent a verification code to your email</div>
          <div className="lable-text">Please enter the code here</div>
        </div>
        <div className="fields">
          <div className="stroke-2">
            <div className="inputicontextdefault1">
              <img className="vibrate-icon" alt="" src="signup/Signup/public/vibrate.svg" />

              <div className="divider1"></div>
              <div className="containertext1">
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  placeholder="000 - 000"
                  maxLength="9"
                  onChange={functions.restrictInput}
                />
              </div>
            </div>
          </div>

          <span id="errorMessage" className="error-message"></span>

          <div className="lable-text-parent">
            <div className="lable-text1">Didn't get the code?</div>
            <a href="#" onClick={functions.resendConfirmation}>
              Send the code again
            </a>
          </div>
          <div className="stroke-3">
            <button className="button-main" type="button" onClick={functions.confirmSignup}>
              <div id="button-text" style={{ marginLeft: "inherit" }}>
                <div className="label2">Confirm</div>
                <img className="google-icon" alt="" src="signup/Signup/public/log-in-double-arrow2.svg" />
              </div>
              <div id="button-loader" style={{ marginLeft: "inherit" }}>
                <img className="google-icon" alt="" src="signup/Signup/public/loader.gif" />
              </div>
            </button>
          </div>
        </div>
      </form>
      <div className="head">
        <div className="logo">
          <img className="logo-icon" alt="" src="signup/Signup/public/logo@2x.png" />
        </div>
        <div className="language">
          <div className="button-secondary">
            <div className="label3">ENG</div>
            <div className="chevron-down">
              <img className="arrow-icon" alt="" src="signup/Signup/public/arrow.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
