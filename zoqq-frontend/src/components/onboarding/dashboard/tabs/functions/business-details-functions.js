import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

export const GetCorporateDetailsList = async () => {
  const businessRegistrationNumber = document.getElementById("businessRegistrationNumber").value;

  if (businessRegistrationNumber != "") {
    try {
      const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/getBusinessList", {
        params: {
          region: "SG",
          businessRegistrationNumber: businessRegistrationNumber,
        },
      });

      let obj = response.data;
      let result = obj;

      if (result.length && result.length > 0) {
        return result; // Return the result data
      } else {
        toast.error("No business found for the given Business Registration Number");
        return [];
      }
    } catch (error) {
      toast.error("Error fetching business details, Please try again later!");
      return [];
    }
  }
};

export const GetCorporateDetails = async (brn) => {
  if (brn != "") {
    sessionStorage.setItem("businessRegistrationNumber", brn);
    document.getElementById("closeModalBtn").click();

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
        if (BusinessDetails) {
          document.getElementById("businessRegistrationNumber").value = brn;

          document.getElementById("businessName").value = BusinessDetails.businessName;
          sessionStorage.setItem("businessName", BusinessDetails.businessName);

          if (BusinessDetails.businessType) {
            document.getElementById("businessType").value = BusinessDetails.businessName;
          }

          if (BusinessDetails.tradeName) {
            document.getElementById("tradeName").value = BusinessDetails.businessName;
          }
          if (BusinessDetails.settlorName) {
            document.getElementById("settlorName").value = BusinessDetails.businessName;
          }

          if (BusinessDetails.trusteeName) {
            document.getElementById("trusteeName").value = BusinessDetails.trusteeName;
          }

          if (BusinessDetails.addresses) {
            var address = BusinessDetails.addresses;
            if (address.registeredAddress) {
              document.getElementById("registrationAddress_1").value = address.registeredAddress.addressLine1;
              document.getElementById("registrationAddress_2").value = address.registeredAddress.addressLine2;

              if (address.registeredAddress.city != "null") {
                document.getElementById("registrationCity").value = address.registeredAddress.city;
              }
              if (address.registeredAddress.state != "null") {
                document.getElementById("registrationState").value = address.registeredAddress.state;
              }

              document.getElementById("registrationPostCode").value = address.registeredAddress.postcode;
              document.getElementById("registrationCountry").value = address.registeredAddress.country;
            }
            if (address.businessAddress) {
              document.getElementById("businessAddress_1").value = address.businessAddress.addressLine1;
              document.getElementById("businessAddress_2").value = address.businessAddress.addressLine2;

              if (address.businessAddress.city != "null") {
                document.getElementById("businessCity").value = address.businessAddress.city;
              }
              if (address.businessAddress.state != "null") {
                document.getElementById("businessState").value = address.businessAddress.state;
              }

              document.getElementById("businessPostCode").value = address.businessAddress.postcode;
              document.getElementById("businessCountry").value = address.businessAddress.country;
            }
          }

          if (BusinessDetails.additionalInfo) {
            var sameBusinessAddress = BusinessDetails.additionalInfo.isSameBusinessAddress;
            var checkbox = document.getElementById("isSameBusinessAddress");
            if (sameBusinessAddress == "yes") {
              // This function will be called when the checkbox's value changes
              checkbox.checked = "true";
              document.getElementById("businessAddress_1").value =
                document.getElementById("registrationAddress_1").value;
              document.getElementById("businessAddress_2").value =
                document.getElementById("registrationAddress_2").value;
              document.getElementById("businessCity").value = document.getElementById("registrationCity").value;
              document.getElementById("businessState").value = document.getElementById("registrationState").value;
              document.getElementById("businessPostCode").value = document.getElementById("registrationPostCode").value;
              document.getElementById("businessCountry").value = document.getElementById("registrationCountry").value;
            } else {
              checkbox.checked = "false";
              document.getElementById("businessAddress_1").value = "";
              document.getElementById("businessAddress_2").value = "";
              document.getElementById("businessCity").value = "";
              document.getElementById("businessState").value = "";
              document.getElementById("businessPostCode").value = "";
              document.getElementById("businessCountry").value = "";
            }
          }
        }
      } else {
        toast.error("No results found");
      }
    } catch (error) {
      console.log("Error fetching business details: " + error.message);
    }
  } else {
    toast.error("No option selected.");
    document.getElementById("closeModalBtn").click();
  }
};

//General Details
export const GetBusinessCorporationDetails = async (brn) => {
  try {
    const response = await Axios.get(
      sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/getBusinessIncorporationDetails",
      {
        params: {
          businessRegistrationNumber: brn,
        },
      }
    );

    let obj = response.data;

    //Filling Data when it's available
    document.getElementById("businessRegistrationNumber").value = obj.internalBusinessId;
    document.getElementById("businessRegistrationNumber").setAttribute("readonly", "true");
    document.getElementById("businessName").value = obj.businessName;
    sessionStorage.setItem("businessName", obj.businessName);
    document.getElementById("businessType").value = obj.businessType;
    sessionStorage.setItem("businessType", obj.businessType);

    if (obj.tradeName) {
      document.getElementById("tradeName").value = obj.tradeName;
    }

    if (obj.settlorName) {
      document.getElementById("settlorName").value = obj.settlorName;
    }

    if (obj.trusteeName) {
      document.getElementById("trusteeName").value = obj.trusteeName;
    }

    if (obj.businessType.toLowerCase() == "partnership") {
      document.getElementById("partnerName").value = obj.partnerName;
      document.getElementById("partnerState").value = obj.partnerState;
      document.getElementById("partnerCountry").value = obj.partnerCountry;
    } else if (obj.businessType.toLowerCase() == "association") {
      document.getElementById("associationName").value = obj.associationName;
      document.getElementById("associationNumber").value = obj.associationNumber;
      document.getElementById("associationChairPerson").value = obj.associationChairPerson;
    } else {
      document.getElementById("partnerName").value = "";
      document.getElementById("partnerState").value = "";
      document.getElementById("partnerCountry").value = "";
      document.getElementById("associationName").value = "";
      document.getElementById("associationNumber").value = "";
      document.getElementById("associationChairPerson").value = "";
    }

    document.getElementById("div7").style.width = "7%";
    // Address Details Implementation
    var regKeys = [];
    var businessKeys = [];

    for (var key in obj) {
      if (key.startsWith("reg")) {
        regKeys.push(key);
      } else if (key.startsWith("business")) {
        businessKeys.push(key);
      }
    }
    //Registered Address
    if (regKeys.length != 0) {
      document.getElementById("registrationAddress_1").value = obj.regAddress_1;
      document.getElementById("registrationAddress_2").value = obj.regAddress_2;
      document.getElementById("registrationCity").value = obj.regCity;
      document.getElementById("registrationState").value = obj.regState;
      document.getElementById("registrationPostCode").value = obj.regPostCode;
      document.getElementById("registrationCountry").value = obj.regCountry;
    } else {
      document.getElementById("registrationAddress_1").value = "";
      document.getElementById("registrationAddress_2").value = "";
      document.getElementById("registrationCity").value = "";
      document.getElementById("registrationState").value = "";
      document.getElementById("registrationPostCode").value = "";
      document.getElementById("registrationCountry").value = "";
    }

    document.getElementById("div7").style.width = "14%";

    if (obj.sameBusinessAddress) {
      if (obj.sameBusinessAddress == "yes") {
        var isSameBusinessAddress = document.getElementById("isSameBusinessAddress");
        isSameBusinessAddress.checked = true;
        document.getElementById("businessAddress_1").value = obj.regAddress_1;
        document.getElementById("businessAddress_2").value = obj.regAddress_2;
        document.getElementById("businessCity").value = obj.regCity;
        document.getElementById("businessState").value = obj.regState;
        document.getElementById("businessPostCode").value = obj.regPostCode;
        document.getElementById("businessCountry").value = obj.regCountry;
      } else if (obj.sameBusinessAddress == "no" && businessKeys.length != 0) {
        var isSameBusinessAddress = document.getElementById("isSameBusinessAddress");
        isSameBusinessAddress.checked = false;
        document.getElementById("businessAddress_1").value = obj.businessAddress_1;
        document.getElementById("businessAddress_2").value = obj.businessAddress_2;
        document.getElementById("businessCity").value = obj.businessCity;
        document.getElementById("businessState").value = obj.businessState;
        document.getElementById("businessPostCode").value = obj.businessPostCode;
        document.getElementById("businessCountry").value = obj.businessCountry;
      } else {
        //Business Address
        document.getElementById("businessAddress_1").value = "";
        document.getElementById("businessAddress_2").value = "";
        document.getElementById("businessCity").value = "";
        document.getElementById("businessState").value = "";
        document.getElementById("businessPostCode").value = "";
        document.getElementById("businessCountry").value = "";
      }
    }
    document.getElementById("div7").style.width = "20%";
  } catch (error) {
    console.log("Something went wrong: " + error);
  }
};

