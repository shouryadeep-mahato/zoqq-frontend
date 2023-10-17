import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

export const GetKYBDetails = async (brn) => {
  try {
    const businessKyb = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/GetBusinessKYBDetails", {
      params: { brn: brn },
    });

    const stakeholderKyb = await Axios.get(
      sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/GetStakeholderKYBDetails",
      {
        params: { brn: brn },
      }
    );

    const applicantKyb = await Axios.get(
      sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/GetApplicantKYBDetails",
      {
        params: { brn: brn },
      }
    );
    //Business KYB Details
    var businessKybDetails = businessKyb.data;
    if (businessKybDetails.status == "BAD_REQUEST") {
      console.log("Business KYB Details cannot be found: " + businessKybDetails.message);
    } else {
      if (businessKybDetails.hasOwnProperty("documentType")) {
        document.getElementById("businessDocumentType").value = businessKybDetails.documentType;
        document.getElementById("businessKYBFilename").innerText = businessKybDetails.businessDocumentFilename;
        document.getElementById("businessKYBFiletype").innerText =
          "UPLOADED FILETYPE: " + businessKybDetails.businessDocumentType;
      }
    }

    //Stakeholder KYB Details
    var stakeholderKybDetails = stakeholderKyb.data;
    if (stakeholderKybDetails.status == "BAD_REQUEST") {
      console.log("Stakeholder KYB Details cannot be found: " + stakeholderKybDetails.message);
    } else {
    }

    //Applicant KYB Details
    var applicantKybDetails = applicantKyb.data;
    if (applicantKybDetails.status == "BAD_REQUEST") {
      console.log("Applicant KYB Details cannot be found: " + applicantKybDetails.message);
    } else {
      if (applicantKybDetails.hasOwnProperty("documentType")) {
        document.getElementById("applicantDocumentType").value = applicantKybDetails.documentType;
      }
      if (applicantKybDetails.hasOwnProperty("documentNumber")) {
        document.getElementById("applicantDocumentNumber").value = applicantKybDetails.documentNumber;
      }
      if (applicantKybDetails.hasOwnProperty("documentReferenceNumber")) {
        document.getElementById("applicantDocumentReferenceNumber").value = applicantKybDetails.documentReferenceNumber;
      }
      if (applicantKybDetails.hasOwnProperty("documentHolderName")) {
        document.getElementById("applicantDocumentHolderName").value = applicantKybDetails.documentHolderName;
      }
      if (applicantKybDetails.hasOwnProperty("documentIssuanceCountry")) {
        document.getElementById("applicantDocumentIssuanceCountry").value = applicantKybDetails.documentIssuanceCountry;
      }
      if (applicantKybDetails.hasOwnProperty("documentIssuingAuthority")) {
        document.getElementById("applicantDocumentIssuingAuthority").value =
          applicantKybDetails.documentIssuingAuthority;
      }
      if (applicantKybDetails.hasOwnProperty("documentIssuedDate")) {
        document.getElementById("applicantDocumentIssueDate").value = applicantKybDetails.documentIssuedDate;
      }
      if (applicantKybDetails.hasOwnProperty("documentExpiryDate")) {
        document.getElementById("applicantDocumentExpiryDate").value = applicantKybDetails.documentExpiryDate;
      }
    }
  } catch (error) {
    console.log("Error fetching KYB Details: " + error.message);
  }
};

