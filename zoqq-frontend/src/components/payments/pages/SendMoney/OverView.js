import React from "react";
import SendMoney from "../SendMoney";
import { sendMoney } from "../../js/ListBeneficiaries";

function OverView({
  setCurrentState,
  paymentbody,
  customerHashId,
  beneficiaryName,
  beneficiaryAccountNumber,
}) {
  //   console.log(paymentbody);
  const handleConfirmTransfer = (paymentbody, customerHashId) => {
    setCurrentState("response");
    sendMoney(paymentbody, customerHashId);
  };
  return (
    <div className="row my-4">
      <div className="col-11 col-md-9 col-lg-7 d-flex bg-white mx-auto justify-content-center align-items-center p-4 border">
        <p className="m-0 mx-3 blue100 fw-normal">1. Recipient</p>
        <img src="/payments/lineH.svg" />
        <p className="m-0 mx-3 blue100 fw-normal">2. Amount</p>
        <img src="/payments/lineH.svg" />
        <p className="m-0 mx-3 blue100 fw-500">3. Overview</p>
      </div>

      <div className="col-7 bg-white mx-auto my-4 p-5 border rounded-3">
        <div
          className="opacity-50 mx-3 mb-3 fw-normal"
          onClick={() => setCurrentState("amount")}
          role="button"
        >
          <img src="/arrows/arrowLeft.svg" width={10} />
          &nbsp; Back
        </div>

        <div className="mb-3">
          <img
            src="/payments/overview.svg"
            className="p-3 bg-yellow10 border rounded-3"
          />
        </div>

        <div className="mt-3 mb-4">
          <h5>Everything is correct?</h5>
        </div>

        <p>SUMMARY</p>

        <div className="d-flex justify-content-between fw-normal">
          <p className="grey1">You Sent</p>
          <p className="">
            {paymentbody.source_amount} {paymentbody.source_currency}
          </p>
        </div>

        {/* <div className="d-flex justify-content-between fw-normal">
          <p className="grey1 fw-500">
            <u>Our Fee</u>
          </p>
          <p className="">50.00 EUR</p>
        </div> */}

        <div className="d-flex justify-content-between fw-normal">
          <p className="grey1">Recipient will receive</p>
          <p className="fw-500">
            {paymentbody.source_amount} {paymentbody.source_currency}
          </p>
        </div>

        <hr />

        <p>RECIPIENT</p>

        <div className="d-flex justify-content-between fw-normal">
          <p className="grey1">Name</p>
          {/* <p className="">{paymentbody.benificiaryname}</p> */}
          {paymentbody.benificiaryname ? (
            <p className="">{paymentbody.benificiaryname}</p>
          ) : (
            beneficiaryName
          )}
        </div>

        <div className="d-flex justify-content-between fw-normal">
          <p className="grey1">Account</p>
          {/* <p className="">{paymentbody.beneficiaryAccountNumber}</p> */}
          {paymentbody.beneficiaryAccountNumber ? (
            <p className="">{paymentbody.beneficiaryAccountNumber}</p>
          ) : (
            beneficiaryAccountNumber
          )}
        </div>

        <div className="d-flex justify-content-between fw-normal">
          <p className="grey1">Description</p>
          <p>{paymentbody.customerComments}</p>
        </div>

        <button
          className="btn w-100 py-3 fw-500 text-white bg-green100 my-3"
          //   onClick={() => setCurrentState("response")}
          onClick={() => {
            return handleConfirmTransfer(paymentbody, customerHashId);
          }}
        >
          CONFIRM THE TRANSFER
        </button>
      </div>
    </div>
  );
}

export default OverView;