// export const PostBusinessCorporationDetails = async () => {
//   console.log("PostBusinessCorporationDetails");
//   var businessRegistrationNumber = document.getElementById("businessRegistrationNumber").value;
//   var businessName = document.getElementById("businessName").value;
//   var businessType = document.getElementById("businessType").value;
//   var tradeName = document.getElementById("tradeName").value;
//   var settlorName = document.getElementById("settlorName").value;
//   var trusteeName = document.getElementById("trusteeName").value;

//   //Partnership Details
//   var partnerName = document.getElementById("partnerName").value;
//   var partnerState = document.getElementById("partnerState").value;
//   var partnerCountry = document.getElementById("partnerCountry").value;

//   //Association Details
//   var associationName = document.getElementById("associationName").value;
//   var associationNumber = document.getElementById("associationNumber").value;
//   var associationChairPerson = document.getElementById("associationChairPerson").value;

//   if (businessRegistrationNumber == "") {
//     toast.warn("Business Registration Number Should Not Be Empty.");
//   } else if (businessName == "") {
//     toast.warn("Business Name Should Not Be Empty.");
//   } else if (businessType == "") {
//     toast.warn("Business Type Should Not Be Empty.");
//   } else if (businessType == "ASSOCIATION" && associationName == "") {
//     toast.warn("Association Name Cannot Be Empty");
//   } else if (businessType == "ASSOCIATION" && associationNumber == "") {
//     toast.warn("Association Number Cannot Be Empty");
//   } else if (businessType == "ASSOCIATION" && associationChairPerson == "") {
//     toast.warn("Association ChairPerson Cannot Be Empty");
//   }

//   //When no expection found, triggering the API
//   else {
//     document.getElementById("button-text-business-incorp").style.display = "none";
//     document.getElementById("button-loader-business-incorp").style.display = "flex";
//     document.getElementById("submitBusinessIncorpDetails").setAttribute("disabled", "true");

//     try {
//       const response = await Axios.get(
//         sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postBusinessIncorporationDetails",
//         {
//           params: {
//             email: sessionStorage.getItem("lastemail"),
//             businessRegistrationNumber: businessRegistrationNumber,
//             businessName: businessName,
//             businessType: businessType,
//             tradeName: tradeName,
//             settlorName: settlorName,
//             trusteeName: trusteeName,
//             partnerName: partnerName,
//             partnerState: partnerState,
//             partnerCountry: partnerCountry,
//             associationName: associationName,
//             associationNumber: associationNumber,
//             associationChairPerson: associationChairPerson,
//           },
//         }
//       );

//       let obj = response.data;

//       document.getElementById("button-text-business-incorp").style.display = "flex";
//       document.getElementById("button-loader-business-incorp").style.display = "none";
//       document.getElementById("submitBusinessIncorpDetails").removeAttribute("disabled");

//       if (obj.status == "SUCCESS") {
//         toast.success("Business Incorporation Details Submitted");
//         document.getElementById("submitBusinessIncorpDetails").style.display = "none";
//         document.getElementById("updateBusinessIncorpDetails").style.display = "flex";
//         document.getElementById("businessRegistrationNumber").setAttribute("readonly", "true");
//         document.getElementById("div7").style.width = "7%";
//       } else {
//         toast.error("Submission Failed: " + obj.message);
//         document.getElementById("submitBusinessIncorpDetails").style.display = "flex";
//         document.getElementById("updateBusinessIncorpDetails").style.display = "none";
//         document.getElementById("div7").style.width = "0";
//       }
//     } catch (error) {
//       toast.error("Something went wrong: " + error);
//       document.getElementById("submitBusinessIncorpDetails").style.display = "flex";
//       document.getElementById("updateBusinessIncorpDetails").style.display = "none";
//       document.getElementById("div7").style.width = "0";
//     }
//   }
// };

// export const PostRegisteredAddressDetails = async () => {
//   console.log("PostRegisteredAddressDetails");
//   //To be changed, temporary implementation for business-details
//   //Business Incorporation Details - temporary
//   var businessRegistrationNumber = document.getElementById("businessRegistrationNumber").value;
//   var businessName = document.getElementById("businessName").value;
//   var businessType = document.getElementById("businessType").value;
//   var tradeName = document.getElementById("tradeName").value;
//   var settlorName = document.getElementById("settlorName").value;
//   var trusteeName = document.getElementById("trusteeName").value;

//   var partnerName = document.getElementById("partnerName").value;
//   var partnerState = document.getElementById("partnerState").value;
//   var partnerCountry = document.getElementById("partnerCountry").value;
//   var associationName = document.getElementById("associationName").value;
//   var associationNumber = document.getElementById("associationNumber").value;
//   var associationChairPerson = document.getElementById("associationChairPerson").value;

//   //Registered Address
//   var registrationAddress_1 = document.getElementById("registrationAddress_1").value;
//   var registrationAddress_2 = document.getElementById("registrationAddress_2").value;
//   var registrationCity = document.getElementById("registrationCity").value;
//   var registrationState = document.getElementById("registrationState").value;
//   var registrationPostCode = document.getElementById("registrationPostCode").value;
//   var registrationCountry = document.getElementById("registrationCountry").value;

//   var sameBusinessAddress = "";
//   var isSameBusinessAddress = document.getElementById("isSameBusinessAddress");

//   if (isSameBusinessAddress.checked) {
//     sameBusinessAddress = "yes";
//   } else {
//     sameBusinessAddress = "no";
//   }

//   if (businessRegistrationNumber == "") {
//     toast.warn("Business Registration Number Should Not Be Empty.");
//   }

//   //Adding the Business Details - temporary
//   else if (businessName == "") {
//     toast.warn("Business Name Should Not Be Empty.");
//   } else if (businessType == "") {
//     toast.warn("Business Type Should Not Be Empty.");
//   } else if (businessType == "ASSOCIATION" && associationName == "") {
//     toast.warn("Association Name Cannot Be Empty");
//   } else if (businessType == "ASSOCIATION" && associationNumber == "") {
//     toast.warn("Association Number Cannot Be Empty");
//   } else if (businessType == "ASSOCIATION" && associationChairPerson == "") {
//     toast.warn("Association ChairPerson Cannot Be Empty");
//   }