export const PostBusinessKYBDetails = async () => {
  const brn = sessionStorage.getItem("businessRegistrationNumber");
  const businessDocumentType = document.getElementById("businessDocumentType").value;
  const businessDocumentFileInput = document.getElementById("businessDocumentFile");
  const email = sessionStorage.getItem("lastemail");

  if (businessDocumentType === "") {
    toast.warn("Document Type must not be empty");
    return; // Exit early if there's an issue
  }

  const businessDocumentFile = businessDocumentFileInput.files[0];

  if (!businessDocumentFile) {
    toast.warn("Please select a Document File");
    return; // Exit early if there's no file selected
  }

  const businessDocumentFilename = businessDocumentFile.name;
  const businessDocumentFiletype = businessDocumentFile.type;

  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append("businessRegistrationNumber", brn);
  formData.append("email", email);
  formData.append("businessDocumentType", businessDocumentType);
  formData.append("businessDocumentFile", businessDocumentFile);
  formData.append("businessDocumentFilename", businessDocumentFilename);
  formData.append("businessDocumentFiletype", businessDocumentFiletype);

  try {
    const response = await Axios.post(
      sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PostBusinessKYBDetails",
      formData
    );

    const obj = response.data;
    if (obj.status === "SUCCESS") {
      toast.success("Business KYB Details Submitted");
      document.getElementById("submitBusinessKYBDetails").style.display = "none";
      document.getElementById("updateBusinessKYBDetails").style.display = "";
    } else {
      toast.error("Submission failed: " + obj.message);
      document.getElementById("submitBusinessKYBDetails").style.display = "";
      document.getElementById("updateBusinessKYBDetails").style.display = "none";
    }
  } catch (error) {
    console.error("Something went wrong: " + error);
    document.getElementById("submitBusinessKYBDetails").style.display = "";
    document.getElementById("updateBusinessKYBDetails").style.display = "none";
  }
};

export const PostApplicantKYBDetails = async () => {
  const brn = sessionStorage.getItem("businessRegistrationNumber");
  var email = sessionStorage.getItem("lastemail");
  var applicantDocumentType = document.getElementById("applicantDocumentType").value;
  var applicantDocumentNumber = document.getElementById("applicantDocumentNumber").value;
  var applicantDocumentReferenceNumber = document.getElementById("applicantDocumentReferenceNumber").value;
  var applicantDocumentHolderName = document.getElementById("applicantDocumentHolderName").value;
  var applicantDocumentIssuanceCountry = document.getElementById("applicantDocumentIssuanceCountry").value;
  var applicantDocumentIssuingAuthority = document.getElementById("applicantDocumentIssuingAuthority").value;
  var applicantDocumentIssueDate = document.getElementById("applicantDocumentIssueDate").value;
  var applicantDocumentExpiryDate = document.getElementById("applicantDocumentExpiryDate").value;
  var applicantDocumentFile = document.getElementById("applicantDocumentFile").files[0];

  if (applicantDocumentType == "") {
    toast.warn("Applicant Document Type must not be empty");
    return;
  }
  if (applicantDocumentNumber == "") {
    toast.warn("Applicant Document Number must not be empty");
    return;
  }
  if (applicantDocumentReferenceNumber == "") {
    toast.warn("Applicant Document Reference Number must not be empty");
    return;
  }
  if (applicantDocumentHolderName == "") {
    toast.warn("Applicant Document Holder Name must not be empty");
    return;
  }
  if (applicantDocumentIssuanceCountry == "") {
    toast.warn("Applicant Document Issuance Country must not be empty");
    return;
  }
  if (applicantDocumentIssuingAuthority == "") {
    toast.warn("Applicant Document Issuing Authority must not be empty");
    return;
  }
  if (applicantDocumentIssueDate == "") {
    toast.warn("Applicant Document Issue Date must not be empty");
    return;
  }
  if (applicantDocumentExpiryDate == "") {
    toast.warn("Applicant Document Expiry Date must not be empty");
    return;
  }
  if (!applicantDocumentFile) {
    toast.warn("Please Select a Document File");
    return;
  }

  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append("businessRegistrationNumber", brn);
  formData.append("email", email);
  formData.append("applicantDocumentType", applicantDocumentType);
  formData.append("applicantDocumentNumber", applicantDocumentNumber);
  formData.append("applicantDocumentReferenceNumber", applicantDocumentReferenceNumber);
  formData.append("applicantDocumentHolderName", applicantDocumentHolderName);
  formData.append("applicantDocumentIssuanceCountry", applicantDocumentIssuanceCountry);
  formData.append("applicantDocumentIssuingAuthority", applicantDocumentIssuingAuthority);
  formData.append("applicantDocumentIssueDate", applicantDocumentIssueDate);
  formData.append("applicantDocumentExpiryDate", applicantDocumentExpiryDate);
  formData.append("applicantDocumentFile", applicantDocumentFile);

  try {
    const response = await Axios.post(
      sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/ApplicantKYBDetails",
      formData
    );

    const obj = response.data;
    if (obj.status === "SUCCESS") {
      toast.success("Applicant KYB Details Submitted");
      document.getElementById("submitApplicantKYBDetails").style.display = "none";
      document.getElementById("updateApplicantKYBDetails").style.display = "";
    } else {
      toast.error("Submission failed: " + obj.message);
      document.getElementById("submitApplicantKYBDetails").style.display = "";
      document.getElementById("updateApplicantKYBDetails").style.display = "none";
    }
  } catch (error) {
    console.error("Something went wrong: " + error);
    document.getElementById("submitApplicantKYBDetails").style.display = "";
    document.getElementById("updateApplicantKYBDetails").style.display = "none";
  }
};

