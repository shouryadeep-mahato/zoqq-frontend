import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "../../../structure/CustomText";
import CustomSelect from "../../../structure/CustomSelect";
// import CustomSelect from './CustomSelect
import Createcustomer from "./createcustomer";
import queryString from 'query-string';
import { useRef } from "react";

export function EachCustomer({ customerdata }) {
  debugger;
  const getInitials = (name) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((word) => word[0].toUpperCase()).join("");
    return initials;
  };

  const customerInitials = getInitials(customerdata.customerName);
  const customerDataQueryString = queryString.stringify({ customerdata: JSON.stringify(customerdata) });
  return (
    <a
      href={`/expense/invoices/create-invoice?${customerDataQueryString}`}
      className="d-flex justify-content-between align-items-center m-1 text-decoration-none blueHover p-2 rounded-3"
      role="button"
    >
      <div className="d-flex align-items-center">
        <div
          className="bg-info p-3 rounded-circle me-2 text-white"
          style={{ width: "50px", height: "50px" }}
        >
          {customerInitials}
        </div>
        <div>
          <div className="text-dark">{customerdata.customerName}</div>
          <div className="grey1">{customerdata.customerEmail}</div>
        </div>
      </div>
      {/* <a
        className="nav-link"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <img src="/threeDotsH.svg" />
      </a> */}
      <ul
        className="dropdown-menu py-4 px-2  "
        aria-labelledby="navbarDropdown"
      >
        <li>
          <a
            className="dropdown-item fw-500"
            href="#"
            onClick={() => {
              setShowDetails(true);
            }}
          >
            Details
          </a>
        </li>
        <li>
          <a className="dropdown-item fw-500" href="#">
            Send Money
          </a>
        </li>
        <li>
          <a className="dropdown-item fw-500" href="#">
            Receive Money
          </a>
        </li>
        <li>
          <a className="dropdown-item fw-500" href="#">
            <img src="/sidebar/profile/profile.svg" className="me-2" />
            Edit
          </a>
        </li>
        <li>
          <a className="dropdown-item fw-500" href="#">
            <img src="/sidebar/profile/profile.svg" className="me-2" />
            Delete
          </a>
        </li>
      </ul>
    </a>
  );
}

function CreateNewBill({ customerdata }) {
  debugger;
  console.log("customerdata in addinvoivemodal", [customerdata] );
  
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(null);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleCustomerSelection = (index) => {
    setSelectedCustomerIndex(index);
  };
  const openNewCustomerModal = () => {
    setShowNewCustomerModal(!showNewCustomerModal);
  };
  const {
    createdAt,
    companyId,
    address3,
    address2,
    address1,
    customerEmail,
    address4,
    id,
    customerName,
  } = customerdata;
  // if([customerdata]){
  //   setShowNewCustomerModal(!showNewCustomerModal)
  // }
  //   const customers = [
  //     { name: "Mithilesh Kumar", email: "alexmc@queen.com", initials: "AM" },
  //     {  name: "Pabitra Sarkar", email: "alexmc@queen.com", initials: "AM" },
  //     {  name: "Shouryadeep Mahato", email: "alexmc@queen.com", initials: "AM" },
  //     { name: "Subhodeep Shil", email: "alexmc@queen.com", initials: "AM" },
  //     { name: "Arijit Pal", email: "alexmc@queen.com", initials: "AM" },
  //     {  name: "Satyakee Das", email: "alexmc@queen.com", initials: "AM" },
  //     {  name: "Pritam Kundu", email: "alexmc@queen.com", initials: "AM" },
  //     {  name: "Arpan Singh", email: "alexmc@queen.com", initials: "AM" },
  //     {  name: "Nivedita Gupta", email: "alexmc@queen.com", initials: "AM" },
  //     {  name: "Jaydev Singh", email: "alexmc@queen.com", initials: "AM" },
  //     // Add more customer data as needed
  //   ];
  const filteredCustomers = customerdata.filter((customer) =>
    customer.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayCustomers = searchQuery ? filteredCustomers : customerdata;

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn bg-blue100 text-white border w-100 rounded-3 d-flex align-items-center justify-content-center py-2 fw-500"
        data-bs-toggle="modal"
        data-bs-target="#AddNewAccountModal"
        
      >
        <span className="h3 m-0">+&nbsp;</span>New Invoice
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
              <h5 className="text-dark">Create New Invoice</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <h5 className="text-dark my-3">Sent Invoice to</h5>
            <form className="d-flex col-lg-6 border rounded-3 my-2 my-lg-0 w-100">
              <button className="btn" type="submit" disabled>
                <img src="/search.svg" />
              </button>
              <input
                className="form-control border-0"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* <div className='d-flex align-items-center'>
                            <img src='/plus_blue.svg' className='bg-blue10 p-3 my-3 rounded-circle' />

                            <p className='blue100 m-0 ms-3'>New Customer</p>
                        </div>  */}
            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn bg-blue10 p-3 my-3 rounded-circle"
                onClick={openNewCustomerModal}
              >
                <img src="/plus_blue.svg" />
              </button>
              <button
                type="button"
                className="btn blue100 m-0 ms-3"
                onClick={openNewCustomerModal}
              >
                New Customer
              </button>
            </div>

           
            {showNewCustomerModal && (
              <Createcustomer
                setShowNewCustomerModal={setShowNewCustomerModal}
              />
            )}

            <hr className="text-dark mt-0" />

            <div className="overflow-auto" style={{ maxHeight: "50vh" }}>
              {displayCustomers.map((customer, index) => (
                <EachCustomer
                  key={index}
                  customerdata={customer}
                  index={index}
                  onCustomerSelect={handleCustomerSelection}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewBill;
