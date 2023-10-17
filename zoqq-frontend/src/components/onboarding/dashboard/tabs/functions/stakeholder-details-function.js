import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

export const FillStakeholderDetails = async (brn) => {
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
          var stakeholders = BusinessDetails.stakeholders;
          sessionStorage.setItem("stakeholderDataset", JSON.stringify(stakeholders));
          return stakeholders;
          // var StakeholderFirst = stakeholders[0];
          // if (StakeholderFirst.hasOwnProperty("stakeholderDetails")) {
          //   var data = StakeholderFirst.stakeholderDetails;
          //   if (data.hasOwnProperty("firstName")) {
          //     document.getElementById("firstNameStakeholder").value = data.firstName;
          //   }

          //   if (data.hasOwnProperty("middleName")) {
          //     document.getElementById("middleNameStakeholder").value = data.middleName;
          //   }

          //   if (data.hasOwnProperty("lastName")) {
          //     document.getElementById("lastNameStakeholder").value = data.lastName;
          //   }

          //   if (data.hasOwnProperty("nationality")) {
          //     document.getElementById("nationalityStakeholder").value = data.nationality;
          //   }

          //   if (data.hasOwnProperty("dateOfBirth")) {
          //     document.getElementById("dateOfBirthStakeholder").value = data.dateOfBirth;
          //   }
          //   document.getElementById("div7").style.width = "43%";

          //   // Continue checking and setting values for other fields...

          //   // Contact Details
          //   if (data.hasOwnProperty("contactDetails")) {
          //     var ContactDetails = data.contactDetails;
          //     if (ContactDetails.hasOwnProperty("contactNumber")) {
          //       document.getElementById("contactNoStakeholder").value = ContactDetails.contactNumber;
          //     }

          //     if (ContactDetails.hasOwnProperty("email")) {
          //       document.getElementById("emailStakeholder").value = ContactDetails.emailStakeholder;
          //     }
          //     document.getElementById("div7").style.width = "46%";
          //   }

          //   // Professional Details
          //   if (data.hasOwnProperty("professionalDetails")) {
          //     var ProfessionalDetails = data.professionalDetails[0];

          //     if (ProfessionalDetails.hasOwnProperty("position")) {
          //       document.getElementById("positionStakeholder").value = ProfessionalDetails.position;
          //     }

          //     if (ProfessionalDetails.hasOwnProperty("sharePercentage")) {
          //       document.getElementById("sharePercentageStakeholder").value = ProfessionalDetails.sharePercentage;
          //     }
          //     document.getElementById("div7").style.width = "49%";
          //   }

          //   // Stakeholder Address Details
          //   if (data.hasOwnProperty("address")) {
          //     var StakeholderAddress = data.address;
          //     if (StakeholderAddress.hasOwnProperty("addressLine1")) {
          //       document.getElementById("addressLine1Stakeholder").value = StakeholderAddress.addressLine1;
          //     }

          //     if (StakeholderAddress.hasOwnProperty("addressLine2")) {
          //       document.getElementById("addressLine2Stakeholder").value = StakeholderAddress.addressLine2;
          //     }

          //     if (StakeholderAddress.hasOwnProperty("city")) {
          //       document.getElementById("cityStakeholder").value = StakeholderAddress.city;
          //     }

          //     if (StakeholderAddress.hasOwnProperty("state")) {
          //       document.getElementById("stateStakeholder").value = StakeholderAddress.state;
          //     }

          //     if (StakeholderAddress.hasOwnProperty("postcode")) {
          //       document.getElementById("postcodeStakeholder").value = StakeholderAddress.postcode;
          //     }

          //     if (StakeholderAddress.hasOwnProperty("country")) {
          //       document.getElementById("countryStakeholder").value = StakeholderAddress.country;
          //     }
          //     document.getElementById("div7").style.width = "53%";
          //   }
          // }
          // // Business Partner Details
          // if (StakeholderFirst.hasOwnProperty("businessPartner")) {
          //   document.getElementById("businessNameStakeholder").value = StakeholderFirst.businessPartner;
          // }
          // if (StakeholderFirst.hasOwnProperty("businessRegistrationNumber")) {
          //   document.getElementById("businessRegistrationNumberStakeholder").value =
          //     StakeholderFirst.businessRegistrationNumber;
          // }
          // if (StakeholderFirst.hasOwnProperty("businessType")) {
          //   document.getElementById("businessTypeStakeholder").value = StakeholderFirst.businessType;
          // }
          // if (StakeholderFirst.hasOwnProperty("entityType")) {
          //   document.getElementById("businessEntityTypeStakeholder").value = StakeholderFirst.entityType;
          // }
          // if (StakeholderFirst.hasOwnProperty("registeredCountry")) {
          //   document.getElementById("registeredCountryStakeholder").value = StakeholderFirst.registeredCountry;
          // }

          // document.getElementById("div7").style.width = "56%";

          // Business Partner Address Details - to be added when proper response is available
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerAddress1")) {
          //   document.getElementById("addressLine1BusinessPartner").value = StakeholderFirst.stakeholderPartnerAddress1;
          // }
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerAddress2")) {
          //   document.getElementById("addressLine2BusinessPartner").value = StakeholderFirst.stakeholderPartnerAddress2;
          // }
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerCity")) {
          //   document.getElementById("cityBusinessPartner").value = StakeholderFirst.stakeholderPartnerCity;
          // }
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerState")) {
          //   document.getElementById("stateBusinessPartner").value = StakeholderFirst.stakeholderPartnerState;
          // }
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerPostcode")) {
          //   document.getElementById("postcodeBusinessPartner").value = StakeholderFirst.stakeholderPartnerPostcode;
          // }
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerCountry")) {
          //   document.getElementById("countryBusinessPartner").value = StakeholderFirst.stakeholderPartnerCountry;
          // }

          // document.getElementById("div7").style.width = "60%";
        }
      } else {
        toast.error("No results found");
      }
    } catch (error) {
      console.log("Error fetching stakeholder details: " + error.message);
    }
  } else {
    toast.error("Business Registration Number not found");
  }
};