export const PostStakeholderKYBDetails = async () => {
  const brn = sessionStorage.getItem("businessRegistrationNumber");
  var email = sessionStorage.getItem("lastemail");
  var StakeholderDocumentType = document.getElementById("StakeholderDocumentType").value;
  var StakeholderDocumentNumber = document.getElementById("StakeholderDocumentNumber").value;
  var StakeholderDocumentReferenceNumber = document.getElementById("StakeholderDocumentReferenceNumber").value;
  var StakeholderDocumentHolderName = document.getElementById("StakeholderDocumentHolderName").value;
  var StakeholderDocumentIssuanceCountry = document.getElementById("StakeholderDocumentIssuanceCountry").value;
  var StakeholderDocumentIssuingAuthority = document.getElementById("StakeholderDocumentIssuingAuthority").value;
  var StakeholderDocumentIssueDate = document.getElementById("StakeholderDocumentIssueDate").value;
  var StakeholderDocumentExpiryDate = document.getElementById("StakeholderDocumentExpiryDate").value;
  var StakeholderDocumentFile = document.getElementById("StakeholderDocumentFile").files[0];
  var stakeholderEmail = sessionStorage.getItem("stakeholderemail");

  if (StakeholderDocumentType == "") {
    toast.warn("Stakeholder Document Type must not be empty");
    return;
  }
  if (StakeholderDocumentNumber == "") {
    toast.warn("Stakeholder Document Number must not be empty");
    return;
  }
  if (StakeholderDocumentReferenceNumber == "") {
    toast.warn("Stakeholder Document Reference Number must not be empty");
    return;
  }
  if (StakeholderDocumentHolderName == "") {
    toast.warn("Stakeholder Document Holder Name must not be empty");
    return;
  }
  if (StakeholderDocumentIssuanceCountry == "") {
    toast.warn("Stakeholder Document Issuance Country must not be empty");
    return;
  }
  if (StakeholderDocumentIssuingAuthority == "") {
    toast.warn("Stakeholder Document Issuing Authority must not be empty");
    return;
  }
  if (StakeholderDocumentIssueDate == "") {
    toast.warn("Stakeholder Document Issue Date must not be empty");
    return;
  }
  if (StakeholderDocumentExpiryDate == "") {
    toast.warn("Stakeholder Document Expiry Date must not be empty");
    return;
  }
  if (!StakeholderDocumentFile) {
    toast.warn("Please Select a Document File");
    return;
  }

  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append("businessRegistrationNumber", brn);
  formData.append("email", email);
  formData.append("StakeholderDocumentType", StakeholderDocumentType);
  formData.append("StakeholderDocumentNumber", StakeholderDocumentNumber);
  formData.append("StakeholderDocumentReferenceNumber", StakeholderDocumentReferenceNumber);
  formData.append("StakeholderDocumentHolderName", StakeholderDocumentHolderName);
  formData.append("StakeholderDocumentIssuanceCountry", StakeholderDocumentIssuanceCountry);
  formData.append("StakeholderDocumentIssuingAuthority", StakeholderDocumentIssuingAuthority);
  formData.append("StakeholderDocumentIssueDate", StakeholderDocumentIssueDate);
  formData.append("StakeholderDocumentExpiryDate", StakeholderDocumentExpiryDate);
  formData.append("StakeholderDocumentFile", StakeholderDocumentFile);
  formData.append("stakeholderEmail", stakeholderEmail);

  try {
    const response = await Axios.post(
      sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PostStakeholderKYBDetails",
      formData
    );

    const obj = response.data;
    if (obj.status === "SUCCESS") {
      toast.success("Stakeholder KYB Details Submitted");
      document.getElementById("submitStakeholderKYBDetails").style.display = "none";
      document.getElementById("updateStakeholderKYBDetails").style.display = "";
    } else {
      toast.error("Submission failed: " + obj.message);
      document.getElementById("submitStakeholderKYBDetails").style.display = "";
      document.getElementById("updateStakeholderKYBDetails").style.display = "none";
    }
  } catch (error) {
    console.error("Something went wrong: " + error);
    document.getElementById("submitStakeholderKYBDetails").style.display = "";
    document.getElementById("updateStakeholderKYBDetails").style.display = "none";
  }
};

