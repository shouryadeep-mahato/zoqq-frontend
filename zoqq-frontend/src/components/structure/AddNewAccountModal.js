import React, { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import {BiLabel} from "react-icons/bi"
import Loader from "./../Signup/assets/Signup/public/loader.gif";
import {
  flag,
  fullform,
  createAccount
} from "../../data/accounts/globalAccounts";
import CustomTextField from "./CustomText";
import "../accounts/css/accounts.css"

function AddNewAccountModal({
  isActivated,
  cardActivated,
  options,
  type,
  getAccountDetails,
  index,
}) {
  const [val, setVal] = useState();

  const [bankName, setbankName] = useState("");
  const [label, setlabel] = useState("");
 
  useEffect(() => {
    console.log(label);
  }, [label]);

  const onSubmit = (e) => {
    e.preventDefault();
    
    const formData = { currencyCode:type, bankName, label };
    console.log(formData);
    createAccount(formData);
    getAccountDetails();
    
  };

  return (
    <form className="row mt-4" onSubmit={onSubmit}>
       <div onClick={(e) => e.stopPropagation()}> 
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn bg-white border w-100 blue100 d-flex align-items-center justify-content-center py-3 fw-500"
          data-bs-toggle="modal"
          data-bs-target={"#AddNewAccountModal" + index}
          disabled={!isActivated}
        >
          <img src="/plus_1.svg" />
          Get Bank Account
          {!isActivated && <img src="/lock_2.svg" />}
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id={"AddNewAccountModal" + index}
          tabIndex={-1}
          aria-labelledby="AddNewAccountModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-5 text-center position-relative">
              <button
                type="button"
                className="btn-close position-absolute end-0 top-0 m-4"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="addAccountModalCloseButton"
              />
              <img
                src={flag[type]}
                width={50}
                className="mx-auto rounded-circle"
              />
              <p className="fw-normal my-2">
                {type}, {fullform[type]}
              </p>
              <h6 className="my-4">Get Bank Account</h6>
              <div className="d-flex border-bottom mb-4">
                <div className="d-flex">
                  <img
                    src="/bank_outline.svg"
                    width={40}
                    className="border-end my-auto px-2"
                  />
                </div>
                <div className="input-group containertext w-100 h-100">
                  <CustomSelect options={options} setValue={setbankName} />
                </div>
              </div>
              {bankName && <div className="d-flex border-bottom mb-2">
               <div className="d-flex align-items-center px-2">
               <BiLabel size={20} className="grey1"/>
             </div>
              <div className="input-group containertext w-100 h-100">
                <CustomTextField label="Account Label" value={label} onChange={(e)=>setlabel(e.target.value)} />
              </div></div>}
              <button className="btn bg-blue100 text-white py-2" type="submit" style={{marginTop:"10px"}}>
               <div id="button-text">
               <div className="addAccountButtonText" style={{marginBottom:"5px"}}>Create Account</div>
               </div>
                <div id="button-loader">
                  <img className="addAccountButtonLoader" alt="" src={Loader}/>
                </div>
             </button>
            </div>
          </div>
        </div>
      </div> 
    </form>
  );
}

export default AddNewAccountModal;
