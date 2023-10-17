import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listCountry, signUp, restrictInput, matchPasswords, validateEmail } from "../js/sign-up";
//import "../css/signUp.css";

export const validatePassword = () => {
  const passwordInput = document.getElementById("password");
  const errorElement = document.getElementById("errorMessage"); // Assuming you have an element to display password error messages

  const password = passwordInput.value;

  // Define password format rules
  const minLength = 8; // Minimum length requirement
  const hasUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
  const hasLowerCase = /[a-z]/.test(password); // At least one lowercase letter
  const hasDigit = /\d/.test(password); // At least one digit
  const hasSpecialChar = /[!@#$%^&*]/.test(password); // At least one special character

  if (password.length == 0) {
    errorElement.innerText = "";
    errorElement.style.display = "none";
  } // Check if the password adheres to the format rules
  else if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
    // Display an error message and add error styling to the input
    errorElement.innerText =
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character. (Example Password: Abc@2001)";
    errorElement.style.display = "block";
  } else {
    // Password format is valid, clear any error message and remove the error styling
    // Display an error message and add error styling to the input
    errorElement.innerText = "";
    errorElement.style.display = "none";
  }
};

export function SignUp() {
  useEffect(() => {
    listCountry();
    importNewCss();
  }, []);

  // Function to dynamically import the new CSS file
  const importNewCss = async () => {
    try {
      const css = await import("../css/signUp.css");
      // You can also append the CSS to the head element if required
      // const styleElement = document.createElement("style");
      // styleElement.innerHTML = css.default;
      // document.head.appendChild(styleElement);
    } catch (error) {
      console.error("Error importing CSS:", error);
    }
  };

  const [imgSrc, setImgSrc] = useState("signup/Signup/public/eye.svg");

  const showPassword = () => {
    var password = document.getElementById("password");

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

  const [imgSrcConfirm, setImgSrcConfirm] = useState("signup/Signup/public/eye.svg");

  const showConfirmPassword = () => {
    var password = document.getElementById("confirmPassword");

    if (password.value != "") {
      if (password.getAttribute("type") == "password") {
        password.setAttribute("type", "text");
        setImgSrcConfirm("signup/Signup/public/eye-close.svg");
      } else {
        password.setAttribute("type", "password");
        setImgSrcConfirm("signup/Signup/public/eye.svg");
      }
    }
  };

  return (
    <div className="sign-up" id="signUp">
      <img className="graphics-icon" alt="" src="signup/Signup/public/graphics.svg" />

      <form className="form">
        <div className="title">
          <div className="sign-up1">Sign Up</div>
          <div className="lable-text">Provide your email address and create a strong password</div>
        </div>
        <div className="fields">
          <div className="stroke-1">
            <div className="inputicontextdefault1">
              <img className="job-icon" alt="" src="signup/Signup/public/job.svg" />

              <div className="divider1"></div>
              <input
                type="text"
                id="email"
                name="BusinessEmail"
                placeholder="Business Email"
                className="containertext1"
                onChange={validateEmail}
              />
            </div>
          </div>

          {/* Phone Number Starts*/}
          <div className="stroke-1">
            <div className="inputicontextdefault1">
              <img className="job-icon" alt="" src="signup/Signup/public/phone.svg" />

              <div className="divider1"></div>

              <select name="countrycode" id="countrycode" className="form-select2">
                <option value="">Select Country Code</option>
              </select>

              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                className="containertext1"
                onChange={restrictInput}
              />
            </div>
          </div>
          {/* Phone Number Ends*/}

          <div className="stroke-1">
            <div className="inputicontextdefault1">
              <img className="job-icon" alt="" src="signup/Signup/public/lock.svg" />

              <div className="divider1"></div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                className="containertext1"
                onChange={validatePassword}
              />
              <img className="job-icon cursor" alt="" src={imgSrc} onClick={showPassword} />
            </div>
          </div>

          <div className="stroke-1">
            <div className="inputicontextdefault1">
              <img className="job-icon" alt="" src="signup/Signup/public/lock.svg" />

              <div className="divider1"></div>
              <input
                type="password"
                id="confirmPassword"
                name="password"
                placeholder="Confirm Password"
                className="containertext1"
                onChange={matchPasswords}
              />
              <img className="job-icon cursor" alt="" src={imgSrcConfirm} onClick={showConfirmPassword} />
            </div>
          </div>

          <span id="errorMessage" className="error-message"></span>

          <div className="stroke-3">
            <button className="button-main" type="button" id="button-main" onClick={signUp}>
              <div id="button-text" style={{ marginLeft: "inherit" }}>
                <div className="label2">Sign Up</div>
                <img className="google-icon" alt="" src="signup/Signup/public/log-in-double-arrow2.svg" />
              </div>
              <div id="button-loader" style={{ marginLeft: "inherit" }}>
                <img className="google-icon" alt="" src="signup/Signup/public/loader.gif" />
              </div>
            </button>
          </div>

          <div id="sign-up-btn">
            Already have an account? <Link to="/">Sign in</Link>
          </div>
        </div>
        {/* <div className="social-media">
          <div className="or-sign-up">Or sign up with:</div>
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
  );
}

export default SignUp;
