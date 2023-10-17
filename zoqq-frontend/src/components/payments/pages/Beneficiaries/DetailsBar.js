import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import EditBeneficiary from "./EditBeneficiary";
import { deleteBeneficiary } from "../../js/beneficiaries";

function DetailsBar({ setShowDetails, handleShow, handleActive, data, color }) {
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

  function createShortForm(fullName) {
    const words = fullName.split(" ");
    let shortForm = words[0].charAt(0).toUpperCase();
    for (let i = 1; i < words.length; i++) {
      shortForm += words[i].charAt(0).toUpperCase();
    }
    return shortForm;
  }

  return (
    <nav
      className="d-flex bg-white flex-column justify-content-start flex-start p-4 flex-1 border border-top-0 position-relative"
      id="sidebar"
    >
      <div className="mt-3 position-relative">
        <h6 className="text-nowrap me-5">Bank Account Details</h6>
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

      <div className="d-flex border p-3 justify-content-center align-items-center my-3 rounded-2">
        <div
          className={"p-3 rounded-circle me-2 text-white" + color}
          style={{ width: 55, height: 55 }}
        >
          <div className="text-center">
            {createShortForm(data.beneficiaryName)}
          </div>
        </div>
        <p className="my-auto ms-2 me-5 text-nowrap">{data?.beneficiaryName}</p>
        <a className="nav-link border rounded-3 p-2" href="#" role="button">
          <img src="/threeDotsV.svg" />
        </a>
      </div>

      <div>
        <p>INFO</p>

        <div className="my-3">
          <p className="m-0 grey1 d-flex align-items-center">Email</p>
          <h6 className="m-0 mt-1">{data?.beneficiaryEmail}</h6>
        </div>

        <div className="my-3">
          <p className="m-0 grey1 d-flex align-items-center">Phone</p>
          <h6 className="m-0 mt-1">{data?.beneficiaryContactNumber}</h6>
        </div>

        <div className="my-3">
          <p className="m-0 grey1 d-flex align-items-center">Account</p>
          <h6 className="m-0 mt-1">{data?.beneficiaryAccountNumber}</h6>
        </div>
      </div>

      <hr />

      <Link
        to={`/payments/send-money?beneficiaryHashId=${data?.beneficiaryHashId}&beneficiaryName=${data?.beneficiaryName}&beneficiaryAccountNumber=${data?.beneficiaryAccountNumber}`}
        className="btn border rounded-3 my-2 py-3 bg-green100 text-white fw-500"
      >
        <img src="/payments/send-money-white.svg" />
        Send Money
      </Link>

      <Link
        to="/payments/receive-money"
        className="btn border rounded-3 my-2 py-3 fw-500 green100"
      >
        <img src="/payments/receive-money.svg" />
        Receive Money
      </Link>

      <EditBeneficiary />

      <button
        className="btn border rounded-3 my-2 py-3 fw-500 blue100"
        onClick={() => deleteBeneficiary(data?.beneficiaryEmail)}
      >
        <AiOutlineDelete size={40} className="me-2" />
        Delete
      </button>
    </nav>
  );
}

export default DetailsBar;