export const NextStakeholderDetails = async (brn, pageNumber) => {
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
          var stakeholders = BusinessDetails.stakeholders;
          var StakeholderFirst = stakeholders[pageNumber];
          if (StakeholderFirst.hasOwnProperty("stakeholderDetails")) {
            var data = StakeholderFirst.stakeholderDetails;
            if (data.hasOwnProperty("firstName")) {
              document.getElementById("firstNameStakeholder").value = data.firstName;
            }

            if (data.hasOwnProperty("middleName")) {
              document.getElementById("middleNameStakeholder").value = data.middleName;
            }

            if (data.hasOwnProperty("lastName")) {
              document.getElementById("lastNameStakeholder").value = data.lastName;
            }

            if (data.hasOwnProperty("nationality")) {
              document.getElementById("nationalityStakeholder").value = data.nationality;
            }

            if (data.hasOwnProperty("dateOfBirth")) {
              document.getElementById("dateOfBirthStakeholder").value = data.dateOfBirth;
            }
            document.getElementById("div7").style.width = "43%";

            // Continue checking and setting values for other fields...

            // Contact Details
            if (data.hasOwnProperty("contactDetails")) {
              var ContactDetails = data.contactDetails;
              if (ContactDetails.hasOwnProperty("contactNumber")) {
                document.getElementById("contactNoStakeholder").value = ContactDetails.contactNumber;
              }

              if (ContactDetails.hasOwnProperty("email")) {
                document.getElementById("emailStakeholder").value = ContactDetails.emailStakeholder;
              }
              document.getElementById("div7").style.width = "46%";
            }

            // Professional Details
            if (data.hasOwnProperty("professionalDetails")) {
              var ProfessionalDetails = data.professionalDetails[0];

              if (ProfessionalDetails.hasOwnProperty("position")) {
                document.getElementById("positionStakeholder").value = ProfessionalDetails.position;
              }

              if (ProfessionalDetails.hasOwnProperty("sharePercentage")) {
                document.getElementById("sharePercentageStakeholder").value = ProfessionalDetails.sharePercentage;
              }
              document.getElementById("div7").style.width = "49%";
            }

            // Stakeholder Address Details
            if (data.hasOwnProperty("address")) {
              var StakeholderAddress = data.address;
              if (StakeholderAddress.hasOwnProperty("addressLine1")) {
                document.getElementById("addressLine1Stakeholder").value = StakeholderAddress.addressLine1;
              }

              if (StakeholderAddress.hasOwnProperty("addressLine2")) {
                document.getElementById("addressLine2Stakeholder").value = StakeholderAddress.addressLine2;
              }

              if (StakeholderAddress.hasOwnProperty("city")) {
                document.getElementById("cityStakeholder").value = StakeholderAddress.city;
              }

              if (StakeholderAddress.hasOwnProperty("state")) {
                document.getElementById("stateStakeholder").value = StakeholderAddress.state;
              }

              if (StakeholderAddress.hasOwnProperty("postcode")) {
                document.getElementById("postcodeStakeholder").value = StakeholderAddress.postcode;
              }

              if (StakeholderAddress.hasOwnProperty("country")) {
                document.getElementById("countryStakeholder").value = StakeholderAddress.country;
              }
              document.getElementById("div7").style.width = "53%";
            }
          }
          // Business Partner Details
          if (StakeholderFirst.hasOwnProperty("businessPartner")) {
            document.getElementById("businessNameStakeholder").value = StakeholderFirst.businessPartner;
          }
          if (StakeholderFirst.hasOwnProperty("businessRegistrationNumber")) {
            document.getElementById("businessRegistrationNumberStakeholder").value =
              StakeholderFirst.businessRegistrationNumber;
          }
          if (StakeholderFirst.hasOwnProperty("businessType")) {
            document.getElementById("businessTypeStakeholder").value = StakeholderFirst.businessType;
          }
          if (StakeholderFirst.hasOwnProperty("entityType")) {
            document.getElementById("businessEntityTypeStakeholder").value = StakeholderFirst.entityType;
          }
          if (StakeholderFirst.hasOwnProperty("registeredCountry")) {
            document.getElementById("registeredCountryStakeholder").value = StakeholderFirst.registeredCountry;
          }

          document.getElementById("div7").style.width = "56%";

          // Business Partner Address Details - to be added when proper response is available
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerAddress1")) {
          //   document.getElementById("addressLine1BusinessPartner").value = StakeholderFirst.stakeholderPartnerAddress1;
          // }
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerAddress2")) {
          //   document.getElementById("addressLine2BusinessPartner").value = StakeholderFirst.stakeholderPartnerAddress2;
          // }
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerCity")) {
          //   document.getElementById("cityBusinessPartner").value = StakeholderFirst.stakeholderPartnerCity;
          // }
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerState")) {
          //   document.getElementById("stateBusinessPartner").value = StakeholderFirst.stakeholderPartnerState;
          // }
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerPostcode")) {
          //   document.getElementById("postcodeBusinessPartner").value = StakeholderFirst.stakeholderPartnerPostcode;
          // }
          // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerCountry")) {
          //   document.getElementById("countryBusinessPartner").value = StakeholderFirst.stakeholderPartnerCountry;
          // }

          // document.getElementById("div7").style.width = "60%";
        }
      } else {
        toast.error("No results found");
      }
    } catch (error) {
      console.log("Error fetching stakeholder details: " + error.message);
    }
  } else {
    toast.error("Business Registration Number not found");
  }
};

//POST calls
export const PostStakeholderDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var firstNameStakeholder = document.getElementById("firstNameStakeholder").value;
  var middleNameStakeholder = document.getElementById("middleNameStakeholder").value;
  var lastNameStakeholder = document.getElementById("lastNameStakeholder").value;
  var nationalityStakeholder = document.getElementById("nationalityStakeholder").value;
  var dateOfBirthStakeholder = document.getElementById("dateOfBirthStakeholder").value;
  var kycModeStakeholder = document.getElementById("kycModeStakeholder").value;
  var isResidentStakeholder = document.getElementById("isResidentStakeholder").value;

  if (firstNameStakeholder == "") {
    toast.warn("First Name must not be empty");
  } else if (lastNameStakeholder == "") {
    toast.warn("Last Name must not be empty");
  } else if (nationalityStakeholder == "") {
    toast.warn("Nationality must not be empty");
  } else if (kycModeStakeholder == "") {
    toast.warn("Kyc Mode must not be empty");
  } else {
    try {
      const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PostStakeholderDetails", {
        params: {
          businessRegistrationNumber: brn,
          email: sessionStorage.getItem("lastemail"),
          firstNameStakeholder: firstNameStakeholder,
          middleNameStakeholder: middleNameStakeholder,
          lastNameStakeholder: lastNameStakeholder,
          nationalityStakeholder: nationalityStakeholder,
          dateOfBirthStakeholder: dateOfBirthStakeholder,
          kycModeStakeholder: kycModeStakeholder,
          isResidentStakeholder: isResidentStakeholder,
        },
      });

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Stakeholder Details Submitted");
        document.getElementById("submitStakeholderDetails").style.display = "none";
        document.getElementById("updateStakeholderDetails").style.display = "";
      } else {
        toast.error("Submission failed: " + obj.message);
        document.getElementById("submitStakeholderDetails").style.display = "";
        document.getElementById("updateStakeholderDetails").style.display = "none";
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
      document.getElementById("submitStakeholderDetails").style.display = "";
      document.getElementById("updateStakeholderDetails").style.display = "none";
    }
  }
};