//   //Registered Address Details - To be kept
//   else if (registrationAddress_1 == "") {
//     toast.warn("Address 1 Should Not Be Empty!");
//   } else if (registrationPostCode == "") {
//     toast.warn("Post Code Should Not Be Empty!");
//   } else if (registrationCountry == "") {
//     toast.warn("Country Should Not Be Empty!");
//   } else {
//     try {
//       const response = await Axios.get(
//         sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postRegisteredAddressDetails",
//         {
//           params: {
//             email: sessionStorage.getItem("lastemail"),
//             businessRegistrationNumber: businessRegistrationNumber,

//             //Business Details - temporary
//             businessName: businessName,
//             businessType: businessType,
//             tradeName: tradeName,
//             settlorName: settlorName,
//             trusteeName: trusteeName,
//             partnerName: partnerName,
//             partnerState: partnerState,
//             partnerCountry: partnerCountry,
//             associationName: associationName,
//             associationNumber: associationNumber,
//             associationChairPerson: associationChairPerson,

//             //Registered Address - to be kept
//             registrationAddress_1: registrationAddress_1,
//             registrationAddress_2: registrationAddress_2,
//             registrationCity: registrationCity,
//             registrationState: registrationState,
//             registrationPostCode: registrationPostCode,
//             registrationCountry: registrationCountry,
//             sameBusinessAddress: sameBusinessAddress,
//           },
//         }
//       );

//       let obj = response.data;
//       if (obj.status == "SUCCESS") {
//         toast.success("Registered Address Details Submitted");
//         document.getElementById("submitRegisteredAddress").style.display = "none";
//         document.getElementById("updateRegisteredAddress").style.display = "";
//         document.getElementById("div7").style.width = "14%";
//       } else {
//         toast.error("Submission Failed: " + obj.message);
//         document.getElementById("submitRegisteredAddress").style.display = "";
//         document.getElementById("updateRegisteredAddress").style.display = "none";
//         document.getElementById("div7").style.width = "7%";
//       }
//     } catch (error) {
//       toast.error("Something went wrong: " + error);
//       document.getElementById("submitRegisteredAddress").style.display = "";
//       document.getElementById("updateRegisteredAddress").style.display = "none";
//       document.getElementById("div7").style.width = "7%";
//     }
//   }
// };

export const PostBusinessAddressDetails = async () => {
  var businessRegistrationNumber = document.getElementById("businessRegistrationNumber").value;
  var businessName = document.getElementById("businessName").value;
  var businessType = document.getElementById("businessType").value;
  var tradeName = document.getElementById("tradeName").value;
  var settlorName = document.getElementById("settlorName").value;
  var trusteeName = document.getElementById("trusteeName").value;

  var partnerName = document.getElementById("partnerName").value;
  var partnerState = document.getElementById("partnerState").value;
  var partnerCountry = document.getElementById("partnerCountry").value;
  var associationName = document.getElementById("associationName").value;
  var associationNumber = document.getElementById("associationNumber").value;
  var associationChairPerson = document.getElementById("associationChairPerson").value;

  //Registered Address
  var registrationAddress_1 = document.getElementById("registrationAddress_1").value;
  var registrationAddress_2 = document.getElementById("registrationAddress_2").value;
  var registrationCity = document.getElementById("registrationCity").value;
  var registrationState = document.getElementById("registrationState").value;
  var registrationPostCode = document.getElementById("registrationPostCode").value;
  var registrationCountry = document.getElementById("registrationCountry").value;

  var sameBusinessAddress = "";
  var isSameBusinessAddress = document.getElementById("isSameBusinessAddress");

  if (isSameBusinessAddress.checked) {
    sameBusinessAddress = "yes";
  } else {
    sameBusinessAddress = "no";
  }

  //Business Address
  var businessAddress_1 = document.getElementById("businessAddress_1").value;
  var businessAddress_2 = document.getElementById("businessAddress_2").value;
  var businessCity = document.getElementById("businessCity").value;
  var businessState = document.getElementById("businessState").value;
  var businessPostCode = document.getElementById("businessPostCode").value;
  var businessCountry = document.getElementById("businessCountry").value;

  if (businessRegistrationNumber == "") {
    toast.warn("Business Registration Number Should Not Be Empty.");
  } else if (businessName == "") {
    toast.warn("Business Name Should Not Be Empty.");
  } else if (businessType == "") {
    toast.warn("Business Type Should Not Be Empty.");
  } else if (businessType == "ASSOCIATION" && associationName == "") {
    toast.warn("Association Name Cannot Be Empty");
  } else if (businessType == "ASSOCIATION" && associationNumber == "") {
    toast.warn("Association Number Cannot Be Empty");
  } else if (businessType == "ASSOCIATION" && associationChairPerson == "") {
    toast.warn("Association ChairPerson Cannot Be Empty");
  }

  //Registered Address Details exception handling
  else if (registrationAddress_1 == "") {
    toast.warn("Address 1 Should Not Be Empty!");
  } else if (registrationPostCode == "") {
    toast.warn("Post Code Should Not Be Empty!");
  } else if (registrationCountry == "") {
    toast.warn("Country Should Not Be Empty!");
  }

  //Business Address Details exception handling
  else if (sameBusinessAddress == "yes" && businessAddress_1 == "") {
    toast.error("Address 1 Should Not Be Empty!");
  } else if (sameBusinessAddress == "yes" && businessPostCode == "") {
    toast.error("Post Code Should Not Be Empty!");
  } else if (sameBusinessAddress == "yes" && businessCountry == "") {
    toast.error("Country Should Not Be Empty!");
  }

  //When no expection found, triggering the API
  else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postBusinessAddressDetails",
        {
          params: {
            email: sessionStorage.getItem("lastemail"),
            businessRegistrationNumber: businessRegistrationNumber,
            businessName: businessName,
            businessType: businessType,
            tradeName: tradeName,
            settlorName: settlorName,
            trusteeName: trusteeName,
            partnerName: partnerName,
            partnerState: partnerState,
            partnerCountry: partnerCountry,
            associationName: associationName,
            associationNumber: associationNumber,
            associationChairPerson: associationChairPerson,

            //Registered Address as params - temporary
            registrationAddress_1: registrationAddress_1,
            registrationAddress_2: registrationAddress_2,
            registrationCity: registrationCity,
            registrationState: registrationState,
            registrationPostCode: registrationPostCode,
            registrationCountry: registrationCountry,
            sameBusinessAddress: sameBusinessAddress,

            //Registered Address as params - temporary
            businessAddress_1: businessAddress_1,
            businessAddress_2: businessAddress_2,
            businessCity: businessCity,
            businessState: businessState,
            businessPostCode: businessPostCode,
            businessCountry: businessCountry,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("General Details Submitted");
        document.getElementById("submitBusinessAddress").style.display = "none";
        document.getElementById("updateBusinessAddress").style.display = "";
        document.getElementById("div7").style.width = "20%";
      } else {
        toast.error("Submission Failed: " + obj.message);
        document.getElementById("submitBusinessAddress").style.display = "";
        document.getElementById("updateBusinessAddress").style.display = "none";
      }
    } catch (error) {
      toast.error("Something went wrong: " + error);
      document.getElementById("submitBusinessAddress").style.display = "";
      document.getElementById("updateBusinessAddress").style.display = "none";
    }
  }
};

