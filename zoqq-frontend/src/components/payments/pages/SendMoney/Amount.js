import React, { useEffect, useState } from "react";
import NumberField from "../../../structure/NumberField";
import CustomSelect from "../../../structure/CustomSelect";
import CustomTextField from "../../../structure/CustomText";
import { useLocation } from "react-router-dom";
const purposeCode = [
  { label: "Transfer to own account", value: "IR001" },
  { label: "Family Maintenance", value: "IR002" },
  { label: "Education-related student expenses", value: "IR003" },
  { label: "Medical Treatment", value: "IR004" },
  { label: "Hotel Accommodation", value: "IR005" },
  { label: "Travel", value: "IR006" },
  { label: "Utility Bills", value: "IR007" },
  { label: "Repayment of Loans", value: "IR008" },
  { label: "Tax Payment", value: "IR009" },
  { label: "Purchase of Residential Property", value: "IR010" },
  { label: "Payment of Property Rental", value: "IR011" },
  { label: "Insurance Premium", value: "IR012" },
  { label: "Product indemnity insurance", value: "IR013" },
  { label: "Insurance Claims Payment", value: "IR014" },
  { label: "Mutual Fund Investment", value: "IR0015" },
  { label: "Investment in Shares", value: "IR016" },
  { label: "Donations", value: "IR017" },

  { label: "Information Service Charges", value: "IR01801" },
  {
    label: "Advertising & Public relations-related expenses",
    value: "IR01802",
  },
  {
    label: "Royalty fees, trademark fees, patent fees, and copyright fees",
    value: "IR01803",
  },
  {
    label:
      "Fees for brokers, front end fee, commitment fee, guarantee fee and custodian fee",
    value: "IR01804",
  },
  {
    label:
      "Fees for advisors, technical assistance, and academic knowledge, including remuneration for specialists",
    value: "IR01805",
  },
  { label: "Representative office expenses", value: "IR01806" },
  { label: "Construction costs/expenses", value: "IR01807" },
  { label: "Transportation fees for goods", value: "IR01808" },
  { label: "For payment of exported goods", value: "IR01809" },
  { label: "Delivery fees for goods", value: "IR01810" },
  { label: "General Goods Trades - Offline trade", value: "IR01811" },
];

const sourceOfFunds = [
  "Salary",
  "Personal Savings",
  "Personal Wealth",
  "Retirement Funds",
  "Business Owner/Shareholder",
  "Loan Facility",
  "Personal Account",
  "Corporate Account",
];

const exemptionCode = [
  { label: "Trusted Beneficiary", value: "01" },
  { label: "Recurring Transactions", value: "03" },
  { label: "Payment to Self", value: "04" },
];