export const PatchBusinessKYBDetails = async () => {
  const brn = sessionStorage.getItem("businessRegistrationNumber");
  const businessDocumentType = document.getElementById("businessDocumentType").value;
  const businessDocumentFileInput = document.getElementById("businessDocumentFile");
  var businessDocumentFile = null;

  if (businessDocumentFileInput && businessDocumentFileInput.files.length != 0) {
    businessDocumentFile = businessDocumentFileInput.files[0];
  }

  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append("businessRegistrationNumber", brn);
  formData.append("businessDocumentType", businessDocumentType);
  formData.append("businessDocumentFile", businessDocumentFile);

  try {
    const response = await Axios.post(
      sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PatchBusinessKYBDetails",
      formData
    );

    const obj = response.data;
    if (obj.status === "SUCCESS") {
      toast.success("Business KYB Details Updated");
    } else {
      toast.error("Update failed: " + obj.message);
    }
  } catch (error) {
    console.error("Something went wrong: " + error);
  }
};

export const PatchApplicantKYBDetails = async () => {
  const brn = sessionStorage.getItem("businessRegistrationNumber");
  var applicantDocumentType = document.getElementById("applicantDocumentType").value;
  var applicantDocumentNumber = document.getElementById("applicantDocumentNumber").value;
  var applicantDocumentReferenceNumber = document.getElementById("applicantDocumentReferenceNumber").value;
  var applicantDocumentHolderName = document.getElementById("applicantDocumentHolderName").value;
  var applicantDocumentIssuanceCountry = document.getElementById("applicantDocumentIssuanceCountry").value;
  var applicantDocumentIssuingAuthority = document.getElementById("applicantDocumentIssuingAuthority").value;
  var applicantDocumentIssueDate = document.getElementById("applicantDocumentIssueDate").value;
  var applicantDocumentExpiryDate = document.getElementById("applicantDocumentExpiryDate").value;

  var applicantDocumentFile = document.getElementById("applicantDocumentFile");
  var applicantDoc = null;

  if (applicantDocumentFile && applicantDocumentFile.files.length != 0) {
    applicantDoc = applicantDocumentFile.files[0];
  }

  if (applicantDocumentType == "") {
    toast.warn("Applicant Document Type must not be empty");
    return;
  }
  if (applicantDocumentNumber == "") {
    toast.warn("Applicant Document Number must not be empty");
    return;
  }
  if (applicantDocumentReferenceNumber == "") {
    toast.warn("Applicant Document Reference Number must not be empty");
    return;
  }
  if (applicantDocumentHolderName == "") {
    toast.warn("Applicant Document Holder Name must not be empty");
    return;
  }
  if (applicantDocumentIssuanceCountry == "") {
    toast.warn("Applicant Document Issuance Country must not be empty");
    return;
  }
  if (applicantDocumentIssuingAuthority == "") {
    toast.warn("Applicant Document Issuing Authority must not be empty");
    return;
  }
  if (applicantDocumentIssueDate == "") {
    toast.warn("Applicant Document Issue Date must not be empty");
    return;
  }
  if (applicantDocumentExpiryDate == "") {
    toast.warn("Applicant Document Expiry Date must not be empty");
    return;
  }

  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append("businessRegistrationNumber", brn);
  formData.append("applicantDocumentType", applicantDocumentType);
  formData.append("applicantDocumentNumber", applicantDocumentNumber);
  formData.append("applicantDocumentReferenceNumber", applicantDocumentReferenceNumber);
  formData.append("applicantDocumentHolderName", applicantDocumentHolderName);
  formData.append("applicantDocumentIssuanceCountry", applicantDocumentIssuanceCountry);
  formData.append("applicantDocumentIssuingAuthority", applicantDocumentIssuingAuthority);
  formData.append("applicantDocumentIssueDate", applicantDocumentIssueDate);
  formData.append("applicantDocumentExpiryDate", applicantDocumentExpiryDate);
  formData.append("applicantDocumentFile", applicantDoc);

  try {
    const response = await Axios.post(
      sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PatchApplicantKYBDetails",
      formData
    );

    const obj = response.data;
    if (obj.status === "SUCCESS") {
      toast.success("Applicant KYB Details Updated");
    } else {
      toast.error("Update failed: " + obj.message);
    }
  } catch (error) {
    console.error("Something went wrong: " + error);
  }
};

