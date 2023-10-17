import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
function Recipient({
  beneficiaries,
  setCurrentState,
  beneficiaryName,
  beneficiaryHashId,
  paymentbody,
  setpaymentbody,
}) {
  debugger;
  const [mode, setMode] = useState("LOCAL");
  const [name, setName] = useState("");
  //const location = useLocation();
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const currState = hash.slice(1);
      if (
        currState === "LOCAL" ||
        currState === "SWIFT" ||
        currState === "WALLET"
      )
        setMode(hash.slice(1));
    }
  }, []);

  // const handlenamechange = (e) => {
  //   setpaymentbody({
  //     ...paymentbody,
  //     beneficiaryid: e.target.value,
  //   });
  // };
  const handlenamechange = (e) => {
    const selectedBeneficiaryId = e.target.value;
    const selectedBeneficiary = beneficiaries.find(
      (beneficiary) => beneficiary.beneficiaryHashId === selectedBeneficiaryId
    );
    if (selectedBeneficiary) {
      setpaymentbody({
        ...paymentbody,
        beneficiaryid: selectedBeneficiary.beneficiaryHashId,
        benificiaryname: selectedBeneficiary.beneficiaryName,
        beneficiaryAccountNumber: selectedBeneficiary.beneficiaryAccountNumber,
      });
    }
  };


  const [val, setVal] = useState("");

  return (
    <div className="row my-4">
      <div className="col-11 col-md-9 col-lg-7 d-flex bg-white mx-auto justify-content-center align-items-center p-4 border">
        <p className="m-0 mx-3 blue100 fw-500">1. Recipient</p>
        <img src="/payments/lineH_pending.svg" />
        <p className="m-0 mx-3 grey1 fw-normal">2. Amount</p>
        <img src="/payments/lineH_pending.svg" />
        <p className="m-0 mx-3 grey1 fw-normal">3. Overview</p>
      </div>

      <div className="col-7 bg-white mx-auto my-4 p-5 border rounded-3">
        <div className="mb-3">
          <img
            src="/payments/recipient.svg"
            className="p-3 bg-yellow10 border rounded-3"
          />
        </div>
        <div className="my-3">
          <h5>How do you want to transfer funds?</h5>
        </div>

        <div className="d-flex mt-4 mb-3 text-center h5">
          <Link
            to="#LOCAL"
            className={
              mode === "LOCAL"
                ? "text-decoration-none border-bottom border-dark py-2 text-dark w-50"
                : "text-decoration-none border-bottom grey1 w-50 py-2 fw-normal"
            }
            onClick={() => setMode("LOCAL")}
            role="button"
          >
            Local
          </Link>
          <Link
            to="#SWIFT"
            className={
              mode === "SWIFT"
                ? "text-decoration-none border-bottom border-dark py-2 text-dark w-50"
                : "text-decoration-none border-bottom grey1 w-50 py-2 fw-normal"
            }
            onClick={() => setMode("SWIFT")}
            role="button"
          >
            Swift
          </Link>
          <Link
            to="#WALLET"
            className={
              mode === "WALLET"
                ? "text-decoration-none border-bottom border-dark py-2 text-dark w-50"
                : "text-decoration-none border-bottom grey1 w-50 py-2 fw-normal"
            }
            onClick={() => setMode("WALLET")}
            role="button"
          >
            Wallet
          </Link>
        </div>

        <div className="d-flex border-bottom my-4">
          <div className="d-flex">
            <img
              src="/payments/name.svg"
              width={40}
              className="border-end my-auto px-2"
            />
          </div>

          <div className="input-group containertext w-100 h-100">
            <select
              id="beneficiariesList"
              className="custom-select"
              value={paymentbody?.beneficiaryid}
              onChange={handlenamechange}
              // (e) => setVal(e.target.value)
            >
              {beneficiaryName != undefined &&
              beneficiaryHashId != undefined ? (
                <option value={beneficiaryHashId}>{beneficiaryName}</option>
              ) : (
                <>
                  <option value="">Select a beneficiary</option>
                  {beneficiaries
                    .filter((beneficiary) => beneficiary.payoutMethod === mode)
                    .map((beneficiary) => (
                      <option
                        key={beneficiary.beneficiaryHashId}
                        value={beneficiary.beneficiaryHashId}
                      >
                        {beneficiary.beneficiaryName}
                      </option>
                    ))}
                </>
              )}
            </select>
          </div>
        </div>

        <button
          className="btn w-100 py-3 fw-500 text-white bg-green100"
          onClick={() => setCurrentState("amount")}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}

export default Recipient;