// export const PatchBusinessCorporationDetails = async () => {
//   var businessRegistrationNumber = document.getElementById("businessRegistrationNumber").value;
//   var businessName = document.getElementById("businessName").value;
//   var businessType = document.getElementById("businessType").value;
//   var tradeName = document.getElementById("tradeName").value;
//   var settlorName = document.getElementById("settlorName").value;
//   var trusteeName = document.getElementById("trusteeName").value;

//   //Partnership Details
//   var partnerName = document.getElementById("partnerName").value;
//   var partnerState = document.getElementById("partnerState").value;
//   var partnerCountry = document.getElementById("partnerCountry").value;

//   //Association Details
//   var associationName = document.getElementById("associationName").value;
//   var associationNumber = document.getElementById("associationNumber").value;
//   var associationChairPerson = document.getElementById("associationChairPerson").value;

//   if (businessRegistrationNumber == "") {
//     toast.warn("Business Registration Number Should Not Be Empty.");
//   } else if (businessName == "") {
//     toast.warn("Business Name Should Not Be Empty.");
//   } else if (businessType == "") {
//     toast.warn("Business Type Should Not Be Empty.");
//   } else if (businessType == "ASSOCIATION" && associationName == "") {
//     toast.warn("Association Name Cannot Be Empty");
//   } else if (businessType == "ASSOCIATION" && associationNumber == "") {
//     toast.warn("Association Number Cannot Be Empty");
//   } else if (businessType == "ASSOCIATION" && associationChairPerson == "") {
//     toast.warn("Association ChairPerson Cannot Be Empty");
//   }

//   //When no expection found, triggering the API
//   else {
//     try {
//       const response = await Axios.get(
//         sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchBusinessIncorporationDetails",
//         {
//           params: {
//             businessRegistrationNumber: businessRegistrationNumber,
//             businessName: businessName,
//             businessType: businessType,
//             tradeName: tradeName,
//             settlorName: settlorName,
//             trusteeName: trusteeName,
//             partnerName: partnerName,
//             partnerState: partnerState,
//             partnerCountry: partnerCountry,
//             associationName: associationName,
//             associationNumber: associationNumber,
//             associationChairPerson: associationChairPerson,
//           },
//         }
//       );

//       let obj = response.data;
//       if (obj.status == "SUCCESS") {
//         toast.success("Business Incorporation Details Updated");
//         document.getElementById("submitBusinessIncorpDetails").style.display = "none";
//         document.getElementById("updateBusinessIncorpDetails").style.display = "";
//       } else {
//         toast.error("Update Failed: " + obj.message);
//         document.getElementById("submitBusinessIncorpDetails").style.display = "";
//         document.getElementById("updateBusinessIncorpDetails").style.display = "none";
//       }
//     } catch (error) {
//       toast.error("Something went wrong: " + error);
//       document.getElementById("submitBusinessIncorpDetails").style.display = "";
//       document.getElementById("updateBusinessIncorpDetails").style.display = "none";
//     }
//   }
// };

// export const PatchRegisteredAddressDetails = async () => {
//   var businessRegistrationNumber = document.getElementById("businessRegistrationNumber").value;

//   //Registered Address
//   var registrationAddress_1 = document.getElementById("registrationAddress_1").value;
//   var registrationAddress_2 = document.getElementById("registrationAddress_2").value;
//   var registrationCity = document.getElementById("registrationCity").value;
//   var registrationState = document.getElementById("registrationState").value;
//   var registrationPostCode = document.getElementById("registrationPostCode").value;
//   var registrationCountry = document.getElementById("registrationCountry").value;

//   var sameBusinessAddress = "";
//   var isSameBusinessAddress = document.getElementById("isSameBusinessAddress");

//   if (isSameBusinessAddress.checked) {
//     sameBusinessAddress = "yes";
//   } else {
//     sameBusinessAddress = "no";
//   }

//   if (businessRegistrationNumber == "") {
//     toast.warn("Business Registration Number Should Not Be Empty.");
//   }

//   //Registered Address Details - To be kept
//   else if (registrationAddress_1 == "") {
//     toast.warn("Address 1 Should Not Be Empty!");
//   } else if (registrationPostCode == "") {
//     toast.warn("Post Code Should Not Be Empty!");
//   } else if (registrationCountry == "") {
//     toast.warn("Country Should Not Be Empty!");
//   } else {
//     try {
//       const response = await Axios.get(
//         sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchRegisteredAddressDetails",
//         {
//           params: {
//             businessRegistrationNumber: businessRegistrationNumber,
//             registrationAddress_1: registrationAddress_1,
//             registrationAddress_2: registrationAddress_2,
//             registrationCity: registrationCity,
//             registrationState: registrationState,
//             registrationPostCode: registrationPostCode,
//             registrationCountry: registrationCountry,
//             sameBusinessAddress: sameBusinessAddress,
//           },
//         }
//       );

//       let obj = response.data;
//       if (obj.status == "SUCCESS") {
//         toast.success("Registered Address Details Updated");
//       } else {
//         toast.error("Update Failed: " + obj.message);
//       }
//     } catch (error) {
//       toast.error("Something went wrong: " + error);
//     }
//   }
// };

export const PatchBusinessAddressDetails = async () => {
  var businessRegistrationNumber = document.getElementById("businessRegistrationNumber").value;
  var businessName = document.getElementById("businessName").value;
  var businessType = document.getElementById("businessType").value;
  var tradeName = document.getElementById("tradeName").value;
  var settlorName = document.getElementById("settlorName").value;
  var trusteeName = document.getElementById("trusteeName").value;

  var partnerName = document.getElementById("partnerName").value;
  var partnerState = document.getElementById("partnerState").value;
  var partnerCountry = document.getElementById("partnerCountry").value;
  var associationName = document.getElementById("associationName").value;
  var associationNumber = document.getElementById("associationNumber").value;
  var associationChairPerson = document.getElementById("associationChairPerson").value;

  //Registered Address
  var registrationAddress_1 = document.getElementById("registrationAddress_1").value;
  var registrationAddress_2 = document.getElementById("registrationAddress_2").value;
  var registrationCity = document.getElementById("registrationCity").value;
  var registrationState = document.getElementById("registrationState").value;
  var registrationPostCode = document.getElementById("registrationPostCode").value;
  var registrationCountry = document.getElementById("registrationCountry").value;

  var sameBusinessAddress = "";
  var isSameBusinessAddress = document.getElementById("isSameBusinessAddress");

  if (isSameBusinessAddress.checked) {
    sameBusinessAddress = "yes";
  } else {
    sameBusinessAddress = "no";
  }

  //Business Address
  var businessAddress_1 = document.getElementById("businessAddress_1").value;
  var businessAddress_2 = document.getElementById("businessAddress_2").value;
  var businessCity = document.getElementById("businessCity").value;
  var businessState = document.getElementById("businessState").value;
  var businessPostCode = document.getElementById("businessPostCode").value;
  var businessCountry = document.getElementById("businessCountry").value;

  if (businessRegistrationNumber == "") {
    toast.warn("Business Registration Number Should Not Be Empty.");
  } else if (businessName == "") {
    toast.warn("Business Name Should Not Be Empty.");
  } else if (businessType == "") {
    toast.warn("Business Type Should Not Be Empty.");
  } else if (businessType == "ASSOCIATION" && associationName == "") {
    toast.warn("Association Name Cannot Be Empty");
  } else if (businessType == "ASSOCIATION" && associationNumber == "") {
    toast.warn("Association Number Cannot Be Empty");
  } else if (businessType == "ASSOCIATION" && associationChairPerson == "") {
    toast.warn("Association ChairPerson Cannot Be Empty");
  }

  //Registered Address Details exception handling
  else if (registrationAddress_1 == "") {
    toast.warn("Address 1 Should Not Be Empty!");
  } else if (registrationPostCode == "") {
    toast.warn("Post Code Should Not Be Empty!");
  } else if (registrationCountry == "") {
    toast.warn("Country Should Not Be Empty!");
  }

  //Business Address Details exception handling
  else if (sameBusinessAddress == "yes" && businessAddress_1 == "") {
    toast.error("Address 1 Should Not Be Empty!");
  } else if (sameBusinessAddress == "yes" && businessPostCode == "") {
    toast.error("Post Code Should Not Be Empty!");
  } else if (sameBusinessAddress == "yes" && businessCountry == "") {
    toast.error("Country Should Not Be Empty!");
  }

  //When no expection found, triggering the API
  else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchBusinessAddressDetails",
        {
          params: {
            businessRegistrationNumber: businessRegistrationNumber,

            businessName: businessName,
            businessType: businessType,
            tradeName: tradeName,
            settlorName: settlorName,
            trusteeName: trusteeName,
            partnerName: partnerName,
            partnerState: partnerState,
            partnerCountry: partnerCountry,
            associationName: associationName,
            associationNumber: associationNumber,
            associationChairPerson: associationChairPerson,

            //Registered Address as params - temporary
            registrationAddress_1: registrationAddress_1,
            registrationAddress_2: registrationAddress_2,
            registrationCity: registrationCity,
            registrationState: registrationState,
            registrationPostCode: registrationPostCode,
            registrationCountry: registrationCountry,
            sameBusinessAddress: sameBusinessAddress,

            //Registered Address as params - temporary
            businessAddress_1: businessAddress_1,
            businessAddress_2: businessAddress_2,
            businessCity: businessCity,
            businessState: businessState,
            businessPostCode: businessPostCode,
            businessCountry: businessCountry,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("General Details Updated");
      } else {
        toast.error("Updated Failed: " + obj.message);
      }
    } catch (error) {
      toast.error("Something went wrong: " + error.message);
    }
  }
};