export const PatchStakeholderKYBDetails = () => {};

//Submit to NIUM
export const PostMKYC = async () => {
  document.getElementById("button-text-mkyc").style.display = "none";
  document.getElementById("button-loader-mkyc").style.display = "flex";

  var brn = sessionStorage.getItem("internalBusinessId");
  try {
    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/OnboardMKYCUser", {
      params: {
        businessRegistrationNumber: brn,
      },
    });
    let obj = response.data;
    if (obj.status == "BAD_REQUEST") {
      toast.error("Onboarding failed: " + obj.message);
      document.getElementById("button-loader-mkyc").style.display = "none";
      document.getElementById("button-loader-mkyc").style.display = "flex";
    } else if (obj.status == "IN_PROGRESS") {
      toast.success("Onboarding Success");
      sessionStorage.setItem("Onboarding response: " + obj);

      document.getElementById("button-loader-mkyc").style.display = "none";
      document.getElementById("button-loader-mkyc").style.display = "flex";

      window.open(obj.redirectUrl, "_blank");
    } else {
      toast.error("Something went wrong, please try again later!");
      document.getElementById("button-loader-mkyc").style.display = "none";
      document.getElementById("button-loader-mkyc").style.display = "flex";
    }
  } catch (error) {
    console.log("Something went wrong: " + error.message);
  }
};

//Submit to NIUM
export const PostEKYC = async () => {
  document.getElementById("button-text-ekyc").style.display = "none";
  document.getElementById("button-loader-ekyc").style.display = "flex";

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
      document.getElementById("button-text-ekyc").style.display = "flex";
      document.getElementById("button-loader-ekyc").style.display = "none";
    } else if (obj.redirectUrl) {
      toast.success("Onboarding Success");
      sessionStorage.setItem("Onboarding response: ", JSON.stringify(obj));

      document.getElementById("button-text-ekyc").style.display = "flex";
      document.getElementById("button-loader-ekyc").style.display = "none";

      window.open(obj.redirectUrl, "_blank");
    } else {
      toast.error("Something went wrong, please try again later!");
      document.getElementById("button-text-ekyc").style.display = "flex";

      document.getElementById("button-loader-ekyc").style.display = "none";
    }
  } catch (error) {
    console.log("Something went wrong: " + error.message);
  }
};

export const FetchOnboardingDetails = async () => {
  var brn = sessionStorage.getItem("internalBusinessId");
  try {
    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/SignupRoutes/getuseronboardingstatus", {
      params: {
        brn: brn,
      },
    });

    let data = response.data;

    if (data.length > 0) {
      let obj = data[0];

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

      if (obj.kycUrl != "") {
        sessionStorage.setItem("kycUrl", obj.kycUrl);
        if (document.getElementById("kycUrl")) {
          document.getElementById("kycUrl").value = obj.kycUrl;
        }
      }

      return { status: "success" };
    } else {
      console.log("No results found for the business registration number : " + brn);

      return { status: "registration not found" };
    }
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
};
