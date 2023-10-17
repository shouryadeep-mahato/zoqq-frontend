import React from "react";
import Axios from "axios";

export const restrictInput = () => {
  var code = document.getElementById("verificationCode");
  const inputValue = code.value.replace(/\D/g, "").slice(0, 6);
  const formattedValue = inputValue.replace(/(\d{3})(\d{3})/, (_, part1, part2) => `${part1} - ${part2}`);
  code.value = formattedValue;
};

export const confirmSignup = async () => {
  var code = document.getElementById("verificationCode");
  var span = document.getElementById("errorMessage");
  var email = sessionStorage.getItem("lastemail");

  var verificationCode = code.value.replace(/[\s-]/g, "");

  if (code.value == "") {
    span.style.display = "block";
    span.innerText = "Please enter your OTP to continue";
  } else {
    span.style.display = "none";
    span.innerText = "";

    var buttonText = document.getElementById("button-text");
    var buttonLoader = document.getElementById("button-loader");

    buttonText.style.display = "none";
    buttonLoader.style.display = "flex";

    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/SignupRoutes/confirmSignup", {
      params: {
        email: email,
        code: verificationCode,
      },
    });

    let obj = response.data;
    console.log(obj);

    buttonText.style.display = "flex";
    buttonLoader.style.display = "none";

    if (obj.errorCode) {
      if (obj.errorCode == "CodeMismatchException") {
        span.style.display = "block";
        span.innerText = "Invalid OTP. Please enter the correct OTP and try again.";
      } else if (obj.errorCode == "ResourceNotFoundException") {
        span.style.display = "block";
        span.innerText = "There is some configuration issues, please contact your admin";
      } else if (obj.errorCode == "NotAuthorizedException") {
        span.style.display = "block";
        span.innerText = obj.msg.split("operation:")[1].trim();
      }
    } else if (obj.ResponseMetadata.HTTPStatusCode === 200) {
      span.style.display = "block";
      span.innerText = "";
      span.style.color = "green";
      setTimeout(() => {
        window.location.href = "/business-details";
      }, 2000);
    } else {
      span.style.display = "block";
      span.innerText = "Something went wrong, please try again later.";
    }
  }
};

export const resendConfirmation = async () => {
  var span = document.getElementById("errorMessage");
  var email = sessionStorage.getItem("lastemail");

  if (email == "") {
    span.style.display = "block";
    span.innerText = "Email not found, please log-in again.";
  } else {
    span.style.display = "none";
    span.innerText = "";

    var buttonText = document.getElementById("button-text");
    var buttonLoader = document.getElementById("button-loader");

    buttonText.style.display = "none";
    buttonLoader.style.display = "flex";

    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/SignupRoutes/resendConfirmation", {
      params: {
        email: email,
      },
    });

    let obj = response.data;
    console.log(obj);

    buttonText.style.display = "flex";
    buttonLoader.style.display = "none";

    if (obj.ResponseMetadata.HTTPStatusCode == 200) {
      span.style.display = "block";
      span.innerText = "New OTP sent to your registered email.";
      span.style.color = "green";
    } else if (obj.errorCode) {
      if (obj.errorCode == "ResourceNotFoundException") {
        span.style.display = "block";
        span.innerText = "There is some configuration issues, please contact your admin";
      }
    } else {
      span.style.display = "block";
      span.innerText = "Something went wrong, OTP could not be sent. Please try again later.";
    }
  }
};