//Business Details
export const GetAdditionalBusinessCorporationDetails = async (brn) => {
  try {
    const response = await Axios.get(
      sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/getAdditionalBusinessDetails",
      {
        params: {
          businessRegistrationNumber: brn,
        },
      }
    );

    let obj = response.data;

    if (obj.hasOwnProperty("regCountry")) {
      document.getElementById("registeredCountry").value = obj.regCountry;
    }

    if (obj.hasOwnProperty("registeredDate")) {
      document.getElementById("registeredDate").value = obj.registeredDate;
    }
    // document.getElementById("submitLegalDetails");

    if (obj.hasOwnProperty("listedExchange")) {
      document.getElementById("listedExchange").value = obj.listedExchange;
    }

    if (obj.hasOwnProperty("regType")) {
      document.getElementById("registrationType").value = obj.regType;
    }

    if (obj.hasOwnProperty("legislationName")) {
      document.getElementById("legislationName").value = obj.legislationName;
    }

    if (obj.hasOwnProperty("legislationType")) {
      document.getElementById("legislationType").value = obj.legislationType;
    }

    document.getElementById("div7").style.width = "24%";

    if (obj.hasOwnProperty("website")) {
      document.getElementById("website").value = obj.website;
    }

    document.getElementById("div7").style.width = "28%";

    if (obj.hasOwnProperty("country")) {
      document.getElementById("taxCountry").value = obj.country;
    }

    if (obj.hasOwnProperty("taxNumber")) {
      document.getElementById("taxNumber").value = obj.taxNumber;
    }

    document.getElementById("div7").style.width = "32%";

    if (obj.hasOwnProperty("regulatedTrustType")) {
      document.getElementById("regulatedTrustType").value = obj.regulatedTrustType;
    }

    if (obj.hasOwnProperty("unregulatedTrustType")) {
      document.getElementById("unregulatedTrustType").value = obj.unregulatedTrustType;
    }

    if (obj.hasOwnProperty("searchId")) {
      document.getElementById("searchId").value = obj.searchId;
    }

    document.getElementById("div7").style.width = "36%";

    if (obj.hasOwnProperty("totalEmployees")) {
      document.getElementById("totalEmployees").value = obj.totalEmployees;
    }

    if (obj.hasOwnProperty("annualTurnover")) {
      document.getElementById("annualTurnover").value = obj.annualTurnover;
    }

    if (obj.hasOwnProperty("industrySector")) {
      document.getElementById("industrySector").value = obj.industrySector;
    }

    if (obj.hasOwnProperty("countryOfOperation")) {
      document.getElementById("countryOfOperation").value = obj.countryOfOperation;
    }

    if (obj.hasOwnProperty("travelRestrictedCountry")) {
      document.getElementById("travelRestrictedCountry").value = obj.travelRestrictedCountry;
    }

    if (obj.hasOwnProperty("restrictedCountry")) {
      document.getElementById("restrictedCountries").value = obj.restrictedCountry;
    }

    if (obj.hasOwnProperty("ofacLicencePresent")) {
      document.getElementById("ofacLicencePresent").value = obj.ofacLicencePresent;
    }

    //Intended Use of Account
    if (obj.hasOwnProperty("transactionCountries")) {
      document.getElementById("transactionCountries").value = obj.transactionCountries;
    }

    //Transaction Countries
    if (obj.hasOwnProperty("intendedUseOfAccount")) {
      document.getElementById("intendedUseOfAccount").value = obj.intendedUseOfAccount;
    }

    document.getElementById("div7").style.width = "40%";

    //Filling Data when it's available
  } catch (error) {
    console.log("Something went wrong: " + error);
  }
};

export const FillAdditionalBusinessDetails = async (brn) => {
  if (brn != "") {
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
        if (BusinessDetails) {
          if (BusinessDetails.legalDetails) {
            var legalDetails = BusinessDetails.legalDetails;
            document.getElementById("registeredDate").value = legalDetails.registeredDate;
            document.getElementById("registeredCountry").value = legalDetails.registeredCountry;
          }
          if (BusinessDetails.website && BusinessDetails.website != "null") {
            document.getElementById("website").value = BusinessDetails.website;
          }

          if (BusinessDetails.additionalInfo) {
            var additionalInfo = BusinessDetails.additionalInfo;
            document.getElementById("searchId").value = additionalInfo.searchId;
            //document.getElementById("companyStatus").value = additionalInfo.companyStatus;
          }
        }
        var riskAssessmentInfo = obj.riskAssessmentInfo;
        if (riskAssessmentInfo) {
          if (riskAssessmentInfo.annualTurnover != "NA" || riskAssessmentInfo.annualTurnover != "null") {
            document.getElementById("annualTurnover").value = riskAssessmentInfo.annualTurnover;
          }

          if (riskAssessmentInfo.totalEmployees != "NA" || riskAssessmentInfo.totalEmployees != "null") {
            document.getElementById("totalEmployees").value = riskAssessmentInfo.totalEmployees;
          }
        }
      } else {
        toast.error("No results found");
      }
    } catch (error) {
      console.log("Error fetching business details: " + error.message);
    }
  } else {
    toast.error("Business Registration Number not found");
  }
};

// export const PostLegalDetails = async () => {
//   var registeredCountry = document.getElementById("registeredCountry").value;
//   var registeredDate = document.getElementById("registeredDate").value;
//   var listedExchange = document.getElementById("listedExchange").value;
//   var registrationType = document.getElementById("registrationType").value;
//   var legislationName = document.getElementById("legislationName").value;
//   var legislationType = document.getElementById("legislationType").value;

