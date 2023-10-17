import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signIn, validateEmail } from "../js/sign-in";
//import "../css/signIn.css";

export function SignIn() {
  useEffect(() => {
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
      const css = await import("../css/signIn.css");
    } catch (error) {
      console.error("Error importing CSS:", error);
    }
  };

  const [imgSrc, setImgSrc] = useState("signup/Signup/public/eye.svg");

  const showPassword = () => {
    var password = document.getElementById("businessPassword");

    if (password.value != "") {
      if (password.getAttribute("type") == "password") {
        password.setAttribute("type", "text");
        setImgSrc("signup/Signup/public/eye-close.svg");
      } else {
        password.setAttribute("type", "password");
        setImgSrc("signup/Signup/public/eye.svg");
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      document.getElementById("button-main").click();
    }
  };

  return (
    <>
      <div className="sign-up" id="signIn">
        <img className="graphics-icon" alt="" src="signup/Signup/public/graphics.svg" />

        <form className="form">
          <div className="title">
            <div className="sign-up1">Sign In</div>
            <div className="lable-text">Provide your email address and password</div>
          </div>
          <div className="fields">
            <div className="stroke-1">
              <div className="inputicontextdefault1">
                <img className="job-icon" alt="" src="signup/Signup/public/job.svg" />

                <div className="divider1"></div>
                <input
                  type="text"
                  id="businessEmail"
                  name="BusinessEmail"
                  placeholder="Business Email"
                  className="containertext1"
                  onChange={validateEmail}
                />
              </div>
            </div>
            <div className="stroke-1">
              <div className="inputicontextdefault1">
                <img className="job-icon" alt="" src="signup/Signup/public/lock.svg" />

                <div className="divider1"></div>
                <input
                  type="password"
                  id="businessPassword"
                  name="password"
                  placeholder="Password"
                  className="containertext1"
                  onKeyDown={handleKeyDown}
                />
                <img className="job-icon cursor" alt="" src={imgSrc} onClick={showPassword} />
              </div>
            </div>

            <span id="errorMessage" className="error-message"></span>

            <div className="stroke-3">
              <button className="button-main" type="button" id="button-main" onClick={signIn}>
                <div id="button-text" style={{ marginLeft: "inherit" }}>
                  <div className="label2">Sign In</div>
                  <img className="google-icon" alt="" src="signup/Signup/public/log-in-double-arrow2.svg" />
                </div>
                <div id="button-loader" style={{ marginLeft: "inherit" }}>
                  <img className="google-icon" alt="" src="signup/Signup/public/loader.gif" />
                </div>
              </button>
            </div>

            <div id="sign-up-btn">
              Don't have an account? <Link to="/sign-up">Sign up</Link>
            </div>
            <div id="sign-up-btn">
              Forgot Password? <Link to="/forgotpassword">Reset password here</Link>
            </div>
          </div>
          {/* <div className="social-media">
            <div className="or-sign-up">Or sign in with:</div>
            <div className="icons">
              <div className="button-secondary">
                <img
                  className="google-icon"
                  alt=""
                  src="signup/Signup/public/google.svg"
                />
              </div>
              <div className="button-secondary">
                <img
                  className="google-icon"
                  alt=""
                  src="signup/Signup/public/facebook.svg"
                />
              </div>
              <div className="button-secondary">
                <img
                  className="google-icon"
                  alt=""
                  src="signup/Signup/public/github.svg"
                />
              </div>
              <div className="button-secondary">
                <img
                  className="google-icon"
                  alt=""
                  src="signup/Signup/public/twitter.svg"
                />
              </div>
            </div>
          </div> */}
        </form>
        <div className="head">
          <div className="logo">
            <img className="logo-icon" alt="" src="signup/Signup/public/logo@2x.png" />
          </div>
          <div className="language">
            <div className="button-secondary4">
              <div className="label3">ENG</div>
              <div className="chevron-down">
                <img className="arrow-icon" alt="" src="signup/Signup/public/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignIn;
