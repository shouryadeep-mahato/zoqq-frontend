import React from "react";
import Axios from "axios";

export const listMobileCountryCode = async () => {
  const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/CommonRoutes/listCountryCode");
  let obj = response.data;

  var List = obj.result;
  if (obj.result) {
    var select = document.getElementById("countryCode");

    List.forEach((item) => {
      var option = document.createElement("option");
      option.value = item.ISD_country_code;
      option.text = item.country_name + " ( + " + item.ISD_country_code + " )";
      select.appendChild(option);
    });
  } else {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("errorMessage").innerText = "Something went wrong, unable to load country list.";
  }
};

export const listCountry = async () => {
  const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/CommonRoutes/listCountry");
  let obj = response.data;

  var List = obj.result;
  if (obj.result) {
    var select = document.getElementById("countryName");

    List.forEach((item) => {
      var option = document.createElement("option");
      option.value = item.ISOcc_2char;
      option.text = item.country_name;
      option.setAttribute("data-country-code", item.ISD_country_code);
      select.appendChild(option);
    });
  } else {
    document.getElementById("errorMessage").style.display = "block";
    document.getElementById("errorMessage").innerText =
      "Something went wrong, unable to load mobile country-code list.";
  }
};

export const GetCognitoUserInfo = async () => {
  var phoneNumber = sessionStorage.getItem("phoneNumber");
  var countryCode = sessionStorage.getItem("countryCode");

  var countryCodesSelect = document.getElementById("countryCode");

  // Loop through the options in the select element
  for (var i = 0; i < countryCodesSelect.options.length; i++) {
    var option = countryCodesSelect.options[i];
    if (option.value == countryCode) {
      option.selected = true; // Set the option as selected
      break; // Exit the loop once the matching option is found
    }
  }

  document.getElementById("phoneNumber").value = phoneNumber;
  var countryCodeValue = countryCodesSelect.value;
  var countrySelect = document.getElementById("countryName");
  // Iterate through the options of the target select element
  for (var i = 0; i < countrySelect.options.length; i++) {
    var option = countrySelect.options[i];
    var textContent = option.getAttribute("data-country-code");
    if (textContent === countryCodeValue) {
      option.selected = true;
      break; // Exit the loop once the matching option is found
    }
  }
};

export const restrictInput = () => {
  var phoneNumber = document.getElementById("phoneNumber");
  var errorElement = document.getElementById("errorMessage"); // Assuming you have an element to display error messages

  // Get the current input value and remove any non-numeric characters
  const inputValue = phoneNumber.value.replace(/\D/g, "");

  // Define the desired phone number length range
  const minLength = 8;
  const maxLength = 15;

  if (inputValue.length == 0) {
    errorElement.innerText = "";
    errorElement.style.display = "none";
  } else if (inputValue.length < minLength) {
    // Input is too short, display an error message
    errorElement.innerText = "Phone number is too short, minimum length should be 8.";
    errorElement.style.display = "block";
  } else {
    errorElement.innerText = "";
    errorElement.style.display = "none";
  }

  if (inputValue.length > maxLength) {
    phoneNumber.value = inputValue.slice(0, maxLength);
  }
};

export const submitBusinessDetails = async () => {
  var personName = document.getElementById("personName").value;
  var businessName = document.getElementById("businessName").value;
  var countryCode = document.getElementById("countryCode").value;
  var countryName = document.getElementById("countryName").value;
  var phoneNumber = document.getElementById("phoneNumber").value;

  var span = document.getElementById("errorMessage");
  if (personName == "" && businessName == "" && countryCode == "" && countryName == "" && phoneNumber == "") {
    span.style.display = "block";
    span.innerText = "Please fill the form to continue.";
  } else if (personName === "") {
    span.style.display = "block";
    span.innerText = "Person's Name must not be empty.";
  } else if (businessName === "") {
    span.style.display = "block";
    span.innerText = "Business Name must not be empty.";
  } else if (countryCode === "") {
    span.style.display = "block";
    span.innerText = "Country Code must not be empty.";
  } else if (countryName === "") {
    span.style.display = "block";
    span.innerText = "Country Name must not be empty.";
  } else if (phoneNumber === "") {
    span.style.display = "block";
    span.innerText = "Phone Number must not be empty.";
  } else {
    try {
      document.getElementById("buttonText").style.display = "none";
      document.getElementById("buttonLoader").style.display = "flex";

      const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/SignupRoutes/updatecognitoattributes", {
        params: {
          email: sessionStorage.getItem("lastemail"),
          personName: personName,
          businessName: businessName,
          countryCode: countryCode,
          countryName: countryName,
          phoneNumber: phoneNumber,
        },
      });
      let obj = response.data;
      if (obj.ResponseMetadata.HTTPStatusCode == 200) {
        span.style.display = "block";
        span.innerText = "";
        span.style.color = "green";
        document.getElementById("buttonText").style.display = "flex";
        document.getElementById("buttonLoader").style.display = "none";

        setTimeout(() => {
          window.location.href = "/account-setup";
        }, 2000);
      } else if (obj.errorCode) {
        span.style.display = "block";
        span.innerText = obj.errorCode;
        span.style.color = "brown";
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
    }
  }
};