//   if (registeredCountry == "") {
//     toast.warn("Registered Country Must Not Be Empty");
//   } else if (registeredDate == "") {
//     toast.warn("Registered Date Must Not Be Empty");
//   } else if (sessionStorage.getItem("businessType").toLowerCase() == "company" && listedExchange == "") {
//     toast.warn("Listed Exchange Must Not Be Empty");
//   } else {
//     try {
//       const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postLegalDetails", {
//         params: {
//           businessRegistrationNumber: sessionStorage.getItem("businessRegistrationNumber"),
//           email: sessionStorage.getItem("lastemail"),
//           registeredCountry: registeredCountry,
//           registeredDate: registeredDate,
//           registrationType: registrationType,
//           listedExchange: listedExchange,
//           legislationName: legislationName,
//           legislationType: legislationType,
//         },
//       });

//       let obj = response.data;
//       if (obj.status == "SUCCESS") {
//         toast.success("Legal Details Submitted");
//         document.getElementById("submitLegalDetails").style.display = "none";
//         document.getElementById("updateLegalDetails").style.display = "";
//         document.getElementById("div7").style.width = "24%";
//       } else {
//         toast.error("Submission Failed: " + obj.message);
//         document.getElementById("submitLegalDetails").style.display = "";
//         document.getElementById("updateLegalDetails").style.display = "none";
//         document.getElementById("div7").style.width = "20%";
//       }
//     } catch (error) {
//       toast.error("Something went wrong: " + error);
//       document.getElementById("submitLegalDetails").style.display = "";
//       document.getElementById("updateLegalDetails").style.display = "none";
//       document.getElementById("div7").style.width = "20%";
//     }
//   }
// };

// export const PostWebsiteDetails = async () => {
//   var registeredCountry = document.getElementById("registeredCountry").value;
//   var registeredDate = document.getElementById("registeredDate").value;
//   var listedExchange = document.getElementById("listedExchange").value;
//   var registrationType = document.getElementById("registrationType").value;
//   var legislationName = document.getElementById("legislationName").value;
//   var legislationType = document.getElementById("legislationType").value;
//   var website = document.getElementById("website").value;

//   if (registeredCountry == "") {
//     toast.warn("Registered Country Must Not Be Empty");
//   } else if (registeredDate == "") {
//     toast.warn("Registered Country Must Not Be Empty");
//   } else if (sessionStorage.getItem("businessType").toLowerCase() == "company" && listedExchange == "") {
//     toast.warn("Listed Exchange Must Not Be Empty");
//   } else {
//     try {
//       const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postWebsiteDetails", {
//         params: {
//           businessRegistrationNumber: sessionStorage.getItem("businessRegistrationNumber"),
//           email: sessionStorage.getItem("lastemail"),
//           registeredCountry: registeredCountry,
//           registeredDate: registeredDate,
//           listedExchange: listedExchange,
//           registrationType: registrationType,
//           legislationName: legislationName,
//           legislationType: legislationType,
//           website: website,
//         },
//       });

//       let obj = response.data;
//       if (obj.status == "SUCCESS") {
//         toast.success("Website Details Submitted");
//         document.getElementById("submitWebsiteDetails").style.display = "none";
//         document.getElementById("updateWebsiteDetails").style.display = "";
//         document.getElementById("div7").style.width = "28%";
//       } else {
//         toast.error("Submission Failed: " + obj.message);
//         document.getElementById("submitWebsiteDetails").style.display = "";
//         document.getElementById("updateWebsiteDetails").style.display = "none";
//         document.getElementById("div7").style.width = "24%";
//       }
//     } catch (error) {
//       toast.error("Something went wrong: " + error);
//       document.getElementById("submitWebsiteDetails").style.display = "";
//       document.getElementById("updateWebsiteDetails").style.display = "none";
//       document.getElementById("div7").style.width = "24%";
//     }
//   }
// };

// export const PostTaxDetails = async () => {
//   var registeredCountry = document.getElementById("registeredCountry").value;
//   var registeredDate = document.getElementById("registeredDate").value;
//   var listedExchange = document.getElementById("listedExchange").value;
//   var registrationType = document.getElementById("registrationType").value;
//   var legislationName = document.getElementById("legislationName").value;
//   var legislationType = document.getElementById("legislationType").value;
//   var website = document.getElementById("website").value;
//   var taxCountry = document.getElementById("taxCountry").value;
//   var taxNumber = document.getElementById("taxNumber").value;

//   if (registeredCountry == "") {
//     toast.warn("Registered Country Must Not Be Empty");
//   } else if (registeredDate == "") {
//     toast.warn("Registered Country Must Not Be Empty");
//   } else if (sessionStorage.getItem("businessType").toLowerCase() == "company" && listedExchange == "") {
//     toast.warn("Listed Exchange Must Not Be Empty");
//   } else {
//     try {
//       const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postTaxDetails", {
//         params: {
//           businessRegistrationNumber: sessionStorage.getItem("businessRegistrationNumber"),
//           email: sessionStorage.getItem("lastemail"),
//           registeredCountry: registeredCountry,
//           registeredDate: registeredDate,
//           listedExchange: listedExchange,
//           registrationType: registrationType,
//           legislationName: legislationName,
//           legislationType: legislationType,
//           website: website,
//           taxCountry: taxCountry,
//           taxNumber: taxNumber,
//         },
//       });

//       let obj = response.data;
//       if (obj.status == "SUCCESS") {
//         toast.success("Tax Details Submitted");
//         document.getElementById("submitTaxDetails").style.display = "none";
//         document.getElementById("updateTaxDetails").style.display = "";
//         document.getElementById("div7").style.width = "32%";
//       } else {
//         toast.error("Submission Failed: " + obj.message);
//         document.getElementById("submitTaxDetails").style.display = "";
//         document.getElementById("updateTaxDetails").style.display = "none";
//         document.getElementById("div7").style.width = "28%";
//       }
//     } catch (error) {
//       toast.error("Something went wrong: " + error);
//       document.getElementById("submitTaxDetails").style.display = "";
//       document.getElementById("updateTaxDetails").style.display = "none";
//       document.getElementById("div7").style.width = "28%";
//     }
//   }
// };

// export const PostRegulatoryDetails = async () => {
//   var registeredCountry = document.getElementById("registeredCountry").value;
//   var registeredDate = document.getElementById("registeredDate").value;
//   var listedExchange = document.getElementById("listedExchange").value;
//   var registrationType = document.getElementById("registrationType").value;
//   var legislationName = document.getElementById("legislationName").value;
//   var legislationType = document.getElementById("legislationType").value;
//   var website = document.getElementById("website").value;
//   var taxCountry = document.getElementById("taxCountry").value;
//   var taxNumber = document.getElementById("taxNumber").value;
//   var regulatedTrustType = document.getElementById("regulatedTrustType").value;
//   var unregulatedTrustType = document.getElementById("unregulatedTrustType").value;
//   var searchId = document.getElementById("searchId").value;

