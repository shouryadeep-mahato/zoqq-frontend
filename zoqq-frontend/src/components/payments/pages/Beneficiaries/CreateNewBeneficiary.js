import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "../../../structure/CustomText";
import CustomSelect from "../../../structure/CustomSelect";
import NumberField from "../../../structure/NumberField";
import { listcountry } from "../../js/common";
import { listmobcountrycode } from "../../js/common";
import { fetchCurrency } from "../../js/ListBeneficiaries";
import { addBeneficiry } from "../../js/ListBeneficiaries";
import { fetchSupportedCorridors } from "../../js/ListBeneficiaries";
import "../../css/CountryDropdown.css";
import {
  BsCodeSlash,
  BsCurrencyBitcoin,
  BsGlobeAmericas,
} from "react-icons/bs";
import { TbBuildingEstate, TbMap2 } from "react-icons/tb";
import { PiSignpostDuotone } from "react-icons/pi";
import { LiaAddressCard } from "react-icons/lia";
import { MdManageAccounts, MdPayment } from "react-icons/md";
import { AiOutlineNumber } from "react-icons/ai";
import { RxValue } from "react-icons/rx";

const beneficiaryacctype = ["Individual", "Corporate"];
const payoutMethod = ["LOCAL", "SWIFT", "WALLET"];
const routingCodeType1 = [
  "SWIFT",
  "IFSC",
  "SORT CODE",
  "ACH CODE",
  "BRANCH CODE",
  "BSB CODE",
  "BANK CODE",
];

