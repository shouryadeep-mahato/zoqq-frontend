import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import ContentLoader from "react-content-loader";
import * as functions from "./functions/stakeholder-details-function.js";
import * as utilities from "./functions/utility-details-function.js";

export const FetchEnumData = async () => {
  const position = await utilities.FetchEnumValues("position");
  const businessType = await utilities.FetchEnumValues("businessType");

  var result = {};
  result.position = position;
  result.businessType = businessType;

  return result;
};

function stakeholderDetailsAdvance() {
  const list = ["progress", "pending", "approve"];
  const [status, setStatus] = useState(list[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const SetPage = async () => {
      var FetchConstantValues = await FetchEnumData();
      var position = FetchConstantValues.position;
      var businessType = FetchConstantValues.businessType;
      var nationalityList = await utilities.listNationality();
      var countryList = await utilities.listCountry();

      //Gathering all stakeholder data before filling it up
      var stakeholderArray1 = await functions.GetStakeholderDetails(sessionStorage.getItem("internalBusinessId"));
      var stakeholderArray2 = await functions.FillStakeholderDetails(
        sessionStorage.getItem("businessRegistrationNumber")
      );

      setIsLoading(false);

      //Setting Enum Data Values
      var positionSelect = document.getElementById("positionStakeholder");
      var businessTypeSelect = document.getElementById("businessTypeStakeholder");
      var businessEntityTypeSelect = document.getElementById("businessEntityTypeStakeholder");
      if (positionSelect && businessTypeSelect && businessEntityTypeSelect) {
        if (position.length != 0 && businessType.length != 0) {
          if (positionSelect.options.length > 1) {
            positionSelect.innerHTML = "";
          }

          // Create an initial or default option
          const initialOption = document.createElement("option");
          initialOption.text = ""; // Set the text for the initial option
          initialOption.value = ""; // Optionally set a value for the initial option (can be an empty string)

          // Append the initial option to the select element
          positionSelect.appendChild(initialOption.cloneNode(true));

          //Appending the actual list here
          position.forEach((item) => {
            const optionElement = document.createElement("option");
            optionElement.text = item.description;
            optionElement.value = item.code;
            positionSelect.appendChild(optionElement.cloneNode(true));
          });
        } else {
          console.log("Unable to generate position list dropdown");
        }

        //Business Type Enum Values

        if (businessType.length != 0) {
          if (businessTypeSelect.options.length > 1) {
            businessTypeSelect.innerHTML = "";
          }

          // if (businessEntityTypeSelect.options.length > 1) {
          //   businessEntityTypeSelect.innerHTML = "";
          // }

          // Create an initial or default option
          const initialOption = document.createElement("option");
          initialOption.text = ""; // Set the text for the initial option
          initialOption.value = ""; // Optionally set a value for the initial option (can be an empty string)

          // Append the initial option to the select element
          businessTypeSelect.appendChild(initialOption.cloneNode(true));
          //businessEntityTypeSelect.appendChild(initialOption.cloneNode(true));

          //Appending the actual list here
          businessType.forEach((item) => {
            const optionElement = document.createElement("option");
            optionElement.text = item.description;
            optionElement.value = item.code;
            businessTypeSelect.appendChild(optionElement.cloneNode(true));
            //businessEntityTypeSelect.appendChild(optionElement.cloneNode(true));
          });
        } else {
          console.log("Unable to generate business type list dropdown");
        }
      }

      //Populating Country List
      if (countryList.length != 0) {
        var countryStakeholder = document.getElementById("countryStakeholder");
        var countryBusinessPartner = document.getElementById("countryBusinessPartner");
        var registeredCountryStakeholder = document.getElementById("registeredCountryStakeholder");
        if (countryStakeholder && countryBusinessPartner && registeredCountryStakeholder) {
          if (countryStakeholder.options.length > 1) {
            countryStakeholder.innerHTML = "";
          }
          if (countryBusinessPartner.options.length > 1) {
            countryBusinessPartner.innerHTML = "";
          }
          if (registeredCountryStakeholder.options.length > 1) {
            registeredCountryStakeholder.innerHTML = "";
          }

          // Create an initial or default option
          const initialOption = document.createElement("option");
          initialOption.text = ""; // Set the text for the initial option
          initialOption.value = ""; // Optionally set a value for the initial option (can be an empty string)

          // Append the initial option to the select element
          countryStakeholder.appendChild(initialOption.cloneNode(true));
          countryBusinessPartner.appendChild(initialOption.cloneNode(true));
          registeredCountryStakeholder.appendChild(initialOption);

          //Appending the actual list here
          countryList.forEach((item) => {
            const optionElement = document.createElement("option");
            optionElement.text = item.country_name;
            optionElement.value = item.ISOcc_2char;
            // Set a custom attribute for the optionElement
            optionElement.setAttribute("data-country-code", item.ISD_country_code);
            countryStakeholder.appendChild(optionElement.cloneNode(true));
            countryBusinessPartner.appendChild(optionElement.cloneNode(true));
            registeredCountryStakeholder.appendChild(optionElement);
          });
        } else {
          console.log("Unable to generate country list dropdown");
        }
      }

      //Populating Nationality List
      if (nationalityList.length != 0) {
        var nationalityStakeholder = document.getElementById("nationalityStakeholder");
        if (nationalityStakeholder) {
          if (nationalityStakeholder.options.length > 1) {
            nationalityStakeholder.innerHTML = "";
          }
          // Create an initial or default option
          const initialOption = document.createElement("option");
          initialOption.text = ""; // Set the text for the initial option
          initialOption.value = ""; // Optionally set a value for the initial option (can be an empty string)

          // Append the initial option to the select element
          nationalityStakeholder.appendChild(initialOption.cloneNode(true));

          //Appending the actual list here
          nationalityList.forEach((item) => {
            const optionElement = document.createElement("option");
            optionElement.text = item.nationality;
            optionElement.value = item.ISOcc_2char;
            // Set a custom attribute for the optionElement
            optionElement.setAttribute("data-country-code", item.ISD_country_code);
            nationalityStakeholder.appendChild(optionElement.cloneNode(true));
          });
        } else {
          console.log("Unable to generate nationality list dropdown");
        }
      }

      document.getElementById("div7").style.width = "40%";
      var internalBusinessId = sessionStorage.getItem("internalBusinessId");
      var lastScreenCompleted = sessionStorage.getItem("lastScreenCompleted");
      var userStatus = sessionStorage.getItem("userStatus");
      if (internalBusinessId && Number(lastScreenCompleted) === 14) {
        document.querySelectorAll(".submit-btn").forEach((item) => {
          item.style.display = "none";
        });
        document.querySelectorAll(".update-btn").forEach((item) => {
          item.style.display = "";
        });

        if (Number(lastScreenCompleted) >= 18) {
          if (Number(lastScreenCompleted) === 22 && userStatus == "C") {
            setStatus(list[2]);
          } else {
            setStatus(list[1]);
          }
        }
        //await functions.GetStakeholderDetails(internalBusinessId);
        if (stakeholderArray1.length > 0 && document.getElementById("firstNameStakeholder")) {
          await functions.SetStakeholderDetailsWithPage2(stakeholderArray1[0]);
        }
      } else {
        setStatus(list[0]);
        var brn = sessionStorage.getItem("businessRegistrationNumber");
        //await functions.FillStakeholderDetails(brn);
        if (stakeholderArray2.length > 0 && document.getElementById("firstNameStakeholder")) {
          await functions.SetStakeholderDetailsWithPage(stakeholderArray2[0]);
        }

        document.querySelectorAll(".update-btn").forEach((item) => {
          item.style.display = "none";
        });
      }
    };

    SetPage();
  }, []);

  const [sharePercentage, setSharePercentage] = useState(0);

  const handleSharePercentage = (event) => {
    let inputValue = event.target.value;

    // Ensure the input is a number and within the range [0, 100]
    if (/^\d+$/.test(inputValue)) {
      inputValue = Math.min(100, parseInt(inputValue, 10)); // Limit to a maximum of 100
    } else {
      // Handle non-numeric input (you can display an error message here)
      inputValue = "";
    }

    setSharePercentage(inputValue);
  };

  const [currentPage, setCurrentPage] = useState(1);

  var stakeholderDataset = [];

  if (sessionStorage.getItem("stakeholderDataset")) {
    stakeholderDataset = JSON.parse(sessionStorage.getItem("stakeholderDataset")).length;
  } else if (sessionStorage.getItem("stakeholderDatasetPost")) {
    stakeholderDataset = JSON.parse(sessionStorage.getItem("stakeholderDatasetPost")).length;
  }

  var totalPages = 1;
  if (Number(stakeholderDataset) > 0) {
    totalPages = stakeholderDataset;
  }

  const handlePageClick = async (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      var stakeholder1 = JSON.parse(sessionStorage.getItem("stakeholderDataset"));
      var stakeholder2 = JSON.parse(sessionStorage.getItem("stakeholderDatasetPost"));

      if (stakeholder2[Number(pageNumber) - 1]) {
        //Form Handling
        const formArray = document.querySelectorAll("form");
        if (formArray) {
          formArray.forEach((form) => {
            // Loop through all form elements
            for (let i = 0; i < form.elements.length; i++) {
              const element = form.elements[i];
              // Check if the element is an input or select element
              if (element.tagName === "INPUT" || element.tagName === "SELECT") {
                // Reset the value of the input or select element to an empty string
                element.value = "";
              }
            }
          });
        }

        var currentStakeholder = stakeholder2[Number(pageNumber) - 1];
        await functions.SetStakeholderDetailsWithPage2(currentStakeholder);

        document.querySelectorAll(".submit-btn").forEach((item) => {
          item.style.display = "none";
        });

        document.querySelectorAll(".update-btn").forEach((item) => {
          item.style.display = "flex";
        });
      } else {
        //Form Handling
        const formArray = document.querySelectorAll("form");
        if (formArray) {
          formArray.forEach((form) => {
            // Loop through all form elements
            for (let i = 0; i < form.elements.length; i++) {
              const element = form.elements[i];
              // Check if the element is an input or select element
              if (element.tagName === "INPUT" || element.tagName === "SELECT") {
                // Reset the value of the input or select element to an empty string
                element.value = "";
              }
            }
          });
        }

        var currentStakeholder = stakeholder1[Number(pageNumber) - 1];
        await functions.SetStakeholderDetailsWithPage(currentStakeholder);

        document.querySelectorAll(".submit-btn").forEach((item) => {
          item.style.display = "flex";
        });

        document.querySelectorAll(".update-btn").forEach((item) => {
          item.style.display = "none";
        });
      }
      var element = document.getElementById("addMoreStakeholder");
      if (pageNumber === totalPages) {
        element.style.display = "flex";
      } else {
        element.style.display = "none";
      }
      setCurrentPage(pageNumber);
    }
  };

  const handlePrevClick = async () => {
    if (currentPage > 1) {
      var stakeholder1 = JSON.parse(sessionStorage.getItem("stakeholderDataset"));
      var stakeholder2 = JSON.parse(sessionStorage.getItem("stakeholderDatasetPost"));

      if (stakeholder2[Number(currentPage) - 2]) {
        //Form Handling
        const formArray = document.querySelectorAll("form");
        if (formArray) {
          formArray.forEach((form) => {
            // Loop through all form elements
            for (let i = 0; i < form.elements.length; i++) {
              const element = form.elements[i];
              // Check if the element is an input or select element
              if (element.tagName === "INPUT" || element.tagName === "SELECT") {
                // Reset the value of the input or select element to an empty string
                element.value = "";
              }
            }
          });
        }

        var currentStakeholder = stakeholder2[Number(currentPage) - 2];
        await functions.SetStakeholderDetailsWithPage2(currentStakeholder);
      } else {
        //Form Handling
        const formArray = document.querySelectorAll("form");
        if (formArray) {
          formArray.forEach((form) => {
            // Loop through all form elements
            for (let i = 0; i < form.elements.length; i++) {
              const element = form.elements[i];
              // Check if the element is an input or select element
              if (element.tagName === "INPUT" || element.tagName === "SELECT") {
                // Reset the value of the input or select element to an empty string
                element.value = "";
              }
            }
          });
        }

        var currentStakeholder = stakeholder1[Number(currentPage) - 2];
        await functions.SetStakeholderDetailsWithPage(currentStakeholder);
      }

      var element = document.getElementById("addMoreStakeholder");
      element.style.display = "none";

      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = async () => {
    if (currentPage < totalPages) {
      var stakeholder1 = JSON.parse(sessionStorage.getItem("stakeholderDataset"));
      var stakeholder2 = JSON.parse(sessionStorage.getItem("stakeholderDatasetPost"));

      if (stakeholder2[Number(currentPage)]) {
        //Form Handling
        const formArray = document.querySelectorAll("form");
        if (formArray) {
          formArray.forEach((form) => {
            // Loop through all form elements
            for (let i = 0; i < form.elements.length; i++) {
              const element = form.elements[i];
              // Check if the element is an input or select element
              if (element.tagName === "INPUT" || element.tagName === "SELECT") {
                // Reset the value of the input or select element to an empty string
                element.value = "";
              }
            }
          });
        }

        var currentStakeholder = stakeholder2[Number(currentPage)];
        await functions.SetStakeholderDetailsWithPage2(currentStakeholder);
      } else {
        //Form Handling
        const formArray = document.querySelectorAll("form");
        if (formArray) {
          formArray.forEach((form) => {
            // Loop through all form elements
            for (let i = 0; i < form.elements.length; i++) {
              const element = form.elements[i];
              // Check if the element is an input or select element
              if (element.tagName === "INPUT" || element.tagName === "SELECT") {
                // Reset the value of the input or select element to an empty string
                element.value = "";
              }
            }
          });
        }

        var currentStakeholder = stakeholder1[Number(currentPage)];
        await functions.SetStakeholderDetailsWithPage(currentStakeholder);
      }

      var element = document.getElementById("addMoreStakeholder");
      if (currentPage === totalPages - 1) {
        element.style.display = "flex";
      } else {
        element.style.display = "none";
      }

      setCurrentPage(currentPage + 1);
    }
  };

  const generatePaginationLinks = () => {
    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <li key={i} className={`page-number ${currentPage === i ? "active" : ""}`}>
          <a href="#!" onClick={() => handlePageClick(i)}>
            {i}
          </a>
        </li>
      );
    }
    return links;
  };

  const AddMoreStakeholder = () => {
    //if (currentPage < totalPages) {
    // // Assuming you have a reference to your form element
    // const formArray = document.querySelectorAll("form");
    // if (formArray) {
    //   formArray.forEach((form) => {
    //     // Loop through all form elements
    //     for (let i = 0; i < form.elements.length; i++) {
    //       const element = form.elements[i];
    //       // Check if the element is an input or select element
    //       if (element.tagName === "INPUT" || element.tagName === "SELECT") {
    //         // Reset the value of the input or select element to an empty string
    //         element.value = "";
    //       }
    //     }
    //   });
    // }
    // setTotalPages(totalPage + 1);
    // setCurrentPage(currentPage + 1);
    // generatePaginationLinks();
  };

  const nationalityChange = () => {
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

  const positionStakeholderChange = () => {
    var positionStakeholder = document.getElementById("positionStakeholder").value;
    var stakeholderAddress1Label = document.getElementById("stakeholderAddress1Label");
    var stakeholderPostcodeLabel = document.getElementById("stakeholderPostcodeLabel");
    var stakeholderCountryLabel = document.getElementById("stakeholderCountryLabel");
    var StakeholderAddressDetailsLabel = document.getElementById("StakeholderAddressDetailsLabel");
    if (positionStakeholder == "DIRECTOR" || positionStakeholder == "UBO") {
      stakeholderAddress1Label.innerText = "*";
      stakeholderPostcodeLabel.innerText = "*";
      stakeholderCountryLabel.innerText = "*";
      StakeholderAddressDetailsLabel.innerText = "*";
    } else {
      stakeholderAddress1Label.innerText = "";
      stakeholderPostcodeLabel.innerText = "";
      stakeholderCountryLabel.innerText = "";
      StakeholderAddressDetailsLabel.innerText = "";
    }
  };

  const handleBusinessPartnerRequirement = () => {
    var businessPartnerRequire = document.getElementById("businessPartnerRequire");
    var businessPartnerDetailsDiv = document.getElementById("businessPartnerDetailsDiv");
    var businessPartnerAddressDiv = document.getElementById("businessPartnerAddressDiv");
    var submitAddressDetails = document.getElementById("submitAddressDetails");
    var updateAddressDetails = document.getElementById("updateAddressDetails");
    if (businessPartnerRequire.checked == true) {
      businessPartnerDetailsDiv.classList.remove("d-none");
      businessPartnerAddressDiv.classList.remove("d-none");
      submitAddressDetails.classList.add("d-none");
      updateAddressDetails.classList.add("d-none");
    } else {
      businessPartnerDetailsDiv.classList.add("d-none");
      businessPartnerAddressDiv.classList.add("d-none");
      submitAddressDetails.classList.remove("d-none");
      updateAddressDetails.classList.remove("d-none");
    }
  };

  return (
    <>
      <div id="stakeholderNoDiv" className="center-div">
        Stakeholder - <span id="stakeholderNo">{currentPage}</span>
      </div>
      {isLoading ? (
        <>
          <ContentLoader
            speed={1}
            width={400}
            height={160}
            viewBox="-20 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          ></ContentLoader>

          <ContentLoader
            speed={1}
            width={400}
            height={160}
            viewBox="-20 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          ></ContentLoader>

          <ContentLoader
            speed={1}
            width={400}
            height={160}
            viewBox="-20 0 400 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          ></ContentLoader>
        </>
      ) : (
        <>
          <div className="accordion" id="accordionExample2">
            <div style={{ fontSize: "12px", marginLeft: "1.75em" }}>
              {"(Only stakeholders with a minimum of 25% stake are applicable)**"}
            </div>

            <div className="accordion-item border-0">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOneSH"
                aria-expanded="true"
                aria-controls="collapseOneSH"
              >
                <div className={status + " rounded-circle"}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="accounts/kybDetails/advance/perDet.svg"
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "stroke: yellow");
                        const paths = svg.querySelectorAll("path");
                        paths.forEach((path) => {
                          path.setAttribute(
                            "stroke",
                            status === "pending" ? "#E0990C" : status == "progress" ? "#299E58" : "#099cbc"
                          );
                        });
                      }}
                      className="file-zip-icon"
                    />
                    <img className="edit-circle-icon1" alt="" src={"accounts/" + status + ".svg"} />
                  </div>
                </div>

                <div className="title4">
                  <div className="add-details-to1">
                    Stakeholder Details
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </div>
                  <div className={"bg-" + status + " text-start"}>
                    {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
                  </div>
                </div>
                <div className="icon-open2">
                  <div className="chevron-up1">
                    <img className="arrow-icon15" alt="" src="arrow2.svg" />
                  </div>
                </div>
              </button>
              <div
                id="collapseOneSH"
                className="accordion-collapse collapse"
                aria-labelledby="headingOneSH"
                data-bs-parent="#accordionExample2"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-33 me-2 pb-0">
                      <input type="text" id="firstNameStakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        First Name
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-33 ms-2 pb-0">
                      <input type="text" id="middleNameStakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Middle Name
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-33 ms-2 pb-0">
                      <input type="text" id="lastNameStakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Last Name
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>

                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select
                        id="nationalityStakeholder"
                        name="country"
                        className="form-input my-0 pb-0"
                        onChange={nationalityChange}
                      >
                        <option value=""></option>
                        <option value="IN">Indian</option>
                        <option value="SG">Singaporean</option>
                        <option value="AU">Australian</option>
                        <option value="US">American</option>
                        <option value="GB">British</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Nationality
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input id="dateOfBirthStakeholder" type="date" name="country" className="form-input my-0 pb-0" />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Date Of Birth
                      </label>
                    </div>
                  </div>

                  {/* Hiding kycMode and isResident */}
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0 d-none" id="isResidentStakeholderDiv">
                      <select id="isResidentStakeholder" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Are you a resident?
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0 d-none">
                      <select id="kycModeStakeholder" className="form-input my-0 pb-0" defaultValue="E_KYC">
                        <option value="E_KYC">E-KYC</option>
                        <option value="M_KYC">MANUAL KYC</option>
                        <option value="E_DOC_VERIFY">E-DOC-VERIFY</option>
                      </select>
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        KYC Mode
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>
                  {/* Hiding kycMode and isResident */}

                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="contactNoStakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Contact Number
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input
                        type="text"
                        id="emailStakeholder"
                        className="form-input my-0 pb-0"
                        onChange={(event) => sessionStorage.setItem("stakeholderemail", event.target.value)}
                      />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Email
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>

                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select
                        id="positionStakeholder"
                        name="country"
                        className="form-input my-0 pb-0"
                        onChange={positionStakeholderChange}
                      >
                        <option value=""></option>
                        <option value="DIRECTOR">DIRECTOR</option>
                        <option value="UBO">UBO</option>
                        <option value="SHAREHOLDER">SHAREHOLDER</option>
                        <option value="SIGNATORY">SIGNATORY</option>
                        <option value="REPRESENTATIVE">REPRESENTATIVE</option>
                        <option value="PROTECTOR">PROTECTOR</option>
                        <option value="PARTNER">PARTNER</option>
                        <option value="TRUSTEE">TRUSTEE</option>
                        <option value="SETTLOR">SETTLOR</option>
                        <option value="MEMBERS">MEMBERS</option>
                        <option value="EXECUTOR">EXECUTOR</option>
                        <option value="CONTROL_PRONG">CONTROL PRONG</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Position
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input
                        type="number"
                        id="sharePercentageStakeholder"
                        className="form-input my-0 pb-0"
                        value={sharePercentage}
                        onChange={handleSharePercentage}
                      />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Share Percentage
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>
                  {/* <button
                    onClick={functions.PostStakeholderDetails}
                    type="button"
                    className="button-main btn outline-none submit-btn"
                    id="submitStakeholderDetails"
                  >
                    <img className="check-double-icon" alt="" src="check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    onClick={functions.PatchStakeholderDetails}
                    type="button"
                    className="button-main btn outline-none update-btn"
                    id="updateStakeholderDetails"
                  >
                    <img className="check-double-icon" alt="" src="edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button> */}
                </form>
              </div>
            </div>
            {/* <div className="accordion-item border-0">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwoSH"
                aria-expanded="true"
                aria-controls="collapseTwoSH"
              >
                <div className={status + " rounded-circle"}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="accounts/kybDetails/advance/conDet.svg"
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "stroke: yellow");
                        const paths = svg.querySelectorAll("path");
                        paths.forEach((path) => {
                          path.setAttribute(
                            "stroke",
                            status === "pending" ? "#E0990C" : status == "progress" ? "#299E58" : "#099cbc"
                          );
                        });
                      }}
                      className="file-zip-icon"
                    />
                    <img className="edit-circle-icon1" alt="" src={"accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Contact Details
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </div>
                  <div className={"bg-" + status + " text-start"}>
                    {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
                  </div>
                </div>
                <div className="icon-open2">
                  <div className="chevron-up1">
                    <img className="arrow-icon15" alt="" src="arrow2.svg" />
                  </div>
                </div>
              </button>
              <div
                id="collapseTwoSH"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwoSH"
                data-bs-parent="#accordionExample2"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="contactNoStakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Contact Number
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input
                        type="text"
                        id="emailStakeholder"
                        className="form-input my-0 pb-0"
                        onChange={(event) => sessionStorage.setItem("stakeholderemail", event.target.value)}
                      />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Email
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>
                  <button
                    onClick={functions.PostContactDetails}
                    type="button"
                    className="button-main btn outline-none submit-btn"
                    id="submitContactDetails"
                  >
                    <img className="check-double-icon" alt="" src="check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    onClick={functions.PatchContactDetails}
                    type="button"
                    className="button-main btn outline-none update-btn"
                    id="updateContactDetails"
                  >
                    <img className="check-double-icon" alt="" src="edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button>
                </form>
              </div>
            </div> */}
            {/* <div className="accordion-item border-0">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThreeSH"
                aria-expanded="true"
                aria-controls="collapseThreeSH"
              >
                <div className={status + " rounded-circle"}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="accounts/kybDetails/advance/proDet.svg"
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "stroke: yellow");
                        const paths = svg.querySelectorAll("path");
                        paths.forEach((path) => {
                          path.setAttribute(
                            "stroke",
                            status === "pending" ? "#E0990C" : status == "progress" ? "#299E58" : "#099cbc"
                          );
                        });
                      }}
                      className="file-zip-icon"
                    />
                    <img className="edit-circle-icon1" alt="" src={"accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Professional Details
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </div>
                  <div className={"bg-" + status + " text-start"}>
                    {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
                  </div>
                </div>
                <div className="icon-open2">
                  <div className="chevron-up1">
                    <img className="arrow-icon15" alt="" src="arrow2.svg" />
                  </div>
                </div>
              </button>
              <div
                id="collapseThreeSH"
                className="accordion-collapse collapse"
                aria-labelledby="headingThreeSH"
                data-bs-parent="#accordionExample2"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select id="positionStakeholder" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="DIRECTOR">DIRECTOR</option>
                        <option value="UBO">UBO</option>
                        <option value="SHAREHOLDER">SHAREHOLDER</option>
                        <option value="SIGNATORY">SIGNATORY</option>
                        <option value="REPRESENTATIVE">REPRESENTATIVE</option>
                        <option value="PROTECTOR">PROTECTOR</option>
                        <option value="PARTNER">PARTNER</option>
                        <option value="TRUSTEE">TRUSTEE</option>
                        <option value="SETTLOR">SETTLOR</option>
                        <option value="MEMBERS">MEMBERS</option>
                        <option value="EXECUTOR">EXECUTOR</option>
                        <option value="CONTROL_PRONG">CONTROL_PRONG</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Position
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input
                        type="number"
                        id="sharePercentageStakeholder"
                        className="form-input my-0 pb-0"
                        value={sharePercentage}
                        onChange={handleSharePercentage}
                      />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Share Percentage
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>
                  <button
                    onClick={functions.PostProfessionalDetails}
                    type="button"
                    className="button-main btn outline-none submit-btn"
                    id="submitProfessionalDetails"
                  >
                    <img className="check-double-icon" alt="" src="check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    onClick={functions.PostProfessionalDetails}
                    type="button"
                    className="button-main btn outline-none update-btn"
                    id="updateProfessionalDetails"
                  >
                    <img className="check-double-icon" alt="" src="edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button>
                </form>
              </div>
            </div> */}
            <div className="accordion-item border-0">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFourSH"
                aria-expanded="true"
                aria-controls="collapseFourSH"
              >
                <div className={status + " rounded-circle"}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="accounts/kybDetails/advance/stakeDet.svg"
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "stroke: yellow");
                        const paths = svg.querySelectorAll("path");
                        paths.forEach((path) => {
                          path.setAttribute(
                            "stroke",
                            status === "pending" ? "#E0990C" : status == "progress" ? "#299E58" : "#099cbc"
                          );
                        });
                      }}
                      className="file-zip-icon"
                    />
                    <img className="edit-circle-icon1" alt="" src={"accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Stakeholder Address Details
                    <span className="mx-1" style={{ color: "red" }} id="StakeholderAddressDetailsLabel"></span>
                  </div>
                  <div className={"bg-" + status + " text-start"}>
                    {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
                  </div>
                </div>
                <div className="icon-open2">
                  <div className="chevron-up1">
                    <img className="arrow-icon15" alt="" src="arrow2.svg" />
                  </div>
                </div>
              </button>
              <div
                id="collapseFourSH"
                className="accordion-collapse collapse"
                aria-labelledby="headingFourSH"
                data-bs-parent="#accordionExample2"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="addressLine1Stakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="username" className="form-input-label ps-1">
                        Address 1
                        <span className="mx-1" style={{ color: "red" }} id="stakeholderAddress1Label">
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input type="text" id="addressLine2Stakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="businessname" className="form-input-label ps-1">
                        Address 2
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="cityStakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        City
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input type="text" id="stateStakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="tradename" className="form-input-label ps-1">
                        State
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="postcodeStakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Postal Code
                        <span className="mx-1" style={{ color: "red" }} id="stakeholderPostcodeLabel"></span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <select id="countryStakeholder" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="IN">India</option>
                        <option value="SG">Singapore</option>
                        <option value="AU">Australia</option>
                        <option value="US">United States</option>
                        <option value="GB">Great Britain</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Country
                        <span className="mx-1" style={{ color: "red" }} id="stakeholderCountryLabel"></span>
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={functions.PostBusinessPartnerAddressDetails}
                    type="button"
                    className="button-main btn outline-none submit-btn"
                    id="submitAddressDetails"
                  >
                    <img className="check-double-icon" alt="" src="check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    onClick={functions.PatchBusinessPartnerAddressDetails}
                    type="button"
                    className="button-main btn outline-none update-btn"
                    id="updateAddressDetails"
                  >
                    <img className="check-double-icon" alt="" src="edit-icon.png" />
                    <div className="label7 submitBtn">update</div>
                  </button>
                </form>
              </div>
            </div>

            <div className="accordion-item border-0">
              <div
                id="businessPartnerCheckboxDiv"
                style={{ fontSize: "18px", marginLeft: "1.75em", marginTop: "25px" }}
              >
                Do you have a business partner?
                <input
                  type="checkbox"
                  className="mx-2"
                  id="businessPartnerRequire"
                  onChange={handleBusinessPartnerRequirement}
                />
              </div>
            </div>

            <div className="accordion-item border-0 d-none" id="businessPartnerDetailsDiv">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFiveSH"
                aria-expanded="true"
                aria-controls="collapseFiveSH"
              >
                <div className={status + " rounded-circle"}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="accounts/kybDetails/advance/busPar.svg"
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "stroke: yellow");
                        const paths = svg.querySelectorAll("path");
                        paths.forEach((path) => {
                          path.setAttribute(
                            "stroke",
                            status === "pending" ? "#E0990C" : status == "progress" ? "#299E58" : "#099cbc"
                          );
                        });
                      }}
                      className="file-zip-icon"
                    />
                    <img className="edit-circle-icon1" alt="" src={"accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Business Partner
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </div>
                  <div className={"bg-" + status + " text-start"}>
                    {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
                  </div>
                </div>
                <div className="icon-open2">
                  <div className="chevron-up1">
                    <img className="arrow-icon15" alt="" src="arrow2.svg" />
                  </div>
                </div>
              </button>
              <div
                id="collapseFiveSH"
                className="accordion-collapse collapse"
                aria-labelledby="headingFiveSH"
                data-bs-parent="#accordionExample2"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="businessNameStakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Business Name
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input type="text" id="businessRegistrationNumberStakeholder" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Business Registration Number
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>

                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select id="businessTypeStakeholder" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="SOLE_TRADER">Sole Trader</option>
                        <option value="PRIVATE_COMPANY">Private Limited Company</option>
                        <option value="PUBLIC_COMPANY">Public Company</option>
                        <option value="PARTNERSHIP">Partnership</option>
                        <option value="LIMITED_LIABILITY_PARTNERSHIP">Limited Liability Partnership Firm</option>
                        <option value="GOVERNMENT_ENTITY">Government Body</option>
                        <option value="ASSOCIATION">Associations</option>
                        <option value="TRUST">Trust</option>
                        <option value="REGULATED_TRUST">Regulated Trust</option>
                        <option value="UNREGULATED_TRUST">Unregulated Trust</option>
                        <option value="OTHERS">Others</option>
                        <option value="UNINCORP_PARTNERSHIP">Unincorporated Partnership</option>
                        <option value="LIMITED_PARTNERSHIP">Limited Partnership</option>
                        <option value="GENERAL_PARTNERSHIP">General Partnership</option>
                        <option value="CORPORATION">Corporations</option>
                        <option value="LIMITED_LIABILITY_COMPANY">Limited Liability Company</option>
                        <option value="UNINCORP_ASSOCIATION">Unincorporated Association</option>
                        <option value="ESTATE">Estate</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Business Type
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <select id="businessEntityTypeStakeholder" name="country" className="form-input my-0 pb-0">
                        <option value="SHAREHOLDER">SHAREHOLDER</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Business Entity Type
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>

                  <div id="legalDetailsDiv" style={{ display: "contents" }}>
                    <span className="header-title" style={{ fontSize: "18px" }}>
                      Legal Details
                      <span className="mx-1" style={{ color: "red" }}>
                        *
                      </span>
                    </span>
                    <div className="d-flex align-self-stretch">
                      <div className="input-group w-50 me-2 pb-0">
                        <select id="registeredCountryStakeholder" name="country" className="form-input my-0 pb-0">
                          <option value=""></option>
                          <option value="IN">India</option>
                          <option value="AU">Australia</option>
                          <option value="US">United States</option>
                          <option value="JP">Japan</option>
                          <option value="SG">Singapore</option>
                        </select>
                        <label htmlFor="country" className="form-input-label ps-1">
                          Registered Country
                          <span className="mx-1" style={{ color: "red" }}>
                            *
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* <button
                    onClick={functions.PostBusinessPartnerDetails}
                    type="button"
                    className="button-main btn outline-none submit-btn"
                    id="submitBusinessPartnerDetails"
                  >
                    <img className="check-double-icon" alt="" src="check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    onClick={functions.PostBusinessPartnerDetails}
                    type="button"
                    className="button-main btn outline-none update-btn"
                    id="updateBusinessPartnerDetails"
                  >
                    <img className="check-double-icon" alt="" src="edit-icon.png" />
                    <div className="label7 submitBtn">update</div>
                  </button> */}
                </form>
              </div>
            </div>

            <div className="accordion-item border-0 d-none" id="businessPartnerAddressDiv">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSixSH"
                aria-expanded="true"
                aria-controls="collapseSixSH"
              >
                <div className={status + " rounded-circle"}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="accounts/kybDetails/advance/busParAdd.svg"
                      beforeInjection={(svg) => {
                        svg.setAttribute("style", "stroke: yellow");
                        const paths = svg.querySelectorAll("path");
                        paths.forEach((path) => {
                          path.setAttribute(
                            "stroke",
                            status === "pending" ? "#E0990C" : status == "progress" ? "#299E58" : "#099cbc"
                          );
                        });
                      }}
                      className="file-zip-icon"
                    />
                    <img className="edit-circle-icon1" alt="" src={"accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Business Partner Address
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </div>
                  <div className={"bg-" + status + " text-start"}>
                    {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
                  </div>
                </div>
                <div className="icon-open2">
                  <div className="chevron-up1">
                    <img className="arrow-icon15" alt="" src="arrow2.svg" />
                  </div>
                </div>
              </button>
              <div
                id="collapseSixSH"
                className="accordion-collapse collapse"
                aria-labelledby="headingSixSH"
                data-bs-parent="#accordionExample2"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="addressLine1BusinessPartner" className="form-input my-0 pb-0" />
                      <label htmlFor="username" className="form-input-label ps-1">
                        Address 1
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input type="text" id="addressLine2BusinessPartner" className="form-input my-0 pb-0" />
                      <label htmlFor="businessname" className="form-input-label ps-1">
                        Address 2
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="cityBusinessPartner" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        City
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input type="text" id="stateBusinessPartner" className="form-input my-0 pb-0" />
                      <label htmlFor="tradename" className="form-input-label ps-1">
                        State
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="postcodeBusinessPartner" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Postal Code
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <select id="countryBusinessPartner" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="IN">India</option>
                        <option value="AU">Australia</option>
                        <option value="US">United States</option>
                        <option value="JP">Japan</option>
                        <option value="SG">Singapore</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Country
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>
                  <button
                    onClick={functions.PostBusinessPartnerAddressDetails}
                    type="button"
                    className="button-main btn outline-none submit-btn"
                    id="submitBusinessPartnerAddressDetails"
                  >
                    <img className="check-double-icon" alt="" src="check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    onClick={functions.PatchBusinessPartnerAddressDetails}
                    type="button"
                    className="button-main btn outline-none update-btn"
                    id="updateBusinessPartnerAddressDetails"
                  >
                    <img className="check-double-icon" alt="" src="edit-icon.png" />
                    <div className="label7 submitBtn">update</div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        id="addMoreStakeholder"
        className="center-div"
        style={{ fontSize: "medium", textTransform: "capitalize", display: "none" }}
      >
        <a href="#!" onClick={AddMoreStakeholder}>
          + Add more stakeholders
        </a>
      </div>

      <div id="stakeholderIndexDiv" className="center-div">
        <ul className="pagination-block">
          <li>
            <a href="#!" className="prev" onClick={handlePrevClick}>
              &#8249; Prev
            </a>
          </li>
          {generatePaginationLinks()}

          <li>
            <a href="#!" className="next" onClick={handleNextClick}>
              Next &#8250;
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default stakeholderDetailsAdvance;