function InternationalTransferForm({ currency }) {
  const options = [
    { value: "vanilla", label: "Vanilla" },
    { value: "strawberry", label: "Strawberry" },
    { value: "caramel", label: "Caramel" },
    { value: "mint", label: "Mint" },
    { value: "blueberry", label: "Blueberry" },
    { value: "raspberry", label: "Raspberry" },
    { value: "hazelnut", label: "Hazelnut" },
    { value: "peanut_butter", label: "Peanut Butter" },
  ];

  const [val, setVal] = useState();
  return (
    <form className="row mt-4">
      <label className="mb-2">You Send</label>
      <div className="col-12 d-flex border-bottom mb-1">
        <div className="input-group containertext w-75 h-100 ">
          <NumberField className="w-100" />
        </div>
        <div className="input-group containertext w-25 h-100 d-flex flex-nowrap">
          <img src="/accounts/currency.svg" className="py-3 pe-2" />
          <div className="border-start my-2 w-100">
            {/* <CustomSelect
              options={options}
              setValue={setVal}
              placeholder={"USD"}
            /> */}
            <select id="Currency" className="custom-select">
              <option value="" disabled selected>
                Currency
              </option>
              {currency?.map((currency) => (
                <option key={currency.curSymbol} value={currency.curSymbol}>
                  {currency.curSymbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <p className="mb-4">
        <span className="fw-normal">Current balance: </span>
        <u>11,900.00 USD </u>
      </p>

      <div className="d-flex justify-content-around my-4">
        <div className="border p-2 rounded d-flex align-items-center">
          <img src="/minus.svg" />
        </div>
        <div>
          <p className="m-0">
            <span className="grey1 fw-normal">Fx fees</span>
            <br />
            <span>100 USD</span>
          </p>
        </div>
        <div className="border p-2 rounded d-flex align-items-center">
          <img src="/equals.svg" />
        </div>
        <div>
          <p className="m-0">
            <span className="grey1 fw-normal">Converted amount</span>
            <br />
            <span>4,900.00 USD</span>
          </p>
        </div>
        <div className="border p-2 rounded d-flex align-items-center">
          <img src="/cross.svg" />
        </div>
        <div>
          <p className="m-0">
            <span className="grey1 fw-normal">Current rate</span>
            <br />
            <span>0.90 USD</span>
          </p>
        </div>
      </div>

      <label className="mb-2">Recipient will receive</label>
      <div className="col-12 d-flex border-bottom mb-1">
        <div className="input-group containertext w-75 h-100">
          <NumberField className="w-100" readOnly={true} />
        </div>
        <div className="input-group containertext w-25 h-100 d-flex flex-nowrap">
          <img src="/accounts/currency.svg" className="py-3 pe-2" />
          <div className="border-start my-2 w-100">
            {/* <CustomSelect
              options={options}
              setValue={setVal}
              placeholder={"USD"}
            /> */}
            <select id="Currency" className="custom-select">
              <option value="" disabled selected>
                Currency
              </option>
              {currency?.map((currency) => (
                <option key={currency.curSymbol} value={currency.curSymbol}>
                  {currency.curSymbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <CustomTextField
        placeholder="Description (Optional)"
        className="border-bottom mt-3"
      />

      <p className="text-center fw-normal mt-4">
        Funds will be delivered within <span className="fw-500">3 hours</span>
      </p>
    </form>
  );
}

function NationalTransferForm({ paymentbody, setpaymentbody, currency }) {
  const options = [
    { value: "vanilla", label: "Vanilla" },
    { value: "strawberry", label: "Strawberry" },
    { value: "caramel", label: "Caramel" },
    { value: "mint", label: "Mint" },
    { value: "blueberry", label: "Blueberry" },
    { value: "raspberry", label: "Raspberry" },
    { value: "hazelnut", label: "Hazelnut" },
    { value: "peanut_butter", label: "Peanut Butter" },
  ];
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedPurposeCode, setSelectedPurposeCode] = useState("");
  const [selectedSourceoffund, setSelectedSourceoffund] = useState("");
  const [selectedExemptionCode, setSelectedExemptionCode] = useState("");
  const [description, setDescription] = useState("");

  const handleAmount = (e) => {
    setpaymentbody({ ...paymentbody, source_amount: e.target.value });
  };

  const handleCurrencyChange = (e) => {
    // setSelectedCurrency(e.target.value);
    setpaymentbody({ ...paymentbody, source_currency: e.target.value });
  };
  const handlePurposeCodeChange = (e) => {
    // setSelectedPurposeCode(e.target.value);
    setpaymentbody({ ...paymentbody, purposeCode: e.target.value });
  };
  const handleSourceoffundChange = (e) => {
    //setSelectedSourceoffund(e.target.value);
    setpaymentbody({ ...paymentbody, sourceOfFunds: e.target.value });
  };
  const handleExemptionCodeChange = (e) => {
    // setSelectedExemptionCode(e.target.value);
    setpaymentbody({ ...paymentbody, exemptionCode: e.target.value });
  };

  const handlecustomerComments = (e) => {
    // setSelectedExemptionCode(e.target.value);
    setpaymentbody({ ...paymentbody, customerComments: e.target.value });
  };

  const [val, setVal] = useState();
  return (
    <form className="row mt-4">
      <label className="mb-2">Recipient will receive exactly</label>
      <div className="col-12 d-flex border-bottom mb-3">
        <div className="input-group containertext w-75 h-100 border-danger">
          {/* <NumberField className="w-100" placeholder="Enter Amount" /> */}
          {/* <input
            className="w-100 border-none"
            placeholder="Enter Amount"
            value={paymentbody?.source_amount}
            // onChange={(e) => setAmount(e.target.value)}
            onChange={handleAmount}
          /> */}
          <CustomTextField
            placeholder="Enter Amount"
            value={paymentbody?.source_amount}
            onChange={handleAmount}
          />
        </div>
        <div className="input-group containertext w-25 h-100 d-flex flex-nowrap">
          {/* <img src="/accounts/currency.svg" className="py-3 pe-2" /> */}
          <div className="border-start my-2 w-100">
            {/* <CustomSelect
              options={options}
              setValue={setVal}
              placeholder={"USD"}
            /> */}
            {/* <select id="Currency" className="custom-select"> */}
            <select
              id="Currency"
              className="custom-select"
              // value={selectedCurrency}
              value={paymentbody?.source_currency}
              onChange={handleCurrencyChange}
            >
              <option value="" disabled selected>
                Currency
              </option>
              {currency?.map((currency) => (
                <option key={currency.curSymbol} value={currency.curSymbol}>
                  {currency.curSymbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="col-13 d-flex border-bottom mb-4">
        <div className="input-group containertext w-100 h-100">
          {/* <select id="purposeCode" className="custom-select pb-3 w-100"> */}
          <select
            id="purposeCode"
            className="custom-select pb-3 w-100"
            // value={selectedPurposeCode}
            value={paymentbody?.purposeCode}
            onChange={handlePurposeCodeChange}
          >
            <option value="">Purpose Code</option>
            {purposeCode.map((purpose, index) => (
              <option key={index} value={purpose.value}>
                {purpose.label}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group containertext w-100 h-100">
          {/* <select id="purposeCode" className="custom-select pb-3 w-100"> */}
          <select
            id="sourceCode"
            className="custom-select pb-3 w-100"
            // value={selectedSourceoffund}
            value={paymentbody?.sourceOfFunds}
            onChange={handleSourceoffundChange}
          >
            <option value="">Source of Fund</option>
            {sourceOfFunds.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group containertext w-100 h-100">
          {/* <select id="purposeCode" className="custom-select pb-3 w-100"> */}
          <select
            id="exemptionCode"
            className="custom-select pb-3 w-100"
            // value={selectedExemptionCode}
            value={paymentbody?.exemptionCode}
            onChange={handleExemptionCodeChange}
          >
            <option value="">Exemption Code</option>
            {exemptionCode.map((exemptionCode, index) => (
              <option key={index} value={exemptionCode.value}>
                {exemptionCode.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* <div className="d-flex">
        <div className="border p-2 rounded d-flex align-items-center me-3">
          <img src="/plus_black.svg" />
        </div>
         <div>
          <p className="m-0">
            <span className="grey1 fw-normal">Fx fees</span>
            <br />
            <span>100 USD</span>
          </p>
        </div> 
      </div> */}

      <div className="d-flex my-3">
        <div className="border p-2 rounded d-flex align-items-center me-3">
          <img src="/equals.svg" />
        </div>
        <div>
          <p className="m-0">
            <span className="grey1 fw-normal">You will Send</span>
            <br />
            <span>
              {paymentbody.source_amount} {paymentbody.source_currency}
            </span>
          </p>
        </div>
      </div>

      {/* <CustomTextField
        placeholder="Description (Optional)"
        className="border-bottom mt-3"
      /> */}
      <CustomTextField
        placeholder="Description (Optional)"
        className="border-bottom mt-3"
        // value={description}
        value={paymentbody?.customerComments}
        // onChange={(e) => setDescription(e.target.value)} // Update description state
        onChange={handlecustomerComments}
      />
      <p className="text-center fw-normal mt-4">
        Funds will be delivered <span className="fw-500">on Wednesday</span>
      </p>
    </form>
  );
}

function Amount({ paymentbody, setpaymentbody, currency, setCurrentState }) {
  const [isInternational, setIsInternational] = useState(true);
  const location = useLocation();
  const [state, setState] = useState("LOCAL");

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setState(hash.slice(1));
    }
    if (state == "LOCAL") {
      setIsInternational(false);
    }
  }, [state]);
  return (
    <div className="row my-4">
      <div className="col-11 col-md-9 col-lg-7 d-flex bg-white mx-auto justify-content-center align-items-center p-4 border">
        <p className="m-0 mx-3 blue100 fw-normal">1. Recipient</p>
        <img src="/payments/lineH.svg" />
        <p className="m-0 mx-3 blue100 fw-500">2. Amount</p>
        <img src="/payments/lineH_pending.svg" />
        <p className="m-0 mx-3 grey1 fw-normal">3. Overview</p>
      </div>
      <div className="col-7 bg-white mx-auto my-4 p-5 border rounded-3">
        <div
          className="opacity-50 mx-3 mb-3 fw-normal"
          onClick={() => setCurrentState("recipient")}
          role="button"
        >
          <img src="/arrows/arrowLeft.svg" width={10} />
          &nbsp; Back
        </div>

        <div className="mb-3">
          <img
            src="/payments/amount.svg"
            className="p-3 bg-yellow10 border rounded-3"
          />
        </div>

        <div className="my-3">
          <h5>What amount do you want to transfer?</h5>
        </div>

        {state !== "LOCAL" && (
          <div className="d-flex mt-4 mb-3 text-center h5">
            <div
              className={
                isInternational
                  ? "border-bottom border-dark py-2 text-dark w-50"
                  : "border-bottom grey1 w-50 py-2 fw-normal"
              }
              onClick={() => setIsInternational(true)}
              role="button"
            >
              International transfer
            </div>
            <div
              className={
                !isInternational
                  ? "border-bottom border-dark py-2 text-dark w-50"
                  : "border-bottom grey1 w-50 py-2 fw-normal"
              }
              onClick={() => setIsInternational(false)}
              role="button"
            >
              Same currency transfer
            </div>
          </div>
        )}

        {isInternational ? (
          <InternationalTransferForm
            currency={currency}
            paymentbody={paymentbody}
            setpaymentbody={setpaymentbody}
          />
        ) : (
          <NationalTransferForm
            currency={currency}
            paymentbody={paymentbody}
            setpaymentbody={setpaymentbody}
          />
        )}
        <button
          className="btn w-100 py-3 fw-500 text-white bg-green100"
          onClick={() => setCurrentState("overview")}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}

export default Amount;
