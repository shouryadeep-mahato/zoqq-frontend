import React, { useEffect, useState } from "react";
import CustomSelect from "../../../structure/CustomSelect";
import EachBeneficiary from "./EachBeneficiary";
// import { beneficiariesList } from "../../js/beneficiaries";
const payoutmethod = ["LOCAL", "SWIFT"];
function BeneficiariesList({ beneficiaries, setShowDetails }) {
  const colorList = [
    " bg-danger",
    " bg-success",
    " bg-warning",
    " bg-primary",
    " bg-info",
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState("");

  const handleSearchChange = (e) => {
    debugger;
    setSearchQuery(e.target.value);
  };

  const handlePayoutMethodChange = (e) => {
    setSelectedPayoutMethod(e.target.value);
  };

  const filteredBeneficiaries = beneficiaries.filter((item) => {
    const nameMatches =
      !searchQuery ||
      item.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase());
    const payoutMethodMatches =
      !selectedPayoutMethod || item.payoutMethod === selectedPayoutMethod;

    return nameMatches && payoutMethodMatches;
  });

  // const filteredBeneficiaries = searchQuery
  //   ? beneficiaries.filter((item) =>
  //       item.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   : beneficiaries;

  return beneficiaries ? (
    <div className="w-100">
      <div className="d-flex flex-fill row mt-3 mb-5 align-items-baseline justify-content-end">
        <div className="col-12 col-md-4 my-2 my-lg-0 h-100">
          <div className="d-flex ms-md-3 me-md-1 border rounded-3 flex-fill">
            <input
              className="form-control border-0"
              type="search"
              placeholder="Search By Name"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {/* <div className="col-12 col-md-4 my-2">
          <div className=" border rounded-3 mx-md-1 h-100">
            <CustomSelect placeholder="IBAN Number" />
          </div>
        </div> */}
        <div className="col-12 col-md-4 my-2 h-100">
          <div className=" border rounded-3 ms-md-1 me-md-3 h-100">
            {/* <select id="payoutMethod" className="custom-select p-2"> */}
            <select
              id="payoutMethod"
              className="custom-select p-2"
              value={selectedPayoutMethod}
              onChange={handlePayoutMethodChange}
            >
              <option value="">Payout Method</option>
              {payoutmethod.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredBeneficiaries.map((item, key) => (
        <div key={key}>
          <EachBeneficiary
            setShowDetails={setShowDetails}
            data={item}
            key={key}
            color={colorList[key % 5]}
          />
          <hr />
        </div>
      ))}
    </div>
  ) : (
    <p>Loading ...</p>
  );
}

export default BeneficiariesList;
