import React, { useEffect, useState } from "react";
import CustomTextField from "../../../structure/CustomText";
import { handleCopy } from "../../../structure/handleCopy";

function DetailsBar({ setShowDetails, handleShow, handleActive }) {
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Escape") {
        setShowDetails(false); // Call your function when "Esc" is pressed
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <nav
      className="d-flex bg-white flex-column justify-content-start flex-start p-4 flex-1 border border-top-0 position-relative"
      id="sidebar"
    >
      <div className="mt-3 position-relative">
        <h6 className="text-nowrap me-5">Card Details</h6>
        <button
          type="button"
          className="btn-close btn-sm  position-absolute end-0 top-0 me-2"
          onClick={() => {
            handleShow(-1);
            handleActive(-1);
            setShowDetails(false);
          }}
        />
      </div>

      <div className="pt-2">
        <img src="/card.svg"></img>
      </div>

      <button className="blue100 btn border fw-500 py-2 mt-2">
        <img src="/expense/edit.svg" />
        &nbsp; Edit
      </button>
       
       <div className="btn border mt-3">
        <p className="pt-2 text-center">**** **** **** 2655</p>
        <div className="d-flex fw-500">
         <p className="pe-3 ps-2">Expires: 05/27</p>
         <p>CVV2: ***</p>
        </div>
       </div>
       <div className="blue100 pt-1 px-5 text-nowrap">
        <img src="/expense/card/show.svg"/>Show Card Number
       </div>

      <div className="accordion accordion-flush mt-4" id="receiveMoneyDetails">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed fw-500 ps-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              GENERAL
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#receiveMoneyDetails"
          >
            <div className="d-flex my-3 align-items-center justify-content-between fw-normal">
              <img src="/expense/card/name.svg" />
              <p className="m-0 grey1 flex-fill ms-2">Name</p>
              <p className="m-0">Marco Polo</p>
            </div>
            <div className="d-flex my-3 align-items-center justify-content-between fw-normal">
              <img src="/expense/card/purpose.svg" />
              <p className="m-0 grey1 flex-fill ms-2">Purpose</p>
              <p className="m-0">Trips</p>
            </div>
            <div className="d-flex my-3 align-items-center justify-content-between fw-normal">
              <img src="/expense/card/fund.svg" />
              <p className="m-0 grey1 flex-fill ms-2">Source of Funds</p>
              <p className="m-0">USD Account</p>
            </div>
            <div className="d-flex my-3 align-items-center justify-content-between fw-normal">
              <img src="/expense/budget.svg" />
              <p className="m-0 grey1 flex-fill ms-2">Budget</p>
              <p className="m-0">-</p>
            </div>
            <div className="d-flex my-3 align-items-center justify-content-between fw-normal">
              <img src="/expense/card/categorisation.svg" />
              <p className="m-0 grey1 flex-fill ms-2">Categorisation</p>
              <p className="m-0">Travel</p>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button btn-accordion collapsed fw-500 text-decoration-none ps-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Card Limit
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#receiveMoneyDetails"
          >
            <div className="d-flex my-3 align-items-center justify-content-between fw-normal">
              <img src="/expense/reference.svg" />
              <p className="m-0 grey1 flex-fill ms-2">Reference:</p>
              <p className="m-0">None</p>
            </div>
            <div className="d-flex my-3 align-items-center justify-content-between fw-normal">
              <img src="/expense/budget.svg" />
              <p className="m-0 grey1 flex-fill ms-2">Budget:</p>
              <p className="m-0">None</p>
            </div>
            <div className="d-flex my-3 align-items-center justify-content-between fw-normal">
              <img src="/expense/notify.svg" />
              <p className="m-0 grey1 flex-fill ms-2">Notify:</p>
              <p className="m-0">No</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            spend:
            <br />
            <span className="fw-normal">300.00 USD</span>
          </div>
          <div>
            Limit:
            <br />
            <span className="fw-normal">900.00 USD</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DetailsBar;
