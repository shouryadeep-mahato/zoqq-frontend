import React, { useEffect, useState } from "react";
import * as functions from "../functions/business-details-functions.js";
import { toast } from "react-toastify";

function CorporateDetailsModal({ response }) {
  const [val, setVal] = useState();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (response.length != 0) {
      setData(response);
      document.getElementById("openModalBtn").click();
    }
  }, [response]);

  const selectedBusinessDetails = (event) => {
    var selectBRN = event.target.getAttribute("data-value");
    console.log(selectBRN);
    functions.GetCorporateDetails(selectBRN);
  };
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        id="openModalBtn"
        data-bs-toggle="modal"
        data-bs-target="#CorporateDetails"
        style={{ display: "none" }}
      ></button>
      {/* Modal */}
      <div
        className="modal fade"
        id="CorporateDetails"
        tabIndex={-1}
        aria-labelledby="AddNewAccountModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4 text-center position-relative">
            <div className="div-label">Please select your business from the list:</div>
            <button
              type="button"
              className="btn-close position-absolute end-0 top-0 m-4"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeModalBtn"
            />
            <div id="CorporateListDiv" className="corporate-list-div">
              {data &&
                data.map((eachData, key) => (
                  <div
                    type="button"
                    className="corporate-list"
                    id="corporateList"
                    data-value={eachData.businessRegistrationNumber}
                    key={key}
                    onClick={selectedBusinessDetails}
                  >
                    <i className="fa-solid fa-building-columns"></i>
                    {eachData.businessName} ({eachData.businessRegistrationNumber})
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CorporateDetailsModal;
