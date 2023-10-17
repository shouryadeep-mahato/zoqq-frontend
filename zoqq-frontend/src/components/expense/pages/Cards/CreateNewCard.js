import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "../../../structure/CustomText";
import CustomSelect from "../../../structure/CustomSelect";
// import CustomSelect from './CustomSelect'

export function EachCustomer() {
  return (
    <a
      href="/expense/corporate-cards/create-card"
      className="d-flex justify-content-between align-items-center m-1 text-decoration-none blueHover p-2 rounded-3"
      role="button"
    >
      <div className="d-flex align-items-center">
        <div className="bg-info p-3 rounded-circle me-2 text-white">AM</div>
        <div className="d-flex align-items-center">
          <div className="text-dark m-0 p-0">Alexander McQueen</div>
          <div className="blue100 bg-blue10 px-3 m-0 mx-2 py-1 rounded-pill text-center align-middle">
            You
          </div>
        </div>
      </div>
    </a>
  );
}

function CreateNewCard() {
  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn bg-yellow100 text-white border w-100 rounded- d-flex align-items-center justify-content-center py-2 fw-500"
        data-bs-toggle="modal"
        data-bs-target="#AddNewAccountModal"
      >
        <span className="h3 m-0">+&nbsp;</span>New Card
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="AddNewAccountModal"
        tabIndex={-1}
        aria-labelledby="AddNewAccountModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-5">
            <div className="d-flex justify-content-between my-2">
              <h5 className="text-dark">Create New Card</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <h5 className="text-dark my-3">Who is Card for?</h5>
            <form className="d-flex col-lg-6 border rounded-3 my-2 my-lg-0 w-100">
              <button className="btn" type="submit" disabled>
                <img src="/search.svg" />
              </button>
              <input
                className="form-control border-0"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>

            <div className="d-flex align-items-center">
              <img
                src="/plus_blue.svg"
                className="bg-blue10 p-3 my-3 rounded-circle"
              />

              <p className="blue100 m-0 ms-3">New Customer</p>
            </div>

            <hr className="text-dark mt-0" />

            <div className="overflow-hidden" style={{ maxHeight: "50vh" }}>
              <EachCustomer />
              <EachCustomer />
              <EachCustomer />
              <EachCustomer />
              <EachCustomer />
              <EachCustomer />
              <EachCustomer />
              <EachCustomer />
              <EachCustomer />
              <EachCustomer />
              <EachCustomer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewCard;
