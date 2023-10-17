import Axios from "axios";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

//const [tableData,setTableData]=useState('');

//list Beneficiaries

export const listbeneficiaries = async (customerHashId) => {
  debugger;
  try {
    const response = await Axios.get(
      sessionStorage.getItem("baseUrl") +
        `/PaymentRoutes/listBeneficiries/${customerHashId}`
    );
    let obj = response.data;
    if (obj.length == 0) {
      toast.error("Something went wrong");
    } else if (obj.statusText == "Internal Server Error") {
      toast.error("Internal Server Error");
    } else if (obj.status == "BAD_REQUEST") {
      toast.error(obj.message);
    } else {
      return obj;
    }
  } catch (error) {
    console.error("Error fetching beneficiaries:", error);
    return [];
  }
};

export const fetchDetails = async (beneficiaryHashId) => {
  debugger;
  try {
    const response = await Axios.get(
      sessionStorage.getItem("baseUrl") +
        `/PaymentRoutes/fetchBeneficiryDetails/${beneficiaryHashId}`
    );
    let obj = response.data;
    return obj;
  } catch (error) {
    console.error("Error fetching beneficiaries:", error);
    return [];
  }
};
export const onDelete = async (beneficiaryHashId) => {
  debugger;
  try {
    const response = await Axios.get(
      sessionStorage.getItem("baseUrl") +
        `/PaymentRoutes/deleteBeneficiry/${beneficiaryHashId}`
    );
    let obj = response.data;
    return obj;
  } catch (error) {
    console.error("Error fetching beneficiaries:", error);
    return [];
  }
};

// fetch currency
export const fetchCurrency = async (customerHashId) => {
  debugger;
  try {
    const response = await Axios.get(
      sessionStorage.getItem("baseUrl") +
        `/PaymentRoutes/listCurrency/${customerHashId}`
    );
    let obj = response.data;
    console.log(obj);
    return obj;
  } catch (error) {
    console.error("Error fetching currency:", error);
    return [];
  }
};

// add beneficiary
export const addBeneficiry = async (basicInfo, customerHashId) => {
  debugger;

  let beneficiaryName = basicInfo.beneficiaryName;
  let beneficiaryEmail = basicInfo.beneficiaryEmail;
  let beneficiaryContactCountryCode = basicInfo.beneficiaryContactCountryCode;
  let beneficiaryContactNumber = basicInfo.beneficiaryContactNumber;
  let beneficiaryAddress = basicInfo.beneficiaryAddress;
  let beneficiaryCountryCode = basicInfo.beneficiaryCountryCode;
  let beneficiaryState = basicInfo.beneficiaryState;
  let beneficiaryCity = basicInfo.beneficiaryCity;
  let beneficiaryPostcode = basicInfo.beneficiaryPostcode;
  let destinationCountry = document.getElementById("destinationcountry").value;
  // let beneficiaryAccountType = document.getElementById(
  //   "beneficiaryAccountType"
  // ).value;
  let beneficiaryAccountType = basicInfo.beneficiaryAccountType;
  let destinationCurrency = document.getElementById(
    "destinationCurrency"
  ).value;
  let beneficiaryAccountNumber = document.getElementById(
    "beneficiaryAccountNumber"
  ).value;
  let routingCodeType1 = document.getElementById("routingCodeType1").value;
  let routingCodeValue1 = document.getElementById("routingCodeValue1").value;
  let payoutMethod = document.getElementById("payoutMethod").value;

  const body = {
    beneficiaryName: beneficiaryName,
    beneficiaryContactCountryCode: beneficiaryContactCountryCode,
    beneficiaryContactNumber: beneficiaryContactNumber,
    beneficiaryAccountType: beneficiaryAccountType,
    beneficiaryEmail: beneficiaryEmail,
    beneficiaryAddress: beneficiaryAddress,
    beneficiaryCountryCode: beneficiaryCountryCode,
    beneficiaryState: beneficiaryState,
    beneficiaryCity: beneficiaryCity,
    beneficiaryPostcode: beneficiaryPostcode,
    destinationCountry: destinationCountry,
    destinationCurrency: destinationCurrency,
    beneficiaryAccountNumber: beneficiaryAccountNumber,
    routingCodeType1: routingCodeType1,
    routingCodeValue1: routingCodeValue1,
    payoutMethod: payoutMethod,
  };

  console.log(body);

  try {
    const response = await Axios.post(
      sessionStorage.getItem("baseUrl") +
        `/PaymentRoutes/addBeneficeries/${customerHashId}`,
      body
    );
    let obj = response.data;
    console.log(obj);
    if (obj.status == "BAD_REQUEST") {
      toast.error(obj.message);
    } else if (obj.statusText == "Internal Server Error") {
      toast.error("Internal Server Error");
    } else {
      toast.success("Beneficiary added succesfully...");
    }
    return obj;
  } catch (error) {
    console.log(error.message);
    console.error("Error fetching beneficiaries:", error.message);
    toast.error(error.message);
    return [];
  }
};

// send Money
export const sendMoney = async (paymentbody, customerHashId) => {
  debugger;

  let beneficiaryid = paymentbody.beneficiaryid;
  let customerComments = paymentbody.customerComments;
  let source_currency = paymentbody.source_currency;
  let source_amount = paymentbody.source_amount;
  let purposeCode = paymentbody.purposeCode;
  let sourceOfFunds = paymentbody.sourceOfFunds;
  let exemptionCode = paymentbody.exemptionCode;

  const payout = {
    source_currency: source_currency,
    source_amount: source_amount,
    swiftFeeType: "SHA",
  };
  const beneficiary = {
    id: beneficiaryid,
  };
  const body = {
    beneficiary: beneficiary,
    customerComments: customerComments,
    payout: payout,
    purposeCode: purposeCode,
    sourceOfFunds: sourceOfFunds,
    exemptionCode: exemptionCode,
  };
  console.log(body);
  try {
    const response = await Axios.post(
      sessionStorage.getItem("baseUrl") + "/PaymentRoutes/sendMoney",
      body
    );
    let obj = response.data;
    console.log(obj);
    if (obj.status == "BAD_REQUEST") {
      toast.error(obj.message);
    } else if (obj.statusText == "Internal Server Error") {
      toast.error("Internal Server Error");
    } else {
      toast.success("Money send succesfully...");
    }
    return obj;
  } catch (error) {
    console.log(error.message);
    console.error("Error sending money :", error.message);
    toast.error(error.message);
    return [];
  }
};

export const fetchSupportedCorridors = async (
  destinationCountry,
  destinationCurrency,
  basicInfo
) => {
  debugger;
  try {
    const response = await Axios.get(
      sessionStorage.getItem("baseUrl") +
        "/PaymentRoutes/fetchSupportedCorridors",
      {
        params: {
          destinationCountry: destinationCountry,
          destinationCurrency: destinationCurrency,
          accounttype: basicInfo.beneficiaryAccountType,
        },
      }
    );
    let obj = response.data;
    if (obj.length == 0) {
      toast.error("Something went wrong");
    } else if (obj.statusText == "Internal Server Error") {
      toast.error("Internal Server Error");
    } else if (obj.status == "BAD_REQUEST") {
      toast.error(obj.message);
    } else {
      return obj;
    }
  } catch (error) {
    console.error("Error fetching beneficiaries:", error);
    return [];
  }
};
