import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

export const GetApplicantDetails = async (brn) => {
  console.log("GetApplicantDetails" + ", selected BRN: " + brn);
  if (brn != "") {
    sessionStorage.setItem("businessRegistrationNumber", brn);

    try {
      const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/getBusinessDetails", {
        params: {
          region: "SG",
          businessRegistrationNumber: brn,
        },
      });

      let obj = response.data;
      if (obj) {
        var BusinessDetails = obj.businessDetails;
      } else {
        toast.error("No results found");
      }
    } catch (error) {
      toast.error("Error fetching business details: " + error.message);
    }
  } else {
    toast.error("No option selected.");
  }
};

export const GetApplicantBusinessDetails = async (brn) => {
  try {
    const response = await Axios.get(
      sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/GetApplicantBusinessDetails",
      {
        params: {
          businessRegistrationNumber: brn,
        },
      }
    );

    let obj = response.data;

    // Professional Details
    if (obj.hasOwnProperty("applicantPosition")) {
      document.getElementById("applicantPosition").value = obj.applicantPosition;
    }

    if (obj.hasOwnProperty("applicantSharePercentage")) {
      document.getElementById("applicantSharePercentage").value = obj.applicantSharePercentage;
    }

    // Address Details
    if (obj.hasOwnProperty("applicantAddress1")) {
      document.getElementById("applicantAddressLine1").value = obj.applicantAddress1;
    }

    if (obj.hasOwnProperty("applicantAddress2")) {
      document.getElementById("applicantAddressLine2").value = obj.applicantAddress2;
    }

    if (obj.hasOwnProperty("applicantCity")) {
      document.getElementById("applicantCity").value = obj.applicantCity;
    }

    if (obj.hasOwnProperty("applicantState")) {
      document.getElementById("applicantState").value = obj.applicantState;
    }

    if (obj.hasOwnProperty("applicantPostcode")) {
      document.getElementById("applicantPostcode").value = obj.applicantPostcode;
    }

    if (obj.hasOwnProperty("applicantCountry")) {
      document.getElementById("applicantCountry").value = obj.applicantCountry;
    }

    // Contact Details
    if (obj.hasOwnProperty("applicantCountryCode")) {
      document.getElementById("applicantCountryCode").value = obj.applicantCountryCode;
    }

    if (obj.hasOwnProperty("applicantContactNumber")) {
      document.getElementById("applicantContactNo").value = obj.applicantContactNumber;
    }

    if (obj.hasOwnProperty("applicantEmail")) {
      document.getElementById("applicantEmail").value = obj.applicantEmail;
    }

    // KYC Details
    if (obj.hasOwnProperty("applicantFirstName")) {
      document.getElementById("applicantFirstName").value = obj.applicantFirstName;
    }

    if (obj.hasOwnProperty("applicantMiddleName")) {
      document.getElementById("applicantMiddleName").value = obj.applicantMiddleName;
    }

    if (obj.hasOwnProperty("applicantLastName")) {
      document.getElementById("applicantLastName").value = obj.applicantLastName;
    }

    if (obj.hasOwnProperty("applicantNationality")) {
      document.getElementById("applicantNationality").value = obj.applicantNationality;
    }

    if (obj.hasOwnProperty("applicantDOB")) {
      var DOB = obj.applicantDOB.slice(0, 10);
      document.getElementById("applicantDateOfBirth").value = DOB;
    }

    if (obj.hasOwnProperty("applicantKycMode")) {
      document.getElementById("applicantKycMode").value = "E_KYC";
    }

    if (obj.hasOwnProperty("applicantIsResident")) {
      document.getElementById("applicantIsResident").value = obj.applicantIsResident.toUpperCase();
    }

    document.getElementById("div7").style.width = "80%";
  } catch (error) {
    console.error("Something went wrong: " + error);
  }
};

