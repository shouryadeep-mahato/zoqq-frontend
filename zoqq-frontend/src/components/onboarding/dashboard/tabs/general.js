import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { ReactSVG } from "react-svg";
import * as functions from "./functions/business-details-functions.js";
import * as utilities from "./functions/utility-details-function.js";
import Modal from "./modals/CorporateDetailsModal.js";
import { toast } from "react-toastify";
import ContentLoader from "react-content-loader";
import "./css/general.css";

export const FetchEnumData = async () => {
  const response = await utilities.FetchEnumValues("businessType");
  return response;
};

export const FetchDetails = async () => {
  var lastemail = sessionStorage.getItem("lastemail");
  try {
    const response = await Axios.get(sessionStorage.getItem("baseUrl") + "/SignupRoutes/getuserstatus", {
      params: {
        email: lastemail,
      },
    });

    let obj = response.data;
    if (obj.status != "BAD_REQUEST") {
      if (obj.internalBusinessId != "") {
        sessionStorage.setItem("internalBusinessId", obj.internalBusinessId);
        sessionStorage.setItem("businessRegistrationNumber", obj.internalBusinessId);
      }

      if (obj.lastScreenCompleted != "") {
        sessionStorage.setItem("lastScreenCompleted", obj.lastScreenCompleted);
      }

      if (obj.userStatus != "") {
        sessionStorage.setItem("userStatus", obj.userStatus);
      }

      return obj;
    } else {
      console.log("No results found for the email: " + lastemail);
    }
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
};

function BusinessIncorporationDetails({ listCountry, fetchEnumValues }) {
  const [response, setResponse] = useState([]);

  const list = ["progress", "pending", "approve"];
  const [status, setStatus] = useState();

  useEffect(() => {
    const SetPage = async () => {
      //Fixing Country List
      if (listCountry != null && listCountry.length > 0) {
        var List = listCountry;
        if (List.length > 0) {
          var select = document.getElementById("registrationCountry");
          var select2 = document.getElementById("businessCountry");
          if (select || select2) {
            List.forEach((item) => {
              var option = document.createElement("option");
              option.value = item.ISOcc_2char;
              option.text = item.country_name;

              // Append the option to the select elements
              select.appendChild(option.cloneNode(true));
              select2.appendChild(option.cloneNode(true));
            });
          }
        } else {
          console.log("Country List Could Not Be Generated");
        }
      }

      //Fetch Enum Values
      if (fetchEnumValues != null) {
        var response = fetchEnumValues;
        if (response.length != 0) {
          var selectBusinessType = document.getElementById("businessType");
          if (selectBusinessType.options.length > 1) {
            selectBusinessType.innerHTML = "";
          }

          // Create an initial or default option
          const initialOption = document.createElement("option");
          initialOption.text = ""; // Set the text for the initial option
          initialOption.value = ""; // Optionally set a value for the initial option (can be an empty string)

          // Append the initial option to the select element
          selectBusinessType.appendChild(initialOption);

          //Appending the actual list here
          response.forEach((item) => {
            const optionElement = document.createElement("option");
            optionElement.text = item.description;
            optionElement.value = item.code;
            selectBusinessType.appendChild(optionElement);
          });
        } else {
          console.log("Unable to generate Business Type dropdown");
        }
      }

      var internalBusinessId = sessionStorage.getItem("internalBusinessId");
      if (internalBusinessId) {
        var lastScreenCompleted = sessionStorage.getItem("lastScreenCompleted");
        var userStatus = sessionStorage.getItem("userStatus");

        if (Number(lastScreenCompleted) == 3) {
          document.querySelectorAll(".submit-btn").forEach((item) => {
            item.style.display = "none";
          });

          document.querySelectorAll(".update-btn").forEach((item) => {
            item.style.display = "flex";
          });
        }

        if (Number(lastScreenCompleted) >= 18) {
          if (Number(lastScreenCompleted) === 22 && userStatus == "C") {
            setStatus(list[2]);
          } else {
            setStatus(list[1]);
          }
        }
        await functions.GetBusinessCorporationDetails(internalBusinessId);
      }
    };

    document.getElementById("associationDiv").style.display = "none";
    document.getElementById("partnershipDiv").style.display = "none";
    setStatus(list[0]);

    SetPage();
  }, [listCountry, fetchEnumValues]);

  //Debounced state implementation
  const debouncedSetStateRef = useRef(null);

  const DEBOUNCE_TIME = 3000;

  const handleBRNChange = async () => {
    var internalBusinessId = sessionStorage.getItem("internalBusinessId");
    if (internalBusinessId) {
      return;
    } else {
      clearTimeout(debouncedSetStateRef.current);
      document.getElementById("brn-loader").style.display = "block";
      debouncedSetStateRef.current = setTimeout(async () => {
        try {
          const result = await functions.GetCorporateDetailsList();
          if (result.status != "BAD_REQUEST") {
            document.getElementById("brn-loader").style.display = "none";
            setResponse(result);
          } else {
            toast.error("Error in fetching business list: " + result.message);
          }
        } catch (error) {
          console.log("Error in fetching business list: " + error);
        }
      }, DEBOUNCE_TIME);
    }
  };

  const handleBusinessTypeChange = () => {
    var businessType = document.getElementById("businessType");
    sessionStorage.setItem("businessType", businessType.value);
    if (businessType.value == "PARTNERSHIP") {
      document.getElementById("partnershipDiv").style.display = "contents";
      document.getElementById("associationDiv").style.display = "none";
    } else if (businessType.value == "ASSOCIATION") {
      document.getElementById("associationDiv").style.display = "contents";
      document.getElementById("partnershipDiv").style.display = "none";
    } else {
      document.getElementById("associationDiv").style.display = "none";
      document.getElementById("partnershipDiv").style.display = "none";
    }
  };

  const handleBusinessName = (event) => {
    sessionStorage.setItem("businessName", event.target.value);
  };
  return (
    <>
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
                src="/onboarding/accounts/general/busIncorpDet.svg"
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
              Business Incorporation Details
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
              <img className="arrow-icon15" alt="" src="/onboarding/arrow2.svg" />
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
              <div className="input-group w-50 me-2 pb-0">
                <input
                  type="text"
                  id="businessRegistrationNumber"
                  className="form-input my-0 pb-0"
                  onChange={handleBRNChange}
                  required
                />
                <span
                  id="brn-loader"
                  className="blink"
                  style={{
                    width: "23%",
                    fontSize: "12px",
                    position: "absolute",
                    top: "70%",
                    right: "0",
                    transform: "translateY(-50%)",
                    display: "none",
                  }}
                >
                  Loading list.....
                </span>

                {response && <Modal response={response} />}
                <label htmlFor="businessIN" className="form-input-label ps-1">
                  Business Incorporation Number
                  <span className="mx-1" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
              </div>
              <div className="input-group w-50 ms-2 pb-0">
                <input
                  type="text"
                  id="businessName"
                  className="form-input my-0 pb-0"
                  onChange={handleBusinessName}
                  required
                />
                <label htmlFor="businessname" className="form-input-label ps-1">
                  Business Name
                  <span className="mx-1" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
              </div>
            </div>
            <div className="d-flex align-self-stretch">
              <div className="input-group w-50 me-2 pb-0">
                <select id="businessType" className="form-input my-0 pb-0" onChange={handleBusinessTypeChange}>
                  <option value=""></option>
                </select>
                <label htmlFor="country" className="form-input-label ps-1">
                  Business Type
                  <span className="mx-1" style={{ color: "red" }}>
                    *
                  </span>
                </label>
              </div>
              <div className="input-group w-50 ms-2 pb-0">
                <input type="text" id="tradeName" className="form-input my-0 pb-0" />
                <label htmlFor="country" className="form-input-label ps-1">
                  Trade Name
                </label>
              </div>
            </div>

            {/* Hiding Settlor and trustee name - temporary */}
            <div className="d-flex align-self-stretch d-none">
              <div className="input-group w-50 me-2 pb-0">
                <input type="text" id="settlorName" className="form-input my-0 pb-0" />
                <label htmlFor="businesstype" className="form-input-label ps-1">
                  Settlor Name
                </label>
                <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
              </div>
              <div className="input-group w-50 ms-2 pb-0">
                <input type="text" id="trusteeName" className="form-input my-0 pb-0" />
                <label htmlFor="trusteename" className="form-input-label ps-1">
                  Trustee Name
                </label>
                <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
              </div>
            </div>
            {/* Hiding Settlor and trustee name - temporary */}

            <div id="partnershipDiv" style={{ display: "contents" }}>
              <div className="header-title">
                Partnership Details
                <span className="mx-1" style={{ color: "red" }}>
                  *
                </span>
              </div>
              <div className="d-flex align-self-stretch">
                <div className="input-group w-50 me-2 pb-0">
                  <input type="text" id="partnerName" className="form-input my-0 pb-0" />
                  <label htmlFor="businesstype" className="form-input-label ps-1">
                    Partner Name
                  </label>
                  <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                </div>
                <div className="input-group w-50 ms-2 pb-0">
                  <input type="text" id="partnerState" className="form-input my-0 pb-0" />
                  <label htmlFor="trusteename" className="form-input-label ps-1">
                    Partner State
                  </label>
                  <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                </div>
              </div>

              <div className="d-flex align-self-stretch">
                <div className="input-group w-50 me-2 pb-0">
                  <select id="partnerCountry" className="form-input my-0 pb-0">
                    <option value=""></option>
                  </select>
                  <label htmlFor="country" className="form-input-label ps-1">
                    Partner Country
                  </label>
                </div>
              </div>
            </div>
            <div id="associationDiv" style={{ display: "contents" }}>
              <div className="header-title">
                Association Details
                <span className="mx-1" style={{ color: "red" }}>
                  *
                </span>
              </div>
              <div className="d-flex align-self-stretch">
                <div className="input-group w-50 me-2 pb-0">
                  <input type="text" id="associationName" className="form-input my-0 pb-0" />
                  <label htmlFor="businesstype" className="form-input-label ps-1">
                    Association Name
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </label>
                  <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                </div>
                <div className="input-group w-50 ms-2 pb-0">
                  <input type="text" id="associationNumber" className="form-input my-0 pb-0" />
                  <label htmlFor="trusteename" className="form-input-label ps-1">
                    Association Number
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </label>
                  <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                </div>
              </div>

              <div className="d-flex align-self-stretch">
                <div className="input-group w-50 me-2 pb-0">
                  <input type="text" id="associationChairPerson" className="form-input my-0 pb-0" />
                  <label htmlFor="country" className="form-input-label ps-1">
                    Association Chairperson
                    <span className="mx-1" style={{ color: "red" }}>
                      *
                    </span>
                  </label>
                  <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
                </div>
              </div>
            </div>
            {/* <button
              type="button"
              id="submitBusinessIncorpDetails"
              className="button-main btn outline-none submit-btn"
              onClick={functions.PostBusinessCorporationDetails}
            >
              <div id="button-text-business-incorp" className="flex-btn">
                <img className="check-double-icon" alt="" src="/onboarding/check-double.svg" />
                <div type="button" className="label7 submitBtn">
                  Submit
                </div>
              </div>
              <div id="button-loader-business-incorp" className="flex-btn" style={{ display: "none" }}>
                <img className="google-icon mx-2" alt="" src="/signup/Signup/public/loader.gif" />
                <div type="button" className="label7 submitBtn">
                  Submitting...
                </div>
              </div>
            </button>
            <button
              type="button"
              id="updateBusinessIncorpDetails"
              className="button-main btn outline-none update-btn"
              onClick={functions.PatchBusinessCorporationDetails}
            >
              <img className="check-double-icon" alt="" src="/onboarding/edit-icon.png" />
              <div type="button" className="label7 submitBtn">
                Update
              </div>
            </button> */}
          </form>
        </div>
      </div>
    </>
  );
}

function RegisteredAddressDetails() {
  const list = ["progress", "pending", "approve"];
  const [status, setStatus] = useState();

  useEffect(() => {
    var lastScreenCompleted = sessionStorage.getItem("lastScreenCompleted");
    var userStatus = sessionStorage.getItem("userStatus");

    if (Number(lastScreenCompleted) >= 4) {
      if (Number(lastScreenCompleted) === 5 && userStatus == "C") {
        setStatus(list[2]);
      } else {
        setStatus(list[1]);
      }
    } else {
      setStatus(list[0]);
    }
  }, []);

  const copyAddress = () => {
    // This function will be called when the checkbox's value changes
    var checkbox = document.getElementById("isSameBusinessAddress");
    if (checkbox.checked) {
      document.getElementById("businessAddress_1").value = document.getElementById("registrationAddress_1").value;
      document.getElementById("businessAddress_2").value = document.getElementById("registrationAddress_2").value;
      document.getElementById("businessCity").value = document.getElementById("registrationCity").value;
      document.getElementById("businessState").value = document.getElementById("registrationState").value;
      document.getElementById("businessPostCode").value = document.getElementById("registrationPostCode").value;
      document.getElementById("businessCountry").value = document.getElementById("registrationCountry").value;
    } else {
      document.getElementById("businessAddress_1").value = "";
      document.getElementById("businessAddress_2").value = "";
      document.getElementById("businessCity").value = "";
      document.getElementById("businessState").value = "";
      document.getElementById("businessPostCode").value = "";
      document.getElementById("businessCountry").value = "";
    }
  };

  return (
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
              src="/onboarding/accounts/general/regisAdd.svg"
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
            Registered Address
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
            <img className="arrow-icon15" alt="" src="/onboarding/arrow2.svg" />
          </div>
        </div>
      </button>
      <div
        id="collapseTwo"
        className="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <form className="form">
          <div className="d-flex align-self-stretch">
            <div className="input-group w-50 me-2 pb-0">
              <input type="text" id="registrationAddress_1" className="form-input my-0 pb-0" required />
              <label htmlFor="username" className="form-input-label ps-1">
                Address 1
                <span className="mx-1" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
            </div>
            <div className="input-group w-50 ms-2 pb-0">
              <input type="text" id="registrationAddress_2" className="form-input my-0 pb-0" />
              <label htmlFor="businessname" className="form-input-label ps-1">
                Address 2
              </label>
              <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
            </div>
          </div>
          <div className="d-flex align-self-stretch">
            <div className="input-group w-50 me-2 pb-0">
              <input type="text" id="registrationCity" className="form-input my-0 pb-0" />
              <label htmlFor="businesstype" className="form-input-label ps-1">
                City
              </label>
              <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
            </div>
            <div className="input-group w-50 ms-2 pb-0">
              <input type="text" id="registrationState" className="form-input my-0 pb-0" />
              <label htmlFor="tradename" className="form-input-label ps-1">
                State
              </label>
              <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
            </div>
          </div>
          <div className="d-flex align-self-stretch">
            <div className="input-group w-50 me-2 pb-0">
              <input type="text" id="registrationPostCode" className="form-input my-0 pb-0" required />
              <label htmlFor="businesstype" className="form-input-label ps-1">
                Postal Code
                <span className="mx-1" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
            </div>
            <div className="input-group w-50 ms-2 pb-0">
              <select id="registrationCountry" name="registrationCountry" className="form-input my-0 pb-0" required>
                <option value=""></option>
              </select>
              <label htmlFor="country" className="form-input-label ps-1">
                Country
                <span className="mx-1" style={{ color: "red" }}>
                  *
                </span>
              </label>
            </div>
          </div>
          <div className="d-flex align-self-stretch my-3">
            <input
              type="checkbox"
              id="isSameBusinessAddress"
              className="form-input my-0 pb-0 w15"
              onChange={copyAddress}
            />
            <label htmlFor="businesstype" className="form-input-label ps-1">
              Is Business Address same as Registered Address?
            </label>
          </div>
          {/* <button
            type="button"
            id="submitRegisteredAddress"
            className="button-main btn outline-none submit-btn"
            onClick={functions.PostRegisteredAddressDetails}
          >
            <img className="check-double-icon" alt="" src="/onboarding/check-double.svg" />
            <div type="button" className="label7 submitBtn">
              Submit
            </div>
          </button>
          <button
            type="button"
            id="updateRegisteredAddress"
            className="button-main btn outline-none update-btn"
            onClick={functions.PatchRegisteredAddressDetails}
          >
            <img className="check-double-icon" alt="" src="/onboarding/edit-icon.png" />
            <div type="button" className="label7 submitBtn">
              Update
            </div>
          </button> */}
        </form>
      </div>
    </div>
  );
}

function BusinessAddressDetails() {
  const list = ["progress", "pending", "approve"];
  const [status, setStatus] = useState();

  useEffect(() => {
    var lastScreenCompleted = sessionStorage.getItem("lastScreenCompleted");
    var userStatus = sessionStorage.getItem("userStatus");
    if (Number(lastScreenCompleted) >= 4) {
      if (Number(lastScreenCompleted) === 5 && userStatus == "C") {
        setStatus(list[2]);
      } else {
        setStatus(list[1]);
      }
      document.getElementById("div7").style.width = "80%";
    } else {
      setStatus(list[0]);
    }
  }, []);

  return (
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
              src="/onboarding/accounts/general/busAdd.svg"
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
            Business Address
            <span className="mx-1" style={{ color: "red" }} id="businessAddressDetailsLabel"></span>
          </div>
          <div className={"bg-" + status + " text-start"}>
            {status === "pending" ? "Pending" : status == "progress" ? "In Progress" : "Approved"}
          </div>
        </div>
        <div className="icon-open2">
          <div className="chevron-up1">
            <img className="arrow-icon15" alt="" src="/onboarding/arrow2.svg" />
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
              <input type="text" id="businessAddress_1" className="form-input my-0 pb-0" />
              <label htmlFor="username" className="form-input-label ps-1">
                Address 1
                <span className="mx-1" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
            </div>
            <div className="input-group w-50 ms-2 pb-0">
              <input type="text" id="businessAddress_2" className="form-input my-0 pb-0" />
              <label htmlFor="businessname" className="form-input-label ps-1">
                Address 2
              </label>
              <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
            </div>
          </div>
          <div className="d-flex align-self-stretch">
            <div className="input-group w-50 me-2 pb-0">
              <input type="text" id="businessCity" className="form-input my-0 pb-0" />
              <label htmlFor="businesstype" className="form-input-label ps-1">
                City
              </label>
              <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
            </div>
            <div className="input-group w-50 ms-2 pb-0">
              <input type="text" id="businessState" className="form-input my-0 pb-0" />
              <label htmlFor="tradename" className="form-input-label ps-1">
                State
              </label>
              <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
            </div>
          </div>
          <div className="d-flex align-self-stretch">
            <div className="input-group w-50 me-2 pb-0">
              <input type="text" id="businessPostCode" className="form-input my-0 pb-0" />
              <label htmlFor="businesstype" className="form-input-label ps-1">
                Postal Code
                <span className="mx-1" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <img className="cross-circle-icon1" alt="" src="/onboarding/cross-circle1.svg" />
            </div>
            <div className="input-group w-50 ms-2 pb-0">
              <select id="businessCountry" name="country" className="form-input my-0 pb-0">
                <option value=""></option>
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
            type="button"
            id="submitBusinessAddress"
            className="button-main btn outline-none submit-btn"
            onClick={functions.PostBusinessAddressDetails}
          >
            <img className="check-double-icon" alt="" src="/onboarding/check-double.svg" />
            <div type="button" className="label7 submitBtn">
              Submit
            </div>
          </button>
          <button
            type="button"
            id="updateBusinessAddress"
            className="button-main btn outline-none update-btn"
            onClick={functions.PatchBusinessAddressDetails}
          >
            <img className="check-double-icon" alt="" src="/onboarding/edit-icon.png" />
            <div type="button" className="label7 submitBtn">
              Update
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

function General() {
  const [listCountry, setListCountry] = useState(null);
  const [fetchEnumValues, setFetchEnumValues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const SetPage = async () => {
      const listCountryResponse = await utilities.listCountry();
      const fetchEnumValuesResponse = await FetchEnumData();

      // Set the values in state
      setListCountry(listCountryResponse);
      setFetchEnumValues(fetchEnumValuesResponse);
      setIsLoading(false);

      //Disabling all update buttons as default
      document.querySelectorAll(".update-btn").forEach((item) => {
        item.style.display = "none";
      });

      document.querySelectorAll(".submit-btn").forEach((item) => {
        item.style.display = "";
      });

      //Enabling Submit/Update Buttons as per requirements
      const fetchUserDetails = await FetchDetails();
      if (fetchUserDetails) {
        if (fetchUserDetails.userStatus !== "BAD_REQUEST") {
          var lastScreenCompleted = fetchUserDetails.lastScreenCompleted;
          if (Number(lastScreenCompleted) >= 3) {
            document.querySelectorAll(".submit-btn").forEach((item) => {
              item.style.display = "none";
            });
            document.querySelectorAll(".update-btn").forEach((item) => {
              item.style.display = "";
            });
          }
        }
      }
    };

    SetPage();
  }, []);

  return (
    <div className="accordion" id="accordionExample">
      {/* Pass listCountry and fetchEnumValues as props */}
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
          <BusinessIncorporationDetails listCountry={listCountry} fetchEnumValues={fetchEnumValues} />
          <RegisteredAddressDetails />
          <BusinessAddressDetails />
        </>
      )}
    </div>
  );
}

export default General;
