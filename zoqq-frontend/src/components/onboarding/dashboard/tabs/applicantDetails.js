import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import ContentLoader from "react-content-loader";
import * as functions from "./functions/applicant-details-function.js";
import * as utilities from "./functions/utility-details-function.js";

export const FetchNationality = async () => {
  const response = await utilities.listNationality();
  if (response.length != 0) {
    var nationalityStakeholder = document.getElementById("applicantNationality");

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
    response.forEach((item) => {
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
};

function ApplicantDetails() {
  const list = ["progress", "pending", "approve"];
  const [status, setStatus] = useState(list[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const SetPage = async () => {
      const position = await utilities.FetchEnumValues("position");
      const listCountry = await utilities.listCountry();
      const listNationality = await utilities.listNationality();

      setIsLoading(false);

      //Setting Enum Values
      if (position.length != 0) {
        var positionSelect = document.getElementById("applicantPosition");
        if (positionSelect) {
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
      }

      //Setting Country List
      const response = listCountry;
      if (response.length != 0) {
        var countryStakeholder = document.getElementById("applicantCountry");
        var countryBusinessPartner = document.getElementById("applicantCountryCode");
        if (countryStakeholder && countryBusinessPartner) {
          if (countryStakeholder.options.length > 1) {
            countryStakeholder.innerHTML = "";
          }
          if (countryBusinessPartner.options.length > 1) {
            countryBusinessPartner.innerHTML = "";
          }

          // Create an initial or default option
          const initialOption = document.createElement("option");
          initialOption.text = ""; // Set the text for the initial option
          initialOption.value = ""; // Optionally set a value for the initial option (can be an empty string)

          // Append the initial option to the select element
          countryStakeholder.appendChild(initialOption.cloneNode(true));
          countryBusinessPartner.appendChild(initialOption.cloneNode(true));

          //Appending the actual list here
          response.forEach((item) => {
            const optionElement = document.createElement("option");
            optionElement.text = item.country_name;
            optionElement.value = item.ISOcc_2char;
            // Set a custom attribute for the optionElement
            optionElement.setAttribute("data-country-code", item.ISD_country_code);
            countryStakeholder.appendChild(optionElement.cloneNode(true));
          });

          //Appending the actual list here
          response.forEach((item) => {
            const optionElement = document.createElement("option");
            optionElement.text = item.country_name + " ( +" + item.ISD_country_code + " )";
            optionElement.value = item.ISOcc_2char;
            // Set a custom attribute for the optionElement
            optionElement.setAttribute("data-country-code", item.ISD_country_code);
            countryBusinessPartner.appendChild(optionElement.cloneNode(true));
          });
        } else {
          console.log("Unable to generate country list dropdown");
        }
      }

      //Setting Nationality List
      const res = listNationality;
      if (res.length != 0) {
        var nationalityStakeholder = document.getElementById("applicantNationality");
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
          res.forEach((item) => {
            const optionElement = document.createElement("option");
            optionElement.text = item.nationality;
            optionElement.value = item.ISOcc_2char;
            // Set a custom attribute for the optionElement
            optionElement.setAttribute("data-country-code", item.ISD_country_code);
            nationalityStakeholder.appendChild(optionElement.cloneNode(true));
          });
          await functions.FetchCognitoDetails();
        } else {
          console.log("Unable to generate nationality list dropdown");
        }
      }

      //Setting page details according to saved responses if possible
      var internalBusinessId = sessionStorage.getItem("internalBusinessId");
      var lastScreenCompleted = sessionStorage.getItem("lastScreenCompleted");
      var userStatus = sessionStorage.getItem("userStatus");
      if (internalBusinessId && Number(lastScreenCompleted) === 18) {
        // document.querySelectorAll(".submit-btn").forEach((item) => {
        //   item.style.display = "none";
        // });
        // document.querySelectorAll(".update-btn").forEach((item) => {
        //   item.style.display = "";
        // });
        if (Number(lastScreenCompleted) === 22 && userStatus == "C") {
          setStatus(list[2]);
        } else {
          setStatus(list[1]);
        }

        await functions.GetApplicantBusinessDetails(internalBusinessId);
      } else {
        setStatus(list[0]);
        var brn = sessionStorage.getItem("businessRegistrationNumber");
        //functions.GetApplicantDetails(brn);
        document.querySelectorAll(".submit-btn").forEach((item) => {
          item.style.display = "flex";
        });

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

  const nationalityChange = () => {
    var nationalityList = document.getElementById("applicantNationality").value;
    var kycModeStakeholder = document.getElementById("applicantKycMode");
    if (nationalityList == "SG") {
      kycModeStakeholder.value = "E_KYC";
    } else {
      kycModeStakeholder.value = "E_DOC_VERIFY";
    }
  };

  return (
    <>
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
          <div className="accordion" id="accordionExample">
            <div className="accordion-item border-0">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <div className={status}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="/onboarding/accounts/applicationReview/kycDet.svg"
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
                    <img className="edit-circle-icon1" alt="" src={"/onboarding/accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    KYC Details
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
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-33 me-2 pb-0">
                      <input id="applicantFirstName" name="country" className="form-input my-0 pb-0" />
                      <label htmlFor="country" className="form-input-label ps-1">
                        First Name
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-33 ms-2 pb-0">
                      <input id="applicantMiddleName" name="country" className="form-input my-0 pb-0" />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Middle Name
                      </label>
                    </div>
                    <div className="input-group w-33 ms-2 pb-0">
                      <input id="applicantLastName" name="country" className="form-input my-0 pb-0" />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Last Name
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select
                        id="applicantNationality"
                        name="country"
                        className="form-input my-0 pb-0"
                        onChange={nationalityChange}
                      >
                        <option value=""></option>
                        <option value="IN">Indian</option>
                        <option value="SG">Singaporean</option>
                        <option value="US">American</option>
                        <option value="AU">Australian</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Nationality
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input id="applicantDateOfBirth" type="date" name="country" className="form-input my-0 pb-0" />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Date Of Birth
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0 d-none">
                      <select id="applicantKycMode" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="E_KYC">E_KYC</option>
                        <option value="M_KYC">M_KYC</option>
                        <option value="E_DOC_VERIFY">E_DOC_VERIFY</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        KYC Mode
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-50 me-2 pb-0">
                      <select id="applicantIsResident" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Are you a resident?
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>
                  {/* <button
                    className="button-main btn outline-none submit-btn"
                    id="submitKycDetails"
                    type="button"
                    onClick={functions.PostKYCDetails}
                  >
                    <img className="check-double-icon" alt="" src="check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    className="button-main btn outline-none update-btn"
                    id="updateKycDetails"
                    type="button"
                    onClick={functions.PatchKYCDetails}
                  >
                    <img className="check-double-icon" alt="" src="edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button> */}
                </form>
              </div>
            </div>

            <div className="accordion-item border-0">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="true"
                aria-controls="collapseTwo"
              >
                <div className={status}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="/onboarding/accounts/applicationReview/appProDet.svg"
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
                    <img className="edit-circle-icon1" alt="" src={"/onboarding/accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Applicant Professional Details
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
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select id="applicantPosition" name="country" className="form-input my-0 pb-0">
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
                        id="applicantSharePercentage"
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
                  {/* <button
                    className="button-main btn outline-none submit-btn"
                    id="submitProfessionalDetails"
                    type="button"
                    onClick={functions.PostProfessionalDetails}
                  >
                    <img className="check-double-icon" alt="" src="check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    className="button-main btn outline-none update-btn"
                    id="updateProfessionalDetails"
                    type="button"
                    onClick={functions.PatchProfessionalDetails}
                  >
                    <img className="check-double-icon" alt="" src="edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button> */}
                </form>
              </div>
            </div>

            <div className="accordion-item border-0">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="true"
                aria-controls="collapseThree"
              >
                <div className={status}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="/onboarding/accounts/applicationReview/appAdd.svg"
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
                    <img className="edit-circle-icon1" alt="" src={"/onboarding/accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Applicant Address Details
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
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="applicantAddressLine1" className="form-input my-0 pb-0" />
                      <label htmlFor="username" className="form-input-label ps-1">
                        Address 1
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input type="text" id="applicantAddressLine2" className="form-input my-0 pb-0" />
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
                      <input type="text" id="applicantCity" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        City
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input type="text" id="applicantState" className="form-input my-0 pb-0" />
                      <label htmlFor="tradename" className="form-input-label ps-1">
                        State
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input type="text" id="applicantPostcode" className="form-input my-0 pb-0" />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Postal Code
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <select id="applicantCountry" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="IN">India</option>
                        <option value="SG">Singapore</option>
                        <option value="AU">Australia</option>
                        <option value="US">United States</option>
                        <option value="AQ">Antarctica</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Country
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>
                  {/* <button
                    className="button-main btn outline-none submit-btn"
                    id="submitAddressDetails"
                    type="button"
                    onClick={functions.PostAddressDetails}
                  >
                    <img className="check-double-icon" alt="" src="check-double.svg" />
                    <div className="label7 submitBtn">Submit</div>
                  </button>
                  <button
                    className="button-main btn outline-none update-btn"
                    id="updateAddressDetails"
                    type="button"
                    onClick={functions.PatchAddressDetails}
                  >
                    <img className="check-double-icon" alt="" src="edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button> */}
                </form>
              </div>
            </div>

            <div className="accordion-item border-0">
              <button
                className="accordion1 border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="true"
                aria-controls="collapseFour"
              >
                <div className={status}>
                  <div className="file-zip-parent">
                    <ReactSVG
                      src="/onboarding/accounts/applicationReview/appConDet.svg"
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
                    <img className="edit-circle-icon1" alt="" src={"/onboarding/accounts/" + status + ".svg"} />
                  </div>
                </div>
                <div className="title4">
                  <div className="add-details-to1">
                    Applicant Contact Details
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
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-100 pb-0">
                      <input type="email" id="applicantEmail" className="form-input my-0 pb-0" />
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
                      <select id="applicantCountryCode" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="IN">India (+91)</option>
                        <option value="SG">Singapore (+65)</option>
                        <option value="US">United States (+1)</option>
                        <option value="AQ">Antarctica (+372)</option>
                        <option value="AU">Australia (+61)</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Country Code
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input type="number" id="applicantContactNo" className="form-input my-0 pb-0" maxLength={15} />
                      <label htmlFor="businesstype" className="form-input-label ps-1">
                        Contact Number
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                      <img className="cross-circle-icon1" alt="" src="cross-circle1.svg" />
                    </div>
                  </div>
                  <button
                    className="button-main btn outline-none submit-btn d-flex"
                    type="button"
                    id="submitContactDetails"
                    onClick={functions.PostContactDetails}
                  >
                    <div id="button-text-ekyc" style={{ display: "flex" }}>
                      <img className="check-double-icon" alt="" src="check-double.svg" />
                      <div className="label7 submitBtn">Submit</div>
                    </div>
                    <div id="button-loader-ekyc" style={{ display: "none" }}>
                      <img
                        className="google-icon"
                        style={{
                          position: "relative",
                          width: "24px",
                          height: "24px",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                        alt=""
                        src="/signup/Signup/public/loader.gif"
                      />
                    </div>
                  </button>
                  <button
                    className="button-main btn outline-none update-btn"
                    type="button"
                    id="updateContactDetails"
                    onClick={functions.PatchContactDetails}
                  >
                    <img className="check-double-icon" alt="" src="edit-icon.png" />
                    <div className="label7 submitBtn">Update</div>
                  </button>
                  <button
                    className="button-main btn outline-none update-btn d-none"
                    type="button"
                    id="submitEKYCDetails"
                    onClick={functions.PostEKYCTemporary}
                  >
                    <img className="check-double-icon" alt="" src="check-double.svg" />
                    <div className="label7 submitBtn">Onboard User</div>
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* <button
            className="button-main btn outline-none submit-btn"
            type="button"
            id="submitEKYCDetails"
            onClick={functions.PostEKYCTemporary}
          >
            <img className="check-double-icon" alt="" src="check-double.svg" />
            <div className="label7 submitBtn">Proceed to Onboarding</div>
          </button> */}
        </>
      )}
    </>
  );
}

export default ApplicantDetails;
