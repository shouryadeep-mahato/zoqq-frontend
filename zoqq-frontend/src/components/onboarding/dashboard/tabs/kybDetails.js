import React, { useEffect, useState } from "react";
import StakeholderDetails from "./stakeholderDetails";
import { ReactSVG } from "react-svg";
import ContentLoader from "react-content-loader";
import * as functions from "./functions/kyb-details-function.js";
import * as utilities from "./functions/utility-details-function.js";

function kybDetails() {
  const [filename, setFilename] = useState("Browse Files");
  const [filetype, setFiletype] = useState("Accepted Formats: jpg/jpeg/png/pdf");
  const [filesize, setFilesize] = useState("0.00");

  const [filename2, setFilename2] = useState("Browse Files");
  const [filetype2, setFiletype2] = useState("Accepted Formats: jpg/jpeg/png/pdf");
  const [filesize2, setFilesize2] = useState("0.00");
  const list = ["progress", "pending", "approve"];
  const [status, setStatus] = useState(list[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const SetPage = async () => {
      const documentType = await utilities.FetchEnumValues("documentType");
      const listCountry = await utilities.listCountry();

      const FetchOnboardingDetails = await functions.FetchOnboardingDetails();

      var url = sessionStorage.getItem("kycUrl") || sessionStorage.getItem("redirectUrl");
      if (document.getElementById("kycUrl")) {
        document.getElementById("kycUrl").value = url;
      }
      setIsLoading(false);

      //Setting Enum Values
      if (documentType.length != 0) {
        var businessDocumentType = document.getElementById("businessDocumentType");
        var StakeholderDocumentType = document.getElementById("StakeholderDocumentType");
        var applicantDocumentType = document.getElementById("applicantDocumentType");

        if (businessDocumentType && StakeholderDocumentType && applicantDocumentType) {
          if (businessDocumentType.options.length > 1) {
            businessDocumentType.innerHTML = "";
          }

          if (StakeholderDocumentType.options.length > 1) {
            StakeholderDocumentType.innerHTML = "";
          }

          if (applicantDocumentType.options.length > 1) {
            applicantDocumentType.innerHTML = "";
          }
          // Create an initial or default option
          const initialOption = document.createElement("option");
          initialOption.text = ""; // Set the text for the initial option
          initialOption.value = ""; // Optionally set a value for the initial option (can be an empty string)

          // Append the initial option to the select element
          businessDocumentType.appendChild(initialOption.cloneNode(true));
          StakeholderDocumentType.appendChild(initialOption.cloneNode(true));
          applicantDocumentType.appendChild(initialOption.cloneNode(true));

          //Appending the actual list here
          documentType.forEach((item) => {
            const optionElement = document.createElement("option");
            optionElement.text = item.description;
            optionElement.value = item.code;
            businessDocumentType.appendChild(optionElement.cloneNode(true));
            StakeholderDocumentType.appendChild(optionElement.cloneNode(true));
            applicantDocumentType.appendChild(optionElement.cloneNode(true));
          });
        } else {
          console.log("Unable to generate position list dropdown");
        }
      }

      //Setting Country List
      const response = listCountry;
      if (response.length != 0) {
        var StakeholderDocumentIssuanceCountry = document.getElementById("StakeholderDocumentIssuanceCountry");
        var StakeholderDocumentIssuingAuthority = document.getElementById("StakeholderDocumentIssuingAuthority");
        var applicantDocumentIssuanceCountry = document.getElementById("applicantDocumentIssuanceCountry");
        var applicantDocumentIssuingAuthority = document.getElementById("applicantDocumentIssuingAuthority");

        if (
          StakeholderDocumentIssuanceCountry &&
          StakeholderDocumentIssuingAuthority &&
          applicantDocumentIssuanceCountry &&
          applicantDocumentIssuingAuthority
        ) {
          if (StakeholderDocumentIssuanceCountry.options.length > 1) {
            StakeholderDocumentIssuanceCountry.innerHTML = "";
          }
          if (StakeholderDocumentIssuingAuthority.options.length > 1) {
            StakeholderDocumentIssuingAuthority.innerHTML = "";
          }
          if (applicantDocumentIssuanceCountry.options.length > 1) {
            applicantDocumentIssuanceCountry.innerHTML = "";
          }

          if (applicantDocumentIssuingAuthority.options.length > 1) {
            applicantDocumentIssuingAuthority.innerHTML = "";
          }

          // Create an initial or default option
          const initialOption = document.createElement("option");
          initialOption.text = ""; // Set the text for the initial option
          initialOption.value = ""; // Optionally set a value for the initial option (can be an empty string)

          // Append the initial option to the select element
          StakeholderDocumentIssuanceCountry.appendChild(initialOption.cloneNode(true));
          StakeholderDocumentIssuingAuthority.appendChild(initialOption.cloneNode(true));
          applicantDocumentIssuanceCountry.appendChild(initialOption.cloneNode(true));
          applicantDocumentIssuingAuthority.appendChild(initialOption.cloneNode(true));

          //Appending the actual list here
          response.forEach((item) => {
            const optionElement = document.createElement("option");
            optionElement.text = item.country_name;
            optionElement.value = item.ISOcc_2char;
            // Set a custom attribute for the optionElement
            optionElement.setAttribute("data-country-code", item.ISD_country_code);
            StakeholderDocumentIssuanceCountry.appendChild(optionElement.cloneNode(true));
            StakeholderDocumentIssuingAuthority.appendChild(optionElement.cloneNode(true));
            applicantDocumentIssuanceCountry.appendChild(optionElement.cloneNode(true));
            applicantDocumentIssuingAuthority.appendChild(optionElement.cloneNode(true));
          });
        } else {
          console.log("Unable to generate country list dropdown");
        }
      }

      //Setting page details according to saved responses if possible
      var internalBusinessId = sessionStorage.getItem("internalBusinessId");
      var lastScreenCompleted = sessionStorage.getItem("lastScreenCompleted");
      var userStatus = sessionStorage.getItem("userStatus");
      if (internalBusinessId && Number(lastScreenCompleted) >= 19) {
        if (Number(lastScreenCompleted) >= 21) {
          document.querySelectorAll(".submit-btn").forEach((item) => {
            item.style.display = "none";
          });
          document.querySelectorAll(".update-btn").forEach((item) => {
            item.style.display = "";
          });
          if (Number(lastScreenCompleted) === 22 && userStatus == "C") {
            setStatus(list[2]);
          } else {
            setStatus(list[1]);
          }
        } else {
          document.querySelectorAll(".submit-btn").forEach((item) => {
            item.style.display = "";
          });
          document.querySelectorAll(".update-btn").forEach((item) => {
            item.style.display = "none";
          });
        }
        document.getElementById("div7").style.width = "90%";
        await functions.GetKYBDetails(internalBusinessId);
      } else {
        setStatus(list[0]);
        document.getElementById("div7").style.width = "80%";
        var brn = sessionStorage.getItem("businessRegistrationNumber");
        document.querySelectorAll(".update-btn").forEach((item) => {
          item.style.display = "none";
        });
      }
      if (document.getElementById("submitMKYC")) {
        if (Number(lastScreenCompleted) === 22 && userStatus == "C") {
          document.getElementById("submitMKYC").style.display = "none";
        } else {
          document.getElementById("submitMKYC").style.display = "flex";
        }
      }

      if (document.getElementById("submitEKYC")) {
        if (Number(lastScreenCompleted) === 22 && userStatus == "C") {
          document.getElementById("submitEKYC").style.display = "none";
        } else {
          document.getElementById("submitEKYC").style.display = "flex";
        }
      }
    };
    SetPage();
  }, []);

  const fileUpload = () => {
    var fileInput = document.getElementById("businessDocumentFile");
    document.getElementById("businessDocumentFile").click();

    fileInput.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFilename(selectedFile.name);
        setFiletype("Uploaded Filetype: " + selectedFile.type);
        setFilesize((selectedFile.size / (1024 * 1024)).toFixed(2));
      } else {
        setFilename("Browse File");
        setFiletype("Accepted Formats: jpg/jpeg/png/pdf");
        setFilesize("2");
      }
    });
  };

  const fileUpload2 = () => {
    var fileInput2 = document.getElementById("applicantDocumentFile");
    document.getElementById("applicantDocumentFile").click();

    fileInput2.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFilename2(selectedFile.name);
        setFiletype2("Uploaded Filetype: " + selectedFile.type);
        setFilesize2((selectedFile.size / (1024 * 1024)).toFixed(2));
      } else {
        setFilename2("Browse File");
        setFiletype2("Accepted Formats: jpg/jpeg/png/pdf");
        setFilesize2("2");
      }
    });
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
            <div className="accordion-item border-0 d-none">
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
                      src="/onboarding/accounts/kybDetails/busDocDet.svg"
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
                    Business Document Details
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
                    <div className="input-group w-100 pb-0">
                      <select id="businessDocumentType" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="BUSINESS_REGISTRATION_DOC">BUSINESS REGISTRATION DOCUMENT</option>
                        <option value="TRUST_DEED">TRUST DEED</option>
                        <option value="PARTNERSHIP_DEED">PARTNERSHIP DEED</option>
                        <option value="ASSOCIATION_DEED">ASSOCIATION DEED</option>
                        <option value="REGISTER_OF_DIRECTORS">REGISTER OF DIRECTORS</option>
                        <option value="REGISTER_OF_SHAREHOLDERS">REGISTER OF SHAREHOLDERS</option>
                        <option value="PROOF_OF_EXISTENCE">PROOF OF EXISTENCE</option>
                        <option value="LOA">LETTER OF AUTHORISATION</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Business Document Type
                        <span className="mx-1" style={{ color: "red" }}>
                          *
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="d-flex align-self-stretch browse1">
                    <div class="upload-document">Upload Document</div>
                    <button type="button" class="browse-file1" onClick={fileUpload} style={{ padding: "15px" }}>
                      <img class="files-icon" alt="" src="/onboarding/download51.svg" />

                      <div class="drag-drop-or-group" style={{ display: "block" }}>
                        <input type="file" id="businessDocumentFile" style={{ display: "none" }} />
                        <div class="browse2" id="businessKYBFilename">
                          {filename}
                        </div>
                      </div>
                    </button>
                    <div className="w-100 text-center text-black text-uppercase mt-2">
                      <div class="button-21" id="businessKYBFiletype">
                        {filetype}
                      </div>
                      <div class="button-21">File size: {filesize}MB</div>
                      <div class="button-21" style={{ color: "red" }}>
                        **Max file-size: 2MB
                      </div>
                    </div>
                  </div>

                  <br />
                  <br />
                  <br />
                  <div style={{ display: "flex", gap: "15px" }}>
                    <button
                      className="button-main btn outline-none submit-btn"
                      type="button"
                      id="submitBusinessKYBDetails"
                      onClick={functions.PostBusinessKYBDetails}
                    >
                      <img className="check-double-icon" alt="" src="/onboarding/check-double.svg" />
                      <div className="label7 submitBtn">Submit</div>
                    </button>
                    <button
                      className="button-main btn outline-none update-btn"
                      type="button"
                      id="updateBusinessKYBDetails"
                      onClick={functions.PatchBusinessKYBDetails}
                    >
                      <img className="check-double-icon" alt="" src="/onboarding/edit-icon.png" />
                      <div className="label7 submitBtn">update</div>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="accordion-item border-0 d-none">
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
                      src="/onboarding/accounts/kybDetails/stakeDocDet.svg"
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
                    Stakeholder Document Details
                    <span className="mx-1" style={{ color: "gray", fontSize: "15px" }}>
                      {"(Not Required For E-KYC)**"}
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
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <StakeholderDetails />
              </div>
            </div>

            <div className="accordion-item border-0 d-none">
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
                      src="/onboarding/accounts/kybDetails/appDocDet.svg"
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
                    Applicant Document Details
                    <span className="mx-1" style={{ color: "gray", fontSize: "15px" }}>
                      {"(Not Required For E-KYC)**"}
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
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <form className="form">
                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select id="applicantDocumentType" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="DRIVER_LICENCE">DRIVER'S LICENCE</option>
                        <option value="MEDICARE_CARD">MEDICARE CARD</option>
                        <option value="NATIONAL_ID">NATIONAL ID</option>
                        <option value="PASSPORT">PASSPORT</option>
                        <option value="POWER_OF_ATTORNEY">POWER OF ATTORNEY</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Applicant Document Type
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input id="applicantDocumentNumber" name="country" className="form-input my-0 pb-0" />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Applicant Document Number
                      </label>
                    </div>
                  </div>

                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input id="applicantDocumentReferenceNumber" name="country" className="form-input my-0 pb-0" />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Applicant Document Reference Number
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input id="applicantDocumentHolderName" name="country" className="form-input my-0 pb-0" />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Applicant Document Holder Name
                      </label>
                    </div>
                  </div>

                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <select id="applicantDocumentIssuanceCountry" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="IN">INDIA</option>
                        <option value="AU">AUSTRALIA</option>
                        <option value="US">UNITED STATES</option>
                        <option value="SG">SINGAPORE</option>
                        <option value="AE">UNITED ARAB EMIRATES</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Applicant Document Issuance Country
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <select id="applicantDocumentIssuingAuthority" name="country" className="form-input my-0 pb-0">
                        <option value=""></option>
                        <option value="IN">INDIA</option>
                        <option value="AU">AUSTRALIA</option>
                        <option value="US">UNITED STATES</option>
                        <option value="SG">SINGAPORE</option>
                        <option value="AE">UNITED ARAB EMIRATES</option>
                      </select>
                      <label htmlFor="country" className="form-input-label ps-1">
                        Applicant Document Issuing Authority
                      </label>
                    </div>
                  </div>

                  <div className="d-flex align-self-stretch">
                    <div className="input-group w-50 me-2 pb-0">
                      <input
                        type="date"
                        id="applicantDocumentIssueDate"
                        name="country"
                        className="form-input my-0 pb-0"
                      />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Applicant Document Issue Date
                      </label>
                    </div>
                    <div className="input-group w-50 ms-2 pb-0">
                      <input
                        type="date"
                        id="applicantDocumentExpiryDate"
                        name="country"
                        className="form-input my-0 pb-0"
                      />
                      <label htmlFor="country" className="form-input-label ps-1">
                        Applicant Document Expiry Date
                      </label>
                    </div>
                  </div>

                  <div class="d-flex align-self-stretch browse1">
                    <div class="upload-document">Upload Document</div>
                    <button type="button" class="browse-file1" onClick={fileUpload2} style={{ padding: "15px" }}>
                      <img class="files-icon" alt="" src="/onboarding/download51.svg" />

                      <div class="drag-drop-or-group" style={{ display: "block" }}>
                        <input type="file" id="applicantDocumentFile" style={{ display: "none" }} />
                        <div class="browse2">{filename2}</div>
                      </div>
                    </button>
                    <div className="w-100 text-center text-black text-uppercase mt-2">
                      <div class="button-21">{filetype2}</div>
                      <div class="button-21">File size: {filesize2}MB</div>
                      <div class="button-21" style={{ color: "red" }}>
                        **Max file-size: 2MB
                      </div>
                    </div>
                  </div>

                  <br />
                  <br />
                  <br />
                  <div style={{ display: "flex", gap: "15px" }}>
                    <button
                      className="button-main btn outline-none submit-btn"
                      type="button"
                      id="submitApplicantKYBDetails"
                      onClick={functions.PostApplicantKYBDetails}
                    >
                      <img className="check-double-icon" alt="" src="/onboarding/check-double.svg" />
                      <div className="label7 submitBtn">Submit</div>
                    </button>
                    <button
                      className="button-main btn outline-none update-btn"
                      type="button"
                      id="updateApplicantKYBDetails"
                      onClick={functions.PatchApplicantKYBDetails}
                    >
                      <img className="check-double-icon" alt="" src="/onboarding/edit-icon.png" />
                      <div className="label7 submitBtn">update</div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="accordion" id="accordionExample">
            <div className="accordion-item border-0 w-100">
              <div className="d-flex align-self-stretch">
                <div className="input-group w-100 me-2 pb-0">
                  <input id="kycUrl" name="country" className="form-input my-0 pb-0" readOnly />
                  <label htmlFor="country" className="form-input-label ps-1">
                    KYC URL
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit E_KYC BUTTON */}
          <div className="d-flex align-items-center justify-content-center w-100 gap-4 h-100 my-3">
            <button
              className="button-main btn outline-none submit-btn "
              type="button"
              id="submitEKYC"
              onClick={() => {
                window.open(document.getElementById("kycUrl").value, "_blank");
              }}
              style={{ width: "13.5em" }}
            >
              <img className="check-double-icon" alt="" src="check-double.svg" />
              <div className="label7 submitBtn">Start ekyc</div>
            </button>
            <button
              className="button-main btn outline-none submit-btn d-none"
              type="button"
              id="submitMKYC"
              onClick={functions.PostMKYC}
              style={{ width: "13.5em" }}
              disabled
            >
              <div id="button-text-mkyc" style={{ display: "flex" }}>
                <img className="check-double-icon" alt="" src="check-double.svg" />
                <div className="label7 submitBtn">Start KYC</div>
              </div>
              <div id="button-loader-mkyc" style={{ display: "none" }}>
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
          </div>
        </>
      )}
    </>
  );
}

export default kybDetails;
