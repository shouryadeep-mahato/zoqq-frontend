import Axios from "axios";

export const signIn = async () => {
  var email = document.getElementById("businessEmail").value;
  var password = document.getElementById("businessPassword").value;

  var span = document.getElementById("errorMessage");

  if (email == "" && password == "") {
    span.style.display = "block";
    span.innerText = "Please fill the form to continue";
  } else if (email == "") {
    span.style.display = "block";
    span.innerText = "Email address cannot be empty";
  } else if (password == "") {
    span.style.display = "block";
    span.innerText = "Password cannot be empty";
  } else {
    span.style.display = "none";
    span.innerText = "";

    var buttonText = document.getElementById("button-text");
    var buttonLoader = document.getElementById("button-loader");

    buttonText.style.display = "none";
    buttonLoader.style.display = "flex";

    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/SignupRoutes/login", {
      params: {
        email: email,
        password: password,
      },
    });

    let obj = response.data;
    console.log(obj);

    buttonText.style.display = "flex";
    buttonLoader.style.display = "none";

    if (obj.authenticationResult) {
      if (obj.authenticationResult.accessToken) {
        sessionStorage.setItem("lastemail", email);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      }
    } else if (obj.errorCode) {
      if (obj.errorCode == "UserNotConfirmedException") {
        sessionStorage.setItem("lastemail", email);
        span.style.display = "block";
        span.innerText = "Email-id not verified, please verify first!";
        setTimeout(() => {
          window.location.href = "/verification";
        }, 2000);
      } else if (obj.errorCode == "NotAuthorizedException") {
        span.style.display = "block";
        span.innerText = "Invalid email or password. Please try again.";
      } else if (obj.errorCode == "ResourceNotFoundException") {
        span.style.display = "block";
        span.innerText = "There is some configuration issues, please contact your admin";
      } else if (obj.errorCode == "UserNotFoundException") {
        span.style.display = "block";
        span.innerText =
          "WE ARE SURE THE ENTERED EMAIL IS NOT REGISTERED WITH US, PLEASE ENTER THE CORRECT REGISTERED EMAIL";
      } else if (obj.errorCode == "UserLambdaValidationException") {
        span.style.display = "block";
        span.innerText = "Limit exceeded! Your account has been blocked for 24 hours, please contact your admin";
      } else if (obj.errorCode == "PasswordResetRequiredException") {
        span.style.display = "block";
        span.innerText = "Password Reset Required";
      } else if (obj.challengeName != null && obj.challengeName == "NEW_PASSWORD_REQUIRED") {
        span.style.display = "block";
        span.innerText = "NEW PASSWORD REQUIRED";
      } else {
        span.style.display = "block";
        span.innerText = "Something went wrong, please try again later!";
      }
    }
  }
};

export const validateEmail = () => {
  var email = document.getElementById("businessEmail").value;
  var span = document.getElementById("errorMessage");

  // Regular expression pattern for validating an email address
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email != "") {
    // Call the validateEmail function to check if the entered email is valid
    const isValidEmail = emailPattern.test(email);

    if (isValidEmail) {
      // The email is valid, you can proceed with further actions
      span.style.display = "none";
      span.innerText = "";
    } else {
      // The email is not valid, show an error message or take appropriate action
      span.style.display = "block";
      span.innerText = "Email address format is wrong, correct format eg. abc@xyz.com";
    }
  } else {
    span.style.display = "none";
    span.innerText = "";
  }
};