function BasicInfo({
  basicInfo,
  setBasicInfo,
  setCurrentState,
  customerHashId,
}) {
  const [isBusiness, setIsBusiness] = useState(false);
  const [countryList, setcountryList] = useState([]);
  const [mobcountrycode, setmobcountrycode] = useState([]);

  useEffect(() => {
    listcountry().then((response) => {
      console.log(response.result);
      setcountryList(response.result);
    });
    listmobcountrycode().then((response) => {
      console.log(response.result);
      setmobcountrycode(response.result);
    });
  }, []);
  const handleNameChange = (e) => {
    const beneficiaryName = e.target.value;
    setBasicInfo({ ...basicInfo, beneficiaryName: beneficiaryName });
  };

  const handleEmailChange = (e) => {
    setBasicInfo({ ...basicInfo, beneficiaryEmail: e.target.value });
  };

  const handlemobcountrycodeChange = (e) => {
    setBasicInfo({
      ...basicInfo,
      beneficiaryContactCountryCode: e.target.value,
    });
  };

  const handlephoneChange = (e) => {
    setBasicInfo({ ...basicInfo, beneficiaryContactNumber: e.target.value });
  };
  const handleAddressChange = (e) => {
    setBasicInfo({ ...basicInfo, beneficiaryAddress: e.target.value });
  };

  const handlebeneficiaryCountryCodeChange = (e) => {
    setBasicInfo({ ...basicInfo, beneficiaryCountryCode: e.target.value });
  };
  const handlebeneficiaryStateChange = (e) => {
    setBasicInfo({ ...basicInfo, beneficiaryState: e.target.value });
  };
  const handlebeneficiaryCityChange = (e) => {
    setBasicInfo({ ...basicInfo, beneficiaryCity: e.target.value });
  };
  const handlebeneficiaryPostcodeChange = (e) => {
    setBasicInfo({ ...basicInfo, beneficiaryPostcode: e.target.value });
  };
  if (isBusiness === "false") {
    setBasicInfo({ ...BasicInfo, beneficiaryAccountType: "Individual" });
  } else {
    setBasicInfo({ ...BasicInfo, beneficiaryAccountType: "Corporate" });
  }

  return (
    <>
      <h5 className="text-dark">{isBusiness ? "Business" : "Personal"} Info</h5>

      <div className="d-flex my-3">
        <div
          className={
            !isBusiness
              ? "border-bottom border-dark py-2 text-dark w-50"
              : "border-bottom grey1 w-50 py-2"
          }
          onClick={() => setIsBusiness(false)}
          role="button"
        >
          Personal
        </div>
        <div
          className={
            isBusiness
              ? "border-bottom border-dark py-2 text-dark w-50"
              : "border-bottom grey1 w-50 py-2"
          }
          onClick={() => setIsBusiness(true)}
          role="button"
        >
          Business
        </div>
      </div>

      <form
        className="overflow-auto border py-3 px-2 rounded-4"
        style={{ maxHeight: "50vh" }}
      >
        <div className="d-flex">
          <div className="d-flex border-bottom mb-4 w-50 me-1">
            <div className="d-flex">
              <img
                src="/payments/name.svg"
                width={40}
                className="border-end my-auto px-2"
              />
            </div>
            <div className="input-group containertext w-100 h-100">
              <input
                id="name"
                placeholder={isBusiness ? "Business Name" : "Name"}
                value={basicInfo?.beneficiaryName}
                onChange={handleNameChange}
                style={{ border: "none" }}
              />
            </div>
          </div>

          <div className="d-flex border-bottom mb-4 w-50 ms-1">
            <div className="d-flex">
              <img
                src="/payments/email.svg"
                width={40}
                className="border-end my-auto px-2"
              />
            </div>
            <div className="input-group containertext w-100 h-100">
              <input
                id="email"
                placeholder={isBusiness ? "Business Email" : "Email"}
                value={basicInfo?.beneficiaryEmail}
                onChange={handleEmailChange}
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>

        <div className="d-flex">
          {!isBusiness && (
            <div className="d-flex border-bottom mb-4 w-100 me-1">
              <div className="d-flex">
                <img
                  src="/payments/phone.svg"
                  width={40}
                  className="border-end my-auto px-2"
                />
              </div>
              <div className="input-group containertext w-100 h-100">
                <div className="w-50">
                  {/* <CustomSelect placeholder="Code" /> */}

                  <select
                    id="selectBox1"
                    className="custom-select"
                    value={basicInfo?.beneficiaryContactCountryCode}
                    onChange={handlemobcountrycodeChange}
                  >
                    <option value="" disabled selected>
                      Country Code
                    </option>
                    {mobcountrycode.map((country) => (
                      <option
                        key={country?.ISO_country_code}
                        value={country?.ISD_country_code}
                      >
                        + {country?.ISD_country_code} {country?.country_name}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  id="phone"
                  placeholder="Phone"
                  className="w-50"
                  value={basicInfo?.beneficiaryContactNumber}
                  onChange={handlephoneChange}
                  style={{ border: "none" }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="d-flex border-bottom mb-4">
          <LiaAddressCard
            size={40}
            className="text-dark opacity-50 px-2 border-end"
          />

          <div className="input-group containertext w-100 h-100">
            <input
              id="beneficiaryAddress"
              placeholder="Address"
              value={basicInfo?.beneficiaryAddress}
              onChange={handleAddressChange}
              style={{ border: "none" }}
            />
          </div>
        </div>

        <div className="d-flex">
          <div className="d-flex border-bottom mb-4 w-100 me-1">
            {/* <div className="d-flex">
              <img
                src="/payments/iban.svgk"
                width={40}
                className="border-end my-auto px-2"
              />
            </div> */}
            <BsGlobeAmericas
              size={40}
              className="text-dark opacity-50 px-2 border-end"
            />

            <div className="input-group containertext w-100 h-100">
              {/* <CustomSelect placeholder="Country" /> */}
              <select
                id="selectBox"
                className="custom-select"
                value={basicInfo?.beneficiaryCountryCode}
                onChange={handlebeneficiaryCountryCodeChange}
              >
                <option value="" disabled selected>
                  Country
                </option>
                {countryList.map((country) => (
                  <option
                    key={country.ISO_country_code}
                    value={country.ISOcc_2char}
                  >
                    {country.country_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="d-flex border-bottom mb-4 w-100 mx-1">
            {/* <div className="d-flex">
              <img
                src="/payments/iban.svg"
                width={40}
                className="border-end my-auto px-2"
              />
            </div> */}
            <TbMap2
              size={40}
              className="border-end my-auto px-2 text-dark opacity-50"
            />
            <div className="input-group containertext w-100 h-100">
              {/* <CustomSelect placeholder="State" /> */}
              <input
                id="beneficiaryState"
                placeholder="State"
                value={basicInfo?.beneficiaryState}
                onChange={handlebeneficiaryStateChange}
                style={{ border: "none" }}
              />
            </div>
          </div>

          <div className="d-flex border-bottom mb-4 w-100 ms-1">
            {/* <div className="d-flex">
              <img
                src="/payments/iban.svg"
                width={40}
                
              />
            </div> */}
            <TbBuildingEstate
              size={40}
              className="border-end my-auto px-2 text-dark opacity-50"
            />
            <div className="input-group containertext w-100 h-100">
              <input
                id="beneficiaryCity"
                placeholder="City"
                value={basicInfo?.beneficiaryCity}
                onChange={handlebeneficiaryCityChange}
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>

        <div className="d-flex">
          <div className="d-flex border-bottom mb-4 w-100 me-1">
            <PiSignpostDuotone
              size={40}
              className="border-end my-auto px-2 text-dark opacity-50"
            />

            <div className="input-group containertext w-100 h-100">
              <input
                id="beneficiaryPostcode"
                placeholder="Postcode"
                value={basicInfo?.beneficiaryPostcode}
                onChange={handlebeneficiaryPostcodeChange}
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>
      </form>
      <button
        className="btn bg-green100 fw-500 text-white py-3 w-100 mt-3"
        onClick={() => setCurrentState("account")}
      >
        Next
      </button>
    </>
  );
}

function AccountInfo({
  basicInfo,
  setCurrentState,
  customerHashId,
  setBasicInfo,
}) {
  const [isBusiness, setIsBusiness] = useState(false);
  const [currency, setcurrency] = useState([]);
  const [countryList, setcountryList] = useState([]);
  const [cond1, setCond1] = useState(false);
  const [cond2, setCond2] = useState(false);
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationCurrency, setDestinationCurrency] = useState("");

  useEffect(() => {
    debugger;
    listcountry().then((response) => {
      console.log(response.result);
      setcountryList(response.result);
    });
  }, []);

  useEffect(() => {
    fetchCurrency(customerHashId).then((response) => {
      console.log(response);
      if (response?.message == null) setcurrency(response);
    });
  }, []);
  const addbeneficiry = (customerHashId) => {
    setCurrentState("account");
    addBeneficiry(basicInfo, customerHashId);
  };
  const handledestinationCountryChange = (e) => {
    setCond1(Boolean(e.target.value));
    setBasicInfo({ ...basicInfo, destinationCountry: e.target.value });
    setDestinationCountry(e.target.value);
  };

  const handledestinationCurrencyChange = (e) => {
    debugger;
    const currency = e.target.value;
    setCond2(Boolean(currency));
    setDestinationCurrency(currency);
    if (currency) {
      fetchSupportedCorridors(destinationCountry, currency, basicInfo);
    }
  };

  return (
    <>
      <h5 className="text-dark mb-3">Account Info</h5>

      <form
        className="overflow-auto border py-3 px-2 rounded-4"
        style={{ maxHeight: "50vh" }}
      >
        <div className="d-flex">
          <div className="d-flex border-bottom mb-4 w-100 ms-1">
            {/* <div className="d-flex">
              <img
                src="/payments/iban.svg"
                width={40}
                className="border-end my-auto px-2"
              />
            </div> */}
            <BsGlobeAmericas
              size={40}
              className="text-dark opacity-50 px-2 border-end"
            />

            <div className="input-group containertext w-100 h-100">
              {/* <CustomSelect placeholder="Destination Country" /> */}
              <select
                id="destinationcountry"
                className="custom-select"
                value={basicInfo?.destinationCountry}
                onChange={handledestinationCountryChange}
                style={{ border: "none" }}
              >
                <option value="" disabled selected>
                  Destination Country
                </option>
                {countryList.map((country) => (
                  <option
                    key={country.ISO_country_code}
                    value={country.ISOcc_2char}
                  >
                    {country.country_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="d-flex border-bottom mb-4 w-100 ms-1">
            <BsCurrencyBitcoin
              size={40}
              className="border-end my-auto px-2 text-dark opacity-50"
            />

            <div className="input-group containertext w-100 h-100">
              {/* <CustomSelect placeholder="Destination Currency" /> */}
              <select
                id="destinationCurrency"
                className="custom-select"
                // onChange={(e) => setCond2(Boolean(e.target.value))}
                onChange={handledestinationCurrencyChange}
              >
                <option value="" disabled selected>
                  Destination Currency
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

        {cond1 && cond2 && (
          <>
            {/* <div className="d-flex w-100">
              <div className="d-flex border-bottom mb-4 w-100 me-1">
                <MdManageAccounts
                  size={40}
                  className="border-end my-auto px-2 text-dark opacity-50"
                />

                 <div className="input-group containertext w-100 h-100"> 
               
                 <select
                    id="beneficiaryAccountType"
                    className="custom-select w-100"
                  >
                    <option value="" disabled selected>
                      Account Type
                    </option>
                    {beneficiaryacctype.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div> 
              </div>
            </div> */}

            <div className="d-flex">
              <div className="d-flex border-bottom mb-4 w-50 me-1">
                <AiOutlineNumber
                  size={40}
                  className="border-end my-auto px-2 text-dark opacity-50"
                />

                <div className="input-group containertext w-100 h-100">
                  <input
                    id="beneficiaryAccountNumber"
                    placeholder="Account Number"
                    style={{ border: "none" }}
                  />
                </div>
              </div>

              <div className="d-flex border-bottom mb-4 w-50 ms-1">
                <BsCodeSlash
                  size={40}
                  className="border-end my-auto px-2 text-dark opacity-50"
                />

                <div className="input-group containertext w-100 h-100">
                  {/* <CustomTextField label="Routing Code Type 1" /> */}
                  <select id="routingCodeType1" className="custom-select">
                    <option value="" disabled selected>
                      Routing Code
                    </option>
                    {routingCodeType1.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="d-flex">
              <div className="d-flex border-bottom mb-4 w-100 me-1">
                <RxValue
                  size={40}
                  className="border-end my-auto px-2 text-dark opacity-50"
                />

                <div className="input-group containertext w-100 h-100">
                  <input
                    id="routingCodeValue1"
                    placeholder="Routing Value"
                    style={{ border: "none" }}
                  />
                </div>
              </div>

              <div className="d-flex border-bottom mb-4 w-100 ms-1">
                <MdPayment
                  size={40}
                  className="border-end my-auto px-2 text-dark opacity-50"
                />

                <div className="input-group containertext w-100 h-100">
                  {/* <CustomSelect placeholder="Payment Method" /> */}
                  <select id="payoutMethod" className="custom-select">
                    <option value="" disabled selected>
                      Payment Method
                    </option>
                    {payoutMethod.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
      <div className="d-flex mt-3">
        <button
          className="btn bg-blue100 fw-500 text-white py-3 w-100 mt-3 me-2"
          onClick={() => setCurrentState("basic")}
        >
          Back
        </button>
        <button
          className="btn bg-green100 fw-500 text-white py-3 w-100 mt-3 ms-2"
          // onClick={() => setCurrentState("account")}
          onClick={() => {
            return addbeneficiry(customerHashId);
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
}

function CreateNewBeneficiary({ customerHashId }) {
  //
  const [currentState, setCurrentState] = useState("basic");
  const [basicInfo, setBasicInfo] = useState({
    beneficiaryName: "",
    beneficiaryEmail: "",
    beneficiaryContactCountryCode: "",
    beneficiaryContactNumber: "",
    beneficiaryAddress: "",
    beneficiaryCountryCode: "",
    beneficiaryState: "",
    beneficiaryCity: "",
    beneficiaryPostcode: "",
  });

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn bg-blue100 text-white border w-100 rounded-3 d-flex align-items-center justify-content-center py-2 fw-500"
        data-bs-toggle="modal"
        data-bs-target="#AddNewAccountModal"
      >
        <span className="h3 m-0">+&nbsp;</span>
        New Beneficiary
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="AddNewAccountModal"
        tabIndex={-1}
        aria-labelledby="AddNewAccountModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-5 text-center">
            <div className="d-flex justify-content-between my-2">
              <h5 className="text-dark">Creating Beneficiaries</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="d-flex my-2">
              <img
                src="/payments/createBeneficiaries.svg"
                className="mx-auto"
              />
            </div>

            {currentState === "basic" ? (
              <BasicInfo
                basicInfo={basicInfo}
                setBasicInfo={setBasicInfo}
                setCurrentState={setCurrentState}
                customerHashId={customerHashId}
              />
            ) : (
              <AccountInfo
                basicInfo={basicInfo}
                setCurrentState={setCurrentState}
                customerHashId={customerHashId}
                setBasicInfo={setBasicInfo}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNewBeneficiary;
