import React, { useState } from "react";
import BreadCrumbs from "../../../../structure/BreadCrumbs";
import CustomTextField from "../../../../structure/CustomText";
import CustomSelect from "../../../../structure/CustomSelect";
import { Link } from "react-router-dom";

function CreateCard() {
  return (
    <div>
      <BreadCrumbs
        data={{
          backurl: "/expense/Cards",
          name: "Create New Cards",
          info: true,
          img: "/arrows/arrowLeft.svg",
        }}
      />

      <div className="d-flex">
        <div className="bg-white m-3 p-4 border rounded-3 flex-fill">
          <h6>Card Details &nbsp;</h6>
          <p class="fw-500 fs-6 pt-4">Overview</p>
          <div className="d-flex">
            <div className="d-flex border-bottom mb-4 w-50 me-2">
              <div className="d-flex">
                <img
                  src="/Card_Name.svg"
                  width={40}
                  className="border-end my-auto px-2"
                />
              </div>
              <div className="input-group containertext w-100 h-100">
                <CustomTextField label="Card Name" className="w-100" />
              </div>
            </div>

            <div className="d-flex border-bottom mb-4 w-50 ms-2">
              <div className="d-flex">
                <img
                  src="/Card_purpose.svg"
                  width={40}
                  className="border-end my-auto px-2"
                />
              </div>
              <div className="input-group containertext w-100 h-100">
                <CustomTextField label="Crad Purpose" />
              </div>
            </div>
          </div>
          <p class="fw-500 fs-6 pt-2">Spend Controls</p>
          <div className="d-flex">
            <div className="d-flex border-bottom mb-4 w-50 me-2">
              <div className="d-flex">
                <img
                  src="/Fund.svg"
                  width={40}
                  className="border-end my-auto px-2"
                />
              </div>
              <div className="input-group containertext w-100 h-100">
                <CustomSelect placeholder=" Source of Funds" />
              </div>
            </div>

            <div className="d-flex border-bottom mb-4 w-50 ms-2">
              <div className="d-flex">
                <img
                  src="/expense/budget.svg"
                  width={40}
                  className="border-end my-auto px-2"
                />
              </div>
              <div className="input-group containertext w-100 h-100">
                <CustomTextField label="Budget (Optional)" />
              </div>
            </div>
          </div>

          <div className="checkbox-lg">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue="Boat"
              id="checkbox"
            />
            <label className="fw-normal ps-2" htmlFor="checkbox">
              {" "}
              Spend Limit
            </label>
          </div>
          <p class="fw-500 fs-6 pt-4">Reporting</p>
          <div className="d-flex border-bottom mb-4 w-100 me-2">
              <div className="d-flex">
                <img
                  src="/Categorisation.svg"
                  width={40}
                  className="border-end my-auto px-2"
                />
              </div>
              <div className="input-group containertext">
                <CustomSelect placeholder="Categorisation" />
              </div>
            </div>
            <div className="checkbox-lg">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue="Boat"
              id="checkbox"
            />
            <label className="fw-normal ps-2" htmlFor="checkbox">
              {" "}
              Receipt Reminders
            </label>
          </div>

          <div className="d-flex justify-content-end mt-5">
            <div>            
              <button className="btn fw-500 yellow100 border me-2 py-2 rounded-4">
                Cancel
              </button>
              <Link to="/expense/corporate-cards" className='btn fw-500 bg-green100 text-white py-2 rounded-4'>Issue Card <img src="/check double.svg"></img></Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCard;