//   if (registeredCountry == "") {
//     toast.warn("Registered Country Must Not Be Empty");
//   } else if (registeredDate == "") {
//     toast.warn("Registered Country Must Not Be Empty");
//   } else if (sessionStorage.getItem("businessType").toLowerCase() == "company" && listedExchange == "") {
//     toast.warn("Listed Exchange Must Not Be Empty");
//   } else if (sessionStorage.getItem("businessType").toLowerCase() == "trust" && unregulatedTrustType == "") {
//     toast.warn("Unregulated Trust Type Must Not Be Empty");
//   } else {
//     try {
//       const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postRegulatoryDetails", {
//         params: {
//           businessRegistrationNumber: sessionStorage.getItem("businessRegistrationNumber"),
//           email: sessionStorage.getItem("lastemail"),
//           registeredCountry: registeredCountry,
//           registeredDate: registeredDate,
//           listedExchange: listedExchange,
//           registrationType: registrationType,
//           legislationName: legislationName,
//           legislationType: legislationType,
//           website: website,
//           taxCountry: taxCountry,
//           taxNumber: taxNumber,
//           regulatedTrustType: regulatedTrustType,
//           unregulatedTrustType: unregulatedTrustType,
//           searchId: searchId,
//         },
//       });

//       let obj = response.data;
//       if (obj.status == "SUCCESS") {
//         toast.success("Regulatory Details Submitted");
//         document.getElementById("submitRegulatoryDetails").style.display = "none";
//         document.getElementById("updateRegulatoryDetails").style.display = "";
//         document.getElementById("div7").style.width = "36%";
//       } else {
//         toast.error("Submission Failed: " + obj.message);
//         document.getElementById("submitRegulatoryDetails").style.display = "";
//         document.getElementById("updateRegulatoryDetails").style.display = "none";
//         document.getElementById("div7").style.width = "32%";
//       }
//     } catch (error) {
//       toast.error("Something went wrong: " + error);
//       document.getElementById("submitRegulatoryDetails").style.display = "";
//       document.getElementById("updateRegulatoryDetails").style.display = "none";
//       document.getElementById("div7").style.width = "32%";
//     }
//   }
// };

export const PostRiskAssessmentInfo = async (selectedCopValues, selectedTCValues) => {
  var registeredCountry = document.getElementById("registeredCountry").value;
  var registeredDate = document.getElementById("registeredDate").value;
  var listedExchange = document.getElementById("listedExchange").value;
  var registrationType = document.getElementById("registrationType").value;
  var legislationName = document.getElementById("legislationName").value;
  var legislationType = document.getElementById("legislationType").value;
  var website = document.getElementById("website").value;
  var taxCountry = document.getElementById("taxCountry").value;
  var taxNumber = document.getElementById("taxNumber").value;
  var regulatedTrustType = document.getElementById("regulatedTrustType").value;
  var unregulatedTrustType = document.getElementById("unregulatedTrustType").value;
  var searchId = document.getElementById("searchId").value;

  var totalEmployees = document.getElementById("totalEmployees").value;
  var annualTurnover = document.getElementById("annualTurnover").value;
  var industrySector = document.getElementById("industrySector").value;

  //var countryOfOperation = document.getElementById("countryOfOperation").value;
  var countryOfOperation = selectedCopValues;

  var travelRestrictedCountry = document.getElementById("travelRestrictedCountry").value;
  var restrictedCountries = document.getElementById("restrictedCountries").value;
  var ofacLicencePresent = document.getElementById("ofacLicencePresent").value;

  //var transactionCountries = document.getElementById("transactionCountries").value;
  var transactionCountries = selectedTCValues;
  var intendedUseOfAccount = document.getElementById("intendedUseOfAccount").value;

  if (registeredCountry == "") {
    toast.warn("Registered Country Must Not Be Empty");
  } else if (registeredDate == "") {
    toast.warn("Registered Date Must Not Be Empty");
  } else if (sessionStorage.getItem("businessType").toLowerCase() == "public_company" && listedExchange == "") {
    toast.warn("Listed Exchange Must Not Be Empty");
  } else if (sessionStorage.getItem("businessType").toLowerCase() == "trust" && unregulatedTrustType == "") {
    toast.warn("Unregulated Trust Type Must Not Be Empty");
  } else if (totalEmployees == "") {
    toast.warn("Total Employees Must Not Be Empty");
  } else if (annualTurnover == "") {
    toast.warn("Annual Turnover Must Not Be Empty");
  } else if (industrySector == "") {
    toast.warn("Industry Sector Must Not Be Empty");
  } else if (countryOfOperation == "") {
    toast.warn("Country Of Operation Must Not Be Empty");
  } else if (transactionCountries == "") {
    toast.warn("Transaction Countries Must Not Be Empty");
  } else if (intendedUseOfAccount == "") {
    toast.warn("Intended Use Of Account Must Not Be Empty");
  } else {
    try {
      const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/postRiskAssessmentInfo", {
        params: {
          businessRegistrationNumber: sessionStorage.getItem("businessRegistrationNumber"),
          email: sessionStorage.getItem("lastemail"),
          registeredCountry: registeredCountry,
          registeredDate: registeredDate,
          listedExchange: listedExchange,
          registrationType: registrationType,
          legislationName: legislationName,
          legislationType: legislationType,
          website: website,
          taxCountry: taxCountry,
          taxNumber: taxNumber,
          regulatedTrustType: regulatedTrustType,
          unregulatedTrustType: unregulatedTrustType,
          totalEmployees: totalEmployees,
          annualTurnover: annualTurnover,
          industrySector: industrySector,
          countryOfOperation: countryOfOperation,
          travelRestrictedCountry: travelRestrictedCountry,
          restrictedCountries: restrictedCountries,
          ofacLicencePresent: ofacLicencePresent,
          searchId: searchId,
          transactionCountries: transactionCountries,
          intendedUseOfAccount: intendedUseOfAccount,
        },
      });

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Business Details Submitted");
        document.getElementById("submitRiskAssessmentInfo").style.display = "none";
        document.getElementById("updateRiskAssessmentInfo").style.display = "";
        document.getElementById("div7").style.width = "40%";
      } else {
        toast.error("Submission Failed: " + obj.message);
        document.getElementById("submitRiskAssessmentInfo").style.display = "";
        document.getElementById("updateRiskAssessmentInfo").style.display = "none";
      }
    } catch (error) {
      toast.error("Something went wrong: " + error);
      document.getElementById("submitRiskAssessmentInfo").style.display = "";
      document.getElementById("updateRiskAssessmentInfo").style.display = "none";
    }
  }
};

// export const PatchLegalDetails = async () => {
//   var registeredCountry = document.getElementById("registeredCountry").value;
//   var registeredDate = document.getElementById("registeredDate").value;
//   var listedExchange = document.getElementById("listedExchange").value;
//   var registrationType = document.getElementById("registrationType").value;
//   var legislationName = document.getElementById("legislationName").value;
//   var legislationType = document.getElementById("legislationType").value;

//   if (registeredCountry == "") {
//     toast.warn("Registered Country Must Not Be Empty");
//   } else if (registeredDate == "") {
//     toast.warn("Registered Date Must Not Be Empty");
//   } else if (sessionStorage.getItem("businessType").toLowerCase() == "company" && listedExchange == "") {
//     toast.warn("Listed Exchange Must Not Be Empty");
//   } else {
//     try {
//       const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchLegalDetails", {
//         params: {
//           businessRegistrationNumber: sessionStorage.getItem("businessRegistrationNumber"),
//           registeredCountry: registeredCountry,
//           registeredDate: registeredDate,
//           registrationType: registrationType,
//           listedExchange: listedExchange,
//           legislationName: legislationName,
//           legislationType: legislationType,
//         },
//       });

//       let obj = response.data;
//       if (obj.status == "SUCCESS") {
//         toast.success("Legal Details Updated");
//       } else {
//         toast.error("Update Failed: " + obj.message);
//       }
//     } catch (error) {
//       toast.error("Something went wrong: " + error);
//     }
//   }
// };

// export const PatchWebsiteDetails = async () => {
//   var website = document.getElementById("website").value;

