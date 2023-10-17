import React from "react";

function Response({ paymentbody, setCurrentState }) {
  return (
    <div className="row my-4">
      <div className="col-11 col-md-9 col-lg-7 bg-white mx-auto my-4 p-5 border rounded-3">
        <div className="mb-3 d-flex">
          <img
            src="/payments/requestSuccess_yellow.svg"
            className="p-3 bg-yellow10 border rounded-3 mx-auto"
          />
        </div>
        <div className="mt-3 d-flex flex-column">
          <h5 className="text-center">The money was successfully sent to</h5>
          <h6 className="bg-light border rounded-3 p-2 d-inline-block mx-auto">
            {paymentbody.benificiaryname}
          </h6>

          <hr />

          <p>SUMMARY</p>

          <div className="d-flex justify-content-between fw-normal">
            <p className="grey1">You Sent</p>
            <p className="">
              {" "}
              {paymentbody.source_amount} {paymentbody.source_currency}
            </p>
          </div>

          <div className="d-flex justify-content-between fw-normal">
            <p className="grey1 fw-500">
              <u>Our Fee</u>
            </p>
            {/* <p className="">50.00 EUR</p> */}
            <p className=""></p>
          </div>

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
            <p className="">{paymentbody.benificiaryname}</p>
          </div>

          <div className="d-flex justify-content-between fw-normal">
            <p className="grey1">Account</p>
            <p className="">{paymentbody.beneficiaryAccountNumber}</p>
          </div>

          <div className="d-flex justify-content-between fw-normal">
            <p className="grey1">Description</p>
            <p>{paymentbody.customerComments}</p>
          </div>

          <button className="btn blue100 border py-3 fw-500 rounded-3 my-3">
            <img src="/draganddrop.svg" className="me-2" />
            Get a PDF receipt
          </button>

          <div className="d-flex">
            <button
              className="btn green100 border py-3 fw-500 rounded-3 my-3 w-50 me-2"
              onClick={() => setCurrentState("recipient")}
            >
              SEND ANOTHER TRANSFER
            </button>
            <button className="btn bg-green100 text-white border py-3 fw-500 rounded-3 my-3 w-50 ms-2">
              MANAGE TRANSACTIONS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Response;