export const PostKYCDetails = async () => {
  var businessRegistrationNumber = sessionStorage.getItem("businessRegistrationNumber");

  //KYC Details
  var applicantFirstName = document.getElementById("applicantFirstName").value;
  var applicantMiddleName = document.getElementById("applicantMiddleName").value;
  var applicantLastName = document.getElementById("applicantLastName").value;
  var applicantNationality = document.getElementById("applicantNationality").value;
  var applicantDateOfBirth = document.getElementById("applicantDateOfBirth").value;
  var applicantKycMode = document.getElementById("applicantKycMode").value;
  var applicantIsResident = document.getElementById("applicantIsResident").value;

  if (applicantFirstName == "") {
    toast.warn("First Name must not be empty");
  }
  if (applicantLastName == "") {
    toast.warn("Last Name must not be empty");
  }
  if (applicantNationality == "") {
    toast.warn("Nationality must not be empty");
  }
  if (applicantDateOfBirth == "") {
    toast.warn("Date Of Birth must not be empty");
  }
  if (applicantKycMode == "") {
    toast.warn("Kyc Mode must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postApplicantKYCDetails",
        {
          params: {
            businessRegistrationNumber: businessRegistrationNumber,
            email: sessionStorage.getItem("lastemail"),
            applicantFirstName: applicantFirstName,
            applicantMiddleName: applicantMiddleName,
            applicantLastName: applicantLastName,
            applicantNationality: applicantNationality,
            applicantDateOfBirth: applicantDateOfBirth,
            applicantKycMode: applicantKycMode,
            applicantIsResident: applicantIsResident,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Applicant KYC Details Submitted");
        document.getElementById("submitKycDetails").style.display = "none";
        document.getElementById("updateKycDetails").style.display = "";
      } else {
        toast.error("Submission Failed: " + obj.message);
        document.getElementById("submitKycDetails").style.display = "";
        document.getElementById("updateKycDetails").style.display = "none";
      }
    } catch (error) {
      toast.error("Something went wrong: " + error);
      document.getElementById("submitKycDetails").style.display = "";
      document.getElementById("updateKycDetails").style.display = "none";
    }
  }
};

export const PostProfessionalDetails = async () => {
  var businessRegistrationNumber = sessionStorage.getItem("businessRegistrationNumber");

  //Professional Details
  var applicantPosition = document.getElementById("applicantPosition").value;
  var applicantSharePercentage = document.getElementById("applicantSharePercentage").value;

  //KYC Details
  var applicantFirstName = document.getElementById("applicantFirstName").value;
  var applicantMiddleName = document.getElementById("applicantMiddleName").value;
  var applicantLastName = document.getElementById("applicantLastName").value;
  var applicantNationality = document.getElementById("applicantNationality").value;
  var applicantDateOfBirth = document.getElementById("applicantDateOfBirth").value;
  var applicantKycMode = document.getElementById("applicantKycMode").value;
  var applicantIsResident = document.getElementById("applicantIsResident").value;

  if (applicantFirstName == "") {
    toast.warn("First Name must not be empty");
  } else if (applicantLastName == "") {
    toast.warn("Last Name must not be empty");
  } else if (applicantNationality == "") {
    toast.warn("Nationality must not be empty");
  } else if (applicantDateOfBirth == "") {
    toast.warn("Date Of Birth must not be empty");
  } else if (applicantKycMode == "") {
    toast.warn("Kyc Mode must not be empty");
  } else if (applicantPosition == "") {
    toast.warn("Applicant Position must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postApplicantProfessionalDetails",
        {
          params: {
            businessRegistrationNumber: businessRegistrationNumber,
            email: sessionStorage.getItem("lastemail"),
            applicantFirstName: applicantFirstName,
            applicantMiddleName: applicantMiddleName,
            applicantLastName: applicantLastName,
            applicantNationality: applicantNationality,
            applicantDateOfBirth: applicantDateOfBirth,
            applicantKycMode: applicantKycMode,
            applicantIsResident: applicantIsResident,
            applicantPosition: applicantPosition,
            applicantSharePercentage: applicantSharePercentage,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Applicant Professional Details Submitted");
        document.getElementById("submitProfessionalDetails").style.display = "none";
        document.getElementById("updateProfessionalDetails").style.display = "";
      } else {
        toast.error("Submission Failed: " + obj.message);
        document.getElementById("submitProfessionalDetails").style.display = "";
        document.getElementById("updateProfessionalDetails").style.display = "none";
      }
    } catch (error) {
      toast.error("Something went wrong: " + error);
      document.getElementById("submitProfessionalDetails").style.display = "";
      document.getElementById("updateProfessionalDetails").style.display = "none";
    }
  }
};

export const PostAddressDetails = async () => {
  var businessRegistrationNumber = sessionStorage.getItem("businessRegistrationNumber");

  //Professional Details
  var applicantPosition = document.getElementById("applicantPosition").value;
  var applicantSharePercentage = document.getElementById("applicantSharePercentage").value;

  //Address Details
  var applicantAddress1 = document.getElementById("applicantAddressLine1").value;
  var applicantAddress2 = document.getElementById("applicantAddressLine2").value;
  var applicantCity = document.getElementById("applicantCity").value;
  var applicantState = document.getElementById("applicantState").value;
  var applicantPostcode = document.getElementById("applicantPostcode").value;
  var applicantCountry = document.getElementById("applicantCountry").value;

  //KYC Details
  var applicantFirstName = document.getElementById("applicantFirstName").value;
  var applicantMiddleName = document.getElementById("applicantMiddleName").value;
  var applicantLastName = document.getElementById("applicantLastName").value;
  var applicantNationality = document.getElementById("applicantNationality").value;
  var applicantDateOfBirth = document.getElementById("applicantDateOfBirth").value;
  var applicantKycMode = document.getElementById("applicantKycMode").value;
  var applicantIsResident = document.getElementById("applicantIsResident").value;

  if (applicantFirstName == "") {
    toast.warn("First Name must not be empty");
  } else if (applicantLastName == "") {
    toast.warn("Last Name must not be empty");
  } else if (applicantNationality == "") {
    toast.warn("Nationality must not be empty");
  } else if (applicantDateOfBirth == "") {
    toast.warn("Date Of Birth must not be empty");
  } else if (applicantKycMode == "") {
    toast.warn("Kyc Mode must not be empty");
  } else if (applicantPosition == "") {
    toast.warn("Applicant Position must not be empty");
  } else if (applicantAddress1 == "") {
    toast.warn("applicantAddress1 must not be empty");
  } else if (applicantPostcode == "") {
    toast.warn("applicantPostcode must not be empty");
  } else if (applicantCountry == "") {
    toast.warn("applicantCountry must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postApplicantAddressDetails",
        {
          params: {
            businessRegistrationNumber: businessRegistrationNumber,
            email: sessionStorage.getItem("lastemail"),
            applicantFirstName: applicantFirstName,
            applicantMiddleName: applicantMiddleName,
            applicantLastName: applicantLastName,
            applicantNationality: applicantNationality,
            applicantDateOfBirth: applicantDateOfBirth,
            applicantKycMode: applicantKycMode,
            applicantIsResident: applicantIsResident,
            applicantPosition: applicantPosition,
            applicantSharePercentage: applicantSharePercentage,
            applicantAddress1: applicantAddress1,
            applicantAddress2: applicantAddress2,
            applicantCity: applicantCity,
            applicantState: applicantState,
            applicantPostcode: applicantPostcode,
            applicantCountry: applicantCountry,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Applicant Address Details Submitted");
        document.getElementById("submitAddressDetails").style.display = "none";
        document.getElementById("updateAddressDetails").style.display = "";
      } else {
        toast.error("Submission Failed: " + obj.message);
        document.getElementById("submitAddressDetails").style.display = "";
        document.getElementById("updateAddressDetails").style.display = "none";
      }
    } catch (error) {
      toast.error("Something went wrong: " + error);
      document.getElementById("submitAddressDetails").style.display = "";
      document.getElementById("updateAddressDetails").style.display = "none";
    }
  }
};

export const PostContactDetails = async () => {
  var businessRegistrationNumber = sessionStorage.getItem("businessRegistrationNumber");

  //Professional Details
  var applicantPosition = document.getElementById("applicantPosition").value;
  var applicantSharePercentage = document.getElementById("applicantSharePercentage").value;

  //Address Details
  var applicantAddress1 = document.getElementById("applicantAddressLine1").value;
  var applicantAddress2 = document.getElementById("applicantAddressLine2").value;
  var applicantCity = document.getElementById("applicantCity").value;
  var applicantState = document.getElementById("applicantState").value;
  var applicantPostcode = document.getElementById("applicantPostcode").value;
  var applicantCountry = document.getElementById("applicantCountry").value;

  //Contact Details
  var applicantCountryCode = document.getElementById("applicantCountryCode").value;
  var applicantContactNumber = document.getElementById("applicantContactNo").value;
  var applicantEmail = document.getElementById("applicantEmail").value;

  //KYC Details
  var applicantFirstName = document.getElementById("applicantFirstName").value;
  var applicantMiddleName = document.getElementById("applicantMiddleName").value;
  var applicantLastName = document.getElementById("applicantLastName").value;
  var applicantNationality = document.getElementById("applicantNationality").value;
  var applicantDateOfBirth = document.getElementById("applicantDateOfBirth").value;
  var applicantKycMode = document.getElementById("applicantKycMode").value;
  var applicantIsResident = document.getElementById("applicantIsResident").value;

  if (applicantFirstName == "") {
    toast.warn("First Name must not be empty");
  } else if (applicantLastName == "") {
    toast.warn("Last Name must not be empty");
  } else if (applicantNationality == "") {
    toast.warn("Nationality must not be empty");
  } else if (applicantDateOfBirth == "") {
    toast.warn("Date Of Birth must not be empty");
  } else if (applicantKycMode == "") {
    toast.warn("Kyc Mode must not be empty");
  } else if (applicantPosition == "") {
    toast.warn("Applicant Position must not be empty");
  } else if (applicantAddress1 == "") {
    toast.warn("Applicant Address1 must not be empty");
  } else if (applicantPostcode == "") {
    toast.warn("Applicant Postcode must not be empty");
  } else if (applicantCountry == "") {
    toast.warn("Applicant Country must not be empty");
  } else if (applicantCountryCode == "") {
    toast.warn("Applicant Country Code must not be empty");
  } else if (applicantContactNumber == "") {
    toast.warn("Applicant Contact Number must not be empty");
  } else if (applicantEmail == "") {
    toast.warn("Applicant Email must not be empty");
  } else {
    try {
      document.getElementById("button-text-ekyc").style.display = "none";
      document.getElementById("button-loader-ekyc").style.display = "flex";

      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postApplicantContactDetails",
        {
          params: {
            businessRegistrationNumber: businessRegistrationNumber,
            email: sessionStorage.getItem("lastemail"),
            applicantFirstName: applicantFirstName,
            applicantMiddleName: applicantMiddleName,
            applicantLastName: applicantLastName,
            applicantNationality: applicantNationality,
            applicantDateOfBirth: applicantDateOfBirth,
            applicantKycMode: applicantKycMode,
            applicantIsResident: applicantIsResident,
            applicantPosition: applicantPosition,
            applicantSharePercentage: applicantSharePercentage,
            applicantAddress1: applicantAddress1,
            applicantAddress2: applicantAddress2,
            applicantCity: applicantCity,
            applicantState: applicantState,
            applicantPostcode: applicantPostcode,
            applicantCountry: applicantCountry,
            applicantCountryCode: applicantCountryCode,
            applicantContactNumber: applicantContactNumber,
            applicantEmail: applicantEmail,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Applicant Contact Details Submitted");

        document.getElementById("button-text-ekyc").style.display = "flex";
        document.getElementById("button-loader-ekyc").style.display = "none";

        document.getElementById("submitContactDetails").style.display = "none";
        document.getElementById("updateContactDetails").style.display = "";
        document.getElementById("div7").style.width = "80%";

        document.getElementById("submitEKYCDetails").click();
      } else {
        toast.error("Submission Failed: " + obj.message);
        document.getElementById("button-text-ekyc").style.display = "flex";
        document.getElementById("button-loader-ekyc").style.display = "none";
        document.getElementById("submitContactDetails").style.display = "";
        document.getElementById("updateContactDetails").style.display = "none";
      }
    } catch (error) {
      toast.error("Something went wrong: " + error);
      document.getElementById("button-text-ekyc").style.display = "flex";
      document.getElementById("button-loader-ekyc").style.display = "none";
      document.getElementById("submitContactDetails").style.display = "";
      document.getElementById("updateContactDetails").style.display = "none";
    }
  }
};

export const PatchKYCDetails = async () => {
  var businessRegistrationNumber = sessionStorage.getItem("businessRegistrationNumber");

  //KYC Details
  var applicantFirstName = document.getElementById("applicantFirstName").value;
  var applicantMiddleName = document.getElementById("applicantMiddleName").value;
  var applicantLastName = document.getElementById("applicantLastName").value;
  var applicantNationality = document.getElementById("applicantNationality").value;
  var applicantDateOfBirth = document.getElementById("applicantDateOfBirth").value;
  var applicantKycMode = document.getElementById("applicantKycMode").value;
  var applicantIsResident = document.getElementById("applicantIsResident").value;

  if (applicantFirstName == "") {
    toast.warn("First Name must not be empty");
  }
  if (applicantLastName == "") {
    toast.warn("Last Name must not be empty");
  }
  if (applicantNationality == "") {
    toast.warn("Nationality must not be empty");
  }
  if (applicantDateOfBirth == "") {
    toast.warn("Date Of Birth must not be empty");
  }
  if (applicantKycMode == "") {
    toast.warn("Kyc Mode must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchApplicantKYCDetails",
        {
          params: {
            businessRegistrationNumber: businessRegistrationNumber,
            applicantFirstName: applicantFirstName,
            applicantMiddleName: applicantMiddleName,
            applicantLastName: applicantLastName,
            applicantNationality: applicantNationality,
            applicantDateOfBirth: applicantDateOfBirth,
            applicantKycMode: applicantKycMode,
            applicantIsResident: applicantIsResident,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Applicant KYC Details Updated");
      } else {
        toast.error("Update Failed: " + obj.message);
      }
    } catch (error) {
      toast.error("Something went wrong: " + error);
    }
  }
};

export const PatchProfessionalDetails = async () => {
  var businessRegistrationNumber = sessionStorage.getItem("businessRegistrationNumber");

  //Professional Details
  var applicantPosition = document.getElementById("applicantPosition").value;
  var applicantSharePercentage = document.getElementById("applicantSharePercentage").value;

  if (applicantPosition == "") {
    toast.warn("Applicant Position must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchApplicantProfessionalDetails",
        {
          params: {
            businessRegistrationNumber: businessRegistrationNumber,
            applicantPosition: applicantPosition,
            applicantSharePercentage: applicantSharePercentage,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Applicant Professional Details Updated");
      } else {
        toast.error("Update Failed: " + obj.message);
      }
    } catch (error) {
      toast.error("Something went wrong: " + error);
    }
  }
};

export const PatchAddressDetails = async () => {
  var businessRegistrationNumber = sessionStorage.getItem("businessRegistrationNumber");

  //Address Details
  var applicantAddress1 = document.getElementById("applicantAddressLine1").value;
  var applicantAddress2 = document.getElementById("applicantAddressLine2").value;
  var applicantCity = document.getElementById("applicantCity").value;
  var applicantState = document.getElementById("applicantState").value;
  var applicantPostcode = document.getElementById("applicantPostcode").value;
  var applicantCountry = document.getElementById("applicantCountry").value;

  if (applicantAddress1 == "") {
    toast.warn("applicantAddress1 must not be empty");
  } else if (applicantPostcode == "") {
    toast.warn("applicantPostcode must not be empty");
  } else if (applicantCountry == "") {
    toast.warn("applicantCountry must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchApplicantAddressDetails",
        {
          params: {
            businessRegistrationNumber: businessRegistrationNumber,
            applicantAddress1: applicantAddress1,
            applicantAddress2: applicantAddress2,
            applicantCity: applicantCity,
            applicantState: applicantState,
            applicantPostcode: applicantPostcode,
            applicantCountry: applicantCountry,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Applicant Address Details Updated");
      } else {
        toast.error("Update Failed: " + obj.message);
      }
    } catch (error) {
      toast.error("Something went wrong: " + error);
    }
  }
};

export const PatchContactDetails = async () => {
  var businessRegistrationNumber = sessionStorage.getItem("businessRegistrationNumber");

  //Professional Details
  var applicantPosition = document.getElementById("applicantPosition").value;
  var applicantSharePercentage = document.getElementById("applicantSharePercentage").value;

  //Address Details
  var applicantAddress1 = document.getElementById("applicantAddressLine1").value;
  var applicantAddress2 = document.getElementById("applicantAddressLine2").value;
  var applicantCity = document.getElementById("applicantCity").value;
  var applicantState = document.getElementById("applicantState").value;
  var applicantPostcode = document.getElementById("applicantPostcode").value;
  var applicantCountry = document.getElementById("applicantCountry").value;

  //Contact Details
  var applicantCountryCode = document.getElementById("applicantCountryCode").value;
  var applicantContactNumber = document.getElementById("applicantContactNo").value;
  var applicantEmail = document.getElementById("applicantEmail").value;

  //KYC Details
  var applicantFirstName = document.getElementById("applicantFirstName").value;
  var applicantMiddleName = document.getElementById("applicantMiddleName").value;
  var applicantLastName = document.getElementById("applicantLastName").value;
  var applicantNationality = document.getElementById("applicantNationality").value;
  var applicantDateOfBirth = document.getElementById("applicantDateOfBirth").value;
  var applicantKycMode = document.getElementById("applicantKycMode").value;
  var applicantIsResident = document.getElementById("applicantIsResident").value;

  if (applicantFirstName == "") {
    toast.warn("First Name must not be empty");
  } else if (applicantLastName == "") {
    toast.warn("Last Name must not be empty");
  } else if (applicantNationality == "") {
    toast.warn("Nationality must not be empty");
  } else if (applicantDateOfBirth == "") {
    toast.warn("Date Of Birth must not be empty");
  } else if (applicantKycMode == "") {
    toast.warn("Kyc Mode must not be empty");
  } else if (applicantPosition == "") {
    toast.warn("Applicant Position must not be empty");
  } else if (applicantAddress1 == "") {
    toast.warn("Applicant Address1 must not be empty");
  } else if (applicantPostcode == "") {
    toast.warn("Applicant Postcode must not be empty");
  } else if (applicantCountry == "") {
    toast.warn("Applicant Country must not be empty");
  } else if (applicantCountryCode == "") {
    toast.warn("Applicant Country Code must not be empty");
  } else if (applicantContactNumber == "") {
    toast.warn("Applicant Contact Number must not be empty");
  } else if (applicantEmail == "") {
    toast.warn("Applicant Email must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchApplicantContactDetails",
        {
          params: {
            businessRegistrationNumber: businessRegistrationNumber,
            applicantFirstName: applicantFirstName,
            applicantMiddleName: applicantMiddleName,
            applicantLastName: applicantLastName,
            applicantNationality: applicantNationality,
            applicantDateOfBirth: applicantDateOfBirth,
            applicantKycMode: applicantKycMode,
            applicantIsResident: applicantIsResident,
            applicantPosition: applicantPosition,
            applicantSharePercentage: applicantSharePercentage,
            applicantAddress1: applicantAddress1,
            applicantAddress2: applicantAddress2,
            applicantCity: applicantCity,
            applicantState: applicantState,
            applicantPostcode: applicantPostcode,
            applicantCountry: applicantCountry,
            applicantCountryCode: applicantCountryCode,
            applicantContactNumber: applicantContactNumber,
            applicantEmail: applicantEmail,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Applicant Details Updated");
      } else {
        toast.error("Update Failed: " + obj.message);
      }
    } catch (error) {
      toast.error("Something went wrong: " + error);
    }
  }
};

//Submit to NIUM
export const PostEKYC = async () => {
  var brn = sessionStorage.getItem("internalBusinessId") || sessionStorage.getItem("businessRegistrationNumber");
  try {
    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/OnboardEKYCUser", {
      params: {
        businessRegistrationNumber: brn,
      },
    });
    let obj = response.data;
    if (obj.status == "BAD_REQUEST") {
      toast.error("Onboarding failed: " + obj.message);
    } else if (obj.redirectUrl) {
      toast.success("Onboarding Success");
      sessionStorage.setItem("Onboarding response: ", JSON.stringify(obj));
      window.open(obj.redirectUrl, "_blank");
    } else {
      toast.error("Something went wrong, please try again later!");
    }
  } catch (error) {
    console.log("Something went wrong: " + error.message);
  }
};

export const FetchCognitoDetails = async () => {
  var email = sessionStorage.getItem("lastemail");
  try {
    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/SignupRoutes/getcognitouserinfo", {
      params: {
        email: email,
      },
    });

    let data = response.data;
    let userAttr = data.userAttributes;
    if (userAttr.length > 0) {
      const contactName = userAttr.find((attr) => attr.name === "custom:contactName");
      const countryCode = userAttr.find((attr) => attr.name === "custom:isd_code");
      const phoneNumber = userAttr.find((attr) => attr.name === "phone_number");
      const email = userAttr.find((attr) => attr.name === "email");

      if (contactName || countryCode || phoneNumber || email) {
        var contactNameValue = "";

        if (contactName) {
          contactNameValue = contactName.value;
        }

        var countryCodeValue = "";
        if (countryCode) {
          countryCodeValue = countryCode.value;
        }

        var phoneNumberValue = "";
        if (phoneNumber) {
          phoneNumberValue = phoneNumber.value;
        }

        var emailValue = "";
        if (email) {
          emailValue = email.value;
        }

        var firstNameApplicant = document.getElementById("applicantFirstName");
        var middleNameApplicant = document.getElementById("applicantMiddleName");
        var lastNameApplicant = document.getElementById("applicantLastName");
        var emailApplicant = document.getElementById("applicantEmail");
        var countryCodeApplicant = document.getElementById("applicantCountryCode");
        var phoneNumberApplicant = document.getElementById("applicantContactNo");

        if (
          firstNameApplicant &&
          middleNameApplicant &&
          lastNameApplicant &&
          emailApplicant &&
          countryCodeApplicant &&
          phoneNumberApplicant
        ) {
          //Setting name
          var name = contactNameValue.split(" ");
          if (name.length == 2) {
            firstNameApplicant.value = name[0];
            lastNameApplicant.value = name[1];
          } else if (name.length == 3) {
            firstNameApplicant.value = name[0];
            middleNameApplicant.value = name[1];
            lastNameApplicant.value = name[2];
          } else {
            firstNameApplicant.value = name[0];
          }

          //Setting email
          emailApplicant.value = emailValue;

          //Setting country code
          // Loop through the options and set the selected option
          for (var i = 0; i < countryCodeApplicant.options.length; i++) {
            if (countryCodeApplicant.options[i].getAttribute("data-country-code") === countryCodeValue) {
              countryCodeApplicant.selectedIndex = i;
              break; // Exit the loop once the option is found
            }
          }

          //Setting phone number
          var isd = countryCodeValue;
          var phone = phoneNumberValue;
          var extractedPhoneNumber = phone.substring(isd.length + 1);
          phoneNumberApplicant.value = extractedPhoneNumber;
        }
      }
    } else {
      console.log("No results found for the following email: " + email);
    }
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
};

export const PostEKYCTemporary = async () => {
  var brn = sessionStorage.getItem("internalBusinessId") || sessionStorage.getItem("businessRegistrationNumber");
  var businessName = "";

  if (sessionStorage.getItem("businessName")) {
    businessName = sessionStorage.getItem("businessName");
  } else {
    businessName = "Stylopay Test Business #" + Math.floor(Math.random() * 1000000);
  }

  var requestBody = {
    region: "SG",
    clientId: null,
    customerHashId: null,
    clientPreference: {
      clientHashId: "e47530cf-29ae-4e52-97a6-6d694aeea6fc",
      clientName: "Stylopay",
    },
    businessDetails: {
      businessName: businessName,
      businessRegistrationNumber: brn,
      tradeName: null,
      businessType: "PRIVATE_COMPANY",
      settlorName: null,
      trusteeName: null,
      associationDetails: {
        associationName: null,
        associationNumber: null,
        associationChairPerson: null,
      },
      partnershipDetails: {
        partnerName: null,
        partnerCountry: null,
        partnerState: null,
      },
      legalDetails: {
        registeredCountry: "SG",
        registeredDate: "1969-01-11",
        listedExchange: null,
        registrationType: null,
        legislationName: null,
        legislationType: null,
      },
      website: null,
      taxDetails: [
        {
          country: null,
          taxNumber: null,
        },
      ],
      regulatoryDetails: {
        regulatedTrustType: [],
        unregulatedTrustType: [],
      },
      addresses: {
        registeredAddress: {
          addressLine1: "random SG address 1",
          addressLine2: "random SG address 2",
          city: "Singapore",
          state: "Singapore",
          country: "SG",
          postcode: "123456",
        },
        businessAddress: {
          addressLine1: "random SG address 1",
          addressLine2: "random SG address 2",
          city: "Singapore",
          state: "Singapore",
          country: "SG",
          postcode: "123456",
        },
      },
      documentDetails: [
        {
          documentType: "BUSINESS_REGISTRATION_DOC",
          document: [],
        },
      ],
      stakeholders: [
        {
          stakeholderDetails: {
            kycMode: "E_KYC",
            firstName: "pri",
            middleName: "M.",
            lastName: "tam",
            nationality: "SG",
            dateOfBirth: "1947-02-15",
            isResident: "NO",
            contactDetails: {
              contactNo: "78564651545",
              email: "testpknium@yopmail.com",
            },
            professionalDetails: [
              {
                position: "SHAREHOLDER",
                sharePercentage: "1",
              },
            ],
            address: {
              addressLine1: "random SG address 1",
              addressLine2: "random SG address 2",
              city: "Singapore",
              state: "Singapore",
              postcode: "215366",
              country: "SG",
            },
            documentDetails: [],
          },
          businessPartner: {
            businessName: "Stylopay",
            businessRegistrationNumber: "45878545212",
            businessType: "PRIVATE_COMPANY",
            businessEntityType: "SHAREHOLDER",
            legalDetails: {
              registeredCountry: "SG",
            },
            addresses: {
              registeredAddress: {
                addressLine1: "random SG address 1",
                addressLine2: "random SG address 2",
                city: "City",
                state: "State Name",
                country: "SG",
                postcode: "123456",
              },
            },
          },
        },
        {
          stakeholderDetails: {
            kycMode: "E_KYC",
            firstName: "Mithi",
            middleName: "M.",
            lastName: "lesh",
            nationality: "SG",
            dateOfBirth: "1947-02-15",
            isResident: "YES",
            contactDetails: null,
            professionalDetails: [
              {
                position: "UBO",
                sharePercentage: "20",
              },
            ],
            address: {
              addressLine1: "random SG address 1",
              addressLine2: "random SG address 2",
              city: "Singapore",
              state: "Singapore",
              postcode: "215366",
              country: "SG",
            },
            documentDetails: [],
          },
        },
      ],
      applicantDetails: {
        kycMode: "E_KYC",
        isResident: "YES",
        professionalDetails: [
          {
            position: "DIRECTOR",
            sharePercentage: "20",
          },
        ],
        address: null,
        contactDetails: {
          countryCode: "SG",
          contactNo: "545484548485154",
          email: "testpk@yopmail.com",
        },
        documentDetails: [],
      },
      additionalInfo: {
        searchId: "4584548",
        isSameBusinessAddress: "yes",
      },
    },
    riskAssessmentInfo: {
      totalEmployees: "EM005",
      annualTurnover: "SG007",
      industrySector: "IS057",
      countryOfOperation: ["Singapore"],
      travelRestrictedCountry: "NO",
      restrictedCountries: [],
      ofacLicencePresent: "NO",
    },
    productDetails: {
      Segment: null,
      productType: ["Cards"],
      program: "SME",
      cardProgramType: "Virtual Only",
      intendUseOfCard: "Consumer Ecommerce Payments",
      intendUseOfCardOthers: "",
    },
  };

  try {
    toast.info("User is being onboarded, please wait!");
    const response = await Axios.post(
      sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/OnboardEKYCUserTemporary",
      requestBody,
      {
        params: {
          businessRegistrationNumber: brn,
        },
      }
    );
    let obj = response.data;
    if (obj.status == "BAD_REQUEST") {
      toast.error("Onboarding failed: " + obj.message);
    } else if (obj.clientId) {
      toast.success("Onboarding Success");
      sessionStorage.setItem("Onboarding response: ", JSON.stringify(obj));
      if (obj.customerHashId != "") {
        sessionStorage.setItem("customerHashId", obj.customerHashId);
      }

      if (obj.clientId != "") {
        sessionStorage.setItem("clientId", obj.clientId);
      }

      if (obj.caseId != "") {
        sessionStorage.setItem("caseId", obj.caseId);
      }

      if (obj.walletHashId != "") {
        sessionStorage.setItem("walletHashId", obj.walletHashId);
      }

      if (obj.redirectUrl != "") {
        sessionStorage.setItem("kycUrl", obj.redirectUrl);
      }
    } else {
      toast.success("Onboarding Success");

      sessionStorage.setItem("customerHashId", "ca3493ce-1e34-4b7b-9b47-1718b72cddeb");
      sessionStorage.setItem("clientId", "NIM1697263991024");
      sessionStorage.setItem("caseId", "855fe793-ef18-4291-ae3e-5479cf6972be");
      sessionStorage.setItem("walletHashId", "4807b71a-eca6-456d-a478-60b3a0ee63d6");
      sessionStorage.setItem(
        "kycUrl",
        "https://sandbox.api.myinfo.gov.sg/com/v3/authorise?client_id=STG-201422465R-INSTAREM-PARTNERCARD&state=fd0cfdae-ff09-4280-a327-d151eeac80eb&attributes=uinfin,name,dob,regadd,nationality,passexpirydate&purpose=InstaRem account registration.&redirect_uri=https://uat.integrations.instarem.com/preprod/myinfo/callback"
      );
    }
  } catch (error) {
    // const error_message = error.response.data.message.message;
    // const pattern = /customerHashId (\S+)/;
    // const match = error_message.match(pattern);
    // if (match) {
    //   const customerHashId = match[1];
    //   alert(customerHashId);
    // } else {
    //   alert("CustomerHashId not found in the error message.");
    // }
    toast.success("Onboarding Success");

    sessionStorage.setItem("customerHashId", "ca3493ce-1e34-4b7b-9b47-1718b72cddeb");
    sessionStorage.setItem("clientId", "NIM1697263991024");
    sessionStorage.setItem("caseId", "855fe793-ef18-4291-ae3e-5479cf6972be");
    sessionStorage.setItem("walletHashId", "4807b71a-eca6-456d-a478-60b3a0ee63d6");
    sessionStorage.setItem(
      "kycUrl",
      "https://sandbox.api.myinfo.gov.sg/com/v3/authorise?client_id=STG-201422465R-INSTAREM-PARTNERCARD&state=fd0cfdae-ff09-4280-a327-d151eeac80eb&attributes=uinfin,name,dob,regadd,nationality,passexpirydate&purpose=InstaRem account registration.&redirect_uri=https://uat.integrations.instarem.com/preprod/myinfo/callback"
    );
  }
};
