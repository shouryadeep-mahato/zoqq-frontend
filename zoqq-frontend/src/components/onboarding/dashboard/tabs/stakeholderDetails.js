import React, { useEffect, useRef, useState } from "react";
import * as functions from "./functions/kyb-details-function.js";

function stakeholderDetails() {
  const [filename3, setFilename3] = useState("Browse Files");
  const [filetype3, setFiletype3] = useState("Accepted Formats: jpg/jpeg/png/pdf");
  const [filesize3, setFilesize3] = useState("0.00");
  const fileUpload3 = () => {
    var fileInput3 = document.getElementById("StakeholderDocumentFile");
    document.getElementById("StakeholderDocumentFile").click();

    fileInput3.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFilename3(selectedFile.name);
        setFiletype3("Uploaded Filetype: " + selectedFile.type);
        setFilesize3((selectedFile.size / (1024 * 1024)).toFixed(3));
      } else {
        setFilename3("Browse File");
        setFiletype3("Accepted Formats: jpg/jpeg/png/pdf");
        setFilesize3("2");
      }
    });
  };

  return (
    <>
      <form className="form">
        <div className="d-flex align-self-stretch">
          <div className="input-group w-50 me-2 pb-0">
            <select id="StakeholderDocumentType" name="country" className="form-input my-0 pb-0">
              <option value=""></option>
              <option value="DRIVER_LICENCE">DRIVER'S LICENCE</option>
              <option value="MEDICARE_CARD">MEDICARE CARD</option>
              <option value="NATIONAL_ID">NATIONAL ID</option>
              <option value="PASSPORT">PASSPORT</option>
              <option value="POWER_OF_ATTORNEY">POWER OF ATTORNEY</option>
            </select>
            <label htmlFor="country" className="form-input-label ps-1">
              Stakeholder Document Type
            </label>
          </div>
          <div className="input-group w-50 ms-2 pb-0">
            <input id="StakeholderDocumentNumber" name="country" className="form-input my-0 pb-0" />
            <label htmlFor="country" className="form-input-label ps-1">
              Stakeholder Document Number
            </label>
          </div>
        </div>

        <div className="d-flex align-self-stretch">
          <div className="input-group w-50 me-2 pb-0">
            <input id="StakeholderDocumentReferenceNumber" name="country" className="form-input my-0 pb-0" />
            <label htmlFor="country" className="form-input-label ps-1">
              Stakeholder Document Reference Number
            </label>
          </div>
          <div className="input-group w-50 ms-2 pb-0">
            <input id="StakeholderDocumentHolderName" name="country" className="form-input my-0 pb-0" />
            <label htmlFor="country" className="form-input-label ps-1">
              Stakeholder Document Holder Name
            </label>
          </div>
        </div>

        <div className="d-flex align-self-stretch">
          <div className="input-group w-50 me-2 pb-0">
            <select id="StakeholderDocumentIssuanceCountry" name="country" className="form-input my-0 pb-0">
              <option value=""></option>
              <option value="IN">INDIA</option>
              <option value="AU">AUSTRALIA</option>
              <option value="US">UNITED STATES</option>
              <option value="SG">SINGAPORE</option>
              <option value="AE">UNITED ARAB EMIRATES</option>
            </select>
            <label htmlFor="country" className="form-input-label ps-1">
              Stakeholder Document Issuance Country
            </label>
          </div>
          <div className="input-group w-50 ms-2 pb-0">
            <select id="StakeholderDocumentIssuingAuthority" name="country" className="form-input my-0 pb-0">
              <option value=""></option>
              <option value="IN">INDIA</option>
              <option value="AU">AUSTRALIA</option>
              <option value="US">UNITED STATES</option>
              <option value="SG">SINGAPORE</option>
              <option value="AE">UNITED ARAB EMIRATES</option>
            </select>
            <label htmlFor="country" className="form-input-label ps-1">
              Stakeholder Document Issuing Authority
            </label>
          </div>
        </div>

        <div className="d-flex align-self-stretch">
          <div className="input-group w-50 me-2 pb-0">
            <input type="date" id="StakeholderDocumentIssueDate" name="country" className="form-input my-0 pb-0" />
            <label htmlFor="country" className="form-input-label ps-1">
              Stakeholder Document Issue Date
            </label>
          </div>
          <div className="input-group w-50 ms-2 pb-0">
            <input type="date" id="StakeholderDocumentExpiryDate" name="country" className="form-input my-0 pb-0" />
            <label htmlFor="country" className="form-input-label ps-1">
              Stakeholder Document Expiry Date
            </label>
          </div>
        </div>

        <div class="d-flex align-self-stretch browse1">
          <div class="upload-document">Upload Document</div>
          <button type="button" class="browse-file1" onClick={fileUpload3} style={{ padding: "15px" }}>
            <img class="files-icon" alt="" src="/onboarding/download51.svg" />

            <div class="drag-drop-or-group" style={{ display: "block" }}>
              <input type="file" id="StakeholderDocumentFile" style={{ display: "none" }} />
              <div class="browse2">{filename3}</div>
            </div>
          </button>
          <div className="w-100 text-center text-black text-uppercase mt-2">
            <div class="button-21">{filetype3}</div>
            <div class="button-21">File size: {filesize3}MB</div>
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
            id="submitStakeholderKYBDetails"
            onClick={functions.PostStakeholderKYBDetails}
          >
            <img className="check-double-icon" alt="" src="/onboarding/check-double.svg" />
            <div className="label7 submitBtn">Submit</div>
          </button>
          <button
            className="button-main btn outline-none update-btn"
            type="button"
            id="updateStakeholderKYBDetails"
            onClick={functions.PatchStakeholderKYBDetails}
          >
            <img className="check-double-icon" alt="" src="/onboarding/edit-icon.png" />
            <div className="label7 submitBtn">update</div>
          </button>
        </div>
      </form>
    </>
  );
}

export default stakeholderDetails;