//   try {
//     const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchWebsiteDetails", {
//       params: {
//         businessRegistrationNumber: sessionStorage.getItem("businessRegistrationNumber"),
//         website: website,
//       },
//     });

//     let obj = response.data;
//     if (obj.status == "SUCCESS") {
//       toast.success("Website Details Updated");
//       document.getElementById("submitWebsiteDetails").style.display = "none";
//       document.getElementById("updateWebsiteDetails").style.display = "";
//     } else {
//       toast.error("Update Failed: " + obj.message);
//       document.getElementById("submitWebsiteDetails").style.display = "";
//       document.getElementById("updateWebsiteDetails").style.display = "none";
//     }
//   } catch (error) {
//     toast.error("Something went wrong: " + error);
//     document.getElementById("submitWebsiteDetails").style.display = "";
//     document.getElementById("updateWebsiteDetails").style.display = "none";
//   }
// };

// export const PatchTaxDetails = async () => {
//   var taxCountry = document.getElementById("taxCountry").value;
//   var taxNumber = document.getElementById("taxNumber").value;

//   try {
//     const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchTaxDetails", {
//       params: {
//         businessRegistrationNumber: sessionStorage.getItem("businessRegistrationNumber"),
//         taxCountry: taxCountry,
//         taxNumber: taxNumber,
//       },
//     });

//     let obj = response.data;
//     if (obj.status == "SUCCESS") {
//       toast.success("Tax Details Updated");
//       document.getElementById("submitTaxDetails").style.display = "none";
//       document.getElementById("updateTaxDetails").style.display = "";
//     } else {
//       toast.error("Update Failed: " + obj.message);
//       document.getElementById("submitTaxDetails").style.display = "";
//       document.getElementById("updateTaxDetails").style.display = "none";
//     }
//   } catch (error) {
//     toast.error("Something went wrong: " + error);
//     document.getElementById("submitTaxDetails").style.display = "";
//     document.getElementById("updateTaxDetails").style.display = "none";
//   }
// };

// export const PatchRegulatoryDetails = async () => {
//   var regulatedTrustType = document.getElementById("regulatedTrustType").value;
//   var unregulatedTrustType = document.getElementById("unregulatedTrustType").value;
//   var searchId = document.getElementById("searchId").value;

//   try {
//     const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchRegulatoryDetails", {
//       params: {
//         businessRegistrationNumber: sessionStorage.getItem("businessRegistrationNumber"),
//         regulatedTrustType: regulatedTrustType,
//         unregulatedTrustType: unregulatedTrustType,
//         searchId: searchId,
//       },
//     });

//     let obj = response.data;
//     if (obj.status == "SUCCESS") {
//       toast.success("Regulatory Details Updated");
//       document.getElementById("submitRegulatoryDetails").style.display = "none";
//       document.getElementById("updateRegulatoryDetails").style.display = "";
//     } else {
//       toast.error("Update Failed: " + obj.message);
//       document.getElementById("submitRegulatoryDetails").style.display = "";
//       document.getElementById("updateRegulatoryDetails").style.display = "none";
//     }
//   } catch (error) {
//     toast.error("Something went wrong: " + error);
//     document.getElementById("submitRegulatoryDetails").style.display = "";
//     document.getElementById("updateRegulatoryDetails").style.display = "none";
//   }
// };

export const PatchRiskAssessmentInfo = async (selectedCopValues, selectedTCValues) => {
  var registeredCountry = document.getElementById("registeredCountry").value;
  var registeredDate = document.getElementById("registeredDate").value;
  var listedExchange = document.getElementById("listedExchange").value;
  var registrationType = document.getElementById("registrationType").value;
  var legislationName = document.getElementById("legislationName").value;
  var legislationType = document.getElementById("legislationType").value;
  var website = document.getElementById("website").value;
  var taxCountry = document.getElementById("taxCountry").value;
  var taxNumber = document.getElementById("taxNumber").value;
  var regulatedTrustType = document.getElementById("regulatedTrustType").value;
  var unregulatedTrustType = document.getElementById("unregulatedTrustType").value;
  var searchId = document.getElementById("searchId").value;

  var totalEmployees = document.getElementById("totalEmployees").value;
  var annualTurnover = document.getElementById("annualTurnover").value;
  var industrySector = document.getElementById("industrySector").value;
  //var countryOfOperation = document.getElementById("countryOfOperation").value;
  var travelRestrictedCountry = document.getElementById("travelRestrictedCountry").value;
  var restrictedCountries = document.getElementById("restrictedCountries").value;
  var ofacLicencePresent = document.getElementById("ofacLicencePresent").value;

  //var transactionCountries = document.getElementById("transactionCountries").value;
  var intendedUseOfAccount = document.getElementById("intendedUseOfAccount").value;

  var countryOfOperation = selectedCopValues;
  var transactionCountries = selectedTCValues;

  if (registeredCountry == "") {
    toast.warn("Registered Country Must Not Be Empty");
  } else if (registeredDate == "") {
    toast.warn("Registered Date Must Not Be Empty");
  } else if (sessionStorage.getItem("businessType").toLowerCase() == "public_company" && listedExchange == "") {
    toast.warn("Listed Exchange Must Not Be Empty");
  } else if (sessionStorage.getItem("businessType").toLowerCase() == "trust" && unregulatedTrustType == "") {
    toast.warn("Unregulated Trust Type Must Not Be Empty");
  } else if (totalEmployees == "") {
    toast.warn("Total Employees Must Not Be Empty");
  } else if (annualTurnover == "") {
    toast.warn("Annual Turnover Must Not Be Empty");
  } else if (industrySector == "") {
    toast.warn("Industry Sector Must Not Be Empty");
  } else if (countryOfOperation == "") {
    toast.warn("Country Of Operation Must Not Be Empty");
  } else if (transactionCountries == "") {
    toast.warn("Transaction Countries Must Not Be Empty");
  } else if (intendedUseOfAccount == "") {
    toast.warn("Intended Use Of Account Must Not Be Empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/patchRiskAssessmentInfo",
        {
          params: {
            businessRegistrationNumber: sessionStorage.getItem("businessRegistrationNumber"),
            registeredCountry: registeredCountry,
            registeredDate: registeredDate,
            listedExchange: listedExchange,
            registrationType: registrationType,
            legislationName: legislationName,
            legislationType: legislationType,
            website: website,
            taxCountry: taxCountry,
            taxNumber: taxNumber,
            regulatedTrustType: regulatedTrustType,
            unregulatedTrustType: unregulatedTrustType,
            totalEmployees: totalEmployees,
            annualTurnover: annualTurnover,
            industrySector: industrySector,
            countryOfOperation: countryOfOperation,
            travelRestrictedCountry: travelRestrictedCountry,
            restrictedCountries: restrictedCountries,
            ofacLicencePresent: ofacLicencePresent,
            searchId: searchId,
            transactionCountries: transactionCountries,
            intendedUseOfAccount: intendedUseOfAccount,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Business Details Updated");
        document.getElementById("submitRiskAssessmentInfo").style.display = "none";
        document.getElementById("updateRiskAssessmentInfo").style.display = "";
      } else {
        toast.error("Update Failed: " + obj.message);
        document.getElementById("submitRiskAssessmentInfo").style.display = "";
        document.getElementById("updateRiskAssessmentInfo").style.display = "none";
      }
    } catch (error) {
      toast.error("Something went wrong: " + error);
      document.getElementById("submitRiskAssessmentInfo").style.display = "";
      document.getElementById("updateRiskAssessmentInfo").style.display = "none";
    }
  }
};
