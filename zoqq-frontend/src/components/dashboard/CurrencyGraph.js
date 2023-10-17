import React, { useEffect, useState } from "react";

export const getRate = (fromRate, toRate) => {
  const rate = {
    USD: 82.7,
    SGD: 61.2,
    GBP: 104.83,
    EUR: 89.89,
    HKD: 10.54,
    AUD: 53.62,
  };

  return rate[fromRate] / rate[toRate];
};

function CurrencyGraph() {
  const options = [
    { label: "USD", value: "USD" },
    { label: "GBP", value: "GBP" },
    { label: "EUR", value: "EUR" },
    { label: "AUD", value: "AUD" },
    { label: "HKD", value: "HKD" },
    { label: "SGD", value: "SGD" },
  ];

  const [selectCurr, setSelectCurr] = useState("GBP");
  const [amount, setAmount] = useState(0.0);

  useEffect(() => {
    if (selectCurr) setAmount(Number(getRate(selectCurr, "USD")).toFixed(3));
  }, [selectCurr]);

  return (
    <div className="mx-3 row border p-3 bg-white">
      <div className="col-6 h3">
        1 {selectCurr} = {amount} USD
      </div>
      <div className="col-4 btn btn-outline-white border my-auto mx-auto grey1 rounded-3 text-nowrap d-grid">
        <select
          id="currencySelect"
          onChange={(e) => {
            setSelectCurr(e.target.value);
          }}
          style={{ border: "none" }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <p className="h5">Today</p>
      <div className="row grey1 fw-normal">
        <img src="/graph.svg" className="d-inline-block col-9" />
        <p className="text-center col-3 my-3">
          1,313
          <br />
          <br />
          1,291
          <br />
          <br />
          1,269
        </p>
      </div>
      <div className="d-flex justify-content-between grey1 fw-normal">
        <p className="col-9">Month ago</p>
        <p className="text-center col-3">Today</p>
      </div>
    </div>
  );
}

export default CurrencyGraph;