export const PostContactDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var firstNameStakeholder = document.getElementById("firstNameStakeholder").value;
  var middleNameStakeholder = document.getElementById("middleNameStakeholder").value;
  var lastNameStakeholder = document.getElementById("lastNameStakeholder").value;
  var nationalityStakeholder = document.getElementById("nationalityStakeholder").value;
  var dateOfBirthStakeholder = document.getElementById("dateOfBirthStakeholder").value;
  var kycModeStakeholder = document.getElementById("kycModeStakeholder").value;
  var isResidentStakeholder = document.getElementById("isResidentStakeholder").value;

  //Contact Details
  var contactNoStakeholder = document.getElementById("contactNoStakeholder").value;
  var emailStakeholder = document.getElementById("emailStakeholder").value;

  if (firstNameStakeholder == "") {
    toast.warn("firstNameStakeholder must not be empty");
  } else if (lastNameStakeholder == "") {
    toast.warn("lastNameStakeholder must not be empty");
  } else if (nationalityStakeholder == "") {
    toast.warn("nationalityStakeholder must not be empty");
  } else if (kycModeStakeholder == "") {
    toast.warn("kycModeStakeholder must not be empty");
  } else if (emailStakeholder == "") {
    toast.warn("Email must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PostStakeholderContactDetails",
        {
          params: {
            businessRegistrationNumber: brn,
            email: sessionStorage.getItem("lastemail"),
            firstNameStakeholder: firstNameStakeholder,
            middleNameStakeholder: middleNameStakeholder,
            lastNameStakeholder: lastNameStakeholder,
            nationalityStakeholder: nationalityStakeholder,
            dateOfBirthStakeholder: dateOfBirthStakeholder,
            kycModeStakeholder: kycModeStakeholder,
            isResidentStakeholder: isResidentStakeholder,

            //Contact Details
            contactNoStakeholder: contactNoStakeholder,
            emailStakeholder: emailStakeholder,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Stakeholder Contact Details Submitted");
        document.getElementById("submitContactDetails").style.display = "none";
        document.getElementById("updateContactDetails").style.display = "";
      } else {
        toast.error("Submission failed: " + obj.message);
        document.getElementById("submitContactDetails").style.display = "";
        document.getElementById("updateContactDetails").style.display = "none";
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
      document.getElementById("submitContactDetails").style.display = "";
      document.getElementById("updateContactDetails").style.display = "none";
    }
  }
};

export const PostProfessionalDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var firstNameStakeholder = document.getElementById("firstNameStakeholder").value;
  var middleNameStakeholder = document.getElementById("middleNameStakeholder").value;
  var lastNameStakeholder = document.getElementById("lastNameStakeholder").value;
  var nationalityStakeholder = document.getElementById("nationalityStakeholder").value;
  var dateOfBirthStakeholder = document.getElementById("dateOfBirthStakeholder").value;
  var kycModeStakeholder = document.getElementById("kycModeStakeholder").value;
  var isResidentStakeholder = document.getElementById("isResidentStakeholder").value;

  //Contact Details
  var contactNoStakeholder = document.getElementById("contactNoStakeholder").value;
  var emailStakeholder = document.getElementById("emailStakeholder").value;

  //Professional Details
  var positionStakeholder = document.getElementById("positionStakeholder").value;
  var sharePercentageStakeholder = document.getElementById("sharePercentageStakeholder").value;

  if (firstNameStakeholder == "") {
    toast.warn("firstNameStakeholder must not be empty");
  } else if (lastNameStakeholder == "") {
    toast.warn("lastNameStakeholder must not be empty");
  } else if (nationalityStakeholder == "") {
    toast.warn("nationalityStakeholder must not be empty");
  } else if (kycModeStakeholder == "") {
    toast.warn("kycModeStakeholder must not be empty");
  } else if (emailStakeholder == "") {
    toast.warn("Email must not be empty");
  } else if (positionStakeholder == "") {
    toast.warn("Stakeholder Position must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PostStakeholderProfessionalDetails",
        {
          params: {
            businessRegistrationNumber: brn,
            email: sessionStorage.getItem("lastemail"),
            firstNameStakeholder: firstNameStakeholder,
            middleNameStakeholder: middleNameStakeholder,
            lastNameStakeholder: lastNameStakeholder,
            nationalityStakeholder: nationalityStakeholder,
            dateOfBirthStakeholder: dateOfBirthStakeholder,
            kycModeStakeholder: kycModeStakeholder,
            isResidentStakeholder: isResidentStakeholder,

            //Contact Details
            contactNoStakeholder: contactNoStakeholder,
            emailStakeholder: emailStakeholder,

            //Professional Details
            positionStakeholder: positionStakeholder,
            sharePercentageStakeholder: sharePercentageStakeholder,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Stakeholder Contact Details Submitted");
        document.getElementById("submitProfessionalDetails").style.display = "none";
        document.getElementById("updateProfessionalDetails").style.display = "";
      } else {
        toast.error("Submission failed: " + obj.message);
        document.getElementById("submitProfessionalDetails").style.display = "";
        document.getElementById("updateProfessionalDetails").style.display = "none";
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
      document.getElementById("submitProfessionalDetails").style.display = "";
      document.getElementById("updateProfessionalDetails").style.display = "none";
    }
  }
};

export const PostStakeholderAddressDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var firstNameStakeholder = document.getElementById("firstNameStakeholder").value;
  var middleNameStakeholder = document.getElementById("middleNameStakeholder").value;
  var lastNameStakeholder = document.getElementById("lastNameStakeholder").value;
  var nationalityStakeholder = document.getElementById("nationalityStakeholder").value;
  var dateOfBirthStakeholder = document.getElementById("dateOfBirthStakeholder").value;
  var kycModeStakeholder = document.getElementById("kycModeStakeholder").value;
  var isResidentStakeholder = document.getElementById("isResidentStakeholder").value;

  //Contact Details
  var contactNoStakeholder = document.getElementById("contactNoStakeholder").value;
  var emailStakeholder = document.getElementById("emailStakeholder").value;

  //Professional Details
  var positionStakeholder = document.getElementById("positionStakeholder").value;
  var sharePercentageStakeholder = document.getElementById("sharePercentageStakeholder").value;

  //Stakeholder Address Details
  var addressLine1Stakeholder = document.getElementById("addressLine1Stakeholder").value;
  var addressLine2Stakeholder = document.getElementById("addressLine2Stakeholder").value;
  var cityStakeholder = document.getElementById("cityStakeholder").value;
  var stateStakeholder = document.getElementById("stateStakeholder").value;
  var postcodeStakeholder = document.getElementById("postcodeStakeholder").value;
  var countryStakeholder = document.getElementById("countryStakeholder").value;

  if (firstNameStakeholder == "") {
    toast.warn("firstNameStakeholder must not be empty");
  } else if (lastNameStakeholder == "") {
    toast.warn("lastNameStakeholder must not be empty");
  } else if (nationalityStakeholder == "") {
    toast.warn("nationalityStakeholder must not be empty");
  } else if (kycModeStakeholder == "") {
    toast.warn("kycModeStakeholder must not be empty");
  } else if (emailStakeholder == "") {
    toast.warn("Email must not be empty");
  } else if (positionStakeholder == "") {
    toast.warn("Stakeholder Position must not be empty");
  } else if (addressLine1Stakeholder == "") {
    toast.warn("Address Line 1 must not be empty");
  } else if (postcodeStakeholder == "") {
    toast.warn("Postcode must not be empty");
  } else if (countryStakeholder == "") {
    toast.warn("Country must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PostStakeholderAddressDetails",
        {
          params: {
            businessRegistrationNumber: brn,
            email: sessionStorage.getItem("lastemail"),
            firstNameStakeholder: firstNameStakeholder,
            middleNameStakeholder: middleNameStakeholder,
            lastNameStakeholder: lastNameStakeholder,
            nationalityStakeholder: nationalityStakeholder,
            dateOfBirthStakeholder: dateOfBirthStakeholder,
            kycModeStakeholder: kycModeStakeholder,
            isResidentStakeholder: isResidentStakeholder,

            //Contact Details
            contactNoStakeholder: contactNoStakeholder,
            emailStakeholder: emailStakeholder,

            //Professional Details
            positionStakeholder: positionStakeholder,
            sharePercentageStakeholder: sharePercentageStakeholder,

            //Stakeholder Address Details
            addressLine1Stakeholder: addressLine1Stakeholder,
            addressLine2Stakeholder: addressLine2Stakeholder,
            cityStakeholder: cityStakeholder,
            stateStakeholder: stateStakeholder,
            postcodeStakeholder: postcodeStakeholder,
            countryStakeholder: countryStakeholder,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Stakeholder Address Details Submitted");
        document.getElementById("submitAddressDetails").style.display = "none";
        document.getElementById("updateAddressDetails").style.display = "";
      } else {
        toast.error("Submission failed: " + obj.message);
        document.getElementById("submitAddressDetails").style.display = "";
        document.getElementById("updateAddressDetails").style.display = "none";
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
      document.getElementById("submitAddressDetails").style.display = "";
      document.getElementById("updateAddressDetails").style.display = "none";
    }
  }
};

export const PostBusinessPartnerDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var firstNameStakeholder = document.getElementById("firstNameStakeholder").value;
  var middleNameStakeholder = document.getElementById("middleNameStakeholder").value;
  var lastNameStakeholder = document.getElementById("lastNameStakeholder").value;
  var nationalityStakeholder = document.getElementById("nationalityStakeholder").value;
  var dateOfBirthStakeholder = document.getElementById("dateOfBirthStakeholder").value;
  var kycModeStakeholder = document.getElementById("kycModeStakeholder").value;
  var isResidentStakeholder = document.getElementById("isResidentStakeholder").value;

  //Contact Details
  var contactNoStakeholder = document.getElementById("contactNoStakeholder").value;
  var emailStakeholder = document.getElementById("emailStakeholder").value;

  //Professional Details
  var positionStakeholder = document.getElementById("positionStakeholder").value;
  var sharePercentageStakeholder = document.getElementById("sharePercentageStakeholder").value;

  //Stakeholder Address Details
  var addressLine1Stakeholder = document.getElementById("addressLine1Stakeholder").value;
  var addressLine2Stakeholder = document.getElementById("addressLine2Stakeholder").value;
  var cityStakeholder = document.getElementById("cityStakeholder").value;
  var stateStakeholder = document.getElementById("stateStakeholder").value;
  var postcodeStakeholder = document.getElementById("postcodeStakeholder").value;
  var countryStakeholder = document.getElementById("countryStakeholder").value;

  //Business Partner Details
  var businessNameStakeholder = document.getElementById("businessNameStakeholder").value;
  var businessRegistrationNumberStakeholder = document.getElementById("businessRegistrationNumberStakeholder").value;
  var businessTypeStakeholder = document.getElementById("businessTypeStakeholder").value;
  var businessEntityTypeStakeholder = document.getElementById("businessEntityTypeStakeholder").value;
  var registeredCountryStakeholder = document.getElementById("registeredCountryStakeholder").value;

  if (firstNameStakeholder == "") {
    toast.warn("firstNameStakeholder must not be empty");
  } else if (lastNameStakeholder == "") {
    toast.warn("lastNameStakeholder must not be empty");
  } else if (nationalityStakeholder == "") {
    toast.warn("nationalityStakeholder must not be empty");
  } else if (kycModeStakeholder == "") {
    toast.warn("kycModeStakeholder must not be empty");
  } else if (emailStakeholder == "") {
    toast.warn("Email must not be empty");
  } else if (positionStakeholder == "") {
    toast.warn("Stakeholder Position must not be empty");
  } else if (addressLine1Stakeholder == "") {
    toast.warn("Address Line 1 must not be empty");
  } else if (postcodeStakeholder == "") {
    toast.warn("Postcode must not be empty");
  } else if (countryStakeholder == "") {
    toast.warn("Country must not be empty");
  } else if (businessNameStakeholder == "") {
    toast.warn("businessNameStakeholder must not be empty");
  } else if (businessRegistrationNumberStakeholder == "") {
    toast.warn("businessRegistrationNumberStakeholder must not be empty");
  } else if (businessEntityTypeStakeholder == "") {
    toast.warn("businessEntityTypeStakeholder must not be empty");
  } else if (registeredCountryStakeholder == "") {
    toast.warn("registeredCountryStakeholder must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PostBusinessPartnerDetails",
        {
          params: {
            businessRegistrationNumber: brn,
            email: sessionStorage.getItem("lastemail"),
            firstNameStakeholder: firstNameStakeholder,
            middleNameStakeholder: middleNameStakeholder,
            lastNameStakeholder: lastNameStakeholder,
            nationalityStakeholder: nationalityStakeholder,
            dateOfBirthStakeholder: dateOfBirthStakeholder,
            kycModeStakeholder: kycModeStakeholder,
            isResidentStakeholder: isResidentStakeholder,

            //Contact Details
            contactNoStakeholder: contactNoStakeholder,
            emailStakeholder: emailStakeholder,

            //Professional Details
            positionStakeholder: positionStakeholder,
            sharePercentageStakeholder: sharePercentageStakeholder,

            //Stakeholder Address Details
            addressLine1Stakeholder: addressLine1Stakeholder,
            addressLine2Stakeholder: addressLine2Stakeholder,
            cityStakeholder: cityStakeholder,
            stateStakeholder: stateStakeholder,
            postcodeStakeholder: postcodeStakeholder,
            countryStakeholder: countryStakeholder,

            //Business Partner
            businessNameStakeholder: businessNameStakeholder,
            businessRegistrationNumberStakeholder: businessRegistrationNumberStakeholder,
            businessTypeStakeholder: businessTypeStakeholder,
            businessEntityTypeStakeholder: businessEntityTypeStakeholder,
            registeredCountryStakeholder: registeredCountryStakeholder,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Stakeholder Business Partner Details Submitted");
        document.getElementById("submitBusinessPartnerDetails").style.display = "none";
        document.getElementById("updateBusinessPartnerDetails").style.display = "";
      } else {
        toast.error("Submission failed: " + obj.message);
        document.getElementById("submitBusinessPartnerDetails").style.display = "";
        document.getElementById("updateBusinessPartnerDetails").style.display = "none";
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
      document.getElementById("submitBusinessPartnerDetails").style.display = "";
      document.getElementById("updateBusinessPartnerDetails").style.display = "none";
    }
  }
};

export const PostBusinessPartnerAddressDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var firstNameStakeholder = document.getElementById("firstNameStakeholder").value;
  var middleNameStakeholder = document.getElementById("middleNameStakeholder").value;
  var lastNameStakeholder = document.getElementById("lastNameStakeholder").value;
  var nationalityStakeholder = document.getElementById("nationalityStakeholder").value;
  var dateOfBirthStakeholder = document.getElementById("dateOfBirthStakeholder").value;
  var kycModeStakeholder = document.getElementById("kycModeStakeholder").value;
  var isResidentStakeholder = document.getElementById("isResidentStakeholder").value;

  //Contact Details
  var contactNoStakeholder = document.getElementById("contactNoStakeholder").value;
  var emailStakeholder = document.getElementById("emailStakeholder").value;

  //Professional Details
  var positionStakeholder = document.getElementById("positionStakeholder").value;
  var sharePercentageStakeholder = document.getElementById("sharePercentageStakeholder").value;

  //Stakeholder Address Details
  var addressLine1Stakeholder = document.getElementById("addressLine1Stakeholder").value;
  var addressLine2Stakeholder = document.getElementById("addressLine2Stakeholder").value;
  var cityStakeholder = document.getElementById("cityStakeholder").value;
  var stateStakeholder = document.getElementById("stateStakeholder").value;
  var postcodeStakeholder = document.getElementById("postcodeStakeholder").value;
  var countryStakeholder = document.getElementById("countryStakeholder").value;

  //Business Partner Details
  var businessNameStakeholder = document.getElementById("businessNameStakeholder").value;
  var businessRegistrationNumberStakeholder = document.getElementById("businessRegistrationNumberStakeholder").value;
  var businessTypeStakeholder = document.getElementById("businessTypeStakeholder").value;
  var businessEntityTypeStakeholder = document.getElementById("businessEntityTypeStakeholder").value;
  var registeredCountryStakeholder = document.getElementById("registeredCountryStakeholder").value;

  //Business Partner Address Details
  var addressLine1BusinessPartner = document.getElementById("addressLine1BusinessPartner").value;
  var addressLine2BusinessPartner = document.getElementById("addressLine2BusinessPartner").value;
  var cityBusinessPartner = document.getElementById("cityBusinessPartner").value;
  var stateBusinessPartner = document.getElementById("stateBusinessPartner").value;
  var postcodeBusinessPartner = document.getElementById("postcodeBusinessPartner").value;
  var countryBusinessPartner = document.getElementById("countryBusinessPartner").value;

  if (firstNameStakeholder == "") {
    toast.warn("firstNameStakeholder must not be empty");
  } else if (lastNameStakeholder == "") {
    toast.warn("lastNameStakeholder must not be empty");
  } else if (nationalityStakeholder == "") {
    toast.warn("nationalityStakeholder must not be empty");
  } else if (kycModeStakeholder == "") {
    toast.warn("kycModeStakeholder must not be empty");
  } else if (emailStakeholder == "") {
    toast.warn("Email must not be empty");
  } else if (positionStakeholder == "") {
    toast.warn("Stakeholder Position must not be empty");
  }

  // else if (addressLine1Stakeholder == "") {
  //   toast.warn("Address Line 1 must not be empty");
  // } else if (postcodeStakeholder == "") {
  //   toast.warn("Postcode must not be empty");
  // } else if (countryStakeholder == "") {
  //   toast.warn("Country must not be empty");
  // } else if (businessNameStakeholder == "") {
  //   toast.warn("businessNameStakeholder must not be empty");
  // } else if (businessRegistrationNumberStakeholder == "") {
  //   toast.warn("businessRegistrationNumberStakeholder must not be empty");
  // } else if (businessEntityTypeStakeholder == "") {
  //   toast.warn("businessEntityTypeStakeholder must not be empty");
  // } else if (registeredCountryStakeholder == "") {
  //   toast.warn("registeredCountryStakeholder must not be empty");
  // } else if (addressLine1BusinessPartner == "") {
  //   toast.warn("addressLine1BusinessPartner must not be empty");
  // } else if (postcodeBusinessPartner == "") {
  //   toast.warn("postcodeBusinessPartner must not be empty");
  // } else if (countryBusinessPartner == "") {
  //   toast.warn("countryBusinessPartner must not be empty");
  // }
  else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PostBusinessPartnerAddressDetails",
        {
          params: {
            businessRegistrationNumber: brn,
            email: sessionStorage.getItem("lastemail"),
            firstNameStakeholder: firstNameStakeholder,
            middleNameStakeholder: middleNameStakeholder,
            lastNameStakeholder: lastNameStakeholder,
            nationalityStakeholder: nationalityStakeholder,
            dateOfBirthStakeholder: dateOfBirthStakeholder,
            kycModeStakeholder: kycModeStakeholder,
            isResidentStakeholder: isResidentStakeholder,

            //Contact Details
            contactNoStakeholder: contactNoStakeholder,
            emailStakeholder: emailStakeholder,

            //Professional Details
            positionStakeholder: positionStakeholder,
            sharePercentageStakeholder: sharePercentageStakeholder,

            //Stakeholder Address Details
            addressLine1Stakeholder: addressLine1Stakeholder,
            addressLine2Stakeholder: addressLine2Stakeholder,
            cityStakeholder: cityStakeholder,
            stateStakeholder: stateStakeholder,
            postcodeStakeholder: postcodeStakeholder,
            countryStakeholder: countryStakeholder,

            //Business Partner
            businessNameStakeholder: businessNameStakeholder,
            businessRegistrationNumberStakeholder: businessRegistrationNumberStakeholder,
            businessTypeStakeholder: businessTypeStakeholder,
            businessEntityTypeStakeholder: businessEntityTypeStakeholder,
            registeredCountryStakeholder: registeredCountryStakeholder,

            //Business Partner Address
            addressLine1BusinessPartner: addressLine1BusinessPartner,
            addressLine2BusinessPartner: addressLine2BusinessPartner,
            cityBusinessPartner: cityBusinessPartner,
            stateBusinessPartner: stateBusinessPartner,
            postcodeBusinessPartner: postcodeBusinessPartner,
            countryBusinessPartner: countryBusinessPartner,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Business Partner Address Details Submitted");
        document.getElementById("submitBusinessPartnerAddressDetails").style.display = "none";
        document.getElementById("updateBusinessPartnerAddressDetails").style.display = "";
        document.getElementById("div7").style.width = "60%";
      } else {
        toast.error("Submission failed: " + obj.message);
        document.getElementById("submitBusinessPartnerAddressDetails").style.display = "";
        document.getElementById("updateBusinessPartnerAddressDetails").style.display = "none";
        document.getElementById("div7").style.width = "50%";
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
      document.getElementById("submitBusinessPartnerAddressDetails").style.display = "";
      document.getElementById("updateBusinessPartnerAddressDetails").style.display = "none";
      document.getElementById("div7").style.width = "50%";
    }
  }
};

//PATCH calls
export const PatchStakeholderDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var stakeholderEmail = document.getElementById("emailStakeholder").value;

  var firstNameStakeholder = document.getElementById("firstNameStakeholder").value;
  var middleNameStakeholder = document.getElementById("middleNameStakeholder").value;
  var lastNameStakeholder = document.getElementById("lastNameStakeholder").value;
  var nationalityStakeholder = document.getElementById("nationalityStakeholder").value;
  var dateOfBirthStakeholder = document.getElementById("dateOfBirthStakeholder").value;
  var kycModeStakeholder = document.getElementById("kycModeStakeholder").value;
  var isResidentStakeholder = document.getElementById("isResidentStakeholder").value;

  if (firstNameStakeholder == "") {
    toast.warn("First Name must not be empty");
  } else if (lastNameStakeholder == "") {
    toast.warn("Last Name must not be empty");
  } else if (nationalityStakeholder == "") {
    toast.warn("Nationality must not be empty");
  } else if (kycModeStakeholder == "") {
    toast.warn("Kyc Mode must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PatchStakeholderDetails",
        {
          params: {
            businessRegistrationNumber: brn,
            stakeholderEmail: stakeholderEmail,

            firstNameStakeholder: firstNameStakeholder,
            middleNameStakeholder: middleNameStakeholder,
            lastNameStakeholder: lastNameStakeholder,
            nationalityStakeholder: nationalityStakeholder,
            dateOfBirthStakeholder: dateOfBirthStakeholder,
            kycModeStakeholder: kycModeStakeholder,
            isResidentStakeholder: isResidentStakeholder,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Stakeholder Details Updated");
      } else {
        toast.error("Update failed: " + obj.message);
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
    }
  }
};

export const PatchContactDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var stakeholderEmail = document.getElementById("emailStakeholder").value;

  //Contact Details
  var contactNoStakeholder = document.getElementById("contactNoStakeholder").value;

  if (stakeholderEmail == "") {
    toast.warn("Email must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PatchStakeholderContactDetails",
        {
          params: {
            businessRegistrationNumber: brn,
            stakeholderEmail: stakeholderEmail,

            //Contact Details
            contactNoStakeholder: contactNoStakeholder,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Stakeholder Contact Details Updated");
      } else {
        toast.error("Update failed: " + obj.message);
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
    }
  }
};

export const PatchProfessionalDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var stakeholderEmail = document.getElementById("emailStakeholder").value;

  //Professional Details
  var positionStakeholder = document.getElementById("positionStakeholder").value;
  var sharePercentageStakeholder = document.getElementById("sharePercentageStakeholder").value;

  if (stakeholderEmail == "") {
    toast.warn("Email must not be empty");
  } else if (positionStakeholder == "") {
    toast.warn("Stakeholder Position must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PatchStakeholderProfessionalDetails",
        {
          params: {
            businessRegistrationNumber: brn,
            stakeholderEmail: stakeholderEmail,

            //Professional Details
            positionStakeholder: positionStakeholder,
            sharePercentageStakeholder: sharePercentageStakeholder,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Stakeholder Contact Details Updated");
      } else {
        toast.error("Update failed: " + obj.message);
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
    }
  }
};

export const PatchStakeholderAddressDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var stakeholderEmail = document.getElementById("emailStakeholder").value;

  //Stakeholder Address Details
  var addressLine1Stakeholder = document.getElementById("addressLine1Stakeholder").value;
  var addressLine2Stakeholder = document.getElementById("addressLine2Stakeholder").value;
  var cityStakeholder = document.getElementById("cityStakeholder").value;
  var stateStakeholder = document.getElementById("stateStakeholder").value;
  var postcodeStakeholder = document.getElementById("postcodeStakeholder").value;
  var countryStakeholder = document.getElementById("countryStakeholder").value;

  if (stakeholderEmail == "") {
    toast.warn("Email must not be empty");
  } else if (addressLine1Stakeholder == "") {
    toast.warn("Address Line 1 must not be empty");
  } else if (postcodeStakeholder == "") {
    toast.warn("Postcode must not be empty");
  } else if (countryStakeholder == "") {
    toast.warn("Country must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PatchStakeholderAddressDetails",
        {
          params: {
            businessRegistrationNumber: brn,
            stakeholderEmail: stakeholderEmail,

            //Stakeholder Address Details
            addressLine1Stakeholder: addressLine1Stakeholder,
            addressLine2Stakeholder: addressLine2Stakeholder,
            cityStakeholder: cityStakeholder,
            stateStakeholder: stateStakeholder,
            postcodeStakeholder: postcodeStakeholder,
            countryStakeholder: countryStakeholder,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Stakeholder Address Details Updated");
      } else {
        toast.error("Update failed: " + obj.message);
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
    }
  }
};

export const PatchBusinessPartnerDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var stakeholderEmail = document.getElementById("emailStakeholder").value;

  //Business Partner Details
  var businessNameStakeholder = document.getElementById("businessNameStakeholder").value;
  var businessRegistrationNumberStakeholder = document.getElementById("businessRegistrationNumberStakeholder").value;
  var businessTypeStakeholder = document.getElementById("businessTypeStakeholder").value;
  var businessEntityTypeStakeholder = document.getElementById("businessEntityTypeStakeholder").value;
  var registeredCountryStakeholder = document.getElementById("registeredCountryStakeholder").value;

  if (stakeholderEmail == "") {
    toast.warn("Email must not be empty");
  } else if (businessNameStakeholder == "") {
    toast.warn("businessNameStakeholder must not be empty");
  } else if (businessRegistrationNumberStakeholder == "") {
    toast.warn("businessRegistrationNumberStakeholder must not be empty");
  } else if (businessEntityTypeStakeholder == "") {
    toast.warn("businessEntityTypeStakeholder must not be empty");
  } else if (registeredCountryStakeholder == "") {
    toast.warn("registeredCountryStakeholder must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PatchBusinessPartnerDetails",
        {
          params: {
            businessRegistrationNumber: brn,
            stakeholderEmail: stakeholderEmail,

            //Business Partner
            businessNameStakeholder: businessNameStakeholder,
            businessRegistrationNumberStakeholder: businessRegistrationNumberStakeholder,
            businessTypeStakeholder: businessTypeStakeholder,
            businessEntityTypeStakeholder: businessEntityTypeStakeholder,
            registeredCountryStakeholder: registeredCountryStakeholder,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Stakeholder Business Partner Details Updated");
      } else {
        toast.error("Update failed: " + obj.message);
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
    }
  }
};

export const PatchBusinessPartnerAddressDetails = async () => {
  //Stakeholder Details
  var brn = sessionStorage.getItem("businessRegistrationNumber");
  var stakeholderEmail = document.getElementById("emailStakeholder").value;

  //Business Partner Address Details
  var addressLine1BusinessPartner = document.getElementById("addressLine1BusinessPartner").value;
  var addressLine2BusinessPartner = document.getElementById("addressLine2BusinessPartner").value;
  var cityBusinessPartner = document.getElementById("cityBusinessPartner").value;
  var stateBusinessPartner = document.getElementById("stateBusinessPartner").value;
  var postcodeBusinessPartner = document.getElementById("postcodeBusinessPartner").value;
  var countryBusinessPartner = document.getElementById("countryBusinessPartner").value;

  if (stakeholderEmail == "") {
    toast.warn("Email must not be empty");
  } else if (addressLine1BusinessPartner == "") {
    toast.warn("addressLine1BusinessPartner must not be empty");
  } else if (postcodeBusinessPartner == "") {
    toast.warn("postcodeBusinessPartner must not be empty");
  } else if (countryBusinessPartner == "") {
    toast.warn("countryBusinessPartner must not be empty");
  } else {
    try {
      const response = await Axios.get(
        sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/PatchBusinessPartnerAddressDetails",
        {
          params: {
            businessRegistrationNumber: brn,
            stakeholderEmail: stakeholderEmail,

            //Business Partner Address
            addressLine1BusinessPartner: addressLine1BusinessPartner,
            addressLine2BusinessPartner: addressLine2BusinessPartner,
            cityBusinessPartner: cityBusinessPartner,
            stateBusinessPartner: stateBusinessPartner,
            postcodeBusinessPartner: postcodeBusinessPartner,
            countryBusinessPartner: countryBusinessPartner,
          },
        }
      );

      let obj = response.data;
      if (obj.status == "SUCCESS") {
        toast.success("Business Partner Address Details Updated");
      } else {
        toast.error("Update failed: " + obj.message);
      }
    } catch (error) {
      console.log("Something went wrong: " + error);
    }
  }
};

//GET Calls
//Business Details
export const GetStakeholderDetails = async (brn) => {
  try {
    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/OnboardingRoutes/GetStakeholderDetails", {
      params: {
        businessRegistrationNumber: brn,
      },
    });

    let obj = response.data;
    sessionStorage.setItem("stakeholderDatasetPost", JSON.stringify(obj));

    return obj;
    // var data = obj[0];

    // // Check if the keys are present and set form field values accordingly
    // if (data.hasOwnProperty("stakeholderFirstName")) {
    //   document.getElementById("firstNameStakeholder").value = data.stakeholderFirstName;
    // }

    // if (data.hasOwnProperty("stakeholderMiddleName")) {
    //   document.getElementById("middleNameStakeholder").value = data.stakeholderMiddleName;
    // }

    // if (data.hasOwnProperty("stakeholderLastName")) {
    //   document.getElementById("lastNameStakeholder").value = data.stakeholderLastName;
    // }

    // if (data.hasOwnProperty("stakeholderNationality")) {
    //   document.getElementById("nationalityStakeholder").value = data.stakeholderNationality;
    // }

    // if (data.hasOwnProperty("stakeholderDateOfBirth")) {
    //   document.getElementById("dateOfBirthStakeholder").value = data.stakeholderDateOfBirth;
    // }

    // document.getElementById("kycModeStakeholder").value = "E_KYC";

    // if (data.hasOwnProperty("stakeholderResident")) {
    //   document.getElementById("isResidentStakeholder").value = data.stakeholderResident;
    // }

    // document.getElementById("div7").style.width = "43%";

    // // Continue checking and setting values for other fields...

    // // Contact Details
    // if (data.hasOwnProperty("stakeholderContactNumber")) {
    //   document.getElementById("contactNoStakeholder").value = data.stakeholderContactNumber;
    // }

    // if (data.hasOwnProperty("stakeholderEmail")) {
    //   document.getElementById("emailStakeholder").value = data.stakeholderEmail;
    // }

    // document.getElementById("div7").style.width = "46%";

    // // Professional Details
    // if (data.hasOwnProperty("stakeholderPosition")) {
    //   document.getElementById("positionStakeholder").value = data.stakeholderPosition;
    // }

    // if (data.hasOwnProperty("stakeholderSharePercentage")) {
    //   document.getElementById("sharePercentageStakeholder").value = data.stakeholderSharePercentage;
    // }

    // document.getElementById("div7").style.width = "49%";

    // // Stakeholder Address Details
    // if (data.hasOwnProperty("stakeholderAddress1")) {
    //   document.getElementById("addressLine1Stakeholder").value = data.stakeholderAddress1;
    // }

    // if (data.hasOwnProperty("stakeholderAddress2")) {
    //   document.getElementById("addressLine2Stakeholder").value = data.stakeholderAddress2;
    // }

    // if (data.hasOwnProperty("stakeholderCity")) {
    //   document.getElementById("cityStakeholder").value = data.stakeholderCity;
    // }

    // if (data.hasOwnProperty("stakeholderState")) {
    //   document.getElementById("stateStakeholder").value = data.stakeholderState;
    // }

    // if (data.hasOwnProperty("stakeholderPostcode")) {
    //   document.getElementById("postcodeStakeholder").value = data.stakeholderPostcode;
    // }

    // if (data.hasOwnProperty("stakeholderCountry")) {
    //   document.getElementById("countryStakeholder").value = data.stakeholderCountry;
    // }

    // document.getElementById("div7").style.width = "53%";

    // // Business Partner Details
    // if (data.hasOwnProperty("stakeholderBusinessName")) {
    //   document.getElementById("businessNameStakeholder").value = data.stakeholderBusinessName;
    // }
    // if (data.hasOwnProperty("stakeholderBusinessRegistrationNumber")) {
    //   document.getElementById("businessRegistrationNumberStakeholder").value =
    //     data.stakeholderBusinessRegistrationNumber;
    // }
    // if (data.hasOwnProperty("stakeholderBusinessType")) {
    //   document.getElementById("businessTypeStakeholder").value = data.stakeholderBusinessType;
    // }
    // if (data.hasOwnProperty("stakeholderBusinessEntityType")) {
    //   document.getElementById("businessEntityTypeStakeholder").value = data.stakeholderBusinessEntityType;
    // }
    // if (data.hasOwnProperty("stakeholderRegisteredCountry")) {
    //   document.getElementById("registeredCountryStakeholder").value = data.stakeholderRegisteredCountry;
    // }

    // document.getElementById("div7").style.width = "56%";

    // // Business Partner Address Details
    // if (data.hasOwnProperty("stakeholderPartnerAddress1")) {
    //   document.getElementById("addressLine1BusinessPartner").value = data.stakeholderPartnerAddress1;
    // }
    // if (data.hasOwnProperty("stakeholderPartnerAddress2")) {
    //   document.getElementById("addressLine2BusinessPartner").value = data.stakeholderPartnerAddress2;
    // }
    // if (data.hasOwnProperty("stakeholderPartnerCity")) {
    //   document.getElementById("cityBusinessPartner").value = data.stakeholderPartnerCity;
    // }
    // if (data.hasOwnProperty("stakeholderPartnerState")) {
    //   document.getElementById("stateBusinessPartner").value = data.stakeholderPartnerState;
    // }
    // if (data.hasOwnProperty("stakeholderPartnerPostcode")) {
    //   document.getElementById("postcodeBusinessPartner").value = data.stakeholderPartnerPostcode;
    // }
    // if (data.hasOwnProperty("stakeholderPartnerCountry")) {
    //   document.getElementById("countryBusinessPartner").value = data.stakeholderPartnerCountry;
    // }

    // document.getElementById("div7").style.width = "60%";
  } catch (error) {
    console.error("Something went wrong: " + error);
    return [];
  }
};

export const SetStakeholderDetailsWithPage = async (currentStakeholder) => {
  var StakeholderFirst = currentStakeholder;
  if (StakeholderFirst.hasOwnProperty("stakeholderDetails")) {
    var data = StakeholderFirst.stakeholderDetails;
    if (data.hasOwnProperty("firstName")) {
      document.getElementById("firstNameStakeholder").value = data.firstName;
    }

    if (data.hasOwnProperty("middleName")) {
      document.getElementById("middleNameStakeholder").value = data.middleName;
    }

    if (data.hasOwnProperty("lastName")) {
      document.getElementById("lastNameStakeholder").value = data.lastName;
    }

    if (data.hasOwnProperty("nationality")) {
      document.getElementById("nationalityStakeholder").value = data.nationality;
      nationalityChange();
    }

    if (data.hasOwnProperty("dateOfBirth")) {
      document.getElementById("dateOfBirthStakeholder").value = data.dateOfBirth;
    }

    // Continue checking and setting values for other fields...

    // Contact Details
    if (data.hasOwnProperty("contactDetails")) {
      var ContactDetails = data.contactDetails;
      if (ContactDetails.hasOwnProperty("contactNumber")) {
        document.getElementById("contactNoStakeholder").value = ContactDetails.contactNumber;
      }

      if (ContactDetails.hasOwnProperty("email")) {
        document.getElementById("emailStakeholder").value = ContactDetails.emailStakeholder;
      }
    }

    // Professional Details
    if (data.hasOwnProperty("professionalDetails")) {
      var ProfessionalDetails = data.professionalDetails[0];

      if (ProfessionalDetails.hasOwnProperty("position")) {
        document.getElementById("positionStakeholder").value = ProfessionalDetails.position;
      }

      if (ProfessionalDetails.hasOwnProperty("sharePercentage")) {
        document.getElementById("sharePercentageStakeholder").value = ProfessionalDetails.sharePercentage;
      }
    }

    // Stakeholder Address Details
    if (data.hasOwnProperty("address")) {
      var StakeholderAddress = data.address;
      if (StakeholderAddress.hasOwnProperty("addressLine1")) {
        document.getElementById("addressLine1Stakeholder").value = StakeholderAddress.addressLine1;
      }

      if (StakeholderAddress.hasOwnProperty("addressLine2")) {
        document.getElementById("addressLine2Stakeholder").value = StakeholderAddress.addressLine2;
      }

      if (StakeholderAddress.hasOwnProperty("city")) {
        document.getElementById("cityStakeholder").value = StakeholderAddress.city;
      }

      if (StakeholderAddress.hasOwnProperty("state")) {
        document.getElementById("stateStakeholder").value = StakeholderAddress.state;
      }

      if (StakeholderAddress.hasOwnProperty("postcode")) {
        document.getElementById("postcodeStakeholder").value = StakeholderAddress.postcode;
      }

      if (StakeholderAddress.hasOwnProperty("country")) {
        document.getElementById("countryStakeholder").value = StakeholderAddress.country;
      }
    }
  }
  // Business Partner Details
  if (StakeholderFirst.hasOwnProperty("businessPartner")) {
    document.getElementById("businessNameStakeholder").value = StakeholderFirst.businessPartner;
  }
  if (StakeholderFirst.hasOwnProperty("businessRegistrationNumber")) {
    document.getElementById("businessRegistrationNumberStakeholder").value =
      StakeholderFirst.businessRegistrationNumber;
  }
  if (StakeholderFirst.hasOwnProperty("businessType")) {
    document.getElementById("businessTypeStakeholder").value = StakeholderFirst.businessType;
  }
  if (StakeholderFirst.hasOwnProperty("entityType")) {
    document.getElementById("businessEntityTypeStakeholder").value = StakeholderFirst.entityType;
  }
  if (StakeholderFirst.hasOwnProperty("registeredCountry")) {
    document.getElementById("registeredCountryStakeholder").value = StakeholderFirst.registeredCountry;
  }

  // Business Partner Address Details - to be added when proper response is available
  // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerAddress1")) {
  //   document.getElementById("addressLine1BusinessPartner").value = StakeholderFirst.stakeholderPartnerAddress1;
  // }
  // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerAddress2")) {
  //   document.getElementById("addressLine2BusinessPartner").value = StakeholderFirst.stakeholderPartnerAddress2;
  // }
  // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerCity")) {
  //   document.getElementById("cityBusinessPartner").value = StakeholderFirst.stakeholderPartnerCity;
  // }
  // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerState")) {
  //   document.getElementById("stateBusinessPartner").value = StakeholderFirst.stakeholderPartnerState;
  // }
  // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerPostcode")) {
  //   document.getElementById("postcodeBusinessPartner").value = StakeholderFirst.stakeholderPartnerPostcode;
  // }
  // if (StakeholderFirst.hasOwnProperty("stakeholderPartnerCountry")) {
  //   document.getElementById("countryBusinessPartner").value = StakeholderFirst.stakeholderPartnerCountry;
  // }
};

export const SetStakeholderDetailsWithPage2 = async (currentStakeholder) => {
  var data = currentStakeholder;
  // Check if the keys are present and set form field values accordingly
  if (data.hasOwnProperty("stakeholderFirstName")) {
    document.getElementById("firstNameStakeholder").value = data.stakeholderFirstName;
  }

  if (data.hasOwnProperty("stakeholderMiddleName")) {
    document.getElementById("middleNameStakeholder").value = data.stakeholderMiddleName;
  }

  if (data.hasOwnProperty("stakeholderLastName")) {
    document.getElementById("lastNameStakeholder").value = data.stakeholderLastName;
  }

  if (data.hasOwnProperty("stakeholderNationality")) {
    document.getElementById("nationalityStakeholder").value = data.stakeholderNationality;
    nationalityChange();
  }

  if (data.hasOwnProperty("stakeholderDateOfBirth")) {
    document.getElementById("dateOfBirthStakeholder").value = data.stakeholderDateOfBirth;
  }

  if (data.hasOwnProperty("stakeholderResident")) {
    document.getElementById("isResidentStakeholder").value = data.stakeholderResident;
  }

  // Continue checking and setting values for other fields...

  // Contact Details
  if (data.hasOwnProperty("stakeholderContactNumber")) {
    document.getElementById("contactNoStakeholder").value = data.stakeholderContactNumber;
  }

  if (data.hasOwnProperty("stakeholderEmail")) {
    document.getElementById("emailStakeholder").value = data.stakeholderEmail;
    sessionStorage.setItem("stakeholderemail", data.stakeholderEmail);
  }

  // Professional Details
  if (data.hasOwnProperty("stakeholderPosition")) {
    document.getElementById("positionStakeholder").value = data.stakeholderPosition;
  }

  if (data.hasOwnProperty("stakeholderSharePercentage")) {
    document.getElementById("sharePercentageStakeholder").value = Number(data.stakeholderSharePercentage);
  }

  document.getElementById("div7").style.width = "49%";

  // Stakeholder Address Details
  if (data.hasOwnProperty("stakeholderAddress1")) {
    document.getElementById("addressLine1Stakeholder").value = data.stakeholderAddress1;
  }

  if (data.hasOwnProperty("stakeholderAddress2")) {
    document.getElementById("addressLine2Stakeholder").value = data.stakeholderAddress2;
  }

  if (data.hasOwnProperty("stakeholderCity")) {
    document.getElementById("cityStakeholder").value = data.stakeholderCity;
  }

  if (data.hasOwnProperty("stakeholderState")) {
    document.getElementById("stateStakeholder").value = data.stakeholderState;
  }

  if (data.hasOwnProperty("stakeholderPostcode")) {
    document.getElementById("postcodeStakeholder").value = data.stakeholderPostcode;
  }

  if (data.hasOwnProperty("stakeholderCountry")) {
    document.getElementById("countryStakeholder").value = data.stakeholderCountry;
  }

  // Business Partner Details
  if (data.hasOwnProperty("stakeholderBusinessName")) {
    document.getElementById("businessNameStakeholder").value = data.stakeholderBusinessName;
  }
  if (data.hasOwnProperty("stakeholderBusinessRegistrationNumber")) {
    document.getElementById("businessRegistrationNumberStakeholder").value = data.stakeholderBusinessRegistrationNumber;
  }
  if (data.hasOwnProperty("stakeholderBusinessType")) {
    document.getElementById("businessTypeStakeholder").value = data.stakeholderBusinessType;
  }
  if (data.hasOwnProperty("stakeholderBusinessEntityType")) {
    document.getElementById("businessEntityTypeStakeholder").value = data.stakeholderBusinessEntityType;
  }
  if (data.hasOwnProperty("stakeholderRegisteredCountry")) {
    document.getElementById("registeredCountryStakeholder").value = data.stakeholderRegisteredCountry;
  }

  // Business Partner Address Details
  if (data.hasOwnProperty("stakeholderPartnerAddress1")) {
    document.getElementById("addressLine1BusinessPartner").value = data.stakeholderPartnerAddress1;
  }
  if (data.hasOwnProperty("stakeholderPartnerAddress2")) {
    document.getElementById("addressLine2BusinessPartner").value = data.stakeholderPartnerAddress2;
  }
  if (data.hasOwnProperty("stakeholderPartnerCity")) {
    document.getElementById("cityBusinessPartner").value = data.stakeholderPartnerCity;
  }
  if (data.hasOwnProperty("stakeholderPartnerState")) {
    document.getElementById("stateBusinessPartner").value = data.stakeholderPartnerState;
  }
  if (data.hasOwnProperty("stakeholderPartnerPostcode")) {
    document.getElementById("postcodeBusinessPartner").value = data.stakeholderPartnerPostcode;
  }
  if (data.hasOwnProperty("stakeholderPartnerCountry")) {
    document.getElementById("countryBusinessPartner").value = data.stakeholderPartnerCountry;
  }
};

export const nationalityChange = () => {
  var nationalityList = document.getElementById("nationalityStakeholder").value;
  var kycModeStakeholder = document.getElementById("kycModeStakeholder");
  var isResidentStakeholder = document.getElementById("isResidentStakeholder");
  var isResidentStakeholderDiv = document.getElementById("isResidentStakeholderDiv");
  if (nationalityList == "SG") {
    kycModeStakeholder.value = "E_KYC";
    isResidentStakeholder.value = "YES";
    isResidentStakeholderDiv.classList.add("d-none");
  } else {
    kycModeStakeholder.value = "E_DOC_VERIFY";
    isResidentStakeholder.value = "";
    isResidentStakeholderDiv.classList.remove("d-none");
  }
};
